import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Button, Input, Label, Text, TextField } from 'heroui-native';
import { Waves } from 'lucide-react-native';

import { useAuthStore } from '@/lib/auth';

type Mode = 'signIn' | 'signUp';

export default function Auth() {
  const signUp = useAuthStore((s) => s.signUp);
  const signIn = useAuthStore((s) => s.signIn);

  const [mode, setMode] = useState<Mode>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const emailValid = /\S+@\S+\.\S+/.test(email.trim());
  const canSubmitForm = emailValid && password.length >= 6;

  const submitForm = async () => {
    setError(null);
    setBusy(true);
    try {
      const { error: e } =
        mode === 'signUp' ? await signUp(email, password) : await signIn(email, password);
      if (e) setError(e);
    } finally {
      setBusy(false);
    }
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setError(null);
  };

  return (
    <KeyboardAvoidingView
      className="bg-background flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-6 pt-safe-offset-16 pb-10 gap-6"
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center gap-3">
          <View className="bg-ocean h-16 w-16 items-center justify-center rounded-3xl">
            <Waves size={30} color="#ffffff" />
          </View>
          <Text className="text-ink text-3xl font-bold">SwellPath</Text>
          <Text className="text-slate-soft text-center text-base">
            Your pocket surf coach. Sign in to sync your training across devices.
          </Text>
        </View>

        <View className="gap-4">
          <View className="bg-default flex-row rounded-2xl p-1">
            <ModeTab
              label="Sign in"
              active={mode === 'signIn'}
              onPress={() => switchMode('signIn')}
            />
            <ModeTab
              label="Create account"
              active={mode === 'signUp'}
              onPress={() => switchMode('signUp')}
            />
          </View>

          <TextField>
            <Label>Email</Label>
            <Input
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />
          </TextField>

          <TextField>
            <Label>Password</Label>
            <Input
              placeholder="At least 6 characters"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </TextField>

          {error ? <Text className="text-coral text-sm">{error}</Text> : null}

          <Button isDisabled={!canSubmitForm || busy} onPress={submitForm}>
            <Button.Label>
              {busy ? 'Please wait…' : mode === 'signUp' ? 'Create account' : 'Sign in'}
            </Button.Label>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function ModeTab({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Button variant={active ? 'primary' : 'ghost'} size="sm" className="flex-1" onPress={onPress}>
      <Button.Label>{label}</Button.Label>
    </Button>
  );
}
