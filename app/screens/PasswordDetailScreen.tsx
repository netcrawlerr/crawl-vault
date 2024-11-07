import React from "react";
import { View, Text, Button } from "react-native";

const PasswordDetailScreen = () => {
  return (
    <View className="flex-1 p-6 bg-gray-100">
      <Text className="text-3xl font-bold mb-6">Amazon Account</Text>
      <Text className="text-xl mb-4">Website: amazon.com</Text>
      <Text className="text-xl mb-4">Username: jnkjnk</Text>
      <Text className="text-xl mb-4">Password: *********</Text>
      <Button title="Edit" />
      <Button title="Delete" />
    </View>
  );
};

export default PasswordDetailScreen;
