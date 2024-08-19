import { View } from "react-native";
import React, { useEffect, useState } from "react";
import SplashScreen from "./screens/SplashScreen";
import OnboardingOne from "./screens/onboarding/OnboardingOne";
import LoginScreen from "./screens/LoginScreen";
import Main from "./screens/Main";
import AccessVault from "./screens/AccessVault";
import useUser from "@/hooks/useUser";
import { initDB } from "@/database/database";

const Home = () => {
  initDB();
  const [showSplash, setShowSplash] = useState(true);
  const { isLoggedIn, isRegistered } = useUser();

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
      ) : isRegistered ? (
        isLoggedIn ? (
          <Main />
        ) : (
          <AccessVault />
        )
      ) : (
        <OnboardingOne />
      )}
    </View>
  );
};

export default Home;
