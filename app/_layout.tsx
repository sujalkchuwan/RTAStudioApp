import { Stack } from "expo-router";
import "./globals.css";
import "../global-polyfill";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Buffer } from "buffer";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

global.Buffer = global.Buffer || Buffer;

export default function RootLayout() {
  return (
    // <SafeAreaProvider>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="explore/[id]" options={{ headerShown: false }} />
         <Stack.Screen name="exploremap" options={{ headerShown: false }} />
         <Stack.Screen name="feedback" options={{ headerShown: false }} />
        <Stack.Screen
          name="canvas/[id]"
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
    // </SafeAreaProvider>
  );
}
