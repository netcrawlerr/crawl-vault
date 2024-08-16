import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

const AddPasswordScreen = () => {
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="flex-1 p-6 bg-gray-100">
      <Text className="text-3xl font-bold mb-6">Add New Password</Text>
      <TextInput
        className="border p-4 mb-4 rounded"
        placeholder="Website/App Name"
        value={website}
        onChangeText={setWebsite}
      />
      <TextInput
        className="border p-4 mb-4 rounded"
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        className="border p-4 mb-4 rounded"
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Save" />
    </View>
  );
};

export default AddPasswordScreen;
