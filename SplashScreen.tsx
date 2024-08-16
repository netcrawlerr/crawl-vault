import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
 
 

const SplashScreen = () => {
  return (
   
      <View className="flex justify-center items-center h-screen ">
        <Text className="text-white text-3xl mt-4">🔐 Password Manager 🔑</Text>
        <Text className="text-white text-xl mt-2 text-center px-4">
          Securely store and manage your passwords with ease. Keep your sensitive information safe and accessible.
        </Text>
      </View>
   
  );
};

export default SplashScreen;
