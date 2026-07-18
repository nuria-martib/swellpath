import { create } from 'zustand';

import { assessSurfer, generateCoachFeedback, type AssessmentAnswers } from './assessment';
import { bilt } from './backend';
import type { CoachFeedback, SkillLevel, SkillRating, SubmissionStatus } from './types';
import type { CommunitySpot, Submission, SurferProfile, SurfSession, SurfSpot } from './types';

interface SurfState {
  /** true once cloud data has been loaded (or confirmed empty) for the user */
  hydrated: boolean;
  userId: string | null;
  profile: SurferProfile | null;
  completedSteps: string[];
  submissions: Submission[];
  sessions: SurfSession[];
  spots: SurfSpot[];
  showCommunity: boolean;

  loadForUser: (userId: string) => Promise<void>;
  clear: () => void;

  completeOnboarding: (answers: AssessmentAnswers) => Promise<void>;
  resetProfile: () => Promise<void>;

  toggleStep: (stepId: string) => void;
  isStepDone: (stepId: string) => boolean;

  addSubmission: (packId: string, videoUri: string) => Promise<Submission | null>;
  gradeSubmission: (submissionId: string) => void;
  submissionsForPack: (packId: string) => Submission[];

  addSession: (session: Omit<SurfSession, 'id'>) => Promise<void>;
  updateSession: (id: string, patch: Omit<SurfSession, 'id'>) => Promise<void>;
  removeSession: (id: string) => Promise<void>;

  addSpot: (spot: Omit<SurfSpot, 'id' | 'addedAt' | 'sessions'>) => Promise<void>;
  removeSpot: (id: string) => Promise<void>;
  setShowCommunity: (v: boolean) => void;
}

export const MAX_ATTEMPTS = 3;

interface ProfileRow {
  user_id: string;
  name: string;
  years_surfing: number;
  surf_frequency: number;
  pop_up_confidence: number;
  bottom_turn: SkillRating;
  cutback: SkillRating;
  top_turn: SkillRating;
  air: SkillRating;
  home_break: string | null;
  level: SkillLevel;
  recommended_pack_id: string;
  completed_steps: string[];
  show_community: boolean;
  created_at: string;
}

interface SessionRow {
  id: string;
  title: string;
  date: string;
  spot_name: string;
  duration_minutes: number;
  wave_count: number;
  rating: number;
  notes: string | null;
}

interface SpotRow {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  break_type: SurfSpot['breakType'];
  comment: string | null;
  sessions: number;
  added_at: string;
}

interface SubmissionRow {
  id: string;
  pack_id: string;
  video_uri: string;
  attempt: number;
  status: SubmissionStatus;
  feedback: CoachFeedback | null;
  created_at: string;
}

function rowToProfile(r: ProfileRow): SurferProfile {
  return {
    name: r.name,
    yearsSurfing: r.years_surfing,
    surfFrequency: r.surf_frequency,
    popUpConfidence: r.pop_up_confidence,
    bottomTurn: r.bottom_turn,
    cutback: r.cutback,
    topTurn: r.top_turn,
    air: r.air,
    homeBreak: r.home_break ?? undefined,
    createdAt: r.created_at,
    level: r.level,
    recommendedPackId: r.recommended_pack_id,
  };
}

