import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useGlobalSearchParams } from "expo-router";
import { accessVault } from "@/database/database";
import useUser from "../../hooks/useUser"; // Import Zustand store

const AccessVault = () => {
  const { isLoggedIn, setIsLoggedIn, isRegistered, setIsRegistered } =
    useUser();

  console.log("Is User Logged In ACCESS---_VAULT", isLoggedIn);
  console.log("Is User Registered In ACCESS---_VAULT", isRegistered);

  const [code, setCode] = useState(["", "", "", ""]);
  const router = useRouter();
  // Extract userId from URL parameters
  const { userId: userIdFromParams } = useGlobalSearchParams();

  const { userId, setUserId } = useUser((state) => ({
    userId: state.userId,
    setUserId: state.setUserId,
  }));

  console.log("Accessing Vault userid", userId);

  // Update Zustand store with userId from URL params
  useEffect(() => {
    if (userIdFromParams) {
      setUserId(userIdFromParams);
    }
  }, [userIdFromParams, setUserId]);

  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  const handleBackspace = (value, index) => {
    if (value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleAccessVault = async () => {
    try {
      const userInputCode = code.join("");
      console.log("User Input Code:", userInputCode);

      const result = await accessVault(userId);
      console.log("Result from handleAccessVault:", result);

      const isCorrectCode = userInputCode === result.code;
      console.log("Is Correct Code:", isCorrectCode);

      if (isCorrectCode) {
        setIsLoggedIn(true); // Only set as logged in if the code is correct
        setUserId(userId); // Persist the user ID in the store
        router.replace("/screens/Main"); // Use replace instead of push to prevent back navigation to AccessVault
      } else {
        console.log("Incorrect PIN");
        // Optionally, you can show an error message here.
      }

      // Reset the code inputs
      setCode(["", "", "", ""]);
    } catch (error) {
      console.log("Error in handleAccessVault:", error);
    }
  };

  return (
    <View className="flex-1 justify-center p-6 bg-stone-900 h-screen">
      <Image
        className="w-[100px] h-[100px] text-center mx-auto mb-8"
        source={require("../../assets/images/padlock.png")}
      />
      <Text className="text-5xl font-bold mb-4 text-green-500">
        Enter Vault
      </Text>
      <Text className="text-3xl font-bold mb-4 text-slate-100">
        Enter the 4-Digit Code
      </Text>

      <View className="flex-row justify-center mb-6 space-x-8">
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            className="border border-white text-slate-100 text-center text-3xl p-3 rounded-lg w-14 h-14"
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleChange(value, index)}
            onKeyPress={({ nativeEvent }) =>
              nativeEvent.key === "Backspace"
                ? handleBackspace(digit, index)
                : null
            }
          />
        ))}
      </View>

      <TouchableOpacity
        onPress={handleAccessVault}
        className="bg-green-600 px-32 py-3 rounded-lg mb-2"
      >
        <Text className="text-slate-100 text-center text-xl">Let Me Pass</Text>
      </TouchableOpacity>

      <Text className="mt-2 text-blue-400 mb-2">Forgot code ?</Text>
    </View>
  );
};

export default AccessVault;
