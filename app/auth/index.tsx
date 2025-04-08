import { useEffect } from "react";
import { useRouter, useGlobalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthCallback() {
  const router = useRouter();
  const { token } = useGlobalSearchParams();

  useEffect(() => {
    const saveToken = async () => {
      if (token) {
        await AsyncStorage.setItem("authToken", token as string);
        router.replace("/(tabs)"); // go to your main screen
      } else {
        // fallback if token is missing
        router.replace("/");
      }
    };

    saveToken();
  }, [token]);

  return null; // or a loading spinner
}
