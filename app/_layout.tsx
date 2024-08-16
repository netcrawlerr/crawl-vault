import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hide headers globally
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="/screens/onboarding/OnboardingOne" />
      <Stack.Screen name="/screens/onboarding/OnboardingTwo" />
      <Stack.Screen name="/screens/SignupScreen" />
      <Stack.Screen name="/screens/LoginScreen" />
    </Stack>
  );
};

export default RootLayout;
