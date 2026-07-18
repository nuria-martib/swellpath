import { GraduationCap, Map, TrendingUp, UserRound } from 'lucide-react-native';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useThemeColor } from 'heroui-native';
import { useUniwind } from 'uniwind';

export default function TabLayout() {
  const { theme } = useUniwind();
  const [background, foreground, border, accent, muted] = useThemeColor([
    'background',
    'foreground',
    'border',
    'accent',
    'muted',
  ]);

  return (
    <>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <Tabs
        screenOptions={{
          headerStyle: { backgroundColor: background },
          headerTintColor: foreground,
          headerTitleStyle: { color: foreground },
          headerShadowVisible: false,
          sceneStyle: { backgroundColor: background },
          tabBarStyle: {
            backgroundColor: background,
            borderTopColor: border,
          },
          tabBarActiveTintColor: accent,
          tabBarInactiveTintColor: muted,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Learn',
            tabBarIcon: ({ color, size }) => <GraduationCap color={color} size={size ?? 24} />,
            headerRight: () => (
              <Link href="/profile" asChild>
                <Pressable hitSlop={10} style={{ marginRight: 16 }}>
                  <UserRound color={foreground} size={22} />
                </Pressable>
              </Link>
            ),
          }}
        />
        <Tabs.Screen
          name="progress"
          options={{
            title: 'Progress',
            tabBarIcon: ({ color, size }) => <TrendingUp color={color} size={size ?? 24} />,
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            title: 'Map',
            headerShown: false,
            tabBarIcon: ({ color, size }) => <Map color={color} size={size ?? 24} />,
          }}
        />
      </Tabs>
    </>
  );
}
