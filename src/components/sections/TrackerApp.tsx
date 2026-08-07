"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BarChart3,
  Cloud,
  Download,
  Flame,
  Lightbulb,
  LoaderCircle,
  LogIn,
  Plus,
  RotateCcw,
  Target,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  calculateApScore,
  calculateTotalPercent,
  ExamRecord,
  getSubject,
  subjects,
  TopicScores,
} from "@/lib/tracker-data";
import {
  ClientApiError,
  createRecord,
  fetchAccountSummary,
  fetchRecords,
  fetchTargetScores,
  removeRecord,
  updateTargetScore,
  type AccountSummary,
} from "@/lib/v2/client";

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
});

const clerkConfigured = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

function escapeCsvCell(value: string | number) {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function downloadFile(content: string, type: string, filename: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function trackEvent(name: string, props?: Record<string, string | number>) {
  const plausible = (
    window as typeof window & {
      plausible?: (event: string, options?: { props?: typeof props }) => void;
    }
  ).plausible;

  plausible?.(name, props ? { props } : undefined);
}

export default function TrackerApp() {
  if (!clerkConfigured) {
    return (
      <TrackerExperience
        isAuthLoaded
        isSignedIn={false}
        requestSignIn={() => {
          window.location.href = "/sign-in";
        }}
      />
    );
  }

  return <ConfiguredTrackerApp />;
}

function ConfiguredTrackerApp() {
  const { isLoaded, isSignedIn } = useUser();
  const clerk = useClerk();

  return (
    <TrackerExperience
      isAuthLoaded={isLoaded}
      isSignedIn={Boolean(isSignedIn)}
      requestSignIn={() =>
        clerk.openSignIn({
          fallbackRedirectUrl: "/tracker",
          signUpFallbackRedirectUrl: "/tracker",
        })
      }
    />
  );
}

type TrackerExperienceProps = {
  isAuthLoaded: boolean;
  isSignedIn: boolean;
  requestSignIn: () => void;
};

function TrackerExperience({
  isAuthLoaded,
  isSignedIn,
  requestSignIn,
}: TrackerExperienceProps) {
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0].id);
  const [records, setRecords] = useState<ExamRecord[]>([]);
  const [targets, setTargets] = useState<
    Record<string, 1 | 2 | 3 | 4 | 5>
  >({});
  const [account, setAccount] = useState<AccountSummary | null>(null);
  const [mcqScore, setMcqScore] = useState("");
  const [frqScore, setFrqScore] = useState("");
  const [notes, setNotes] = useState("");
  const [topicScores, setTopicScores] = useState<TopicScores>({});
  const [formError, setFormError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [targetScore, setTargetScoreState] = useState<1 | 2 | 3 | 4 | 5>(3);

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

  const studyTips = useMemo(() => {
    if (!subjectRecords.length) {
      return isSignedIn
        ? "Save a practice test to get personalized study tips."
        : "Sign in and save a practice test to get personalized study tips.";
    }

    const sorted = [...averageTopicScores].sort((a, b) => a.average - b.average);
    const weakest = sorted.slice(0, 2);
    const strongest = sorted.at(-1);

    let tip = `Your weakest areas are ${weakest[0].name} (${weakest[0].average}%)`;
    if (weakest[1]) {
      tip += ` and ${weakest[1].name} (${weakest[1].average}%)`;
    }
    tip += `. Focus your next study session on ${weakest[0].name}.`;

    if (latestRecord) {
      const gap = targetScore - latestRecord.apScore;
      if (gap > 0) {
        tip += ` You're ${gap} point${gap > 1 ? "s" : ""} away from your target AP ${targetScore}. Keep grinding!`;
      } else {
        tip += ` You're on track for your target! Maintain your strength in ${strongest?.name}.`;
      }
    }

    return tip;
  }, [
    averageTopicScores,
    subjectRecords.length,
    isSignedIn,
    latestRecord,
    targetScore,
  ]);

  const gapDisplay = useMemo(() => {
    if (!latestRecord) return "-";
    const gap = targetScore - latestRecord.apScore;
    if (gap > 0) return `+${gap}`;
    if (gap < 0) return `${gap}`;
    return "✓ Met";
  }, [latestRecord, targetScore]);

  useEffect(() => {
    if (!isAuthLoaded) {
      return;
    }

    if (!isSignedIn) {
      setRecords([]);
      setTargets({});
      setAccount(null);
      setIsDataLoading(false);
      return;
    }

    let cancelled = false;
    setIsDataLoading(true);
    setFormError("");

    Promise.all([
      fetchRecords(),
      fetchTargetScores(),
      fetchAccountSummary(),
    ])
      .then(([nextRecords, nextTargets, nextAccount]) => {
        if (cancelled) return;

        setRecords(nextRecords);
        setTargets(nextTargets);
        setAccount(nextAccount);
      })
      .catch((error) => {
        if (!cancelled) {
          setFormError(getErrorMessage(error, "Unable to load cloud data."));
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsDataLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [isAuthLoaded, isSignedIn]);

  useEffect(() => {
    setTopicScores(
      Object.fromEntries(selectedSubject.topics.map((topic) => [topic.id, 70]))
    );
    setTargetScoreState(targets[selectedSubject.id] ?? 3);
  }, [selectedSubject, targets]);

  function handleTargetChange(score: 1 | 2 | 3 | 4 | 5) {
    const previousScore = targetScore;
    setTargetScoreState(score);
    setTargets((current) => ({ ...current, [selectedSubjectId]: score }));

    if (!isSignedIn) {
      setStatusMessage("Sign in to save your target score across devices.");
      return;
    }

    void updateTargetScore(selectedSubjectId, score)
      .then(() => {
        setStatusMessage("Target score synced.");
      })
      .catch((error) => {
        setTargetScoreState(previousScore);
        setTargets((current) => ({
          ...current,
          [selectedSubjectId]: previousScore,
        }));
        setFormError(getErrorMessage(error, "Unable to save target score."));
      });
  }

  async function refreshAccount() {
    const nextAccount = await fetchAccountSummary();
    setAccount(nextAccount);
  }

  async function saveRecord() {
    setFormError("");
    setStatusMessage("");

    if (!isSignedIn) {
      requestSignIn();
      return;
    }

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

    setIsMutating(true);

    try {
      const record = await createRecord({
        subjectId: selectedSubjectId,
        date: new Date().toISOString(),
        mcqScore: numericMcq,
        frqScore: numericFrq,
        topicScores,
        notes: notes.trim() || undefined,
      });

      setRecords((current) => [...current, record]);
      setMcqScore("");
      setFrqScore("");
      setNotes("");
      setStatusMessage("Practice test saved to the cloud.");
      trackEvent("Practice Test Saved", { subject: selectedSubjectId });
      await refreshAccount();
    } catch (error) {
      setFormError(getErrorMessage(error, "Unable to save practice test."));
    } finally {
      setIsMutating(false);
    }
  }

  async function deleteRecord(id: string) {
    const confirmed = window.confirm("Delete this practice test record?");
    if (!confirmed) return;

    setIsMutating(true);
    setFormError("");

    try {
      await removeRecord(id);
      setRecords((current) => current.filter((record) => record.id !== id));
      setStatusMessage("Practice test deleted.");
      await refreshAccount();
    } catch (error) {
      setFormError(getErrorMessage(error, "Unable to delete practice test."));
    } finally {
      setIsMutating(false);
    }
  }

  async function clearSubject() {
    if (!isSignedIn) {
      requestSignIn();
      return;
    }

    const confirmed = window.confirm(
      `Clear all saved records for ${selectedSubject.shortName}?`
    );
    if (!confirmed) return;

    await deleteCloudRecords(
      subjectRecords,
      `${selectedSubject.shortName} records cleared.`
    );
  }

  async function clearAllData() {
    if (!isSignedIn) {
      requestSignIn();
      return;
    }

    const confirmed = window.confirm(
      "Delete all AP Score Tracker records from your cloud account?"
    );
    if (!confirmed) return;

    await deleteCloudRecords(records, "All cloud tracker records cleared.");
  }

  async function deleteCloudRecords(
    recordsToDelete: ExamRecord[],
    successMessage: string
  ) {
    if (!recordsToDelete.length) {
      setStatusMessage("There are no saved records to clear.");
      return;
    }

    setIsMutating(true);
    setFormError("");

    try {
      await Promise.all(
        recordsToDelete.map((record) => removeRecord(record.id))
      );
      const deletedIds = new Set(recordsToDelete.map((record) => record.id));
      setRecords((current) =>
        current.filter((record) => !deletedIds.has(record.id))
      );
      setStatusMessage(successMessage);
      await refreshAccount();
    } catch (error) {
      setFormError(getErrorMessage(error, "Unable to clear cloud records."));
      const latestRecords = await fetchRecords().catch(() => null);
      if (latestRecords) {
        setRecords(latestRecords);
      }
    } finally {
      setIsMutating(false);
    }
  }

  function exportJson() {
    if (!isSignedIn) {
      requestSignIn();
      return;
    }

    const data = JSON.stringify(records, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ap-score-tracker-records.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  function exportCsv() {
    if (!isSignedIn) {
      requestSignIn();
      return;
    }

    const headers = [
      "date",
      "subject",
      "mcq_score",
      "frq_score",
      "total_percent",
      "ap_score",
      "notes",
    ];
    const rows = records.map((record) => [
      record.date,
      record.subjectId,
      record.mcqScore,
      record.frqScore,
      record.totalPercent,
      record.apScore,
      record.notes ?? "",
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCsvCell).join(","))
      .join("\n");

    downloadFile(
      csv,
      "text/csv;charset=utf-8",
      "ap-score-tracker-records.csv"
    );
  }

  function importJson(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    setFormError("");
    setStatusMessage("");

    if (!file) return;

    if (!isSignedIn) {
      requestSignIn();
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const importedRecords: ExamRecord[] = [];

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

        setIsMutating(true);

        for (const record of validRecords) {
          const importedRecord = await createRecord({
            subjectId: record.subjectId,
            date: record.date,
            mcqScore: record.mcqScore,
            frqScore: record.frqScore,
            topicScores: record.topicScores,
            notes: record.notes,
          });
          importedRecords.push(importedRecord);
        }

        setRecords((current) => [...current, ...importedRecords]);
        setStatusMessage(`${importedRecords.length} records imported to cloud.`);
        await refreshAccount();
      } catch (error) {
        if (importedRecords.length) {
          setRecords((current) => [...current, ...importedRecords]);
          void refreshAccount();
        }

        const prefix = importedRecords.length
          ? `${importedRecords.length} records imported before the error. `
          : "Import failed. ";
        setFormError(
          `${prefix}${getErrorMessage(
            error,
            "Check the backup and your plan limit."
          )}`
        );
      } finally {
        setIsMutating(false);
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
              Enter raw scores, save the attempt, and follow your progress
              across devices. Scores are estimates for trend tracking, not
              official predictions.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm">
              {!isAuthLoaded || isDataLoading ? (
                <>
                  <LoaderCircle
                    size={16}
                    className="animate-spin text-text-secondary"
                  />
                  <span className="text-text-secondary">
                    Loading your tracker...
                  </span>
                </>
              ) : isSignedIn ? (
                <>
                  <Cloud size={16} className="text-accent-teal" />
                  <span className="text-accent-teal">
                    Cloud sync on
                    {account?.limits.recordsPerSubject
                      ? ` · ${subjectRecords.length}/${account.limits.recordsPerSubject} saved for ${selectedSubject.shortName}`
                      : ""}
                  </span>
                </>
              ) : (
                <>
                  <LogIn size={16} className="text-accent-amber" />
                  <span className="text-accent-amber">
                    Preview mode · sign in to save and view history
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {isSignedIn ? (
              <label
                className={`inline-flex h-10 items-center justify-center gap-2 rounded-button border border-border bg-surface px-5 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-surface/80 ${
                  isMutating
                    ? "pointer-events-none cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }`}
              >
                <Download size={16} className="rotate-180" />
                Import JSON
                <input
                  type="file"
                  accept="application/json,.json"
                  className="sr-only"
                  onChange={importJson}
                  disabled={isMutating}
                />
              </label>
            ) : (
              <Button
                variant="secondary"
                className="gap-2"
                onClick={requestSignIn}
                disabled={!isAuthLoaded}
              >
                <LogIn size={16} />
                Sign In to Import
              </Button>
            )}
            <Button
              variant="secondary"
              className="gap-2"
              onClick={exportJson}
              disabled={!isAuthLoaded || isMutating}
            >
              <Download size={16} />
              Export JSON
            </Button>
            <Button
              variant="secondary"
              className="gap-2"
              onClick={exportCsv}
              disabled={!isAuthLoaded || isMutating}
            >
              <Download size={16} />
              Export CSV
            </Button>
            <Button
              variant="ghost"
              className="gap-2"
              onClick={clearSubject}
              disabled={!isAuthLoaded || isMutating}
            >
              <RotateCcw size={16} />
              Clear Subject
            </Button>
            <Button
              variant="ghost"
              className="gap-2"
              onClick={clearAllData}
              disabled={!isAuthLoaded || isMutating}
            >
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
                  Target AP Score
                </label>
                <select
                  value={targetScore}
                  onChange={(e) =>
                    handleTargetChange(Number(e.target.value) as 1 | 2 | 3 | 4 | 5)
                  }
                  className="h-11 w-full rounded-button border border-border bg-background px-3 text-text-primary outline-none transition-colors focus:border-accent-teal"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
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

              <Button
                className="mt-5 w-full gap-2"
                onClick={saveRecord}
                disabled={!isAuthLoaded || isDataLoading || isMutating}
              >
                {isMutating ? (
                  <LoaderCircle size={16} className="animate-spin" />
                ) : isSignedIn ? (
                  <Plus size={16} />
                ) : (
                  <LogIn size={16} />
                )}
                {isMutating
                  ? "Saving..."
                  : isSignedIn
                    ? "Save Practice Test"
                    : "Sign In to Save"}
              </Button>
            </Panel>
          </div>

          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-4">
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
              <MetricCard
                icon={<Target size={18} />}
                label="Gap to Target"
                value={gapDisplay}
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
                      <ReferenceLine
                        y={targetScore}
                        stroke="#FFB800"
                        strokeDasharray="6 4"
                        strokeWidth={2}
                        label={{
                          value: `Target: AP ${targetScore}`,
                          position: "right",
                          fill: "#FFB800",
                          fontSize: 12,
                        }}
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
                  <EmptyState
                    text={
                      isSignedIn
                        ? "Save a practice test to draw your progress curve."
                        : "Sign in to save attempts and draw your progress curve."
                    }
                  />
                )}
              </div>
            </Panel>

            <Panel>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-button bg-accent-amber/10 text-accent-amber">
                  <Lightbulb size={18} />
                </div>
                <h3 className="font-display text-xl font-semibold text-text-primary">
                  Study Tips
                </h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                {studyTips}
              </p>
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
                <EmptyState
                  text={
                    isDataLoading
                      ? "Loading saved attempts..."
                      : isSignedIn
                        ? "No saved attempts for this subject yet."
                        : "Sign in to save attempts and view your history."
                  }
                />
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

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof ClientApiError ? error.message : fallback;
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
