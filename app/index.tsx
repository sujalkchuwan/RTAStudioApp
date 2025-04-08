import { images } from "@/constants/images";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Linking as RNLinking,
} from "react-native";
import { useEffect, useState } from "react";
import * as Linking from "expo-linking";
// import * as SecureStore from "expo-secure-store"; // optional

export default function WelcomeScreen() {
  const router = useRouter();
  const [authToken, setAuthToken] = useState<string | null>(null);

  // Handle deep links from login
  useEffect(() => {
    const handleDeepLink = (event: Linking.EventType & { url: string }) => {
      const { queryParams } = Linking.parse(event.url);
      const token = queryParams?.token;

      // if (token) {
      //   setAuthToken(token);
      // Optional: SecureStore.setItemAsync('authToken', token);
      router.replace("/(tabs)");
      // }
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);

    // Also handle cold starts
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url } as Linking.EventType & { url: string });
      }
    });

    return () => subscription.remove();
  }, []);

  const handleLogin = () => {
    RNLinking.openURL("https://rta-studio.vercel.app/signin");
  };

  const handleSignup = () => {
    RNLinking.openURL("https://rta-studio.vercel.app/signin");
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

      <View className="mt-10 left-0 right-0 flex-row justify-center">
        <Link href="/(tabs)" className="text-white">
          Go to Tabs?
        </Link>
      </View>
    </ImageBackground>
  );
}
