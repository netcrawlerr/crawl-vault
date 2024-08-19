import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import useStore from "@/hooks/usePassword";
import useUser from "@/hooks/useUser";
import { getAllPasswords, initDB } from "@/database/database";

const PasswordsScreen = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalVisible, setModalVisible] = useState(false);
  const [editingData, setEditingData] = useState({
    id: "",
    website: "",
    username: "",
    password: "",
    category: "",
  });

  // initDB();
  const { userId } = useUser();

  const { setPasswords, passwords, updatePassword } = useStore((state) => ({
    setPasswords: state.setPasswords,
    passwords: state.passwords,
    updatePassword: state.updatePassword,
  }));

  useFocusEffect(
    React.useCallback(() => {
      const fetchPasswords = async () => {
        const fetchedPasswords = await getAllPasswords(userId);
        // console.log("Effect", fetchedPasswords);
        setPasswords(fetchedPasswords);
      };
      fetchPasswords();
    }, [userId, selectedCategory])
  );

  // console.log("passwords", passwords);

  const displayedPasswords = Array.isArray(passwords) ? passwords : [];

  const filteredPasswords = displayedPasswords.filter(
    (password) =>
      (selectedCategory === "all" || password.category === selectedCategory) &&
      (String(password.website_user)
        .toLowerCase()
        .includes(search.toLowerCase()) ||
        String(password.website_name)
          .toLowerCase()
          .includes(search.toLowerCase()))
  );
  // console.log(filteredPasswords);

  const copyToClipboard = (password) => {
    Clipboard.setString(password);
    alert("Password copied to clipboard!");
  };

  const openEditModal = (data) => {
    setEditingData({
      id: data.password_id, // Ensure the correct fields
      website: data.website_name,
      username: data.website_user,
      password: data.website_password,
      category: data.category,
    });
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // Save updated data to Zustand store
  const handleSave = () => {
    updatePassword(editingData); // Update password in the store
    closeModal();
  };

  const router = useRouter();

  return (
    <View className="flex-1 p-6 h-screen bg-stone-900">
      {/* <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-10 left-5"
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity> */}

      <View className="relative w-full mb-4 mt-16">
        <Ionicons
          name="search"
          color={"white"}
          size={20}
          style={{
            position: "absolute",
            top: 14,
            left: 10,
            zIndex: 1,
          }}
        />
        <TextInput
          className="border w-full border-white text-slate-100 p-3 pl-10 rounded shadow-lg"
          placeholder="Search password"
          placeholderTextColor="#afffff"
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
          style={{
            paddingLeft: 40,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        />
      </View>

      <View className="flex flex-row justify-between mb-4">
        <TouchableOpacity
          onPress={() => setSelectedCategory("all")}
          className={`flex-1 py-3 rounded-lg mx-1 ${
            selectedCategory === "all" ? "bg-stone-800" : "bg-stone-700"
          }`}
        >
          <Text className="text-slate-100 text-center text-l">All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedCategory("personal")}
          className={`flex-1 py-3 rounded-lg mx-1 ${
            selectedCategory === "personal" ? "bg-stone-800" : "bg-stone-600"
          }`}
        >
          <Text className="text-slate-100 text-center text-l">Personal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedCategory("work")}
          className={`flex-1 py-3 rounded-lg mx-1 ${
            selectedCategory === "work" ? "bg-stone-800" : "bg-stone-500"
          }`}
        >
          <Text className="text-slate-100 text-center text-l">Work</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedCategory("social")}
          className={`flex-1 py-3 rounded-lg mx-1 ${
            selectedCategory === "social" ? "bg-stone-800" : "bg-stone-400"
          }`}
        >
          <Text className="text-slate-100 text-center text-l">Social</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="mt-5">
        <View className="flex gap-y-3">
          {filteredPasswords.map((password, index) => (
            <View
              key={index}
              className="flex-row bg-stone-800 p-4 rounded-lg items-center"
            >
              <Image
                source={{ uri: "https://via.placeholder.com/80" }} // Replace with actual image source if available
                className="w-12 h-12 rounded-full mr-4"
              />
              <View className="flex-1">
                <Text className="text-slate-100 text-l font-bold">
                  {password.website_user} {/* Change according to your data */}
                </Text>
                <Text
                  className="text-slate-300 text-sm mt-1"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {password.website_password}{" "}
                  {/* Change according to your data */}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => copyToClipboard(password.website_password)}
                className="ml-4"
              >
                <Ionicons name="copy-outline" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => openEditModal(password)}
                className="ml-4"
              >
                <Ionicons name="pencil-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Modal for editing password */}
      <Modal
        visible={isModalVisible}
        onRequestClose={closeModal}
        animationType="slide"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1 justify-center items-center bg-black bg-opacity-50"
        >
          <SafeAreaView className="bg-stone-800 p-6 rounded-lg w-80">
            <Text className="text-white text-lg font-bold mb-4">
              Edit Information
            </Text>
            <TextInput
              className="border border-white text-slate-100 p-3 rounded mb-4"
              placeholder="Website"
              placeholderTextColor="#afffff"
              value={editingData.website}
              onChangeText={(text) =>
                setEditingData({ ...editingData, website: text })
              }
            />
            <TextInput
              className="border border-white text-slate-100 p-3 rounded mb-4"
              placeholder="Username"
              placeholderTextColor="#afffff"
              value={editingData.username}
              onChangeText={(text) =>
                setEditingData({ ...editingData, username: text })
              }
            />
            <TextInput
              className="border border-white text-slate-100 p-3 rounded mb-4"
              placeholder="Password"
              placeholderTextColor="#afffff"
              value={editingData.password}
              onChangeText={(text) =>
                setEditingData({ ...editingData, password: text })
              }
            />
            <View className="border border-white rounded mb-4">
              <Picker
                selectedValue={editingData.category}
                onValueChange={(itemValue) =>
                  setEditingData((prev) => ({
                    ...prev,
                    category: itemValue,
                  }))
                }
                style={{
                  color: "white",
                  // backgroundColor: "#2D2D2D",
                  borderWidth: 1,
                  borderColor: "white",
                }}
              >
                <Picker.Item label="Personal" value="personal" />
                <Picker.Item label="Work" value="work" />
                <Picker.Item label="Social" value="social" />
              </Picker>
            </View>
            <View className="flex justify-center my-2 gap-y-3 ">
              <TouchableOpacity
                onPress={handleSave}
                className="bg-blue-500 p-2 rounded py-3"
              >
                <Text className="text-white text-center text-l">Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={closeModal}
                className="bg-red-500 p-2 rounded py-3"
              >
                <Text className="text-white text-center text-l">Cancel</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default PasswordsScreen;
