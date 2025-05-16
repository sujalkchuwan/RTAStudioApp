import { images } from "@/constants/images";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as Linking from "expo-linking";
import { Link, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import React, { useState } from "react";

export default function WelcomeScreen() {
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
            redirect: "rta_mobile_app://callback",
          }),
        }
      );
      const data = await res.json();

      try {
        if (!res.ok) {
          alert("Login failed: " + (data?.error ?? "Unknown error"));
          return;
        }

        console.log("data token", data.token);
        await SecureStore.setItemAsync("authToken", data.token);
        await SecureStore.setItemAsync("usedData", JSON.stringify(data.user));
        await SecureStore.setItemAsync("rooms", JSON.stringify(data.rooms));
        await SecureStore.setItemAsync(
          "roomInvites",
          JSON.stringify(data.roomInvites || [])
        );
        alert("Login successful!");
        router.replace("/(tabs)");
      } catch (jsonError) {
        console.log("Could not parse response as JSON:", data);
        alert("Server returned invalid response.");
      }
    } catch (err) {
      console.error("Login error", err);
      alert("Something went wrong.");
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

      {/* ✅ Email Input */}
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="bg-white px-4 py-2 w-64 rounded-md mb-4"
      />

      {/* ✅ Password Input */}
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        className="bg-white px-4 py-2 w-64 rounded-md mb-4"
      />

      {/* ✅ Login Button */}
      <TouchableOpacity
        onPress={handleLogin}
        className="bg-main py-3 px-6 rounded-lg w-64 mb-4 mt-8"
      >
        <Text className="text-light text-lg font-[14px] text-center">
          Log in to RTA
        </Text>
      </TouchableOpacity>

      {/* ✅ Signup Button */}
      <TouchableOpacity
        onPress={handleSignup}
        className="border border-blackoutlines py-3 px-6 rounded-lg w-64"
      >
        <Text className="text-blackoutlines text-lg font-semibold text-center">
          Sign up
        </Text>
      </TouchableOpacity>

      {/* Optional direct nav */}
      <Link href="/(tabs)" className="absolute bottom-20">
        <Text className=" text-white">Go to Tabs?</Text>
      </Link>
    </ImageBackground>
  );
}
