import { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from 'heroui-native';

import { PackCard } from '@/components/PackCard';
import { PACKS } from '@/lib/packs';
import { useSurfStore } from '@/lib/store';

export default function LearnScreen() {
  const profile = useSurfStore((s) => s.profile);
  const completedSteps = useSurfStore((s) => s.completedSteps);

  const sortedPacks = useMemo(() => [...PACKS].sort((a, b) => a.order - b.order), []);
  const recommendedId = profile?.recommendedPackId;

  return (
    <ScrollView
      className="bg-background flex-1"
      contentContainerClassName="px-5 pt-4 pb-10 gap-4"
      showsVerticalScrollIndicator={false}
    >
      <View className="gap-1">
        <Text className="text-ink text-2xl font-bold">
          {profile ? `Hey ${profile.name.split(' ')[0]}, ready to level up?` : 'Maneuver packs'}
        </Text>
        <Text className="text-slate-soft text-base">
          Train on land, then in the water. Submit a clip to get coach feedback.
        </Text>
      </View>

      {sortedPacks.map((pack) => {
        const total = pack.steps.length;
        const done = pack.steps.filter((step) => completedSteps.includes(step.id)).length;
        return (
          <PackCard
            key={pack.id}
            pack={pack}
            recommended={pack.id === recommendedId}
            completedSteps={done}
            totalSteps={total}
          />
        );
      })}
    </ScrollView>
  );
}
