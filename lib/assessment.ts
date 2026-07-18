import type { CoachFeedback, SkillLevel, SkillRating } from './types';

// Skill self-rating: 0 = not yet, 1 = inconsistently, 2 = yes consistently
export type { SkillRating };

export interface AssessmentAnswers {
  name: string;
  yearsSurfing: number;
  // How often they actually surf: 1 = a few times a year,
  // 2 = monthly, 3 = weekly / most weeks
  surfFrequency: number;
  popUpConfidence: number; // 1-5
  bottomTurn: SkillRating;
  cutback: SkillRating;
  topTurn: SkillRating;
  air: SkillRating;
  homeBreak?: string;
}

export interface AssessmentResult {
  level: SkillLevel;
  recommendedPackId: string;
}

/**
 * Recommends the first maneuver pack the surfer has NOT yet locked in,
 * and derives an overall skill level from their answers.
 *
 * Skill is driven mostly by demonstrated ability and consistency of practice,
 * not raw years — someone surfing weekly for a year usually out-skills someone
 * who surfs one week a year for five years. We combine years with frequency
 * into "effective experience" so time counts only when it's backed by mileage.
 */
export function assessSurfer(a: AssessmentAnswers): AssessmentResult {
  // Effective experience: years scaled by how often they surf.
  // freq 1 (few times/yr) ~= 0.3x, freq 2 (monthly) ~= 0.7x, freq 3 (weekly) = 1x.
  const freqWeight = a.surfFrequency >= 3 ? 1 : a.surfFrequency === 2 ? 0.7 : 0.3;
  const effectiveExperience = a.yearsSurfing * freqWeight;

  let recommendedPackId = 'pop-up';

  if (a.popUpConfidence < 3) {
    recommendedPackId = 'pop-up';
  } else if (a.bottomTurn < 2) {
    recommendedPackId = 'bottom-turn';
  } else if (a.cutback < 2) {
    recommendedPackId = 'cutback';
  } else if (a.topTurn < 2) {
    recommendedPackId = 'top-turn';
  } else {
    recommendedPackId = 'air';
  }

  // Score-based level. Demonstrated ability weighs more than time.
  let score = 0;
  if (effectiveExperience >= 1) score += 1;
  if (effectiveExperience >= 3) score += 1;
  if (a.popUpConfidence >= 4) score += 1;
  score += a.bottomTurn; // 0-2
  score += a.cutback; // 0-2
  score += a.topTurn; // 0-2
  score += a.air * 1.5; // 0-3, airs weigh most

  let level: SkillLevel = 'beginner';
  if (score >= 9) level = 'advanced';
  else if (score >= 6) level = 'intermediate';
  else if (score >= 3) level = 'improver';

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
