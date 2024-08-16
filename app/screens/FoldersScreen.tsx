import { Link } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const FoldersScreen = () => {
  return (
    <View className="flex-1 p-6 bg-gray-100">
      <Text className="text-3xl font-bold mb-6">Your Folders</Text>
      <TouchableOpacity className="bg-blue-500 p-4 rounded-xl mb-4">
        <Link
          href={"/screens/FolderDetailScreen"}
          className="text-white text-xl"
        >
          Personal
        </Link>
      </TouchableOpacity>
      <TouchableOpacity className="bg-green-500 p-4 rounded-xl mb-4">
        <Link
          href={"/screens/FolderDetailScreen"}
          className="text-white text-xl"
        >
          Work
        </Link>
      </TouchableOpacity>
      <TouchableOpacity className="bg-gray-700 p-4 rounded-xl">
        <Text className="text-white text-xl">Create New Folder</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FoldersScreen;
