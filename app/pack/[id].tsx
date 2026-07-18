import { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Button, Chip, Spinner, Text } from 'heroui-native';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronUp,
  Circle,
  Play,
  Star,
  Upload,
  Video as VideoIcon,
  Waves,
} from 'lucide-react-native';

import { YouTubePlayer } from '@/components/YouTubePlayer';
import { packImage } from '@/lib/images';
import { getPack } from '@/lib/packs';
import { MAX_ATTEMPTS, useSurfStore } from '@/lib/store';
import type { PackStep, Submission } from '@/lib/types';
import { cn } from '@/lib/utils';

const ATTEMPT_SLOTS = Array.from({ length: MAX_ATTEMPTS }, (_, slot) => slot);

export default function PackDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const pack = getPack(id);

  const completedSteps = useSurfStore((s) => s.completedSteps);
  const toggleStep = useSurfStore((s) => s.toggleStep);
  const submissions = useSurfStore((s) => s.submissions);
  const addSubmission = useSurfStore((s) => s.addSubmission);
  const gradeSubmission = useSurfStore((s) => s.gradeSubmission);

  const [picking, setPicking] = useState(false);

  if (!pack) {
    return (
      <View className="bg-background flex-1 items-center justify-center p-6">
        <Text className="text-ink text-lg font-semibold">Pack not found</Text>
        <Button className="mt-4" variant="tertiary" onPress={() => router.back()}>
          <Button.Label>Go back</Button.Label>
        </Button>
      </View>
    );
  }

  const packSubmissions = submissions
    .filter((s) => s.packId === pack.id)
    .sort((a, b) => a.attempt - b.attempt);
  const attemptsUsed = packSubmissions.length;
  const attemptsLeft = MAX_ATTEMPTS - attemptsUsed;

  const surfskateSteps = pack.steps.filter((s) => s.kind === 'surfskate');
  const waterSteps = pack.steps.filter((s) => s.kind === 'water');
  const allStepsDone = pack.steps.every((s) => completedSteps.includes(s.id));

  const handleSubmit = async () => {
    if (attemptsLeft <= 0) return;
    try {
      setPicking(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['videos'],
        quality: 1,
      });
      if (result.canceled || result.assets.length === 0) return;
      const created = await addSubmission(pack.id, result.assets[0].uri);
      if (created) {
        // Simulate coach reviewing then grading
        setTimeout(() => gradeSubmission(created.id), 2600);
      }
    } catch {
      Alert.alert('Could not open your videos', 'Please try again.');
    } finally {
      setPicking(false);
    }
  };

  return (
    <View className="bg-background flex-1">
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-10"
        showsVerticalScrollIndicator={false}
      >
        <View className="relative">
          <Image
            source={packImage(pack.heroImage)}
            style={{ width: '100%', height: 240 }}
            resizeMode="cover"
          />
          <Pressable
            onPress={() => router.back()}
            className="pt-safe-offset-3 absolute top-0 left-4 h-10 w-10 items-center justify-center rounded-full bg-black/35"
            style={{ marginTop: 8 }}
          >
            <ChevronLeft size={24} color="#ffffff" />
          </Pressable>
        </View>

        <View className="px-5 pt-5">
          <Text className="text-ink text-3xl font-bold">{pack.title}</Text>
          <Text className="text-slate-soft mt-1 text-base">{pack.tagline}</Text>
          <Text className="text-ink mt-4 text-base leading-6">{pack.overview}</Text>

          {pack.prerequisites.length > 0 ? (
            <View className="mt-4 flex-row flex-wrap gap-2">
              {pack.prerequisites.map((p) => (
                <Chip key={p} variant="soft">
                  <Chip.Label>{p}</Chip.Label>
                </Chip>
              ))}
            </View>
          ) : null}

          <SectionTitle
            icon={<Waves size={18} color="#2f6bb0" />}
            title="Train it on a surfskate"
            subtitle="Groove the movement pattern on land first."
          />
          {surfskateSteps.map((step, i) => (
            <StepRow
              key={step.id}
              step={step}
              index={i + 1}
              done={completedSteps.includes(step.id)}
              onToggle={() => toggleStep(step.id)}
            />
          ))}

          <SectionTitle
            icon={<VideoIcon size={18} color="#e07a5a" />}
            title="Take it to the water"
            subtitle="Apply what you drilled on real waves."
          />
          {waterSteps.map((step, i) => (
            <StepRow
              key={step.id}
              step={step}
              index={surfskateSteps.length + i + 1}
              done={completedSteps.includes(step.id)}
              onToggle={() => toggleStep(step.id)}
            />
          ))}

          <SubmissionSection
            attemptsLeft={attemptsLeft}
            attemptsUsed={attemptsUsed}
            submissions={packSubmissions}
            allStepsDone={allStepsDone}
            picking={picking}
            onSubmit={handleSubmit}
          />
        </View>
      </ScrollView>
    </View>
  );
}

function SectionTitle({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <View className="mt-7 gap-1">
      <View className="flex-row items-center gap-2">
        {icon}
        <Text className="text-ink text-lg font-bold">{title}</Text>
      </View>
      <Text className="text-slate-soft text-sm">{subtitle}</Text>
    </View>
  );
}

