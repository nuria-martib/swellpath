import { useEffect } from 'react';
import { View } from 'react-native';
import { Spinner } from 'heroui-native';
import { useRouter } from 'expo-router';

import { useSurfStore } from '@/lib/store';

export default function Index() {
  const router = useRouter();
  const hydrated = useSurfStore((s) => s.hydrated);
  const profile = useSurfStore((s) => s.profile);

  useEffect(() => {
    if (!hydrated) return;
    if (profile) router.replace('/(tabs)');
    else router.replace('/onboarding');
  }, [hydrated, profile, router]);

  return (
    <View className="bg-background flex-1 items-center justify-center">
      <Spinner size="lg" />
    </View>
  );
}
