import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import useUser from "@/hooks/useUser";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { accessVault, changePIN } from "@/database/database";

const SettingsScreen = () => {
  const { userId, isLoggedIn, setIsLoggedIn, setUser, setUserId } = useUser();
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAboutModalVisible, setIsAboutModalVisible] = useState(false);
  const [currentPIN, setCurrentPIN] = useState(["", "", "", ""]);
  const [newPIN, setNewPIN] = useState(["", "", "", ""]);
  const [isChangingPIN, setIsChangingPIN] = useState(false);

  const currentPinRefs = useRef([]);
  const newPinRefs = useRef([]);

  useFocusEffect(
    React.useCallback(() => {
      if (!isLoggedIn) {
        router.replace("/screens/AccessVault");
      }
    }, [isLoggedIn])
  );

  const handleLogout = async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    setUser(null);
    setUserId(null);
    setIsLoggedIn(false);
    await AsyncStorage.removeItem("userId");
    router.replace("/screens/LoginScreen");
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleChangePIN = async () => {
    try {
      const pinFromDB = await accessVault(userId);
      const inputPIN = currentPIN.join("");
      const changedPIN = newPIN.join("");

      console.log("Pinf from db", pinFromDB);
      console.log("Changed pin", changedPIN);

      if (!inputPIN.trim() || !changedPIN.trim()) {
        Alert.alert("Error", "PIN can't be empty");
        return;
      }

      if (inputPIN.length !== 4 || changedPIN.length !== 4) {
        Alert.alert("Error", "PIN must be 4 digits");
        return;
      }

      if (pinFromDB.error) {
        Alert.alert("Error", pinFromDB.error);
        return;
      }

      if (pinFromDB !== inputPIN) {
        Alert.alert("Error", "Incorrect PIN");
        return;
      }

      const changeResult = await changePIN(changedPIN, userId);
      if (changeResult.error) {
        Alert.alert("Error", changeResult.error);
        return;
      }

      Alert.alert("Success", "PIN changed successfully");
      setIsModalVisible(false);
      setCurrentPIN(["", "", "", ""]);
      setNewPIN(["", "", "", ""]);
    } catch (error) {
      console.error("Error in handleChangePIN:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };

  const handleInputFocus = (value, index, pinArray, setPinArray, refsArray) => {
    const newPIN = [...pinArray];
    newPIN[index] = value;
    setPinArray(newPIN);

    setTimeout(() => {
      if (
        value &&
        index < pinArray.length - 1 &&
        refsArray.current[index + 1]
      ) {
        refsArray.current[index + 1].focus();
      } else if (!value && index > 0 && refsArray.current[index - 1]) {
        refsArray.current[index - 1].focus();
      }
    }, 100); // Adding a small delay to ensure state update is processed
  };

  const handleOpenAboutModal = () => {
    setIsAboutModalVisible(true);
  };

  const handleCloseAboutModal = () => {
    setIsAboutModalVisible(false);
  };

  return (
    <View className="flex-1 p-6 justify-center bg-stone-900">
      {/* Security Settings Section */}
      <View className="mb-4">
        <Text className="text-2xl text-slate-100 font-bold mb-4">
          Security Settings
        </Text>

        <View className="flex gap-y-3">
          <TouchableOpacity
            onPress={handleOpenModal}
            className="flex flex-row items-center bg-stone-800 p-4 rounded-lg"
          >
            <Ionicons name="keypad-outline" size={24} color="white" />
            <Text className="text-slate-100 text-l font-bold mx-2 flex-1">
              Change PIN
            </Text>
            <Feather name="chevron-right" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity className="flex flex-row items-center bg-stone-800 p-4 rounded-lg">
            <Ionicons name="settings-outline" size={24} color="white" />
            <Text className="text-slate-100 text-l font-bold mx-2 flex-1">
              Account Settings
            </Text>
            <Feather name="chevron-right" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text className="text-2xl text-slate-100 font-bold mb-4">
          Appearances
        </Text>
        <TouchableOpacity className="flex flex-row items-center mb-3 bg-stone-800 p-4 rounded-lg">
          <Ionicons name="color-palette-outline" size={24} color="white" />
          <Text className="text-slate-100 text-l font-bold mx-2 flex-1">
            Theme
          </Text>
          <Feather name="chevron-right" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {/* Support Section */}
      <View>
        <Text className="text-2xl text-slate-100 font-bold mb-4">Support</Text>

        <View className="flex gap-y-3">
          <TouchableOpacity className="flex flex-row items-center bg-stone-800 p-4 rounded-lg">
            <Ionicons name="notifications-outline" size={24} color="white" />
            <Text className="text-slate-100 text-l font-bold mx-2 flex-1">
              Notifications
            </Text>
            <Feather name="chevron-right" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity className="flex flex-row items-center bg-stone-800 p-4 rounded-lg">
            <Ionicons name="help-circle-outline" size={24} color="white" />
            <Text className="text-slate-100 text-l font-bold mx-2 flex-1">
              Help and Support
            </Text>
            <Feather name="chevron-right" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleOpenAboutModal}
            className="flex flex-row items-center bg-stone-800 p-4 rounded-lg"
          >
            <Ionicons
              name="information-circle-outline"
              size={24}
              color="white"
            />
            <Text className="text-slate-100 text-l font-bold mx-2 flex-1">
              About Crawl Vault
            </Text>
            <Feather name="chevron-right" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Others Section */}
      <View>
        <Text className="text-2xl mt-3 text-slate-100 font-bold mb-4">
          Others
        </Text>

        <View className="flex gap-y-3">
          <TouchableOpacity
            onPress={handleLogout}
            className="flex flex-row items-center bg-stone-800 p-4 rounded-lg"
          >
            <Ionicons name="log-out-outline" size={24} color="white" />
            <Text className="text-slate-100 text-l font-bold mx-2 flex-1">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* PIN Change Modal */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-stone-800 p-6 rounded-lg w-80">
            <Text className="text-2xl text-slate-100 mb-4">Change PIN</Text>

            <Text className="text-slate-100 mb-2">Enter Current PIN:</Text>
            <View className="flex-row justify-between mb-4">
              {currentPIN.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (currentPinRefs.current[index] = ref)}
                  className="border border-white text-slate-100 text-center text-3xl p-3 rounded-lg w-14 h-14"
                  keyboardType="numeric"
                  maxLength={1}
                  value={digit}
                  onChangeText={(value) =>
                    handleInputFocus(
                      value,
                      index,
                      currentPIN,
                      setCurrentPIN,
                      currentPinRefs
                    )
                  }
                />
              ))}
            </View>

            <Text className="text-slate-100 mb-2">Enter New PIN:</Text>
            <View className="flex-row justify-between mb-4">
              {newPIN.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (newPinRefs.current[index] = ref)}
                  className="border border-white text-slate-100 text-center text-3xl p-3 rounded-lg w-14 h-14"
                  keyboardType="numeric"
                  maxLength={1}
                  value={digit}
                  onChangeText={(value) =>
                    handleInputFocus(
                      value,
                      index,
                      newPIN,
                      setNewPIN,
                      newPinRefs
                    )
                  }
                />
              ))}
            </View>

            <TouchableOpacity
              onPress={handleChangePIN}
              className="bg-green-600 mb-3 p-3 rounded-lg"
            >
              <Text className="text-white text-center text-lg">Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCloseModal}
              className="bg-stone-600 p-3 rounded-lg"
            >
              <Text className="text-white text-center text-lg">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* About Modal */}
      <Modal
        transparent={true}
        visible={isAboutModalVisible}
        animationType="slide"
        onRequestClose={handleCloseAboutModal}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-stone-800 p-6 rounded-lg w-80">
            <Text className="text-2xl text-slate-100 mb-4">
              About Crawl Vault
            </Text>
            <Text className="text-slate-100 mb-4">
              Crawl Vault is a secure and user-friendly password management app
              designed to simplify your digital life. With features such as
              secure PIN-based access and easy password storage, Crawl Vault
              ensures your credentials are protected while remaining easily
              accessible.
            </Text>
            <Text className="text-slate-100 mb-4">
              Developed by 𝕄𝔼𝕁𝕀𝔻 (netcrawler)
            </Text>
            <Text className="text-slate-100 mb-4">
              {/* <Text className="font-bold">Contact:</Text> */}
              {/* {"\n"}- Telegram: @netcrawler_ish */}
              {/* {"\n"}- GitHub: netcrawlerr
              {"\n"}- Website: [Your Website URL]
              {"\n"}- LinkedIn: [Your LinkedIn URL] */}
            </Text>
            <TouchableOpacity
              onPress={handleCloseAboutModal}
              className="bg-stone-600 p-3 rounded-lg"
            >
              <Text className="text-white text-center text-lg">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SettingsScreen;
