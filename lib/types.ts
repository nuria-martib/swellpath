export type SkillLevel = 'beginner' | 'improver' | 'intermediate' | 'advanced';

export interface SurferProfile {
  name: string;
  yearsSurfing: number;
  /** self-reported confidence in the pop up, 1-5 */
  popUpConfidence: number;
  canBottomTurn: boolean;
  canCutback: boolean;
  canTopTurn: boolean;
  hasLandedAir: boolean;
  homeBreak?: string;
  createdAt: string;
  level: SkillLevel;
  recommendedPackId: string;
}

export type StepKind = 'surfskate' | 'water';

export interface PackStep {
  id: string;
  kind: StepKind;
  title: string;
  duration: string;
  /** generated illustrative image asset key */
  image: string;
  summary: string;
  cues: string[];
}

export interface Pack {
  id: string;
  title: string;
  maneuver: string;
  tagline: string;
  level: SkillLevel;
  /** ordinal difficulty used for ordering + recommendation */
  order: number;
  accentColor: string;
  heroImage: string;
  overview: string;
  prerequisites: string[];
  steps: PackStep[];
}

export type SubmissionStatus = 'reviewing' | 'graded';

export interface CoachFeedback {
  grade: number; // 1-10
  headline: string;
  strengths: string[];
  improvements: string[];
  drill: string;
}

export interface Submission {
  id: string;
  packId: string;
  videoUri: string;
  attempt: number; // 1-3
  createdAt: string;
  status: SubmissionStatus;
  feedback?: CoachFeedback;
}

export interface SurfSession {
  id: string;
  date: string; // ISO date (yyyy-mm-dd)
  spotName: string;
  durationMinutes: number;
  waveCount: number;
  rating: number; // 1-5
  notes?: string;
}

export interface SurfSpot {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  breakType: 'beach' | 'point' | 'reef';
  comment?: string;
  sessions: number;
  addedAt: string;
}

export interface CommunitySpot {
  id: string;
  surfer: string;
  spotName: string;
  latitude: number;
  longitude: number;
  comment: string;
  rating: number;
}
