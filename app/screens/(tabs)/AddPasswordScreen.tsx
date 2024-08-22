import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard,
  Animated,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import useStore from "@/hooks/usePassword";
import { addPasswordToDB } from "@/database/database";
import useUser from "@/hooks/useUser";

const AddPasswordScreen = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const { userId } = useUser();

  const {
    website,
    username,
    password,
    category,
    setWebsite,
    setUsername,
    setPassword,
    setCategory,
    addPassword,
  } = useStore();

  const handlePress = async () => {
    // Validation
    if (!website.trim() || !username.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill out all required fields.");
      return;
    }

    const newPassword = {
      website,
      username,
      password,
      category,
    };
    addPassword(newPassword); // to  Zustand store

    const addedPassword = await addPasswordToDB(
      userId,
      website,
      username,
      password,
      category
    );

    console.log("Added password from Frontend", addedPassword);

    setWebsite("");
    setUsername("");
    setPassword("");
    setCategory("");
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
        Animated.timing(slideAnim, {
          toValue: -150,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [slideAnim]);

  return (
    <View className="flex-1 justify-center h-screen p-6 bg-stone-900">
      {!isKeyboardVisible && (
        <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
          <Image
            className="w-[120px] h-[120px] flex mx-auto mb-5"
            source={require("../../../assets/images/lock-document.png")}
          />
        </Animated.View>
      )}
      <Text className="text-3xl text-slate-100 font-bold mb-6">
        Add New Password
      </Text>
      <TextInput
        className="border text-slate-100 border-white p-3 mb-4 rounded"
        placeholder="Website/App Name"
        placeholderTextColor={"gray"}
        value={website}
        onChangeText={setWebsite}
        autoCapitalize="none"
      />
      <TextInput
        className="border text-slate-100 border-white p-3 mb-4 rounded"
        placeholder="Username/Email"
        placeholderTextColor={"gray"}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        className="border text-slate-100 border-white p-3 mb-4 rounded"
        placeholder="Password"
        placeholderTextColor={"gray"}
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        autoCapitalize="none"
      />
      <Text className="text-slate-100 text-xl mb-2">Select Category</Text>

      <View className="border border-white rounded mb-4">
        <Picker
          dropdownIconColor={"#fff"}
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={{
            color: "white",
            backgroundColor: "transparent",
          }}
        >
          <Picker.Item label="Personal" value="personal" />
          <Picker.Item label="Work" value="work" />
          <Picker.Item label="Social" value="social" />
        </Picker>
      </View>

      <TouchableOpacity
        onPress={handlePress}
        className="bg-green-600 px-30 py-3 rounded-lg mb-2"
      >
        <Text className="text-slate-100 text-center text-xl">Add Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddPasswordScreen;
