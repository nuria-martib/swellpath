import { Pressable, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Text } from 'heroui-native';
import { format, parseISO } from 'date-fns';
import { Check, Waves, X } from 'lucide-react-native';

import { getPack } from '@/lib/packs';
import { useSurfStore } from '@/lib/store';

export default function Profile() {
  const router = useRouter();
  const profile = useSurfStore((s) => s.profile);
  const resetProfile = useSurfStore((s) => s.resetProfile);

  if (!profile) {
    router.replace('/onboarding');
    return null;
  }

  const recommended = getPack(profile.recommendedPackId);

  const facts: { label: string; value: string; done?: boolean }[] = [
    { label: 'Years surfing', value: profile.yearsSurfing >= 6 ? '5+' : `${profile.yearsSurfing}` },
    { label: 'Surf frequency', value: freqLabel(profile.surfFrequency) },
    { label: 'Pop-up confidence', value: `${profile.popUpConfidence}/5` },
    {
      label: 'Bottom turn',
      value: ratingLabel(profile.bottomTurn),
      done: profile.bottomTurn >= 2,
    },
    { label: 'Cutback', value: ratingLabel(profile.cutback), done: profile.cutback >= 2 },
    { label: 'Top turn', value: ratingLabel(profile.topTurn), done: profile.topTurn >= 2 },
    {
      label: 'Landed an air',
      value: ratingLabel(profile.air),
      done: profile.air >= 2,
    },
  ];

  const retake = () => {
    resetProfile();
    router.replace('/onboarding');
  };

  return (
    <View className="bg-background flex-1">
      <View className="pt-safe-offset-3 flex-row items-center justify-between px-5 pb-2">
        <Text className="text-ink text-xl font-bold">Your profile</Text>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <X size={24} color="#8aa0b6" />
        </Pressable>
      </View>

      <ScrollView contentContainerClassName="px-5 pb-10 gap-4" showsVerticalScrollIndicator={false}>
        <View className="bg-ocean overflow-hidden rounded-3xl p-5">
          <View className="flex-row items-center gap-3">
            <View className="h-14 w-14 items-center justify-center rounded-full bg-white/20">
              <Waves size={26} color="#ffffff" />
            </View>
            <View>
              <Text className="text-2xl font-bold text-white">{profile.name}</Text>
              <Text className="text-sm text-white/80">
                {cap(profile.level)} surfer{profile.homeBreak ? ` · ${profile.homeBreak}` : ''}
              </Text>
            </View>
          </View>
          <Text className="mt-4 text-xs font-semibold tracking-wide text-white/70 uppercase">
            Assessed {format(parseISO(profile.createdAt), 'd MMM yyyy')}
          </Text>
        </View>

        {recommended ? (
          <View className="bg-surface border-ocean/30 rounded-2xl border p-4">
            <Text className="text-ocean-deep text-xs font-semibold uppercase">
              Recommended focus
            </Text>
            <Text className="text-ink mt-1 text-lg font-bold">{recommended.title}</Text>
            <Text className="text-slate-soft text-sm">{recommended.tagline}</Text>
          </View>
        ) : null}

        <View className="bg-surface border-border rounded-2xl border p-1">
          {facts.map((f, i) => (
            <View
              key={f.label}
              className={`flex-row items-center justify-between px-4 py-3 ${i > 0 ? 'border-border border-t' : ''}`}
            >
              <Text className="text-ink text-base">{f.label}</Text>
              <View className="flex-row items-center gap-2">
                {f.done ? (
                  <View className="bg-seagrass h-5 w-5 items-center justify-center rounded-full">
                    <Check size={13} color="#ffffff" strokeWidth={3} />
                  </View>
                ) : null}
                <Text className="text-slate-soft text-base font-semibold">{f.value}</Text>
              </View>
            </View>
          ))}
        </View>

        <Button variant="outline" onPress={retake}>
          <Button.Label>Retake assessment</Button.Label>
        </Button>
        <Text className="text-slate-soft text-center text-xs">
          Retaking resets your profile, but keeps your logged sessions and spots.
        </Text>
      </ScrollView>
    </View>
  );
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function ratingLabel(r: number): string {
  return r >= 2 ? 'Consistently' : r === 1 ? 'Inconsistently' : 'Not yet';
}

function freqLabel(f: number): string {
  return f >= 3 ? 'Weekly' : f === 2 ? 'Monthly' : 'A few times a year';
}