function StepRow({
  step,
  index,
  done,
  onToggle,
}: {
  step: PackStep;
  index: number;
  done: boolean;
  onToggle: () => void;
}) {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <View className="bg-surface border-border mt-3 overflow-hidden rounded-2xl border">
      <Image
        source={packImage(step.image)}
        style={{ width: '100%', height: 130 }}
        resizeMode="cover"
      />
      <View className="p-4">
        <View className="flex-row items-start justify-between gap-3">
          <View className="flex-1">
            <Text className="text-ocean-deep text-xs font-semibold">
              STEP {index} · {step.duration}
            </Text>
            <Text className="text-ink mt-0.5 text-base font-bold">{step.title}</Text>
          </View>
          <Pressable onPress={onToggle} hitSlop={8}>
            {done ? (
              <CheckCircle2 size={26} color="#2fa27f" />
            ) : (
              <Circle size={26} color="#c2cfdb" />
            )}
          </Pressable>
        </View>
        <Text className="text-slate-soft mt-2 text-sm leading-5">{step.summary}</Text>
        <View className="mt-3 gap-1.5">
          {step.cues.map((cue) => (
            <View key={cue} className="flex-row items-start gap-2">
              <View className="bg-ocean mt-1.5 h-1.5 w-1.5 rounded-full" />
              <Text className="text-ink flex-1 text-sm">{cue}</Text>
            </View>
          ))}
        </View>

        {step.videoId ? (
          <>
            <Pressable
              onPress={() => setShowVideo((v) => !v)}
              className="bg-ocean-deep mt-4 flex-row items-center justify-center gap-2 rounded-xl px-4 py-2.5"
              hitSlop={4}
            >
              {showVideo ? (
                <ChevronUp size={18} color="#ffffff" />
              ) : (
                <Play size={18} color="#ffffff" fill="#ffffff" />
              )}
              <Text className="text-sm font-bold text-white">
                {showVideo ? 'Hide video' : 'Watch tutorial'}
              </Text>
            </Pressable>
            {showVideo ? (
              <View className="mt-3">
                <YouTubePlayer videoId={step.videoId} />
              </View>
            ) : null}
          </>
        ) : null}
      </View>
    </View>
  );
}

function SubmissionSection({
  attemptsLeft,
  attemptsUsed,
  submissions,
  allStepsDone,
  picking,
  onSubmit,
}: {
  attemptsLeft: number;
  attemptsUsed: number;
  submissions: Submission[];
  allStepsDone: boolean;
  picking: boolean;
  onSubmit: () => void;
}) {
  return (
    <View className="bg-ocean-deep mt-8 overflow-hidden rounded-3xl p-5">
      <View className="flex-row items-center gap-2">
        <Upload size={18} color="#ffffff" />
        <Text className="text-lg font-bold text-white">Get coach feedback</Text>
      </View>
      <Text className="mt-1 text-sm leading-5 text-white/80">
        Submit a clip of you doing the maneuver. A coach will grade it and tell you what to work on.
        You get {MAX_ATTEMPTS} submissions per pack.
      </Text>

      <View className="mt-3 flex-row items-center gap-2">
        {ATTEMPT_SLOTS.map((slot) => (
          <View
            key={`attempt-dot-${slot}`}
            className={cn(
              'h-2 flex-1 rounded-full',
              slot < attemptsUsed ? 'bg-coral' : 'bg-white/25',
            )}
          />
        ))}
      </View>
      <Text className="mt-1.5 text-xs text-white/70">
        {attemptsLeft} of {MAX_ATTEMPTS} submissions left
      </Text>

      {submissions.map((sub) => (
        <FeedbackCard key={sub.id} submission={sub} />
      ))}

      {attemptsLeft > 0 ? (
        <Button className="mt-4 bg-white" isDisabled={picking} onPress={onSubmit}>
          <Button.Label className="text-ocean-deep">
            {picking
              ? 'Opening…'
              : attemptsUsed === 0
                ? 'Submit your first clip'
                : 'Submit another clip'}
          </Button.Label>
        </Button>
      ) : (
        <View className="mt-4 rounded-2xl bg-white/10 p-3">
          <Text className="text-center text-sm text-white/80">
            You’ve used all {MAX_ATTEMPTS} submissions for this pack.
          </Text>
        </View>
      )}

      {!allStepsDone ? (
        <Text className="mt-3 text-center text-xs text-white/60">
          Tip: finish all the steps above before you submit.
        </Text>
      ) : null}
    </View>
  );
}

function FeedbackCard({ submission }: { submission: Submission }) {
  const reviewing = submission.status === 'reviewing';
  return (
    <View className="mt-4 rounded-2xl bg-white p-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-ink text-sm font-bold">Attempt {submission.attempt}</Text>
        {reviewing ? (
          <View className="flex-row items-center gap-2">
            <Spinner size="sm" />
            <Text className="text-slate-soft text-xs">Coach reviewing…</Text>
          </View>
        ) : (
          <View className="bg-ocean flex-row items-center gap-1 rounded-full px-2.5 py-1">
            <Star size={12} color="#ffffff" fill="#ffffff" />
            <Text className="text-xs font-bold text-white">{submission.feedback?.grade}/10</Text>
          </View>
        )}
      </View>

      {submission.feedback ? (
        <View className="mt-2 gap-2">
          <Text className="text-ink text-base font-semibold">{submission.feedback.headline}</Text>
          <View>
            <Text className="text-seagrass text-xs font-bold uppercase">What’s working</Text>
            {submission.feedback.strengths.map((s) => (
              <Text key={s} className="text-ink mt-0.5 text-sm">
                • {s}
              </Text>
            ))}
          </View>
          <View>
            <Text className="text-coral text-xs font-bold uppercase">Work on this</Text>
            {submission.feedback.improvements.map((s) => (
              <Text key={s} className="text-ink mt-0.5 text-sm">
                • {s}
              </Text>
            ))}
          </View>
          <View className="bg-foam mt-1 rounded-xl p-3">
            <Text className="text-ocean-deep text-xs font-bold uppercase">Homework drill</Text>
            <Text className="text-ink mt-1 text-sm">{submission.feedback.drill}</Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}
