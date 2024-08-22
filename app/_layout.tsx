// app/_layout.tsx
import React from "react";
import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="screens/onboarding/OnboardingOne" />
      <Stack.Screen name="screens/onboarding/OnboardingTwo" />
      <Stack.Screen name="screens/LoginScreen" />
      <Stack.Screen name="screens/SignupScreen" />
      <Stack.Screen name="screens/Main" />
    </Stack>
  );
}
