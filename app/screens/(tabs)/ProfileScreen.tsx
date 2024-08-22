import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useUser from "@/hooks/useUser";
import { useFocusEffect } from "@react-navigation/native";
import { fetchSingleUser, updateUser } from "@/database/database";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const { userId } = useUser();
  console.log("User id in profile screen", userId);

  const handleSavePress = async () => {
    if (password.length < 8) {
      Alert.alert(
        "You are doing it wrong",
        "Password must be at least 8 characters long"
      );
      return;
    }

    if (!name.trim()) {
      Alert.alert("You are doing it wrong", "Name cannot be empty");
      return;
    }

    try {
      await updateUser(name, password, userId);
      Alert.alert("Success", "Profile saved successfully");
    } catch (error) {
      Alert.alert("Error", "Failed to save profile");
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchUser = async () => {
        const user = await fetchSingleUser(userId);
        // console.log("FetchedSingle User", user);
        setName(user.name);
        setEmail(user.email);
        setPassword(user.password);
      };
      fetchUser();
    }, [userId])
  );

  return (
    <View className="flex-1 p-5 bg-stone-900 justify-center items-center">
      <View className="flex flex-row items-center mb-6">
        <Image
          // source={require("../../../assets/images/user.gif")}
          source={require("../../../assets/images/user.png")}
          className="w-24 h-24 rounded-full border-2 border-slate-200"
        />
        <View className="ml-4">
          <Text className="text-3xl text-slate-100 font-bold">Profile</Text>
          <Text className="text-slate-300 text-lg">
            Manage your profile details
          </Text>
        </View>
      </View>

      <View className="bg-stone-800 p-6 rounded-lg w-full max-w-md">
        <Text className="text-2xl text-slate-100 font-bold mb-4">
          Profile Details
        </Text>
        <View className="space-y-3">
          <View className="bg-stone-800 rounded-lg">
            <TextInput
              value={name}
              onChangeText={setName}
              className="text-slate-100 border border-white py-3 px-4 text-lg font-bold"
              placeholder="Name"
            />
          </View>

          <View className="bg-stone-800 rounded-lg">
            <TextInput
              value={email}
              onChangeText={setEmail}
              className="text-slate-100 border border-white py-3 px-4 text-lg font-bold"
              placeholder="Email"
              keyboardType="email-address"
              editable={false}
            />
          </View>

          <View className="bg-stone-800 rounded-lg relative">
            {/* <TextInput
              value={password}
              onChangeText={setPassword}
              className="text-slate-100 border border-white py-3 pl-4 pr-12 text-lg font-bold"
              placeholder="Change Password"
              placeholderTextColor={"gray"}
              secureTextEntry={!isPasswordVisible}
            /> */}
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
