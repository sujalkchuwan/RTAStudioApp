import { images } from "@/constants/images";
import { Link } from "expo-router";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";

export default function WelcomeScreen() {
  const handleLogin = () => {
    Linking.openURL("https://rtabhutan.org/login");
  };

  const handleSignup = () => {
    Linking.openURL("https://rtabhutan.org/signup");
  };

  return (
    <ImageBackground
      source={images.textile}
      className="flex-1 justify-center items-center"
      resizeMode="cover"
    >
      <Image
        source={images.rtalogo}
        className="w-[150px] h-[110px] -mt-[150px]"
        resizeMode="contain"
      />

      <TouchableOpacity
        onPress={handleLogin}
        className="bg-main py-3 px-6 rounded-lg w-64 mb-4 mt-52"
      >
        <Text className="text-light text-lg font-[14px] text-center">
          Log in to RTA
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleSignup}
        className="border border-blackoutlines py-3 px-6 rounded-lg w-64"
      >
        <Text className="text-blackoutlines text-lg font-semibold text-center">
          Sign up
        </Text>
      </TouchableOpacity>
      <View>
        <Link href="/(tabs)">About</Link>
      </View>
    </ImageBackground>
  );
}
