import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding/index" />
      <Stack.Screen name="auth/signin" />
      <Stack.Screen name="auth/signup" />
      <Stack.Screen name="auth/forgot-password" />
      <Stack.Screen name="auth/otp-verification" />
      <Stack.Screen name="auth/reset-password" />
      <Stack.Screen name="subscription/index" />
      <Stack.Screen name="subscription/plans" />
    </Stack>
  );
}
