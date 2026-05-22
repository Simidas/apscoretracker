export type Topic = {
  id: string;
  name: string;
};

export type Subject = {
  id: string;
  name: string;
  shortName: string;
  mcqMax: number;
  frqMax: number;
  mcqWeight: number;
  frqWeight: number;
  topics: Topic[];
  thresholds: {
    score: 1 | 2 | 3 | 4 | 5;
    minPercent: number;
  }[];
};

export type TopicScores = Record<string, number>;

export type ExamRecord = {
  id: string;
  subjectId: string;
  date: string;
  mcqScore: number;
  frqScore: number;
  totalPercent: number;
  apScore: 1 | 2 | 3 | 4 | 5;
  topicScores: TopicScores;
  notes?: string;
};

export const STORAGE_KEY = "apst_records";

export const subjects: Subject[] = [
  {
    id: "ap-lang",
    name: "AP English Language",
    shortName: "AP Lang",
    mcqMax: 45,
    frqMax: 18,
    mcqWeight: 45,
    frqWeight: 55,
    thresholds: [
      { score: 5, minPercent: 78 },
      { score: 4, minPercent: 64 },
      { score: 3, minPercent: 50 },
      { score: 2, minPercent: 36 },
      { score: 1, minPercent: 0 },
    ],
    topics: [
      { id: "rhetorical-situation", name: "Rhetorical Situation" },
      { id: "claims-evidence", name: "Claims & Evidence" },
      { id: "reasoning-organization", name: "Reasoning & Organization" },
      { id: "style", name: "Style" },
      { id: "synthesis", name: "Synthesis" },
    ],
  },
  {
    id: "ap-psych",
    name: "AP Psychology",
    shortName: "AP Psych",
    mcqMax: 75,
    frqMax: 14,
    mcqWeight: 67,
    frqWeight: 33,
    thresholds: [
      { score: 5, minPercent: 75 },
      { score: 4, minPercent: 62 },
      { score: 3, minPercent: 48 },
      { score: 2, minPercent: 34 },
      { score: 1, minPercent: 0 },
    ],
    topics: [
      { id: "biological-bases", name: "Biological Bases" },
      { id: "cognition", name: "Cognition" },
      { id: "development", name: "Development" },
      { id: "social", name: "Social Psychology" },
      { id: "disorders", name: "Clinical Psychology" },
    ],
  },
  {
    id: "ap-calc-ab",
    name: "AP Calculus AB",
    shortName: "Calc AB",
    mcqMax: 45,
    frqMax: 54,
    mcqWeight: 50,
    frqWeight: 50,
    thresholds: [
      { score: 5, minPercent: 70 },
      { score: 4, minPercent: 58 },
      { score: 3, minPercent: 44 },
      { score: 2, minPercent: 32 },
      { score: 1, minPercent: 0 },
    ],
    topics: [
      { id: "limits", name: "Limits" },
      { id: "derivatives", name: "Derivatives" },
      { id: "applications-derivatives", name: "Derivative Applications" },
      { id: "integrals", name: "Integrals" },
      { id: "applications-integrals", name: "Integral Applications" },
    ],
  },
  {
    id: "ap-bio",
    name: "AP Biology",
    shortName: "AP Bio",
    mcqMax: 60,
    frqMax: 24,
    mcqWeight: 50,
    frqWeight: 50,
    thresholds: [
      { score: 5, minPercent: 74 },
      { score: 4, minPercent: 60 },
      { score: 3, minPercent: 45 },
      { score: 2, minPercent: 32 },
      { score: 1, minPercent: 0 },
    ],
    topics: [
      { id: "chemistry-life", name: "Chemistry of Life" },
      { id: "cell-structure", name: "Cell Structure" },
      { id: "cellular-energetics", name: "Cellular Energetics" },
      { id: "genetics", name: "Genetics" },
      { id: "ecology", name: "Ecology" },
    ],
  },
  {
    id: "apush",
    name: "AP United States History",
    shortName: "APUSH",
    mcqMax: 55,
    frqMax: 36,
    mcqWeight: 40,
    frqWeight: 60,
    thresholds: [
      { score: 5, minPercent: 72 },
      { score: 4, minPercent: 58 },
      { score: 3, minPercent: 44 },
      { score: 2, minPercent: 31 },
      { score: 1, minPercent: 0 },
    ],
    topics: [
      { id: "period-1-2", name: "Periods 1-2" },
      { id: "period-3", name: "Period 3" },
      { id: "period-4", name: "Period 4" },
      { id: "period-5", name: "Period 5" },
      { id: "period-6-9", name: "Periods 6-9" },
    ],
  },
];

export function getSubject(subjectId: string) {
  return subjects.find((subject) => subject.id === subjectId) ?? subjects[0];
}

export function calculateTotalPercent(
  subject: Subject,
  mcqScore: number,
  frqScore: number
) {
  const clampedMcq = clamp(mcqScore, 0, subject.mcqMax);
  const clampedFrq = clamp(frqScore, 0, subject.frqMax);
  const mcqPercent = subject.mcqMax ? clampedMcq / subject.mcqMax : 0;
  const frqPercent = subject.frqMax ? clampedFrq / subject.frqMax : 0;
  const totalWeight = Math.max(subject.mcqWeight + subject.frqWeight, 1);
  const weightedPercent =
    ((mcqPercent * subject.mcqWeight + frqPercent * subject.frqWeight) /
      totalWeight) *
    100;

  return Math.round(weightedPercent);
}

export function calculateApScore(subject: Subject, totalPercent: number) {
  const match = subject.thresholds.find(
    (threshold) => totalPercent >= threshold.minPercent
  );

  return match?.score ?? 1;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
