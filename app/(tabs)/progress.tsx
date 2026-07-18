import { useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { Link } from 'expo-router';
import { Button, Text } from 'heroui-native';
import {
  Award,
  CalendarDays,
  Clock,
  Flame,
  MapPin,
  Plus,
  Star,
  Trophy,
  Waves,
} from 'lucide-react-native';
import { format, parseISO } from 'date-fns';

import { MonthCalendar } from '@/components/MonthCalendar';
import { PACKS } from '@/lib/packs';
import { computeMetrics } from '@/lib/metrics';
import { useSurfStore } from '@/lib/store';
import type { SurfSession } from '@/lib/types';

export default function ProgressScreen() {
  const sessions = useSurfStore((s) => s.sessions);
  const completedSteps = useSurfStore((s) => s.completedSteps);
  const submissions = useSurfStore((s) => s.submissions);
  const profile = useSurfStore((s) => s.profile);

  const [selectedDay, setSelectedDay] = useState<string | undefined>(undefined);

  const metrics = useMemo(() => computeMetrics(sessions), [sessions]);

  const surfedDays = useMemo(() => sessions.map((s) => s.date), [sessions]);
  const visibleSessions = useMemo(
    () => (selectedDay ? sessions.filter((s) => s.date === selectedDay) : sessions),
    [sessions, selectedDay],
  );

  const maneuversUnlocked = useMemo(
    () => PACKS.filter((p) => p.steps.every((step) => completedSteps.includes(step.id))).length,
    [completedSteps],
  );
  const bestGrade = useMemo(() => {
    const grades = submissions
      .map((s) => s.feedback?.grade)
      .filter((g): g is number => typeof g === 'number');
    return grades.length > 0 ? Math.max(...grades) : null;
  }, [submissions]);

  return (
    <ScrollView
      className="bg-background flex-1"
      contentContainerClassName="px-5 pt-4 pb-28"
      showsVerticalScrollIndicator={false}
    >
      <Text className="text-ink text-2xl font-bold">Your progress</Text>
      <Text className="text-slate-soft mt-0.5 text-base">
        {profile ? `Level: ${cap(profile.level)}` : 'Track every session and milestone.'}
      </Text>

      <View className="bg-ocean mt-4 overflow-hidden rounded-3xl p-5">
        <Text className="text-sm font-semibold text-white/80">
          Days surfed in {new Date().getFullYear()}
        </Text>
        <View className="mt-1 flex-row items-end gap-2">
          <Text className="text-5xl font-extrabold text-white">{metrics.daysSurfedThisYear}</Text>
          <Text className="mb-2 text-base text-white/70">days</Text>
        </View>
        <View className="mt-3 flex-row items-center gap-2">
          <Flame size={16} color="#ffd27a" />
          <Text className="text-sm text-white/90">
            {metrics.currentStreakDays > 0
              ? `${metrics.currentStreakDays}-day streak — keep it going`
              : 'Log a session to start a streak'}
          </Text>
        </View>
      </View>

      <View className="mt-4 flex-row flex-wrap gap-3">
        <StatTile
          icon={<Waves size={18} color="#2f6bb0" />}
          value={metrics.totalSessions}
          label="Sessions"
        />
        <StatTile
          icon={<Clock size={18} color="#2f6bb0" />}
          value={`${metrics.totalHours}h`}
          label="Time surfing"
        />
        <StatTile
          icon={<Star size={18} color="#e0a72f" />}
          value={metrics.totalWaves}
          label="Waves caught"
        />
        <StatTile
          icon={<Trophy size={18} color="#e07a5a" />}
          value={metrics.avgRating || '—'}
          label="Avg session"
        />
        <StatTile
          icon={<Award size={18} color="#2fa27f" />}
          value={maneuversUnlocked}
          label="Maneuvers unlocked"
        />
        <StatTile
          icon={<CalendarDays size={18} color="#2f6bb0" />}
          value={bestGrade ? `${bestGrade}/10` : '—'}
          label="Best coach grade"
        />
      </View>

      {metrics.favouriteSpot ? (
        <View className="bg-surface border-border mt-4 flex-row items-center gap-3 rounded-2xl border p-4">
          <View className="bg-foam h-10 w-10 items-center justify-center rounded-full">
            <MapPin size={20} color="#2f6bb0" />
          </View>
          <View className="flex-1">
            <Text className="text-slate-soft text-xs font-semibold uppercase">Favourite spot</Text>
            <Text className="text-ink text-base font-bold">{metrics.favouriteSpot}</Text>
          </View>
        </View>
      ) : null}

      <View className="mt-6 flex-row items-center justify-between">
        <Text className="text-ink text-lg font-bold">Surf calendar</Text>
        {selectedDay ? (
          <Pressable
            onPress={() => setSelectedDay(undefined)}
            className="bg-foam rounded-full px-3 py-1.5"
          >
            <Text className="text-ocean-deep text-sm font-semibold">Show all</Text>
          </Pressable>
        ) : null}
      </View>
      {sessions.length > 0 ? (
        <View className="mt-3">
          <MonthCalendar
            markedDates={surfedDays}
            selected={selectedDay}
            onSelectDate={(iso) => setSelectedDay((prev) => (prev === iso ? undefined : iso))}
          />
        </View>
      ) : null}

      <View className="mt-6 flex-row items-center justify-between">
        <Text className="text-ink text-lg font-bold">
          {selectedDay ? format(parseISO(selectedDay), 'd MMM') : 'Session log'}
        </Text>
        <Link href="/log-session" asChild>
          <Pressable className="bg-ocean flex-row items-center gap-1 rounded-full px-3 py-1.5">
            <Plus size={16} color="#ffffff" />
            <Text className="text-sm font-semibold text-white">Log</Text>
          </Pressable>
        </Link>
      </View>

      {sessions.length === 0 ? (
        <View className="bg-surface border-border mt-3 items-center rounded-2xl border border-dashed p-6">
          <Waves size={28} color="#8aa0b6" />
          <Text className="text-ink mt-2 text-base font-semibold">No sessions yet</Text>
          <Text className="text-slate-soft mt-1 text-center text-sm">
            Log your surfs to track days in the water, waves caught, and streaks.
          </Text>
          <Link href="/log-session" asChild>
            <Button className="mt-4">
              <Button.Label>Log your first session</Button.Label>
            </Button>
          </Link>
        </View>
      ) : visibleSessions.length === 0 ? (
        <View className="bg-surface border-border mt-3 items-center rounded-2xl border border-dashed p-6">
          <Waves size={28} color="#8aa0b6" />
          <Text className="text-ink mt-2 text-base font-semibold">No surf this day</Text>
          <Link href={{ pathname: '/log-session', params: { date: selectedDay ?? '' } }} asChild>
            <Button className="mt-4">
              <Button.Label>Log a session for this day</Button.Label>
            </Button>
          </Link>
        </View>
      ) : (
        <View className="mt-3 gap-3">
          {visibleSessions.map((s) => (
            <SessionRow key={s.id} session={s} />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

function StatTile({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <View className="bg-surface border-border rounded-2xl border p-4" style={{ width: '47.5%' }}>
      {icon}
      <Text className="text-ink mt-2 text-2xl font-extrabold">{value}</Text>
      <Text className="text-slate-soft text-xs">{label}</Text>
    </View>
  );
}

function SessionRow({ session }: { session: SurfSession }) {
  const removeSession = useSurfStore((s) => s.removeSession);
  const [confirm, setConfirm] = useState(false);
  return (
    <Pressable
      onLongPress={() => setConfirm(true)}
      className="bg-surface border-border rounded-2xl border p-4"
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-ink flex-1 text-base font-bold" numberOfLines={1}>
          {session.title || session.spotName}
        </Text>
        <Text className="text-slate-soft ml-2 text-xs">
          {format(parseISO(session.date), 'd MMM')}
        </Text>
      </View>
      {session.title ? (
        <Text className="text-ocean-deep mt-0.5 text-sm font-medium">{session.spotName}</Text>
      ) : null}
      <View className="mt-2 flex-row flex-wrap gap-x-4 gap-y-1">
        <Meta label={`${session.durationMinutes} min`} />
        <Meta label={`${session.waveCount} waves`} />
        <Meta label={`${'★'.repeat(session.rating)}${'☆'.repeat(5 - session.rating)}`} />
      </View>
      {session.notes ? <Text className="text-slate-soft mt-2 text-sm">{session.notes}</Text> : null}
      {confirm ? (
        <View className="mt-3 flex-row gap-2">
          <Link href={{ pathname: '/log-session', params: { id: session.id } }} asChild>
            <Button size="sm" onPress={() => setConfirm(false)}>
              <Button.Label>Edit</Button.Label>
            </Button>
          </Link>
          <Button variant="danger" size="sm" onPress={() => removeSession(session.id)}>
            <Button.Label>Delete</Button.Label>
          </Button>
          <Button variant="tertiary" size="sm" onPress={() => setConfirm(false)}>
            <Button.Label>Cancel</Button.Label>
          </Button>
        </View>
      ) : null}
    </Pressable>
  );
}

function Meta({ label }: { label: string }) {
  return <Text className="text-slate-soft text-sm">{label}</Text>;
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
