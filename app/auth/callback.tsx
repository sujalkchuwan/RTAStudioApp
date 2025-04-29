import { useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function AuthCallback() {
  const router = useRouter();
  const { token } = useLocalSearchParams();

  useEffect(() => {
    const saveToken = async () => {
      if (token) {
        // Save token securely
        if (typeof token === "string") {
          await SecureStore.setItemAsync("userToken", token);
        } else {
          console.error("Invalid token type:", token);
        }

        // Navigate to main app screen after storing token
        router.replace("/(tabs)"); // or whatever your main page is
      } else {
        // If no token found, maybe go back to login or show error
        router.replace("/");
      }
    };

    saveToken();
  }, []);

  return null; // No UI needed
}
