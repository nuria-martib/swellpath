import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { assessSurfer, generateCoachFeedback, type AssessmentAnswers } from './assessment';
import type { SubmissionStatus } from './types';
import type { CommunitySpot, Submission, SurferProfile, SurfSession, SurfSpot } from './types';

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

interface SurfState {
  hydrated: boolean;
  profile: SurferProfile | null;
  completedSteps: string[];
  submissions: Submission[];
  sessions: SurfSession[];
  spots: SurfSpot[];
  showCommunity: boolean;

  completeOnboarding: (answers: AssessmentAnswers) => void;
  resetProfile: () => void;

  toggleStep: (stepId: string) => void;
  isStepDone: (stepId: string) => boolean;

  addSubmission: (packId: string, videoUri: string) => Submission | null;
  gradeSubmission: (submissionId: string) => void;
  submissionsForPack: (packId: string) => Submission[];

  addSession: (session: Omit<SurfSession, 'id'>) => void;
  removeSession: (id: string) => void;

  addSpot: (spot: Omit<SurfSpot, 'id' | 'addedAt' | 'sessions'>) => void;
  removeSpot: (id: string) => void;
  setShowCommunity: (v: boolean) => void;
}

export const MAX_ATTEMPTS = 3;

export const useSurfStore = create<SurfState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      profile: null,
      completedSteps: [],
      submissions: [],
      sessions: [],
      spots: [],
      showCommunity: true,

      completeOnboarding: (answers) => {
        const { level, recommendedPackId } = assessSurfer(answers);
        const profile: SurferProfile = {
          name: answers.name,
          yearsSurfing: answers.yearsSurfing,
          popUpConfidence: answers.popUpConfidence,
          canBottomTurn: answers.canBottomTurn,
          canCutback: answers.canCutback,
          canTopTurn: answers.canTopTurn,
          hasLandedAir: answers.hasLandedAir,
          homeBreak: answers.homeBreak,
          createdAt: new Date().toISOString(),
          level,
          recommendedPackId,
        };
        set({ profile });
      },

      resetProfile: () =>
        set({
          profile: null,
          completedSteps: [],
          submissions: [],
        }),

      toggleStep: (stepId) => {
        const done = get().completedSteps;
        set({
          completedSteps: done.includes(stepId)
            ? done.filter((s) => s !== stepId)
            : [...done, stepId],
        });
      },

      isStepDone: (stepId) => get().completedSteps.includes(stepId),

      addSubmission: (packId, videoUri) => {
        const existing = get().submissions.filter((s) => s.packId === packId);
        if (existing.length >= MAX_ATTEMPTS) return null;
        const submission: Submission = {
          id: uid(),
          packId,
          videoUri,
          attempt: existing.length + 1,
          createdAt: new Date().toISOString(),
          status: 'reviewing' satisfies SubmissionStatus,
        };
        set({ submissions: [...get().submissions, submission] });
        return submission;
      },

      gradeSubmission: (submissionId) => {
        set({
          submissions: get().submissions.map((s) =>
            s.id === submissionId && s.status === 'reviewing'
              ? { ...s, status: 'graded', feedback: generateCoachFeedback(s.packId, s.attempt) }
              : s,
          ),
        });
      },

      submissionsForPack: (packId) =>
        get()
          .submissions.filter((s) => s.packId === packId)
          .sort((a, b) => a.attempt - b.attempt),

      addSession: (session) => set({ sessions: [{ ...session, id: uid() }, ...get().sessions] }),

      removeSession: (id) => set({ sessions: get().sessions.filter((s) => s.id !== id) }),

      addSpot: (spot) =>
        set({
          spots: [
            { ...spot, id: uid(), addedAt: new Date().toISOString(), sessions: 1 },
            ...get().spots,
          ],
        }),

      removeSpot: (id) => set({ spots: get().spots.filter((s) => s.id !== id) }),

      setShowCommunity: (v) => set({ showCommunity: v }),
    }),
    {
      name: 'surfcoach-store-v1',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        profile: state.profile,
        completedSteps: state.completedSteps,
        submissions: state.submissions,
        sessions: state.sessions,
        spots: state.spots,
        showCommunity: state.showCommunity,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) state.hydrated = true;
      },
    },
  ),
);

export type { CommunitySpot };
