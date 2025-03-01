import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter, Link } from "expo-router";
import { registerUser } from "@/database/database";
import useUser from "@/hooks/useUser";

const SignupScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { setIsRegistered, setUser } = useUser();

  const validateInputs = () => {
    if (!name.trim()) {
      setMessage("Name cannot be empty");
      return false;
    }
    if (!email.trim()) {
      setMessage("Email cannot be empty");
      return false;
    }
    if (!password.trim()) {
      setMessage("Password cannot be empty");
      return false;
    }
    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long");
      return false;
    }
    setMessage("");
    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      const newUser = await registerUser(
        name.trim(),
        email.trim(),
        password.trim()
      );
      console.log("registration data ==", name, email, password);
      console.log("new user ==", newUser);

      if (newUser.error) {
        setMessage(newUser.error);
      } else {
        setMessage("Registration Successful");
        setIsRegistered(true);

        setUser({
          userId: newUser.user_id,
          name,
          email,
        });
        setIsRegistered(true);

        router.replace(
          `/screens/CreateVaultPassword?userId=${newUser.user_id}`
        );
      }
    } catch (error) {
      setMessage("Registration failed");
      console.log("Error during registration:", error);
    }
  };

  return (
    <View className="flex-1 justify-center p-6 h-screen bg-stone-900">
      <Text className="text-3xl font-bold mb-3 text-slate-100">Enter your</Text>
      <Text className="text-3xl font-bold mb-3 text-slate-100">Email</Text>

      {message ? (
        <Text
          className={
            message === "Registration Successful"
              ? "text-green-400 text-xl mb-2"
              : "text-red-400 text-xl mb-2"
          }
        >
          {message}
        </Text>
      ) : null}

      <TextInput
        className="border border-white text-slate-100 p-3 mb-4 rounded"
        placeholder="Name"
        placeholderTextColor="gray"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
      />
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
        onPress={handleRegister}
        className="bg-green-600 py-3 rounded-lg mb-2"
        style={{
          width: "100%",
          alignSelf: "center",
        }}
      >
        <Text className="text-slate-100 text-center text-xl">Sign up</Text>
      </TouchableOpacity>

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
