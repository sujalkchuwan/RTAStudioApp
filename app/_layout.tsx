import { Stack } from "expo-router";
import "./globals.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

// import AuthProvider from "@/app/providers/AuthProvider";
// import { Slot } from "expo-router";
// import { ReactNode } from "react";

// export default function RootLayout(): ReactNode {
//   return (
//     <AuthProvider>
//       <Slot />
//     </AuthProvider>
//   );
// }
