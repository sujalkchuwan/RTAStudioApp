import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import * as Linking from "expo-linking";
import { StatusBar } from "react-native";
import "./globals.css";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const handleDeepLink = (event: Linking.EventType & { url: string }) => {
      const { hostname, path, queryParams } = Linking.parse(event.url);

      console.log("Deep link triggered:", event.url);

      const token = queryParams?.token;
      if (token) {
        router.replace("/(tabs)");
      }
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);

    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url } as Linking.EventType & { url: string });
      }
    });

    return () => subscription.remove();
  }, []);

  return (
    <>
      {/* ✅ Black background with white icons/text */}
      <StatusBar barStyle="light-content" backgroundColor="black" />
      
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="explore/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
