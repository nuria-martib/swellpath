import { differenceInCalendarDays, getYear, parseISO } from 'date-fns';

import type { SurfSession } from './types';

export interface SurfMetrics {
  daysSurfedThisYear: number;
  totalSessions: number;
  totalWaves: number;
  totalHours: number;
  avgRating: number;
  currentStreakDays: number;
  longestGapDays: number;
  favouriteSpot: string | null;
}

export function computeMetrics(sessions: SurfSession[]): SurfMetrics {
  const thisYear = getYear(new Date());
  const uniqueDaysThisYear = new Set(
    sessions.filter((s) => getYear(parseISO(s.date)) === thisYear).map((s) => s.date),
  );

  const totalWaves = sessions.reduce((sum, s) => sum + s.waveCount, 0);
  const totalMinutes = sessions.reduce((sum, s) => sum + s.durationMinutes, 0);
  const avgRating =
    sessions.length > 0 ? sessions.reduce((sum, s) => sum + s.rating, 0) / sessions.length : 0;

  // Streak of consecutive calendar days ending today (or most recent session day)
  const sortedDays = [...new Set(sessions.map((s) => s.date))].sort((a, b) => (a < b ? 1 : -1));
  let currentStreakDays = 0;
  if (sortedDays.length > 0) {
    let cursor = parseISO(sortedDays[0]);
    const gapFromToday = differenceInCalendarDays(new Date(), cursor);
    if (gapFromToday <= 1) {
      currentStreakDays = 1;
      for (let i = 1; i < sortedDays.length; i++) {
        const next = parseISO(sortedDays[i]);
        if (differenceInCalendarDays(cursor, next) === 1) {
          currentStreakDays += 1;
          cursor = next;
        } else break;
      }
    }
  }

  // Longest gap between sessions
  let longestGapDays = 0;
  const ascDays = [...new Set(sessions.map((s) => s.date))].sort();
  for (let i = 1; i < ascDays.length; i++) {
    const gap = differenceInCalendarDays(parseISO(ascDays[i]), parseISO(ascDays[i - 1]));
    if (gap > longestGapDays) longestGapDays = gap;
  }

  // Favourite spot by session count
  const spotCounts = new Map<string, number>();
  for (const s of sessions) spotCounts.set(s.spotName, (spotCounts.get(s.spotName) ?? 0) + 1);
  let favouriteSpot: string | null = null;
  let best = 0;
  for (const [spot, count] of spotCounts) {
    if (count > best) {
      best = count;
      favouriteSpot = spot;
    }
  }

  return {
    daysSurfedThisYear: uniqueDaysThisYear.size,
    totalSessions: sessions.length,
    totalWaves,
    totalHours: Math.round((totalMinutes / 60) * 10) / 10,
    avgRating: Math.round(avgRating * 10) / 10,
    currentStreakDays,
    longestGapDays,
    favouriteSpot,
  };
}
