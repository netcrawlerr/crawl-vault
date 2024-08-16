import { View, Text, Image } from "react-native";

const SplashScreen = () => {
  return (
    <View className="flex-1 justify-between items-center bg-stone-900 h-screen">
      <View className="flex-1 justify-center items-center gap-y-6">
        <Image
          source={require("../../assets/images/lock.png")}
          className="w-32 h-32"
          resizeMode="contain"
        />
        <Text className="text-2xl text-slate-100 font-bold mb-4">
          Crawl Vault
        </Text>
      </View>

      <View className="mb-10 py-3 gap-y-2  ">
        <Text className="text-slate-100 text-center">Version 1.0</Text>
        <Text className="text-slate-100 text-center">From Netcrawler 🦉</Text>
      </View>
    </View>
  );
};

export default SplashScreen;
