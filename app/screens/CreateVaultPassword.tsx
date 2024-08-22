import React, { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useGlobalSearchParams, Link } from "expo-router";
import { createVault } from "@/database/database";
import useUser from "../../hooks/useUser";

const CreateVaultPassword = () => {
  const { isLoggedIn } = useUser();
  console.log("Is User Logged In(CREATE___VAULT)", isLoggedIn);
  const [code, setCode] = useState(["", "", "", ""]);
  const router = useRouter();

  const { userId: userIdFromParams } = useGlobalSearchParams();

  const { userId, setUserId } = useUser((state) => ({
    userId: state.userId,
    setUserId: state.setUserId,
  }));

  useEffect(() => {
    if (userIdFromParams) {
      setUserId(userIdFromParams);
    }
  }, [userIdFromParams, setUserId]);

  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (value, index) => {
    if (value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSetVault = async () => {
    console.log("Code set is ", code.join(""));
    console.log("User ID is ", userId);
    console.log("created Codev---------", code.join(""));

    try {
      const createdVault = await createVault(userId, code.join(""));
      console.log("Created Vault", createdVault);

      router.replace("/screens/LoginScreen");
    } catch (error) {
      console.log("error from create vault", error);
    }
  };

  return (
    <View className="flex-1 justify-center p-6 bg-stone-900 h-screen">
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-10 left-5"
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <Image
        className="w-[100px] h-[100px] text-center mx-auto mb-8"
        source={require("../../assets/images/padlock.png")}
      />
      <Text className="text-5xl font-bold mb-4 text-green-500">
        Setup Vault
      </Text>
      <Text className="text-3xl font-bold mb-4 text-slate-100">Create</Text>
      <Text className="text-3xl font-bold mb-4 text-slate-100">
        A New 4-Digit Code
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
        onPress={handleSetVault}
        className="bg-green-600 px-32 py-3 rounded-lg mb-2"
      >
        <Text className="text-slate-100 text-center text-xl">Set Code</Text>
      </TouchableOpacity>

      <Link href={"/screens/SignupScreen"} className="mt-2 text-blue-400 mb-2">
        Don't Have an account? Signup
      </Link>
    </View>
  );
};

export default CreateVaultPassword;
