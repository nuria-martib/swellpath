import { useEffect } from 'react';
import { View } from 'react-native';
import { Spinner } from 'heroui-native';
import { useRouter } from 'expo-router';

import { useAuthStore } from '@/lib/auth';
import { useSurfStore } from '@/lib/store';

export default function Index() {
  const router = useRouter();
  const authReady = useAuthStore((s) => s.ready);
  const session = useAuthStore((s) => s.session);
  const hydrated = useSurfStore((s) => s.hydrated);
  const profile = useSurfStore((s) => s.profile);

  useEffect(() => {
    if (!authReady) return;
    if (!session) {
      router.replace('/auth');
      return;
    }
    // Signed in — wait for cloud data before deciding onboarding vs app.
    if (!hydrated) return;
    if (profile) router.replace('/(tabs)');
    else router.replace('/onboarding');
  }, [authReady, session, hydrated, profile, router]);

  return (
    <View className="bg-background flex-1 items-center justify-center">
      <Spinner size="lg" />
    </View>
  );
}
