import { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button, Input, Label, Text, TextField } from 'heroui-native';
import { format } from 'date-fns';
import { CalendarDays, Star } from 'lucide-react-native';

import { MonthCalendar } from '@/components/MonthCalendar';
import { useSurfStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export default function LogSession() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string; date?: string }>();
  const addSession = useSurfStore((s) => s.addSession);
  const updateSession = useSurfStore((s) => s.updateSession);
  const spots = useSurfStore((s) => s.spots);
  const sessions = useSurfStore((s) => s.sessions);

  const editing = useMemo(
    () => (params.id ? sessions.find((s) => s.id === params.id) : undefined),
    [params.id, sessions],
  );

  const [title, setTitle] = useState(editing?.title ?? '');
  const [spotName, setSpotName] = useState(editing?.spotName ?? '');
  const [duration, setDuration] = useState(String(editing?.durationMinutes ?? 90));
  const [waves, setWaves] = useState(String(editing?.waveCount ?? 10));
  const [rating, setRating] = useState(editing?.rating ?? 4);
  const [notes, setNotes] = useState(editing?.notes ?? '');

  const [date, setDate] = useState(
    editing?.date ??
      (params.date && params.date.length > 0 ? params.date : format(new Date(), 'yyyy-MM-dd')),
  );
  const [showCalendar, setShowCalendar] = useState(false);
  const canSave = title.trim().length > 0 && spotName.trim().length > 0;

  const save = async () => {
    if (!canSave) return;
    const payload = {
      title: title.trim(),
      date,
      spotName: spotName.trim(),
      durationMinutes: Number(duration) || 0,
      waveCount: Number(waves) || 0,
      rating,
      notes: notes.trim() || undefined,
    };
    if (editing) {
      await updateSession(editing.id, payload);
    } else {
      await addSession(payload);
    }
    router.back();
  };

  return (
    <KeyboardAvoidingView
      className="bg-background flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerClassName="px-5 pt-5 pb-8 gap-5"
        keyboardShouldPersistTaps="handled"
      >
        <View>
          <Text className="text-ink text-2xl font-bold">
            {editing ? 'Edit session' : 'Log a session'}
          </Text>
          <Pressable
            onPress={() => setShowCalendar((v) => !v)}
            className="mt-1.5 flex-row items-center gap-1.5 self-start"
            hitSlop={6}
          >
            <CalendarDays size={16} color="#2f6bb0" />
            <Text className="text-ocean-deep text-base font-semibold">
              {format(new Date(`${date}T00:00:00`), 'EEEE, d MMMM yyyy')}
            </Text>
          </Pressable>
        </View>

        {showCalendar ? (
          <MonthCalendar
            selected={date}
            disableFuture
            onSelectDate={(iso) => {
              setDate(iso);
              setShowCalendar(false);
            }}
          />
        ) : null}

        <TextField>
          <Label>Title</Label>
          <Input placeholder="Dawn patrol, glassy peaks…" value={title} onChangeText={setTitle} />
        </TextField>

        <TextField>
          <Label>Spot</Label>
          <Input placeholder="Where did you surf?" value={spotName} onChangeText={setSpotName} />
        </TextField>

        {spots.length > 0 ? (
          <View className="flex-row flex-wrap gap-2">
            {spots.slice(0, 6).map((s) => (
              <Pressable
                key={s.id}
                onPress={() => setSpotName(s.name)}
                className="bg-foam rounded-full px-3 py-1.5"
              >
                <Text className="text-ocean-deep text-sm font-medium">{s.name}</Text>
              </Pressable>
            ))}
          </View>
        ) : null}

        <View className="flex-row gap-3">
          <View className="flex-1">
            <TextField>
              <Label>Duration (min)</Label>
              <Input keyboardType="number-pad" value={duration} onChangeText={setDuration} />
            </TextField>
          </View>
          <View className="flex-1">
            <TextField>
              <Label>Waves caught</Label>
              <Input keyboardType="number-pad" value={waves} onChangeText={setWaves} />
            </TextField>
          </View>
        </View>

        <View>
          <Label>How was it?</Label>
          <View className="mt-2 flex-row gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <Pressable key={n} onPress={() => setRating(n)} hitSlop={4}>
                <Star
                  size={34}
                  color={n <= rating ? '#e0a72f' : '#c2cfdb'}
                  fill={n <= rating ? '#e0a72f' : 'transparent'}
                />
              </Pressable>
            ))}
          </View>
        </View>

        <TextField>
          <Label>Notes (optional)</Label>
          <Input
            placeholder="Conditions, what you worked on…"
            value={notes}
            onChangeText={setNotes}
            multiline
            className={cn('min-h-20')}
          />
        </TextField>
      </ScrollView>

      <View className="pb-safe-offset-4 border-border bg-background flex-row gap-3 border-t px-5 pt-3">
        <Button variant="tertiary" className="flex-1" onPress={() => router.back()}>
          <Button.Label>Cancel</Button.Label>
        </Button>
        <Button className="flex-1" isDisabled={!canSave} onPress={save}>
          <Button.Label>{editing ? 'Save changes' : 'Save session'}</Button.Label>
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