export const useSurfStore = create<SurfState>()((set, get) => ({
  hydrated: false,
  userId: null,
  profile: null,
  completedSteps: [],
  submissions: [],
  sessions: [],
  spots: [],
  showCommunity: true,

  loadForUser: async (userId) => {
    set({ userId, hydrated: false });

    const [profileRes, sessionsRes, spotsRes, submissionsRes] = await Promise.all([
      bilt.from('profiles').select('*').eq('user_id', userId).maybeSingle(),
      bilt
        .from('surf_sessions')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false }),
      bilt
        .from('surf_spots')
        .select('*')
        .eq('user_id', userId)
        .order('added_at', { ascending: false }),
      bilt
        .from('submissions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true }),
    ]);

    // bilt.from(...).select() returns untyped data; these interfaces define the known shape.
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- backend client data is untyped
    const profileRow = profileRes.data as ProfileRow | null;
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- backend client data is untyped
    const sessionRows = (sessionsRes.data ?? []) as SessionRow[];
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- backend client data is untyped
    const spotRows = (spotsRes.data ?? []) as SpotRow[];
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion -- backend client data is untyped
    const submissionRows = (submissionsRes.data ?? []) as SubmissionRow[];

    set({
      profile: profileRow ? rowToProfile(profileRow) : null,
      completedSteps: profileRow?.completed_steps ?? [],
      showCommunity: profileRow?.show_community ?? true,
      sessions: sessionRows.map((r) => ({
        id: r.id,
        title: r.title,
        date: r.date,
        spotName: r.spot_name,
        durationMinutes: r.duration_minutes,
        waveCount: r.wave_count,
        rating: r.rating,
        notes: r.notes ?? undefined,
      })),
      spots: spotRows.map((r) => ({
        id: r.id,
        name: r.name,
        latitude: r.latitude,
        longitude: r.longitude,
        breakType: r.break_type,
        comment: r.comment ?? undefined,
        sessions: r.sessions,
        addedAt: r.added_at,
      })),
      submissions: submissionRows.map((r) => ({
        id: r.id,
        packId: r.pack_id,
        videoUri: r.video_uri,
        attempt: r.attempt,
        createdAt: r.created_at,
        status: r.status,
        feedback: r.feedback ?? undefined,
      })),
      hydrated: true,
    });
  },

  clear: () =>
    set({
      hydrated: false,
      userId: null,
      profile: null,
      completedSteps: [],
      submissions: [],
      sessions: [],
      spots: [],
      showCommunity: true,
    }),

  completeOnboarding: async (answers) => {
    const userId = get().userId;
    if (!userId) return;
    const { level, recommendedPackId } = assessSurfer(answers);
    const createdAt = new Date().toISOString();
    const profile: SurferProfile = {
      name: answers.name,
      yearsSurfing: answers.yearsSurfing,
      surfFrequency: answers.surfFrequency,
      popUpConfidence: answers.popUpConfidence,
      bottomTurn: answers.bottomTurn,
      cutback: answers.cutback,
      topTurn: answers.topTurn,
      air: answers.air,
      homeBreak: answers.homeBreak,
      createdAt,
      level,
      recommendedPackId,
    };
    set({ profile });

    await bilt.from('profiles').upsert({
      user_id: userId,
      name: profile.name,
      years_surfing: profile.yearsSurfing,
      surf_frequency: profile.surfFrequency,
      pop_up_confidence: profile.popUpConfidence,
      bottom_turn: profile.bottomTurn,
      cutback: profile.cutback,
      top_turn: profile.topTurn,
      air: profile.air,
      home_break: profile.homeBreak ?? null,
      level: profile.level,
      recommended_pack_id: profile.recommendedPackId,
      completed_steps: [],
      show_community: get().showCommunity,
      created_at: createdAt,
      updated_at: createdAt,
    });
  },

  resetProfile: async () => {
    const userId = get().userId;
    set({ profile: null, completedSteps: [], submissions: [] });
    if (!userId) return;
    await Promise.all([
      bilt.from('profiles').delete().eq('user_id', userId),
      bilt.from('submissions').delete().eq('user_id', userId),
    ]);
  },

  toggleStep: (stepId) => {
    const userId = get().userId;
    const done = get().completedSteps;
    const next = done.includes(stepId) ? done.filter((s) => s !== stepId) : [...done, stepId];
    set({ completedSteps: next });
    if (userId) {
      void bilt.from('profiles').update({ completed_steps: next }).eq('user_id', userId);
    }
  },

  isStepDone: (stepId) => get().completedSteps.includes(stepId),

  addSubmission: async (packId, videoUri) => {
    const userId = get().userId;
    if (!userId) return null;
    const existing = get().submissions.filter((s) => s.packId === packId);
    if (existing.length >= MAX_ATTEMPTS) return null;
    const attempt = existing.length + 1;
    const createdAt = new Date().toISOString();

    const { data, error } = await bilt
      .from('submissions')
      .insert({
        user_id: userId,
        pack_id: packId,
        video_uri: videoUri,
        attempt,
        status: 'reviewing',
        created_at: createdAt,
      })
      .select('id')
      .single();

    if (error || !data) return null;

    const submission: Submission = {
      id: data.id,
      packId,
      videoUri,
      attempt,
      createdAt,
      status: 'reviewing' satisfies SubmissionStatus,
    };
    set({ submissions: [...get().submissions, submission] });
    return submission;
  },

  gradeSubmission: (submissionId) => {
    const userId = get().userId;
    const target = get().submissions.find((s) => s.id === submissionId);
    if (!target || target.status !== 'reviewing') return;
    const feedback = generateCoachFeedback(target.packId, target.attempt);
    set({
      submissions: get().submissions.map((s) =>
        s.id === submissionId ? { ...s, status: 'graded', feedback } : s,
      ),
    });
    if (userId) {
      void bilt.from('submissions').update({ status: 'graded', feedback }).eq('id', submissionId);
    }
  },

  submissionsForPack: (packId) =>
    get()
      .submissions.filter((s) => s.packId === packId)
      .sort((a, b) => a.attempt - b.attempt),

  addSession: async (session) => {
    const userId = get().userId;
    if (!userId) return;
    const { data, error } = await bilt
      .from('surf_sessions')
      .insert({
        user_id: userId,
        title: session.title,
        date: session.date,
        spot_name: session.spotName,
        duration_minutes: session.durationMinutes,
        wave_count: session.waveCount,
        rating: session.rating,
        notes: session.notes ?? null,
      })
      .select('id')
      .single();
    if (error || !data) return;
    set({ sessions: [{ ...session, id: data.id }, ...get().sessions] });
  },

  updateSession: async (id, patch) => {
    set({
      sessions: get().sessions.map((s) => (s.id === id ? { ...patch, id } : s)),
    });
    await bilt
      .from('surf_sessions')
      .update({
        title: patch.title,
        date: patch.date,
        spot_name: patch.spotName,
        duration_minutes: patch.durationMinutes,
        wave_count: patch.waveCount,
        rating: patch.rating,
        notes: patch.notes ?? null,
      })
      .eq('id', id);
  },

  removeSession: async (id) => {
    set({ sessions: get().sessions.filter((s) => s.id !== id) });
    await bilt.from('surf_sessions').delete().eq('id', id);
  },

  addSpot: async (spot) => {
    const userId = get().userId;
    if (!userId) return;
    const addedAt = new Date().toISOString();
    const { data, error } = await bilt
      .from('surf_spots')
      .insert({
        user_id: userId,
        name: spot.name,
        latitude: spot.latitude,
        longitude: spot.longitude,
        break_type: spot.breakType,
        comment: spot.comment ?? null,
        sessions: 1,
        added_at: addedAt,
      })
      .select('id')
      .single();
    if (error || !data) return;
    set({
      spots: [{ ...spot, id: data.id, addedAt, sessions: 1 }, ...get().spots],
    });
  },

  removeSpot: async (id) => {
    set({ spots: get().spots.filter((s) => s.id !== id) });
    await bilt.from('surf_spots').delete().eq('id', id);
  },

  setShowCommunity: (v) => {
    const userId = get().userId;
    set({ showCommunity: v });
    if (userId) {
      void bilt.from('profiles').update({ show_community: v }).eq('user_id', userId);
    }
  },
}));

export type { CommunitySpot };
