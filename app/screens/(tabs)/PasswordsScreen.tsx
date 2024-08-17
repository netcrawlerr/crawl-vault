import React, { useState } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";

const PasswordsScreen = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalVisible, setModalVisible] = useState(false);
  const [editingData, setEditingData] = useState({
    website: "",
    username: "",
    password: "",
    category: "",
  });

  const [passwords, setPasswords] = useState([
    {
      id: "1",
      website: "Gmail",
      username: "michael.smith@gmail.com",
      password: "M1chael$2024",
      category: "personal",
    },
    {
      id: "2",
      website: "Facebook",
      username: "emily.johnson",
      password: "Emily@FB2024",
      category: "social",
    },
    {
      id: "3",
      website: "GitHub",
      username: "robert.brown",
      password: "R0b3rt#GitHub",
      category: "work",
    },
    {
      id: "4",
      website: "Amazon",
      username: "olivia.martinez@amazon.com",
      password: "0livia$2024",
      category: "personal",
    },
    {
      id: "5",
      website: "Netflix",
      username: "david.clark",
      password: "D@vid2024!",
      category: "personal",
    },
  ]);

  const filteredPasswords = passwords.filter(
    (password) =>
      (selectedCategory === "all" || password.category === selectedCategory) &&
      (password.username.toLowerCase().includes(search.toLowerCase()) ||
        password.website.toLowerCase().includes(search.toLowerCase()))
  );

  const copyToClipboard = (password) => {
    Clipboard.setString(password);
    alert("Password copied to clipboard!");
  };

  const openEditModal = (data) => {
    setEditingData(data);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSave = () => {
    const updatedPasswords = passwords.map((password) =>
      password.id === editingData.id ? editingData : password
    );
    setPasswords(updatedPasswords);
    closeModal();
  };

  const router = useRouter();

  return (
    <View className="flex-1 p-6 bg-stone-900">
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
          <Text className="text-slate-100 text-center text-xl">All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedCategory("personal")}
          className={`flex-1 py-3 rounded-lg mx-1 ${
            selectedCategory === "personal" ? "bg-stone-800" : "bg-stone-600"
          }`}
        >
          <Text className="text-slate-100 text-center text-xl">Personal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedCategory("work")}
          className={`flex-1 py-3 rounded-lg mx-1 ${
            selectedCategory === "work" ? "bg-stone-800" : "bg-stone-500"
          }`}
        >
          <Text className="text-slate-100 text-center text-xl">Work</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedCategory("social")}
          className={`flex-1 py-3 rounded-lg mx-1 ${
            selectedCategory === "social" ? "bg-stone-800" : "bg-stone-400"
          }`}
        >
          <Text className="text-slate-100 text-center text-xl">Social</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="mt-5">
        <View className="flex gap-y-3">
          {filteredPasswords.map((password) => (
            <View
              key={password.id}
              className="flex-row bg-stone-800 p-4 rounded-lg items-center"
            >
              <Image
                source={{ uri: "https://via.placeholder.com/80" }}
                className="w-12 h-12 rounded-full mr-4"
              />
              <View className="flex-1">
                <Text className="text-slate-100 text-lg font-bold">
                  {password.username}
                </Text>
                <Text
                  className="text-slate-300 text-sm mt-1"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {password.password}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => copyToClipboard(password.password)}
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
              Edit Password
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
