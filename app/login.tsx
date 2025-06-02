import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { images } from "@/constants/images";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch(
        "https://rta-studio.vercel.app/api/authenticate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            from: "mobile",
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert("Login failed: " + (data?.error ?? "Unknown error"));
        return;
      }

      await SecureStore.setItemAsync("authToken", data.token);
      await SecureStore.setItemAsync("usedData", JSON.stringify(data.user));

      // --- START: Changes for new rooms structure ---
      if (
        data.rooms &&
        typeof data.rooms === "object" &&
        data.rooms.owned &&
        data.rooms.invited
      ) {
        await SecureStore.setItemAsync(
          "rooms",
          JSON.stringify(data.rooms.owned)
        ); // Store owned rooms
        await SecureStore.setItemAsync(
          "roomInvites",
          JSON.stringify(data.rooms.invited)
        ); // Store invited rooms
      } else {
        // Fallback for older structure or if rooms structure is unexpected
        await SecureStore.setItemAsync(
          "rooms",
          JSON.stringify(data.rooms || [])
        );
        await SecureStore.setItemAsync(
          "roomInvites",
          JSON.stringify(data.roomInvites || [])
        );
      }
      // --- END: Changes for new rooms structure ---

      alert("Login successful!");
      router.replace("/(tabs)");
    } catch (err) {
      console.error("Login error", err);
      alert("Something went wrong.");
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-start items-center px-6 pt-60">
          <Image
            source={images.rtalogo}
            className="w-[120px] h-[100px] mb-3"
            resizeMode="contain"
          />

          <Text className="text-lg font-semibold mb-6">Sign in to RTA</Text>

          <TextInput
            placeholder="EMAIL"
            value={email}
            onChangeText={setEmail}
            className="w-[90%] bg-neutral-100 px-3 py-2 rounded-lg mb-3 text-sm"
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            placeholder="PASSWORD"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            className="w-[90%] bg-neutral-100 px-3 py-2 rounded-lg mb-3 text-sm"
          />

          <TouchableOpacity
            onPress={handleLogin}
            className="bg-main py-3 px-6 rounded-lg w-[90%] mt-2"
          >
            <Text className="text-white text-center font-semibold text-base">
              Log in
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
