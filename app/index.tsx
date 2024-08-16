import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import OnboardingOne from "./screens/onboarding/OnboardingOne";
import SplashScreen from "./screens/SplashScreen";
import Dashboard from "./screens/Dashboard";

const Home = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-stone-900 h-screen">
      {showSplash ? (
        <SplashScreen />
      ) : isLoggedIn ? (
        <Dashboard />
      ) : (
        <OnboardingOne />
      )}
      {/* <OnboardingOne /> */}
    </View>
  );
};

export default Home;
