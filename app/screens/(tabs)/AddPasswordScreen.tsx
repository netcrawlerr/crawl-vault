import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard,
  Animated,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const AddPasswordScreen = () => {
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

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

  const handlePress = () => {
    console.log("Website:", website);
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Category:", category);
  };

  return (
    <View className="flex-1 justify-center p-6 bg-stone-900">
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
            color: "white", // text color
            backgroundColor: "transparent", // background color
          }}
        >
          <Picker.Item label="Personal" value="personal" />
          <Picker.Item label="Work" value="work" />
          <Picker.Item label="Social" value="social" />
          <Picker.Item label="Business" value="business" />
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
