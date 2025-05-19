import { Stack } from "expo-router";
import "./globals.css";
import "../global-polyfill";
import { Buffer } from "buffer";
global.Buffer = global.Buffer || Buffer;

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="explore/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="map/exploremap" options={{ headerShown: false }} />
      <Stack.Screen name="canvas/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
}
