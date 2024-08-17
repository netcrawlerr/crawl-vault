import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const ProfileScreen = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [password, setPassword] = useState("21387ህ#2ጁህድ#");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleSavePress = () => {};

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <View className="flex-1 p-5 bg-stone-900 justify-center items-center">
      {/* Profile Header */}
      <View className="flex flex-row items-center mb-6">
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          className="w-24 h-24 rounded-full border-2 border-slate-200"
        />
        <View className="ml-4">
          <Text className="text-3xl text-slate-100 font-bold">Profile</Text>
          <Text className="text-slate-300 text-lg">
            Manage your profile details
          </Text>
        </View>
      </View>

      {/* Profile Details Section */}
      <View className="bg-stone-800 p-6 rounded-lg w-full max-w-md">
        <Text className="text-2xl text-slate-100 font-bold mb-4">
          Profile Details
        </Text>
        <View className="space-y-3">
          {/* Name Field */}
          <View className="bg-stone-800 rounded-lg">
            <TextInput
              value={name}
              onChangeText={setName}
              className="text-slate-100 border border-white py-3 px-4 text-lg font-bold"
              placeholder="Name"
            />
          </View>

          {/* Email Field */}
          <View className="bg-stone-800 rounded-lg">
            <TextInput
              value={email}
              onChangeText={setEmail}
              className="text-slate-100 border border-white py-3 px-4 text-lg font-bold"
              placeholder="Email"
              keyboardType="email-address"
            />
          </View>

          {/* Password Field */}
          <View className="bg-stone-800 rounded-lg relative">
            <TextInput
              value={password}
              onChangeText={setPassword}
              className="text-slate-100 border border-white py-3 pl-4 pr-12 text-lg font-bold"
              placeholder="Change Password"
              placeholderTextColor={"gray"}
              secureTextEntry={!isPasswordVisible}
            />
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              className="absolute right-4 top-[15px] transform  -translate-y-1/2"
            >
              <Ionicons
                name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>

          {/* Save Profile Button */}
          <TouchableOpacity
            onPress={handleSavePress}
            className="bg-green-600 rounded-lg py-3 border"
          >
            <Text className="text-slate-100 text-center text-xl font-bold">
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
