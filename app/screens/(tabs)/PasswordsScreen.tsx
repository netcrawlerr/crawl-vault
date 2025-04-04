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
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import useStore from "@/hooks/usePassword";
import useUser from "@/hooks/useUser";
import {
  deletePassword,
  getAllPasswords,
  updatePasswordDB,
} from "@/database/database";

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
        setPasswords(fetchedPasswords);
      };
      fetchPasswords();
    }, [userId, selectedCategory])
  );

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

  const copyToClipboard = (password) => {
    Clipboard.setString(password);
    alert("Password copied to clipboard!");
  };

  const openEditModal = (data) => {
    setEditingData({
      id: data.password_id,
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

  // Save   tomy store
  const handleSave = async () => {
    if (
      editingData.website.length == 0 ||
      editingData.username.length == 0 ||
      editingData.password.length == 0 ||
      editingData.category.length == 0
    ) {
      Alert.alert("Error", "Fields Cannot be empty");
      return;
    }
    await updatePasswordDB(
      editingData.website,
      editingData.username,
      editingData.password,
      editingData.category,
      userId,
      editingData.id
    );
    updatePassword(editingData);
    // i have to fetch again to avoid delayed uodate of ui
    const fetchedPasswords = await getAllPasswords(userId);
    setPasswords(fetchedPasswords);

    closeModal();
  };

  return (
    <View className="flex-1 p-6 h-screen bg-stone-900">
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
              <TouchableOpacity
                onPress={async () => {
                  await deletePassword(password.password_id);
                  const fetchedPasswords = await getAllPasswords(userId);
                  setPasswords(fetchedPasswords);
                }}
                className="w-12 h-12"
              >
                <View
                  style={{
                    height: 40,
                    width: 40,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="trash-bin" size={30} color="#725466" />
                </View>
              </TouchableOpacity>
              <View className="flex-1">
                <Text className="text-green-500 text-l font-bold">
                  {password.website_name}
                </Text>
                <Text className="text-slate-100 text-l font-bold">
                  {password.website_user}
                </Text>
                <Text
                  className="text-slate-300 text-sm mt-1"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {password.website_password}{" "}
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

      {/* lets edit  */}
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
              autoCapitalize="none"
            />
            <TextInput
              className="border border-white text-slate-100 p-3 rounded mb-4"
              placeholder="Username"
              placeholderTextColor="#afffff"
              value={editingData.username}
              onChangeText={(text) =>
                setEditingData({ ...editingData, username: text })
              }
              autoCapitalize="none"
            />
            <TextInput
              className="border border-white text-slate-100 p-3 rounded mb-4"
              placeholder="Password"
              placeholderTextColor="#afffff"
              value={editingData.password}
              onChangeText={(text) =>
                setEditingData({ ...editingData, password: text })
              }
              autoCapitalize="none"
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
                className="bg-green-600 p-2 rounded py-3"
              >
                <Text className="text-white text-center text-l">Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={closeModal}
                className="bg-stone-600 p-2 rounded py-3"
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
