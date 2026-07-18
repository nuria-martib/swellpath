import type { CoachFeedback, SkillLevel } from './types';

export interface AssessmentAnswers {
  name: string;
  yearsSurfing: number;
  popUpConfidence: number; // 1-5
  canBottomTurn: boolean;
  canCutback: boolean;
  canTopTurn: boolean;
  hasLandedAir: boolean;
  homeBreak?: string;
}

export interface AssessmentResult {
  level: SkillLevel;
  recommendedPackId: string;
}

/**
 * Recommends the first maneuver pack the surfer has NOT yet mastered,
 * and derives an overall skill level from their answers.
 */
export function assessSurfer(a: AssessmentAnswers): AssessmentResult {
  let recommendedPackId = 'pop-up';

  if (a.popUpConfidence < 3 || a.yearsSurfing < 1) {
    recommendedPackId = 'pop-up';
  } else if (!a.canBottomTurn) {
    recommendedPackId = 'bottom-turn';
  } else if (!a.canCutback) {
    recommendedPackId = 'cutback';
  } else if (!a.canTopTurn) {
    recommendedPackId = 'top-turn';
  } else if (!a.hasLandedAir) {
    recommendedPackId = 'air';
  } else {
    recommendedPackId = 'air';
  }

  // Score-based level
  let score = 0;
  if (a.yearsSurfing >= 1) score += 1;
  if (a.yearsSurfing >= 3) score += 1;
  if (a.popUpConfidence >= 4) score += 1;
  if (a.canBottomTurn) score += 1;
  if (a.canCutback) score += 1;
  if (a.canTopTurn) score += 1;
  if (a.hasLandedAir) score += 2;

  let level: SkillLevel = 'beginner';
  if (score >= 7) level = 'advanced';
  else if (score >= 5) level = 'intermediate';
  else if (score >= 2) level = 'improver';

  return { level, recommendedPackId };
}

const FEEDBACK_TEMPLATES: Record<string, Omit<CoachFeedback, 'grade'>[]> = {
  default: [
    {
      headline: 'Solid effort — the fundamentals are showing',
      strengths: ['Good commitment through the manoeuvre', 'Nice relaxed upper body'],
      improvements: [
        'Keep your eyes up and looking ahead',
        'Compress a touch deeper before you release',
      ],
      drill: 'Do 20 slow surfskate reps focusing only on where your head is pointing.',
    },
    {
      headline: 'Getting there — timing is the next unlock',
      strengths: ['Balanced stance', 'Committed to the wave'],
      improvements: ['Initiate a fraction earlier', 'Weight the rail more decisively'],
      drill: 'Film 5 more waves and self-mark the exact moment you start the movement.',
    },
    {
      headline: 'Big improvement — you are locking it in',
      strengths: ['Clean rail engagement', 'Confident, flowing motion'],
      improvements: ['Draw the arc out a little longer', 'Stay lower through the transition'],
      drill: 'Repeat this on your next 3 sessions to make it automatic.',
    },
  ],
};

/**
 * Produces deterministic-ish simulated coach feedback. Grade improves with attempt
 * number to reward iteration, with a small pseudo-random variation seeded by attempt.
 */
export function generateCoachFeedback(packId: string, attempt: number): CoachFeedback {
  const templates = FEEDBACK_TEMPLATES[packId] ?? FEEDBACK_TEMPLATES.default;
  const template = templates[Math.min(attempt - 1, templates.length - 1)];
  const baseGrade = 5 + attempt; // 6, 7, 8 across attempts
  const jitter = (packId.length + attempt * 3) % 2 === 0 ? 0 : 1;
  const grade = Math.min(10, baseGrade + jitter);
  return { grade, ...template };
}
