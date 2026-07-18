import { create } from 'zustand';
import type { Session, User } from '@biltme/backend';

import { bilt } from './backend';

interface AuthState {
  /** true once we've checked for an existing session at startup */
  ready: boolean;
  session: Session | null;
  user: User | null;

  init: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  verifySignup: (email: string, token: string) => Promise<{ error?: string }>;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  ready: false,
  session: null,
  user: null,

  init: async () => {
    const { data } = await bilt.auth.getSession();
    set({ session: data.session, user: data.session?.user ?? null, ready: true });

    bilt.auth.onAuthStateChange((_event, session) => {
      set({ session, user: session?.user ?? null });
    });
  },

  signUp: async (email, password) => {
    const { error } = await bilt.auth.signUp({ email: email.trim(), password });
    if (error) return { error: error.message };
    return {};
  },

  verifySignup: async (email, token) => {
    const { data, error } = await bilt.auth.verifyOtp({
      email: email.trim(),
      token: token.trim(),
      type: 'signup',
    });
    if (error) return { error: error.message };
    set({ session: data.session, user: data.session?.user ?? null });
    return {};
  },

  signIn: async (email, password) => {
    const { data, error } = await bilt.auth.signInWithPassword({ email: email.trim(), password });
    if (error) return { error: error.message };
    set({ session: data.session, user: data.session?.user ?? null });
    return {};
  },

  signOut: async () => {
    await bilt.auth.signOut();
    set({ session: null, user: null });
  },
}));
