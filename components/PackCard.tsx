import { Image } from 'react-native';
import { Pressable, View } from 'react-native';
import { Text } from 'heroui-native';
import { Link } from 'expo-router';
import { CheckCircle2, ChevronRight, Lock, Sparkles } from 'lucide-react-native';

import { packImage } from '@/lib/images';
import type { Pack } from '@/lib/types';
import { cn } from '@/lib/utils';

interface PackCardProps {
  pack: Pack;
  recommended: boolean;
  completedSteps: number;
  totalSteps: number;
}

const LEVEL_LABEL: Record<Pack['level'], string> = {
  beginner: 'Beginner',
  improver: 'Improver',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

export function PackCard({ pack, recommended, completedSteps, totalSteps }: PackCardProps) {
  const done = totalSteps > 0 && completedSteps >= totalSteps;
  const progress = totalSteps > 0 ? completedSteps / totalSteps : 0;

  return (
    <Link href={{ pathname: '/pack/[id]', params: { id: pack.id } }} asChild>
      <Pressable
        className={cn(
          'bg-surface overflow-hidden rounded-3xl border',
          recommended ? 'border-ocean' : 'border-border',
        )}
      >
        <View className="relative">
          <Image
            source={packImage(pack.heroImage)}
            style={{ width: '100%', height: 150 }}
            resizeMode="cover"
          />
          {recommended ? (
            <View className="bg-ocean absolute top-3 left-3 flex-row items-center gap-1 rounded-full px-2.5 py-1">
              <Sparkles size={12} color="#ffffff" />
              <Text className="text-xs font-bold text-white">Recommended</Text>
            </View>
          ) : null}
          {done ? (
            <View className="bg-seagrass absolute top-3 right-3 flex-row items-center gap-1 rounded-full px-2.5 py-1">
              <CheckCircle2 size={12} color="#ffffff" />
              <Text className="text-xs font-bold text-white">Complete</Text>
            </View>
          ) : null}
        </View>

        <View className="p-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-ink text-lg font-bold">{pack.title}</Text>
            <ChevronRight size={20} color="#8aa0b6" />
          </View>
          <Text className="text-slate-soft mt-0.5 text-sm">{pack.tagline}</Text>

          <View className="mt-3 flex-row items-center gap-2">
            <View className="bg-foam rounded-full px-2.5 py-1">
              <Text className="text-ocean-deep text-xs font-semibold">
                {LEVEL_LABEL[pack.level]}
              </Text>
            </View>
            <Text className="text-slate-soft text-xs">
              {completedSteps}/{totalSteps} steps
            </Text>
          </View>

          <View className="bg-default mt-3 h-1.5 w-full overflow-hidden rounded-full">
            <View
              className={cn('h-1.5 rounded-full', done ? 'bg-seagrass' : 'bg-ocean')}
              style={{ width: `${Math.max(progress * 100, 3)}%` }}
            />
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

export { Lock };
