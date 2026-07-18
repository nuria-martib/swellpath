import { useMemo, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { Button, Input, Label, Switch, Text, TextField } from 'heroui-native';
import { MapPin, Plus, Users, X } from 'lucide-react-native';

import MapView, {
  type LatLng,
  type MapMarker,
  type MapPressEvent,
  type MapViewHandle,
} from '@/components/MapView';
import { COMMUNITY_SPOTS } from '@/lib/packs';
import { useSurfStore } from '@/lib/store';
import type { SurfSpot } from '@/lib/types';
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

export default function MapScreen() {
  const mapRef = useRef<MapViewHandle>(null);
  const spots = useSurfStore((s) => s.spots);
  const addSpot = useSurfStore((s) => s.addSpot);
  const removeSpot = useSurfStore((s) => s.removeSpot);
  const showCommunity = useSurfStore((s) => s.showCommunity);
  const setShowCommunity = useSurfStore((s) => s.setShowCommunity);

  const [pendingCoord, setPendingCoord] = useState<LatLng | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<SurfSpot | null>(null);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [breakType, setBreakType] = useState<SurfSpot['breakType']>('beach');

  const markers = useMemo<MapMarker[]>(() => {
    const mine: MapMarker[] = spots.map((s) => ({
      id: s.id,
      coordinate: { latitude: s.latitude, longitude: s.longitude },
      title: s.name,
      description: s.comment,
      color: 'blue',
      onPress: () => {
        setSelectedSpot(s);
        setPendingCoord(null);
      },
    }));
    const community: MapMarker[] = showCommunity
      ? COMMUNITY_SPOTS.map((c) => ({
          id: c.id,
          coordinate: { latitude: c.latitude, longitude: c.longitude },
          title: `${c.spotName} · ${c.surfer}`,
          description: c.comment,
          color: 'orange',
        }))
      : [];
    const pending: MapMarker[] = pendingCoord
      ? [{ id: 'pending', coordinate: pendingCoord, color: 'green', title: 'New spot' }]
      : [];
    return [...mine, ...community, ...pending];
  }, [spots, showCommunity, pendingCoord]);

  const handleMapPress = (e: MapPressEvent) => {
    setSelectedSpot(null);
    setPendingCoord(e.coordinate);
    setName('');
    setComment('');
    setBreakType('beach');
  };

  const saveSpot = () => {
    if (!pendingCoord || name.trim().length === 0) return;
    addSpot({
      name: name.trim(),
      latitude: pendingCoord.latitude,
      longitude: pendingCoord.longitude,
      breakType,
      comment: comment.trim() || undefined,
    });
    setPendingCoord(null);
    setName('');
    setComment('');
  };

  return (
    <View className="bg-background flex-1">
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={INITIAL_REGION}
        markers={markers}
        onPress={handleMapPress}
      />

      {/* Community toggle */}
      <View className="pt-safe-offset-3 absolute top-0 right-4 left-4">
        <View className="bg-surface border-border flex-row items-center gap-3 rounded-2xl border px-4 py-3 shadow-sm">
          <View className="bg-coral/15 h-9 w-9 items-center justify-center rounded-full">
            <Users size={18} color="#e07a5a" />
          </View>
          <View className="flex-1">
            <Text className="text-ink text-sm font-bold">Community spots</Text>
            <Text className="text-slate-soft text-xs">See where other surfers are riding</Text>
          </View>
          <Switch isSelected={showCommunity} onSelectedChange={setShowCommunity} />
        </View>
      </View>

      {/* Hint when nothing is selected */}
      {!pendingCoord && !selectedSpot ? (
        <View className="absolute right-4 bottom-6 left-4 items-center">
          <View className="bg-ocean-deep flex-row items-center gap-2 rounded-full px-4 py-2.5">
            <Plus size={16} color="#ffffff" />
            <Text className="text-sm font-medium text-white">
              Tap the map to add a spot you surfed
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
                <MapPin size={20} color="#2f6bb0" />
                <Text className="text-ink flex-1 text-lg font-bold">{selectedSpot.name}</Text>
              </View>
              <Pressable onPress={() => setSelectedSpot(null)} hitSlop={8}>
                <X size={22} color="#8aa0b6" />
              </Pressable>
            </View>
            <Text className="text-slate-soft mt-1 text-sm capitalize">
              {selectedSpot.breakType} break
            </Text>
            {selectedSpot.comment ? (
              <Text className="text-ink mt-2 text-sm">{selectedSpot.comment}</Text>
            ) : null}
            <Button
              variant="danger-soft"
              size="sm"
              className="mt-4 self-start"
              onPress={() => {
                removeSpot(selectedSpot.id);
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
                <Text className="text-ink text-lg font-bold">Add a surfed spot</Text>
                <Pressable onPress={() => setPendingCoord(null)} hitSlop={8}>
                  <X size={22} color="#8aa0b6" />
                </Pressable>
              </View>

              <View className="mt-4 gap-4">
                <TextField>
                  <Label>Spot name</Label>
                  <Input placeholder="e.g. Carcavelos" value={name} onChangeText={setName} />
                </TextField>

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

                <TextField>
                  <Label>Comment (optional)</Label>
                  <Input
                    placeholder="Best tide, crowd, hazards…"
                    value={comment}
                    onChangeText={setComment}
                    multiline
                    className="min-h-16"
                  />
                </TextField>

                <Button isDisabled={name.trim().length === 0} onPress={saveSpot}>
                  <Button.Label>Save spot</Button.Label>
                </Button>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      ) : null}
    </View>
  );
}
