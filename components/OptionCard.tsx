import { Pressable, View } from 'react-native';
import { Text } from 'heroui-native';
import { Check } from 'lucide-react-native';

import { cn } from '@/lib/utils';

interface OptionCardProps {
  label: string;
  description?: string;
  selected: boolean;
  onPress: () => void;
}

export function OptionCard({ label, description, selected, onPress }: OptionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'flex-row items-center rounded-2xl border-2 px-4 py-3.5',
        selected ? 'border-ocean bg-ocean/10' : 'border-border bg-surface',
      )}
    >
      <View className="flex-1">
        <Text className={cn('text-base font-semibold', selected ? 'text-ocean-deep' : 'text-ink')}>
          {label}
        </Text>
        {description ? <Text className="text-slate-soft mt-0.5 text-sm">{description}</Text> : null}
      </View>
      <View
        className={cn(
          'ml-3 h-6 w-6 items-center justify-center rounded-full border-2',
          selected ? 'border-ocean bg-ocean' : 'border-border bg-transparent',
        )}
      >
        {selected ? <Check size={14} color="#ffffff" strokeWidth={3} /> : null}
      </View>
    </Pressable>
  );
}
