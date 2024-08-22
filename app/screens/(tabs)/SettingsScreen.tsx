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
import { accessVault, changePassword, changePIN } from "@/database/database";

const SettingsScreen = () => {
  const { userId, isLoggedIn, setIsLoggedIn, setUser, setUserId } = useUser();

  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isChangePasswordModalVisible, setIsChangePasswordModalVisible] =
    useState(false);
  const [isAboutModalVisible, setIsAboutModalVisible] = useState(false);
  const [currentPIN, setCurrentPIN] = useState(["", "", "", ""]);
  const [enteredPIN, setEnteredPIN] = useState(["", "", "", ""]);
  const [newPIN, setNewPIN] = useState(["", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [isChangingPIN, setIsChangingPIN] = useState(false);

  const currentPinRefs = useRef([]);
  const enteredPinRefs = useRef([]);
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
    }, 100);
  };

  const handleOpenAboutModal = () => {
    setIsAboutModalVisible(true);
  };

  const handleCloseAboutModal = () => {
    setIsAboutModalVisible(false);
  };

  const handleOpenPasswordModal = () => {
    setIsChangePasswordModalVisible(true);
  };

  const handleClosePasswordModal = () => {
    setIsChangePasswordModalVisible(false);
  };

  const handleSetNewPassword = () => {
    setNewPassword(newPassword);
  };

  const handleChangePassword = async () => {
    try {
      const pinFromDB = await accessVault(userId);
      const entered = enteredPIN.join("");
      console.log("entered", entered.length);

      if (entered.length == 0) {
        Alert.alert("Error", "Pin Can`t be empty");
      }

      if (pinFromDB !== entered) {
        Alert.alert("Error", "Incorrect PIN");
        return;
      }

      if (!newPassword.trim()) {
        Alert.alert("Error", "Password can't be empty");
        return;
      }
      const changedPassword = await changePassword(newPassword.trim(), userId);

      Alert.alert("Success", "Password changed successfully");
      setIsChangePasswordModalVisible(false);
      setNewPassword("");
    } catch (error) {
      console.error("Error in handlePasswordChange:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <View className="flex-1 p-6 justify-center bg-stone-900">
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

          <TouchableOpacity
            onPress={handleOpenPasswordModal}
            className="flex flex-row items-center bg-stone-800 p-4 rounded-lg"
          >
            <Ionicons name="lock-closed-outline" size={24} color="white" />
            <Text className="text-slate-100 text-l font-bold mx-2 flex-1">
              Change Password
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
            <Feather name="chevron-right" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* PIN change modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View className="flex-1 justify-center items-center bg-stone-800/80">
          <View className="w-4/5 p-6 bg-stone-900 rounded-lg">
            <Text className="text-slate-100 text-lg font-semibold mb-4">
              Change PIN
            </Text>
            <View>
              <Text className="text-slate-100 mb-3">Current PIN:</Text>
              <View className="flex-row justify-between mb-4">
                {currentPIN.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (currentPinRefs.current[index] = ref)}
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
                    keyboardType="numeric"
                    secureTextEntry
                    maxLength={1}
                    className="w-12 h-12 bg-stone-800 text-slate-100 text-center rounded-md"
                  />
                ))}
              </View>
              <Text className="text-slate-100 mb-3">New PIN:</Text>
              <View className="flex-row justify-between mb-4">
                {newPIN.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (newPinRefs.current[index] = ref)}
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
                    keyboardType="numeric"
                    secureTextEntry
                    maxLength={1}
                    className="w-12 h-12 bg-stone-800 text-slate-100 text-center rounded-md"
                  />
                ))}
              </View>
              <View className="flex-row justify-between mt-4">
                <TouchableOpacity
                  onPress={handleCloseModal}
                  className="px-10 rounded py-3 bg-stone-600"
                >
                  <Text className="text-slate-100">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleChangePIN}
                  className="px-10 rounded py-3 bg-green-600"
                >
                  <Text className="text-slate-100">Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={isChangePasswordModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleClosePasswordModal}
      >
        <View className="flex-1 justify-center items-center bg-stone-800/80">
          <View className="w-4/5 p-6 bg-stone-900 rounded-lg">
            <Text className="text-slate-100 text-lg font-semibold mb-4">
              Change Password
            </Text>

            {/* PIN Input Field */}
            <View className="flex-row justify-between mb-4">
              {enteredPIN.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (enteredPinRefs.current[index] = ref)}
                  value={digit}
                  onChangeText={(value) =>
                    handleInputFocus(
                      value,
                      index,
                      enteredPIN,
                      setEnteredPIN,
                      enteredPinRefs
                    )
                  }
                  keyboardType="numeric"
                  secureTextEntry
                  maxLength={1}
                  className="w-12 h-12 bg-stone-800 text-slate-100 text-center rounded-md"
                />
              ))}
            </View>

            {/* New Password Input Field */}
            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              placeholder="Enter new password"
              placeholderTextColor="grey"
              className="w-full h-12 bg-stone-800 px-2 text-slate-100 text-left rounded-md"
            />

            <View className="flex-row justify-between mt-4">
              <TouchableOpacity
                onPress={handleClosePasswordModal}
                className="px-10 py-3 rounded bg-gray-700 mr-2"
              >
                <Text className="text-slate-100">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleChangePassword}
                className="px-10 py-3 rounded bg-green-600 mr-2"
              >
                <Text className="text-slate-100">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* About Modal */}
      <Modal
        visible={isAboutModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseAboutModal}
      >
        <View className="flex-1 justify-center items-center bg-stone-800/80">
          <View className="w-4/5 p-6 bg-stone-900 rounded-lg">
            <Text className="text-slate-100 text-lg font-semibold mb-4">
              About Crawl Vault
            </Text>
            <Text className="text-slate-100 mb-4">
              Crawl Vault is a secure and user-friendly password management app
              designed to simplify your digital life. With Features such as
              secure PIN-based access and easy password storage, Crawl Vault
              ensures your credentials are protected while remaining easily
              accessible.
            </Text>
            <Text className=" text-slate-100">
              {" "}
              Developed by 𝕄𝔼𝕁𝕀𝔻 (netcrawler)
            </Text>
            <View className="flex-row justify-start mt-4">
              <TouchableOpacity
                onPress={handleCloseAboutModal}
                className="px-10 py-3 rounded-lg bg-sky-600"
              >
                <Text className="text-slate-100">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SettingsScreen;
