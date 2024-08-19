import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddPasswordScreen from "./(tabs)/AddPasswordScreen";
import ProfileScreen from "./(tabs)/ProfileScreen";
import SettingsScreen from "./(tabs)/SettingsScreen";
import PasswordsScreen from "./(tabs)/PasswordsScreen";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useUser from "@/hooks/useUser";
import { useRouter } from "expo-router";

const Tab = createBottomTabNavigator();

const Main = () => {
  const { userId } = useUser();
  const router = useRouter();

  console.log("userId from main", userId);

  const handleLockApp = () => {
    router.replace("/screens/AccessVault");
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Passwords") {
            iconName = "shield";
          } else if (route.name === "AddPassword") {
            iconName = "add-circle";
          } else if (route.name === "Profile") {
            iconName = "person";
          } else if (route.name === "Settings") {
            iconName = "settings";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#16A34A",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#1c1917",
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 0,
          paddingBottom: 10,
        },
        headerShown: true,
        // Enable header
        headerRight: () => (
          <View style={{ marginRight: 16 }}>
            <TouchableOpacity onPress={handleLockApp}>
              <Ionicons name="lock-closed" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ),
        headerStyle: {
          backgroundColor: "#1c1917",
        },
        headerTintColor: "white",
      })}
    >
      <Tab.Screen name="Passwords" component={PasswordsScreen} />
      <Tab.Screen name="AddPassword" component={AddPasswordScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default Main;
