import React from "react";
import { View, Text, Button } from "react-native";

const ProfileScreen = () => {
  return (
    <View className="flex-1 p-6 bg-gray-100">
      <Text className="text-3xl font-bold mb-6">Your Profile</Text>
      <Text className="text-xl mb-4">Name: John Doe</Text>
      <Text className="text-xl mb-4">Email: johndoe@example.com</Text>
      <Button title="Change Password" />
      <Button title="Logout" />
    </View>
  );
};

export default ProfileScreen;
