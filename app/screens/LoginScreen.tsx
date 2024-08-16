import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <View className="flex-1 justify-center p-6 bg-stone-900 h-screen ">
      {/* Back Icon */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-10 left-5"
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text className="text-3xl text-center font-bold mb-4 text-slate-100">
        Login
      </Text>

      <TextInput
        className="border border-white text-slate-100 p-3 mb-4 rounded"
        placeholder="Email"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="border border-white text-slate-100 p-3 mb-4 rounded"
        placeholder="Password"
        placeholderTextColor="gray"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Link
        className="bg-green-600 px-36 py-3 rounded-lg mb-2"
        href={"/screens/CreateVaultPassword"}
      >
        <TouchableOpacity>
          <Text className="text-slate-100 text-center text-xl">
            <Link href={"/screens/CreateVaultPassword"}>Login</Link>
          </Text>
        </TouchableOpacity>
      </Link>
      <Link href={"/screens/SignupScreen"} className="mt-2 text-blue-400 mb-2">
        Don't Have an account? Signup
      </Link>
    </View>
  );
};

export default LoginScreen;
