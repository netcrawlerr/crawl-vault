import { Link } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";

const OnboardingOne = () => {
  return (
    <View className="flex-1 justify-between items-center h-screen bg-stone-900">
      <View className="flex-1 justify-center items-center gap-y-6">
        <Image
          source={require("../../../assets/images/lock-document.png")}
          className="w-32 h-32"
          resizeMode="contain"
        />
        <Text className="text-3xl text-slate-100 font-bold">
          Welcome To Crawl Vault
        </Text>
        <Text className="text-lg text-center text-white px-5 mx-8">
          Effortlessly Manage and Retrieve Your Passwords with Our User-Friendly
          App. Your Security Made Simple.
        </Text>
      </View>

      <Link
        className="bg-green-600 px-36 py-3 rounded-lg mb-10"
        href={"/screens/onboarding/OnboardingTwo"}
      >
        <TouchableOpacity>
          <Text className="text-slate-100 text-center text-xl">Next</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default OnboardingOne;
