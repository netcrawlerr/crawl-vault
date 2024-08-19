import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import useUser from "@/hooks/useUser";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = () => {
  const { userId, isLoggedIn, setIsLoggedIn, setUser, setUserId } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("isLoggedIn");
    setUser(null);
    setUserId(null);
    setIsLoggedIn(false);
    await AsyncStorage.removeItem("userId");
    router.replace("/screens/LoginScreen");
  };

  useFocusEffect(
    React.useCallback(() => {
      if (!isLoggedIn) {
        router.replace("/screens/AccessVault");
      }
    }, [isLoggedIn])
  );

  return (
    <View className="flex-1 p-6 justify-center bg-stone-900">
      {/* Security Settings Section */}
      <View className="mb-4">
        <Text className="text-2xl text-slate-100 font-bold mb-4">
          Security Settings
        </Text>

        <View className="flex gap-y-3">
          <TouchableOpacity className="flex flex-row items-center bg-stone-800 p-4 rounded-lg">
            <Ionicons name="keypad-outline" size={24} color="white" />
            <Text className="text-slate-100 text-l font-bold mx-2 flex-1">
              Change PIN
            </Text>
            <Feather name="chevron-right" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity className="flex flex-row items-center bg-stone-800 p-4 rounded-lg">
            <Ionicons name="settings-outline" size={24} color="white" />
            <Text className="text-slate-100 text-l font-bold mx-2 flex-1">
              Another Setting
            </Text>
            <Feather name="chevron-right" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity className="flex flex-row items-center bg-stone-800 p-4 rounded-lg">
            <Ionicons name="color-palette-outline" size={24} color="white" />
            <Text className="text-slate-100 text-l font-bold mx-2 flex-1">
              Theme
            </Text>
            <Feather name="chevron-right" size={24} color="white" />
          </TouchableOpacity>
        </View>
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

          <TouchableOpacity className="flex flex-row items-center  bg-stone-800 p-4 rounded-lg">
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
        {/* Others */}
        <Text className="text-2xl mt-3 text-slate-100 font-bold mb-4">
          Others
        </Text>

        <View className="flex gap-y-3">
          <TouchableOpacity
            onPress={handleLogout}
            className="flex flex-row items-center  bg-stone-800 p-4 rounded-lg"
          >
            <Ionicons name="log-out-outline" size={24} color="white" />

            <Text className="text-slate-100 text-l font-bold mx-2 flex-1">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SettingsScreen;
