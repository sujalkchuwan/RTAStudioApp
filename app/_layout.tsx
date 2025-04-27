import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";
import "./globals.css";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const handleDeepLink = async (event: { url: string }) => {
      const { queryParams } = Linking.parse(event.url);
      console.log("Deep link triggered:", event.url);

      const token = queryParams?.token;
      if (token) {
        try {
          if (typeof token === "string") {
            await SecureStore.setItemAsync("authToken", token);
          } else {
            console.error("Invalid token format:", token);
          }
          router.replace("/(tabs)");
        } catch (error) {
          console.error("Error saving token:", error);
        }
      }
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);

    // Also handle the case where the app is launched from a deep link
    (async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        handleDeepLink({ url: initialUrl });
      }
    })();

    return () => subscription.remove();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="explore/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="map/exploremap" options={{ headerShown: false }} />
    </Stack>
  );
}
