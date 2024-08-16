import { Link } from "expo-router";
import { View, Text, Image, TouchableOpacity } from "react-native";

const OnboardingTwo = () => {
  return (
    <View className="flex-1 justify-between items-center h-screen bg-stone-900">
      <View className="flex-1 justify-center items-center gap-y-6">
        <Image
          source={require("../../../assets/images/padlock.png")}
          className="w-32 h-32"
          resizeMode="contain"
        />
        <Text className="text-3xl text-slate-100 font-bold">
          Let's Get Started
        </Text>
        <Text className="text-lg text-center text-slate-100 px-5 mx-8">
          Login or create account to store your password in yout secured vault
          and save for later use
        </Text>
      </View>

      <View>
        <Link
          className="bg-green-600 px-36 py-3 rounded-lg mb-5"
          href={"/screens/SignupScreen"}
        >
          <TouchableOpacity>
            <Text className="text-slate-100 text-center text-xl">
              <Link href={"/screens/SignupScreen"}>Sign up</Link>
            </Text>
          </TouchableOpacity>
        </Link>

        <Link
          className="bg-gray-600 px-36 py-3 rounded-lg mb-10"
          href={"/screens/LoginScreen"}
        >
          <TouchableOpacity>
            <Text className="text-slate-100 text-center text-xl">Login</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default OnboardingTwo;
