import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddPasswordScreen from "./(tabs)/AddPasswordScreen";
import ProfileScreen from "./(tabs)/ProfileScreen";
import SettingsScreen from "./(tabs)/SettingsScreen";
import PasswordsScreen from "./(tabs)/PasswordsScreen";

import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Passwords") {
            iconName = "shield";
          } else if (route.name === "AddPassword") {
            iconName = "lock-closed";
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
          marginBottom: 10,
        },
        headerShown: false,
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
