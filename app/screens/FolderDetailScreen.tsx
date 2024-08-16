import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const FolderDetailScreen = () => {
  return (
    <View className="flex-1 p-6 bg-gray-100">
      <Text className="text-3xl font-bold mb-6">Personal Folder</Text>
      {/* List of passwords */}
      <TouchableOpacity className="bg-gray-500 p-4 rounded-xl mb-4">
        <Text className="text-white text-xl">Amazon Account</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-gray-500 p-4 rounded-xl mb-4">
        <Text className="text-white text-xl">Google Account</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-blue-500 p-4 rounded-xl">
        <Text className="text-white text-xl">Add New Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FolderDetailScreen;
