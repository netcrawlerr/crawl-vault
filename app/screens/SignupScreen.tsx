import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SignupScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <View className="flex-1 justify-center p-6 h-screen bg-stone-900">
      {/* Back Icon */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-10 left-5"
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <Text className="text-3xl font-bold mb-3 text-slate-100">Enter your</Text>
      <Text className="text-3xl font-bold mb-6 text-slate-100">Email</Text>

      <TextInput
        className="border border-white text-slate-100 p-3 mb-4 rounded"
        placeholder="Name"
        placeholderTextColor="gray"
        value={name}
        onChangeText={setName}
      />
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
        href={"/screens/SignupScreen"}
      >
        <TouchableOpacity>
          <Text className="text-slate-100 text-center text-xl">Sign up</Text>
        </TouchableOpacity>
      </Link>

      <Link href={"/screens/LoginScreen"} className="mt-2 text-blue-400 mb-2">
        Already have an account? Login
      </Link>

      <View className="mt-5">
        <Text className="text-stone-400">
          By continuing, you agree to our{" "}
          <Text className="text-white">Terms of Service</Text> and{" "}
          <Text className="text-white">Privacy Policy</Text>. Your data will be
          used according to our privacy practices, and your use of the app is
          subject to the terms outlined. Please review these carefully.{" "}
        </Text>
      </View>
    </View>
  );
};

export default SignupScreen;
