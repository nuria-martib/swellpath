import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Input, Label, Text, TextField } from 'heroui-native';
import { format } from 'date-fns';
import { Star } from 'lucide-react-native';

import { useSurfStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export default function LogSession() {
  const router = useRouter();
  const addSession = useSurfStore((s) => s.addSession);
  const spots = useSurfStore((s) => s.spots);

  const [spotName, setSpotName] = useState('');
  const [duration, setDuration] = useState('90');
  const [waves, setWaves] = useState('10');
  const [rating, setRating] = useState(4);
  const [notes, setNotes] = useState('');

  const today = format(new Date(), 'yyyy-MM-dd');
  const canSave = spotName.trim().length > 0;

  const save = () => {
    if (!canSave) return;
    addSession({
      date: today,
      spotName: spotName.trim(),
      durationMinutes: Number(duration) || 0,
      waveCount: Number(waves) || 0,
      rating,
      notes: notes.trim() || undefined,
    });
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
          <Text className="text-ink text-2xl font-bold">Log a session</Text>
          <Text className="text-slate-soft mt-0.5 text-base">
            {format(new Date(), 'EEEE, d MMMM')}
          </Text>
        </View>

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
          <Button.Label>Save session</Button.Label>
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}
