import { useMemo, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { Button, Input, Label, Text, TextField } from 'heroui-native';
import { MapPin, Plus, Sailboat, Waves, X } from 'lucide-react-native';

import MapView, {
  type LatLng,
  type MapMarker,
  type MapPressEvent,
  type MapViewHandle,
} from '@/components/MapView';
import { KNOWN_SPOTS } from '@/lib/packs';
import { useSurfStore } from '@/lib/store';
import type { SpotType, SurfSpot } from '@/lib/types';
import { cn } from '@/lib/utils';

const INITIAL_REGION = {
  latitude: 39.5,
  longitude: -9.0,
  latitudeDelta: 6,
  longitudeDelta: 6,
};

const BREAK_TYPES: { value: SurfSpot['breakType']; label: string }[] = [
  { value: 'beach', label: 'Beach break' },
  { value: 'point', label: 'Point break' },
  { value: 'reef', label: 'Reef break' },
];

// Marker colours: a "personal record" (a spot you have logged a session at)
// stands out; a saved-but-not-yet-ridden spot is a softer shade of the same
// family; known/curated spots use a distinct hue so they read as suggestions.
const MARKER_COLORS = {
  beach: { record: '#1d4ed8', saved: '#60a5fa', known: '#06b6d4' },
  park: { record: '#15803d', saved: '#6ee7a8', known: '#a855f7' },
} as const;

type SpotView = SurfSpot & { isRecord: boolean };

const CATEGORY: { value: SpotType; label: string; icon: typeof Waves }[] = [
  { value: 'beach', label: 'On water', icon: Waves },
  { value: 'park', label: 'Out of water', icon: Sailboat },
];

export default function MapScreen() {
  const mapRef = useRef<MapViewHandle>(null);
  const spots = useSurfStore((s) => s.spots);
  const sessions = useSurfStore((s) => s.sessions);
  const addSpot = useSurfStore((s) => s.addSpot);
  const removeSpot = useSurfStore((s) => s.removeSpot);

  const [category, setCategory] = useState<SpotType>('beach');
  const [pendingCoord, setPendingCoord] = useState<LatLng | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<SpotView | null>(null);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [breakType, setBreakType] = useState<SurfSpot['breakType']>('beach');

  const isBeach = category === 'beach';
  const activity = isBeach ? 'surf' : 'surfskate';

  // A spot counts as a "personal record" when a logged session of the matching
  // activity references it by name (case-insensitive).
  const recordNames = useMemo(() => {
    const set = new Set<string>();
    for (const s of sessions) {
      if (s.activity === activity) set.add(s.spotName.trim().toLowerCase());
    }
    return set;
  }, [sessions, activity]);

  const mySpots = useMemo<SpotView[]>(
    () =>
      spots
        .filter((s) => s.spotType === category)
        .map((s) => ({ ...s, isRecord: recordNames.has(s.name.trim().toLowerCase()) })),
    [spots, category, recordNames],
  );

  const knownSpots = useMemo(() => KNOWN_SPOTS.filter((s) => s.spotType === category), [category]);

  const markers = useMemo<MapMarker[]>(() => {
    const palette = MARKER_COLORS[category];
    const mine: MapMarker[] = mySpots.map((s) => ({
      id: s.id,
      coordinate: { latitude: s.latitude, longitude: s.longitude },
      title: s.name,
      description: s.comment,
      color: s.isRecord ? palette.record : palette.saved,
      onPress: () => {
        setSelectedSpot(s);
        setPendingCoord(null);
      },
    }));
    const known: MapMarker[] = knownSpots.map((k) => ({
      id: k.id,
      coordinate: { latitude: k.latitude, longitude: k.longitude },
      title: k.name,
      description: k.comment,
      color: palette.known,
    }));
    const pending: MapMarker[] = pendingCoord
      ? [{ id: 'pending', coordinate: pendingCoord, color: '#e07a5a', title: 'New spot' }]
      : [];
    return [...known, ...mine, ...pending];
  }, [mySpots, knownSpots, category, pendingCoord]);

  const handleMapPress = (e: MapPressEvent) => {
    setSelectedSpot(null);
    setPendingCoord(e.coordinate);
    setName('');
    setComment('');
    setBreakType('beach');
  };

  const saveSpot = async () => {
    if (!pendingCoord || name.trim().length === 0) return;
    await addSpot({
      name: name.trim(),
      latitude: pendingCoord.latitude,
      longitude: pendingCoord.longitude,
      spotType: category,
      breakType,
      comment: comment.trim() || undefined,
    });
    setPendingCoord(null);
    setName('');
    setComment('');
  };

  const palette = MARKER_COLORS[category];

  return (
    <View className="bg-background flex-1">
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={INITIAL_REGION}
        markers={markers}
        onPress={handleMapPress}
      />

      {/* Category toggle + legend */}
      <View className="pt-safe-offset-3 absolute top-0 right-4 left-4 gap-2">
        <View className="bg-surface border-border flex-row gap-1.5 rounded-2xl border p-1.5 shadow-sm">
          {CATEGORY.map((c) => {
            const active = category === c.value;
            const Icon = c.icon;
            return (
              <Pressable
                key={c.value}
                onPress={() => {
                  setCategory(c.value);
                  setSelectedSpot(null);
                  setPendingCoord(null);
                }}
                className={cn(
                  'flex-1 flex-row items-center justify-center gap-1.5 rounded-xl py-2.5',
                  active ? 'bg-ocean' : 'bg-transparent',
                )}
              >
                <Icon size={16} color={active ? '#ffffff' : '#8aa0b6'} />
                <Text
                  className={cn('text-sm font-bold', active ? 'text-white' : 'text-slate-soft')}
                >
                  {c.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <View className="bg-surface/95 border-border flex-row flex-wrap items-center gap-x-4 gap-y-1.5 rounded-2xl border px-3 py-2">
          <LegendDot color={palette.record} label={isBeach ? 'Surfed' : 'Skated'} />
          <LegendDot color={palette.saved} label="Saved" />
          <LegendDot color={palette.known} label={isBeach ? 'Known break' : 'Known park'} />
        </View>
      </View>

      {/* Hint when nothing is selected */}
      {!pendingCoord && !selectedSpot ? (
        <View className="absolute right-4 bottom-6 left-4 items-center">
          <View className="bg-ocean-deep flex-row items-center gap-2 rounded-full px-4 py-2.5">
            <Plus size={16} color="#ffffff" />
            <Text className="text-sm font-medium text-white">
              {isBeach ? 'Tap the map to add a surf spot' : 'Tap the map to add a surfskate park'}
            </Text>
          </View>
        </View>
      ) : null}

      {/* Selected own spot card */}
      {selectedSpot ? (
        <View className="pb-safe-offset-4 absolute right-0 bottom-0 left-0 px-4">
          <View className="bg-surface border-border rounded-3xl border p-5">
            <View className="flex-row items-start justify-between">
              <View className="flex-1 flex-row items-center gap-2">
                <MapPin size={20} color={selectedSpot.isRecord ? palette.record : palette.saved} />
                <Text className="text-ink flex-1 text-lg font-bold">{selectedSpot.name}</Text>
              </View>
              <Pressable onPress={() => setSelectedSpot(null)} hitSlop={8}>
                <X size={22} color="#8aa0b6" />
              </Pressable>
            </View>
            <View className="mt-1 flex-row items-center gap-2">
              {isBeach ? (
                <Text className="text-slate-soft text-sm capitalize">
                  {selectedSpot.breakType} break
                </Text>
              ) : (
                <Text className="text-slate-soft text-sm">Surfskate park</Text>
              )}
              {selectedSpot.isRecord ? (
                <View
                  className="rounded-full px-2 py-0.5"
                  style={{ backgroundColor: `${palette.record}22` }}
                >
                  <Text className="text-xs font-bold" style={{ color: palette.record }}>
                    {isBeach ? 'Surfed here' : 'Skated here'}
                  </Text>
                </View>
              ) : null}
            </View>
            {selectedSpot.comment ? (
              <Text className="text-ink mt-2 text-sm">{selectedSpot.comment}</Text>
            ) : null}
            <Button
              variant="danger-soft"
              size="sm"
              className="mt-4 self-start"
              onPress={() => {
                void removeSpot(selectedSpot.id);
                setSelectedSpot(null);
              }}
            >
              <Button.Label>Remove spot</Button.Label>
            </Button>
          </View>
        </View>
      ) : null}

      {/* Add-spot sheet */}
      {pendingCoord ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className="absolute right-0 bottom-0 left-0"
        >
          <ScrollView
            className="max-h-[80%]"
            contentContainerClassName="pb-safe-offset-4 px-4"
            keyboardShouldPersistTaps="handled"
          >
            <View className="bg-surface border-border rounded-3xl border p-5">
              <View className="flex-row items-center justify-between">
                <Text className="text-ink text-lg font-bold">
                  {isBeach ? 'Add a surf spot' : 'Add a surfskate park'}
                </Text>
                <Pressable onPress={() => setPendingCoord(null)} hitSlop={8}>
                  <X size={22} color="#8aa0b6" />
                </Pressable>
              </View>

              <View className="mt-4 gap-4">
                <TextField>
                  <Label>{isBeach ? 'Spot name' : 'Park name'}</Label>
                  <Input
                    placeholder={isBeach ? 'e.g. Carcavelos' : 'e.g. Alcântara bowl'}
                    value={name}
                    onChangeText={setName}
                  />
                </TextField>

                {isBeach ? (
                  <View>
                    <Label>Break type</Label>
                    <View className="mt-2 flex-row gap-2">
                      {BREAK_TYPES.map((b) => (
                        <Pressable
                          key={b.value}
                          onPress={() => setBreakType(b.value)}
                          className={cn(
                            'flex-1 items-center rounded-xl border-2 py-2.5',
                            breakType === b.value ? 'border-ocean bg-ocean/10' : 'border-border',
                          )}
                        >
                          <Text
                            className={cn(
                              'text-sm font-semibold',
                              breakType === b.value ? 'text-ocean-deep' : 'text-slate-soft',
                            )}
                          >
                            {b.label}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>
                ) : null}

                <TextField>
                  <Label>Comment (optional)</Label>
                  <Input
                    placeholder={
                      isBeach ? 'Best tide, crowd, hazards…' : 'Surface, transitions, vibe…'
                    }
                    value={comment}
                    onChangeText={setComment}
                    multiline
                    className="min-h-16"
                  />
                </TextField>

                <Button isDisabled={name.trim().length === 0} onPress={saveSpot}>
                  <Button.Label>{isBeach ? 'Save surf spot' : 'Save park'}</Button.Label>
                </Button>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      ) : null}
    </View>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <View className="flex-row items-center gap-1.5">
      <View className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
      <Text className="text-slate-soft text-xs font-medium">{label}</Text>
    </View>
  );
}
