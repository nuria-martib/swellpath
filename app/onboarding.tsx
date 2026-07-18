import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Input, Label, Text, TextField } from 'heroui-native';
import { ChevronLeft, Waves } from 'lucide-react-native';

import { OptionCard } from '@/components/OptionCard';
import { getPack } from '@/lib/packs';
import { useSurfStore } from '@/lib/store';
import type { AssessmentAnswers, SkillRating } from '@/lib/assessment';
import { assessSurfer } from '@/lib/assessment';

export default function Onboarding() {
  const router = useRouter();
  const completeOnboarding = useSurfStore((s) => s.completeOnboarding);

  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [homeBreak, setHomeBreak] = useState('');
  const [years, setYears] = useState<number | null>(null);
  const [frequency, setFrequency] = useState<number | null>(null);
  const [popUp, setPopUp] = useState<number | null>(null);
  const [bottomTurn, setBottomTurn] = useState<SkillRating | null>(null);
  const [cutback, setCutback] = useState<SkillRating | null>(null);
  const [topTurn, setTopTurn] = useState<SkillRating | null>(null);
  const [air, setAir] = useState<SkillRating | null>(null);

  const totalSteps = 8;

  const canContinue = (): boolean => {
    switch (step) {
      case 0:
        return name.trim().length > 0;
      case 1:
        return years !== null;
      case 2:
        return frequency !== null;
      case 3:
        return popUp !== null;
      case 4:
        return bottomTurn !== null;
      case 5:
        return cutback !== null;
      case 6:
        return topTurn !== null;
      case 7:
        return air !== null;
      default:
        return false;
    }
  };

  const buildAnswers = (): AssessmentAnswers => ({
    name: name.trim(),
    yearsSurfing: years ?? 1,
    surfFrequency: frequency ?? 1,
    popUpConfidence: popUp ?? 3,
    bottomTurn: bottomTurn ?? 0,
    cutback: cutback ?? 0,
    topTurn: topTurn ?? 0,
    air: air ?? 0,
    homeBreak: homeBreak.trim() || undefined,
  });

  const finish = () => {
    completeOnboarding(buildAnswers());
    router.replace('/(tabs)');
  };

  const preview = canContinue() && step === totalSteps - 1 ? assessSurfer(buildAnswers()) : null;
  const recommendedPack = preview ? getPack(preview.recommendedPackId) : null;

  return (
    <KeyboardAvoidingView
      className="bg-background flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="pt-safe-offset-4 px-5">
        <View className="flex-row items-center gap-3">
          {step > 0 ? (
            <Pressable
              onPress={() => setStep((s) => s - 1)}
              className="bg-surface border-border h-10 w-10 items-center justify-center rounded-full border"
            >
              <ChevronLeft size={22} color="#1c3f66" />
            </Pressable>
          ) : (
            <View className="bg-ocean h-10 w-10 items-center justify-center rounded-full">
              <Waves size={20} color="#ffffff" />
            </View>
          )}
          <View className="flex-1">
            <View className="bg-default h-2 w-full overflow-hidden rounded-full">
              <View
                className="bg-ocean h-2 rounded-full"
                style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
              />
            </View>
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-8 pb-8 gap-5"
        keyboardShouldPersistTaps="handled"
      >
        {step === 0 ? (
          <>
            <StepHeader
              title="Welcome, let's build your surf coach"
              subtitle="A few quick questions so we can tailor your training path."
            />
            <TextField>
              <Label>What should we call you?</Label>
              <Input placeholder="Your name" value={name} onChangeText={setName} />
            </TextField>
            <TextField>
              <Label>Home break (optional)</Label>
              <Input placeholder="e.g. Carcavelos" value={homeBreak} onChangeText={setHomeBreak} />
            </TextField>
          </>
        ) : null}

        {step === 1 ? (
          <>
            <StepHeader title="How long have you been surfing?" />
            <View className="gap-2.5">
              {[
                { v: 1, label: '1–2 years', desc: 'Getting the basics down' },
                { v: 3, label: '3–5 years', desc: 'Comfortable on most waves' },
                { v: 6, label: '5–10 years', desc: 'Experienced surfer' },
                { v: 11, label: '10+ years', desc: 'Been at it a long time' },
              ].map((o) => (
                <OptionCard
                  key={o.v}
                  label={o.label}
                  description={o.desc}
                  selected={years === o.v}
                  onPress={() => setYears(o.v)}
                />
              ))}
            </View>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <StepHeader
              title="How often do you actually surf?"
              subtitle="Consistency matters more than years — regular time in the water builds skill fastest."
            />
            <View className="gap-2.5">
              {[
                { v: 1, label: 'A few times a year', desc: 'Trips or the odd session' },
                { v: 2, label: 'A few times a month', desc: 'Whenever conditions allow' },
                { v: 3, label: 'Most weeks', desc: 'Surfing is part of my routine' },
              ].map((o) => (
                <OptionCard
                  key={o.v}
                  label={o.label}
                  description={o.desc}
                  selected={frequency === o.v}
                  onPress={() => setFrequency(o.v)}
                />
              ))}
            </View>
          </>
        ) : null}

        {step === 3 ? (
          <>
            <StepHeader
              title="How's your pop-up?"
              subtitle="Be honest — this shapes where you start."
            />
            <View className="gap-2.5">
              {[
                { v: 3, label: 'Inconsistent', desc: 'Works on easy waves' },
                { v: 4, label: 'Solid', desc: 'Clean and quick most times' },
                { v: 5, label: 'Second nature', desc: 'Never think about it' },
              ].map((o) => (
                <OptionCard
                  key={o.v}
                  label={o.label}
                  description={o.desc}
                  selected={popUp === o.v}
                  onPress={() => setPopUp(o.v)}
                />
              ))}
            </View>
          </>
        ) : null}

        {step === 4 ? (
          <SkillStep
            title="Can you do a bottom turn?"
            subtitle="Compressing at the base and driving back up the face."
            value={bottomTurn}
            onChange={setBottomTurn}
          />
        ) : null}

        {step === 5 ? (
          <SkillStep
            title="Have you landed a cutback?"
            subtitle="Arcing back to the pocket when you outrun the wave."
            value={cutback}
            onChange={setCutback}
          />
        ) : null}

        {step === 6 ? (
          <SkillStep
            title="Can you do a top turn?"
            subtitle="Redirecting off the top of the wave with control."
            value={topTurn}
            onChange={setTopTurn}
          />
        ) : null}

        {step === 7 ? (
          <>
            <SkillStep
              title="Have you landed an air?"
              subtitle="Fully airborne and riding away clean."
              value={air}
              onChange={setAir}
            />
            {recommendedPack ? (
              <View className="bg-ocean/10 border-ocean/30 mt-2 rounded-2xl border p-4">
                <Text className="text-ocean-deep text-xs font-semibold tracking-wide uppercase">
                  We recommend starting with
                </Text>
                <Text className="text-ink mt-1 text-xl font-bold">{recommendedPack.title}</Text>
                <Text className="text-slate-soft mt-1 text-sm">{recommendedPack.tagline}</Text>
              </View>
            ) : null}
          </>
        ) : null}
      </ScrollView>

      <View className="pb-safe-offset-4 border-border bg-background border-t px-5 pt-3">
        <Button
          isDisabled={!canContinue()}
          onPress={() => (step === totalSteps - 1 ? finish() : setStep((s) => s + 1))}
        >
          <Button.Label>{step === totalSteps - 1 ? 'Start training' : 'Continue'}</Button.Label>
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

function StepHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View className="gap-1.5">
      <Text className="text-ink text-2xl font-bold">{title}</Text>
      {subtitle ? <Text className="text-slate-soft text-base">{subtitle}</Text> : null}
    </View>
  );
}

function SkillStep({
  title,
  subtitle,
  value,
  onChange,
}: {
  title: string;
  subtitle?: string;
  value: SkillRating | null;
  onChange: (v: SkillRating) => void;
}) {
  return (
    <>
      <StepHeader title={title} subtitle={subtitle} />
      <View className="gap-2.5">
        <OptionCard
          label="Yes, consistently"
          description="I can land it reliably"
          selected={value === 2}
          onPress={() => onChange(2)}
        />
        <OptionCard
          label="Kind of, but inconsistently"
          description="It happens on good days"
          selected={value === 1}
          onPress={() => onChange(1)}
        />
        <OptionCard label="Not yet" selected={value === 0} onPress={() => onChange(0)} />
      </View>
    </>
  );
}
