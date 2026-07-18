export type SkillLevel = 'beginner' | 'improver' | 'intermediate' | 'advanced';

/** self-rating for a manoeuvre: 0 not yet, 1 inconsistently, 2 yes consistently */
export type SkillRating = 0 | 1 | 2;

export interface SurferProfile {
  name: string;
  yearsSurfing: number;
  /** how often they surf: 1 few times/yr, 2 monthly, 3 weekly */
  surfFrequency: number;
  /** self-reported confidence in the pop up, 1-5 */
  popUpConfidence: number;
  bottomTurn: SkillRating;
  cutback: SkillRating;
  topTurn: SkillRating;
  air: SkillRating;
  homeBreak?: string;
  createdAt: string;
  level: SkillLevel;
  recommendedPackId: string;
}

export type StepKind = 'analyse' | 'surfskate' | 'water';

export interface PackStep {
  id: string;
  kind: StepKind;
  title: string;
  duration: string;
  /** generated illustrative image asset key */
  image: string;
  summary: string;
  cues: string[];
  /** YouTube video id (the part after v=) for an optional "Watch" tutorial */
  videoId?: string;
}

/** A single photo + description in an in-water sequential guide. */
export interface GuideStep {
  /** image asset key registered in lib/images.ts */
  image: string;
  title: string;
  description: string;
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
  /** optional sequential photo guide (e.g. the 8-step pop-up breakdown) */
  guide?: GuideStep[];
  /** heading for the dry-land training section (defaults to the surfskate wording) */
  landSectionTitle?: string;
  landSectionSubtitle?: string;
  /** heading for the in-water photo guide section (defaults to the pop-up wording) */
  guideSectionTitle?: string;
  guideSectionSubtitle?: string;
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
  title: string;
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
