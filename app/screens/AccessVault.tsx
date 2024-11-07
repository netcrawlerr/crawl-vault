import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useRouter, useGlobalSearchParams, Link } from "expo-router";
import { accessVault } from "@/database/database";
import useUser from "../../hooks/useUser";

const AccessVault = () => {
  const { isLoggedIn, setIsLoggedIn, isRegistered, setIsRegistered } =
    useUser();

  console.log("Is User Logged In ACCESS---_VAULT", isLoggedIn);
  console.log("Is User Registered In ACCESS---_VAULT", isRegistered);

  const [code, setCode] = useState(["", "", "", ""]);
  const router = useRouter();

  const { userId: userIdFromParams } = useGlobalSearchParams();

  const { userId, setUserId } = useUser((state) => ({
    userId: state.userId,
    setUserId: state.setUserId,
  }));

  console.log("Accessing Vault userid", userId);

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

      if (result.error) {
        console.log("Vault Access Error:", result.error);
        Alert.alert("Error", "Failed to access vault. Please try again.");
        return;
      }

      const storedCode = result;

      if (userInputCode === storedCode) {
        setIsLoggedIn(true);
        router.replace("/screens/Main");
      } else {
        console.log("Incorrect PIN");
        Alert.alert("Error", "Incorrect PIN");
      }

      setCode(["", "", "", ""]);
    } catch (error) {
      console.error("Error in handleAccessVault:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
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

      <Link href={"/screens/SignupScreen"} className="mt-2 text-blue-400 mb-2">
        Back to SignUp | Login
      </Link>
    </View>
  );
};

export default AccessVault;
