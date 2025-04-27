import { useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function AuthCallback() {
  const router = useRouter();
  const { token } = useLocalSearchParams();

  useEffect(() => {
    const saveToken = async () => {
      if (token && typeof token === "string") {
        await SecureStore.setItemAsync("authToken", token);
        router.replace("/(tabs)");
      } else {
        router.replace("/"); // fallback
      }
    };
    saveToken();
  }, [token]);

  return null;
}
