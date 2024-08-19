import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Link } from "expo-router";
import { loginUser } from "@/database/database";
import useUser from "@/hooks/useUser"; // Import Zustand store

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // State for messages
  const router = useRouter();
  const { setIsLoggedIn, setIsRegistered, setUserId, setUser, userId } =
    useUser(); // Get Zustand store methods

  const validateInputs = () => {
    if (!email.trim()) {
      setMessage("Email cannot be empty");
      return false;
    }
    if (!password.trim()) {
      setMessage("Password cannot be empty");
      return false;
    }
    setMessage(""); // Clear message if inputs are valid
    return true;
  };

  const handleLogin = async () => {
    if (!validateInputs()) {
      return; // Stop execution if validation fails
    }

    try {
      const user = await loginUser(email.trim(), password.trim());
      console.log("login data ==", email, password);
      console.log("login user ==", user);

      if (user.error) {
        setMessage(user.error); // Set error message if login fails
      } else {
        setMessage("Login successful");
        // Set user details and update registration status
        setUserId(user.user_id);
        setUser(user);
        console.log("User id after login", userId);

        setIsLoggedIn(true);
        setIsRegistered(true); // Update registration status on successful login
        router.push(`/screens/AccessVault?userId=${user.user_id}`);
      }
    } catch (error) {
      setMessage("Login failed"); // Set error message in case of failure
      console.log("Error during login:", error);
    }
  };

  return (
    <View className="flex-1 justify-center p-6 bg-stone-900 h-screen ">
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-10 left-5"
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <Text className="text-3xl text-center font-bold mb-4 text-slate-100">
        Login
      </Text>

      {message ? (
        <Text
          className={
            message === "Login successful"
              ? "text-green-400 text-xl mb-2"
              : "text-red-400 text-xl mb-2"
          }
        >
          {message}
        </Text>
      ) : null}

      <TextInput
        className="border border-white text-slate-100 p-3 mb-4 rounded"
        placeholder="Email"
        placeholderTextColor="gray"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        className="border border-white text-slate-100 p-3 mb-4 rounded"
        placeholder="Password"
        placeholderTextColor="gray"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        autoCapitalize="none"
      />

      <TouchableOpacity
        onPress={handleLogin}
        className="bg-green-600 px-36 py-3 rounded-lg mb-2"
      >
        <Text className="text-slate-100 text-center text-xl">Login</Text>
      </TouchableOpacity>

      <Link href={"/screens/SignupScreen"} className="mt-2 text-blue-400 mb-2">
        Don't have an account? Sign up
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

export default LoginScreen;
