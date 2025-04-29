import { images } from "@/constants/images";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import * as Linking from "expo-linking";
import { Link, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";

export default function WelcomeScreen() {
  const router = useRouter();

  const handleLogin = async () => {
    const redirectURL = Linking.createURL("/auth/callback"); // THIS MUST MATCH your callback screen!

    const loginURL = `https://rta-studio.vercel.app/signin?from=mobile&redirect=${encodeURIComponent(
      redirectURL
    )}`;

    const result = await WebBrowser.openAuthSessionAsync(loginURL, redirectURL);
    console.log("WebBrowser result:", result); // Log the result

    if (result.type === "success") {
      console.log("Redirect to mobile app success");
    } else if (result.type === "dismiss" || result.type === "cancel") {
      console.log("User dismissed the login flow");
    } else {
      console.log("Unexpected result type:", result.type);
    }
  };

  const handleSignup = async () => {
    const signupURL = `https://rta-studio.vercel.app/signup?redirect=${encodeURIComponent(
      Linking.createURL("/auth")
    )}`;
    await WebBrowser.openAuthSessionAsync(
      signupURL,
      Linking.createURL("/auth")
    );
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
      <Link href="/(tabs)" className="absolute bottom-20">
        <Text className=" text-white">Go to Tabs?</Text>
      </Link>
    </ImageBackground>
  );
}
