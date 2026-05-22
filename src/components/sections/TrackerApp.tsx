"use client";

import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BarChart3,
  Download,
  Flame,
  Plus,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  calculateApScore,
  calculateTotalPercent,
  clamp,
  ExamRecord,
  getSubject,
  STORAGE_KEY,
  subjects,
  TopicScores,
} from "@/lib/tracker-data";

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
});

export default function TrackerApp() {
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0].id);
  const [records, setRecords] = useState<ExamRecord[]>([]);
  const [mcqScore, setMcqScore] = useState("");
  const [frqScore, setFrqScore] = useState("");
  const [notes, setNotes] = useState("");
  const [topicScores, setTopicScores] = useState<TopicScores>({});
  const [formError, setFormError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [loaded, setLoaded] = useState(false);

  const selectedSubject = getSubject(selectedSubjectId);
  const numericMcq = Number(mcqScore) || 0;
  const numericFrq = Number(frqScore) || 0;
  const totalPercent = calculateTotalPercent(
    selectedSubject,
    numericMcq,
    numericFrq
  );
  const apScore = calculateApScore(selectedSubject, totalPercent);

  const subjectRecords = useMemo(
    () =>
      records
        .filter((record) => record.subjectId === selectedSubjectId)
        .sort((a, b) => a.date.localeCompare(b.date)),
    [records, selectedSubjectId]
  );

  const latestRecord = subjectRecords.at(-1);
  const averageTopicScores = useMemo(() => {
    return selectedSubject.topics.map((topic) => {
      const values = subjectRecords
        .map((record) => record.topicScores[topic.id])
        .filter((value) => typeof value === "number");
      const average = values.length
        ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length)
        : topicScores[topic.id] ?? 0;

      return { ...topic, average };
    });
  }, [selectedSubject, subjectRecords, topicScores]);

  const chartData = subjectRecords.map((record, index) => ({
    name: `Test ${index + 1}`,
    date: dateFormatter.format(new Date(record.date)),
    apScore: record.apScore,
    totalPercent: record.totalPercent,
  }));

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ExamRecord[];
        setRecords(Array.isArray(parsed) ? parsed : []);
      }
    } catch {
      setRecords([]);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (loaded) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    }
  }, [loaded, records]);

  useEffect(() => {
    setTopicScores(
      Object.fromEntries(selectedSubject.topics.map((topic) => [topic.id, 70]))
    );
  }, [selectedSubject]);

  function saveRecord() {
    setFormError("");
    setStatusMessage("");

    if (!mcqScore && !frqScore) {
      setFormError("Enter at least one MCQ or FRQ score before saving.");
      return;
    }

    if (numericMcq < 0 || numericMcq > selectedSubject.mcqMax) {
      setFormError(`MCQ score must be between 0 and ${selectedSubject.mcqMax}.`);
      return;
    }

    if (numericFrq < 0 || numericFrq > selectedSubject.frqMax) {
      setFormError(`FRQ score must be between 0 and ${selectedSubject.frqMax}.`);
      return;
    }

    const record: ExamRecord = {
      id: crypto.randomUUID(),
      subjectId: selectedSubjectId,
      date: new Date().toISOString(),
      mcqScore: clamp(numericMcq, 0, selectedSubject.mcqMax),
      frqScore: clamp(numericFrq, 0, selectedSubject.frqMax),
      totalPercent,
      apScore,
      topicScores,
      notes: notes.trim() || undefined,
    };

    setRecords((current) => [...current, record]);
    setMcqScore("");
    setFrqScore("");
    setNotes("");
    setStatusMessage("Practice test saved.");
  }

  function deleteRecord(id: string) {
    const confirmed = window.confirm("Delete this practice test record?");
    if (!confirmed) return;

    setRecords((current) => current.filter((record) => record.id !== id));
    setStatusMessage("Practice test deleted.");
  }

  function clearSubject() {
    const confirmed = window.confirm(
      `Clear all saved records for ${selectedSubject.shortName}?`
    );
    if (!confirmed) return;

    setRecords((current) =>
      current.filter((record) => record.subjectId !== selectedSubjectId)
    );
    setStatusMessage(`${selectedSubject.shortName} records cleared.`);
  }

  function clearAllData() {
    const confirmed = window.confirm(
      "Clear all AP Score Tracker records from this browser?"
    );
    if (!confirmed) return;

    setRecords([]);
    setStatusMessage("All local tracker records cleared.");
  }

  function exportJson() {
    const data = JSON.stringify(records, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ap-score-tracker-records.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  function importJson(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    setFormError("");
    setStatusMessage("");

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (!Array.isArray(parsed)) {
          setFormError("Import failed: JSON must be an array of records.");
          return;
        }

        const validRecords = parsed.filter(isExamRecord);
        if (!validRecords.length) {
          setFormError("Import failed: no valid AP Score Tracker records found.");
          return;
        }

        const confirmed = window.confirm(
          `Import ${validRecords.length} records? Existing records will be kept.`
        );
        if (!confirmed) return;

        setRecords((current) => {
          const existingIds = new Set(current.map((record) => record.id));
          const newRecords = validRecords.filter(
            (record) => !existingIds.has(record.id)
          );
          return [...current, ...newRecords];
        });
        setStatusMessage(`${validRecords.length} records imported.`);
      } catch {
        setFormError("Import failed: choose a valid JSON backup file.");
      }
    };
    reader.readAsText(file);
  }

  return (
    <section id="tracker" className="py-20 lg:py-28 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <p className="text-sm text-accent-teal uppercase tracking-wider font-medium mb-3">
              Live Tracker
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
              Track your first practice test
            </h2>
            <p className="mt-3 text-text-secondary max-w-2xl">
              Enter raw scores, save the attempt, and watch your local progress
              history build up in this browser. Scores are estimates for trend
              tracking, not official predictions.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <label className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-button border border-border bg-surface px-5 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-surface/80">
              <Download size={16} className="rotate-180" />
              Import JSON
              <input
                type="file"
                accept="application/json,.json"
                className="sr-only"
                onChange={importJson}
              />
            </label>
            <Button variant="secondary" className="gap-2" onClick={exportJson}>
              <Download size={16} />
              Export JSON
            </Button>
            <Button variant="ghost" className="gap-2" onClick={clearSubject}>
              <RotateCcw size={16} />
              Clear Subject
            </Button>
            <Button variant="ghost" className="gap-2" onClick={clearAllData}>
              <Trash2 size={16} />
              Clear All Data
            </Button>
          </div>
        </div>

        {(formError || statusMessage) && (
          <div
            className={`mb-6 rounded-card border px-4 py-3 text-sm ${
              formError
                ? "border-destructive/40 bg-destructive/10 text-red-200"
                : "border-accent-teal/30 bg-accent-teal/10 text-accent-teal"
            }`}
          >
            {formError || statusMessage}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <div className="space-y-6">
            <Panel>
              <label className="block text-sm font-medium text-text-primary mb-3">
                Subject
              </label>
              <div className="grid grid-cols-2 gap-2">
                {subjects.map((subject) => (
                  <button
                    key={subject.id}
                    className={`min-h-11 rounded-button border px-3 text-sm transition-colors ${
                      selectedSubjectId === subject.id
                        ? "border-accent-teal bg-accent-teal/10 text-accent-teal"
                        : "border-border bg-background text-text-secondary hover:text-text-primary"
                    }`}
                    onClick={() => setSelectedSubjectId(subject.id)}
                  >
                    {subject.shortName}
                  </button>
                ))}
              </div>
            </Panel>

            <Panel>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-xl font-semibold text-text-primary">
                  Score Input
                </h3>
                <span className="rounded-tag bg-accent-teal/10 px-2 py-1 text-xs text-accent-teal">
                  Estimate {apScore}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <NumberField
                  label={`MCQ / ${selectedSubject.mcqMax}`}
                  value={mcqScore}
                  max={selectedSubject.mcqMax}
                  onChange={setMcqScore}
                />
                <NumberField
                  label={`FRQ / ${selectedSubject.frqMax}`}
                  value={frqScore}
                  max={selectedSubject.frqMax}
                  onChange={setFrqScore}
                />
              </div>

              <div className="mt-5 rounded-card border border-border bg-background p-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-text-secondary">Composite</span>
                  <span className="font-display text-3xl font-bold text-text-primary">
                    {totalPercent}%
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-accent-teal"
                    style={{ width: `${totalPercent}%` }}
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Notes
                </label>
                <textarea
                  className="min-h-20 w-full rounded-button border border-border bg-background px-3 py-2 text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary focus:border-accent-teal"
                  placeholder="Optional: test source, timing, what felt hard..."
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                />
              </div>

              <Button className="mt-5 w-full gap-2" onClick={saveRecord}>
                <Plus size={16} />
                Save Practice Test
              </Button>
            </Panel>
          </div>

          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <MetricCard
                icon={<BarChart3 size={18} />}
                label="Saved Tests"
                value={String(subjectRecords.length)}
              />
              <MetricCard
                icon={<Flame size={18} />}
                label="Latest Score"
                value={latestRecord ? String(latestRecord.apScore) : "-"}
              />
              <MetricCard
                icon={<Download size={18} />}
                label="Latest Composite"
                value={latestRecord ? `${latestRecord.totalPercent}%` : "-"}
              />
            </div>

            <Panel>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl font-semibold text-text-primary">
                    Progress Curve
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {selectedSubject.shortName} score trend across saved tests
                  </p>
                </div>
              </div>

              <div className="h-72">
                {chartData.length ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00E5CC" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="#00E5CC" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#1E1E28" vertical={false} />
                      <XAxis dataKey="name" stroke="#8A8F98" tickLine={false} />
                      <YAxis
                        domain={[1, 5]}
                        ticks={[1, 2, 3, 4, 5]}
                        stroke="#8A8F98"
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "#141419",
                          border: "1px solid #1E1E28",
                          borderRadius: 8,
                          color: "#E8ECF0",
                        }}
                        labelStyle={{ color: "#E8ECF0" }}
                      />
                      <Area
                        type="monotone"
                        dataKey="apScore"
                        stroke="#00E5CC"
                        strokeWidth={3}
                        fill="url(#scoreFill)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <EmptyState text="Save a practice test to draw your progress curve." />
                )}
              </div>
            </Panel>

            <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
              <Panel>
                <h3 className="font-display text-xl font-semibold text-text-primary mb-2">
                  Topic Heatmap
                </h3>
                <p className="text-sm text-text-secondary mb-5">
                  Set topic accuracy for this attempt. Saved tests roll into the
                  average heatmap.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {selectedSubject.topics.map((topic) => (
                    <label key={topic.id} className="block">
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="text-sm text-text-primary">{topic.name}</span>
                        <span className="text-xs text-text-secondary">
                          {topicScores[topic.id] ?? 0}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={topicScores[topic.id] ?? 0}
                        onChange={(event) =>
                          setTopicScores((current) => ({
                            ...current,
                            [topic.id]: Number(event.target.value),
                          }))
                        }
                        className="w-full accent-accent-teal"
                      />
                    </label>
                  ))}
                </div>
              </Panel>

              <Panel>
                <h3 className="font-display text-xl font-semibold text-text-primary mb-5">
                  Average Strength
                </h3>
                <div className="space-y-3">
                  {averageTopicScores.map((topic) => (
                    <div key={topic.id}>
                      <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                        <span className="text-text-secondary">{topic.name}</span>
                        <span className="text-text-primary">{topic.average}%</span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-tag bg-muted">
                        <div
                          className={`h-full ${heatColor(topic.average)}`}
                          style={{ width: `${topic.average}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Panel>
            </div>

            <Panel>
              <h3 className="font-display text-xl font-semibold text-text-primary mb-5">
                History
              </h3>
              {subjectRecords.length ? (
                <div className="space-y-3">
                  {[...subjectRecords].reverse().map((record, index) => (
                    <div
                      key={record.id}
                      className="grid gap-3 rounded-card border border-border bg-background p-4 sm:grid-cols-[1fr_auto]"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-display text-lg font-semibold text-text-primary">
                            Practice Test {subjectRecords.length - index}
                          </span>
                          <span className="rounded-tag bg-accent-teal/10 px-2 py-1 text-xs text-accent-teal">
                            AP {record.apScore}
                          </span>
                          <span className="text-sm text-text-secondary">
                            {dateFormatter.format(new Date(record.date))}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-text-secondary">
                          MCQ {record.mcqScore}/{selectedSubject.mcqMax} · FRQ{" "}
                          {record.frqScore}/{selectedSubject.frqMax} · Composite{" "}
                          {record.totalPercent}%
                        </p>
                        {record.notes && (
                          <p className="mt-2 text-sm text-text-primary">
                            {record.notes}
                          </p>
                        )}
                      </div>
                      <button
                        className="inline-flex h-10 w-10 items-center justify-center rounded-button text-text-secondary transition-colors hover:bg-surface hover:text-text-primary"
                        onClick={() => deleteRecord(record.id)}
                        aria-label="Delete record"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState text="No saved attempts for this subject yet." />
              )}
            </Panel>
          </div>
        </div>
      </div>
    </section>
  );
}

function isExamRecord(value: unknown): value is ExamRecord {
  if (!value || typeof value !== "object") return false;

  const record = value as Partial<ExamRecord>;
  const knownSubject = subjects.some((subject) => subject.id === record.subjectId);

  return (
    typeof record.id === "string" &&
    knownSubject &&
    typeof record.date === "string" &&
    typeof record.mcqScore === "number" &&
    typeof record.frqScore === "number" &&
    typeof record.totalPercent === "number" &&
    typeof record.apScore === "number" &&
    record.apScore >= 1 &&
    record.apScore <= 5 &&
    Boolean(record.topicScores) &&
    typeof record.topicScores === "object"
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-card border border-border bg-surface p-5 lg:p-6">
      {children}
    </div>
  );
}

function NumberField({
  label,
  value,
  max,
  onChange,
}: {
  label: string;
  value: string;
  max: number;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-text-primary">
        {label}
      </span>
      <input
        type="number"
        min="0"
        max={max}
        inputMode="numeric"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-button border border-border bg-background px-3 text-text-primary outline-none transition-colors placeholder:text-text-secondary focus:border-accent-teal"
        placeholder="0"
      />
    </label>
  );
}

function MetricCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-card border border-border bg-surface p-5">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-button bg-accent-teal/10 text-accent-teal">
        {icon}
      </div>
      <p className="text-sm text-text-secondary">{label}</p>
      <p className="font-display text-3xl font-bold text-text-primary">{value}</p>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex h-full min-h-40 items-center justify-center rounded-card border border-dashed border-border bg-background px-4 text-center text-sm text-text-secondary">
      {text}
    </div>
  );
}

function heatColor(value: number) {
  if (value >= 80) return "bg-accent-teal";
  if (value >= 65) return "bg-accent-teal/70";
  if (value >= 50) return "bg-accent-amber";
  return "bg-destructive";
}
