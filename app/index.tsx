import { View } from "react-native";
import React, { useEffect, useState } from "react";
import SplashScreen from "./screens/SplashScreen";
import OnboardingOne from "./screens/onboarding/OnboardingOne";
import LoginScreen from "./screens/LoginScreen";
import Main from "./screens/Main";
import AccessVault from "./screens/AccessVault";
import useUser from "@/hooks/useUser";
import { initDB } from "@/database/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  initDB();
  const [showSplash, setShowSplash] = useState(true);
  const {
    isLoggedIn,
    isRegistered,
    setIsRegistered,
    setIsLoggedIn,
    userId,
    setUserId,
  } = useUser();

  console.log("Is User Logged In___APP START", isLoggedIn);
  console.log("Is User Registeres In___APP START", isRegistered);

  useEffect(() => {
    const loadInitialData = async () => {
      // Check if the user is registered
      const registeredStatus = await AsyncStorage.getItem("isRegistered");
      if (registeredStatus === "true") {
        setIsRegistered(true);
      }

      // Check if the user is logged in
      const loggedInStatus = await AsyncStorage.getItem("isLoggedIn");
      if (loggedInStatus === "true") {
        setIsLoggedIn(true);
        const savedUserId = await AsyncStorage.getItem("userId");
        setUserId(savedUserId);
      }
    };

    loadInitialData();

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [setIsLoggedIn, setIsRegistered, setUserId]);
  console.log("User is when loading is ", userId);

  return (
    // <View className="flex-1 bg-stone-900 h-screen">
    //   {showSplash ? (
    //     <SplashScreen />
    //   ) : isRegistered ? (
    //     isLoggedIn ? (
    //       <Main />
    //     ) : (
    //       <AccessVault />
    //     )
    //   ) : (
    //     <OnboardingOne />
    //   )}
    // </View>
    <View className="flex-1 bg-stone-900 h-screen">
      {showSplash ? (
        <SplashScreen />
      ) : isLoggedIn ? (
        <AccessVault />
      ) : (
        <OnboardingOne />
      )}
    </View>
  );
};

export default Home;
