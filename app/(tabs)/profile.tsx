import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  Modal,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

type UserData = {
  avatar: string;
  username: string;
  email: string;
};

export default function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null);
  type Session = { deviceName: string; ipAddress: string };
  const [sessions, setSessions] = useState<Session[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync("usedData");
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;

        if (parsedUser) {
          setUserData({
            ...parsedUser,
            avatar: "https://via.placeholder.com/150", // Dummy avatar
          });

          setSessions([
            {
              deviceName: "iPhone 14 Pro",
              ipAddress: "192.168.1.5",
            },
            {
              deviceName: "Chrome on MacBook",
              ipAddress: "192.168.1.10",
            },
          ]);
        }
      } catch (error) {
        console.error("Error loading user profile:", error);
      }
    };

    fetchUserData();
  }, []);

  const logout = async () => {
    await SecureStore.deleteItemAsync("authToken");
    await SecureStore.deleteItemAsync("usedData");
    await SecureStore.deleteItemAsync("rooms");
    await SecureStore.deleteItemAsync("roomInvites");
    router.replace("/login");
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log("Deleting account...");
    setShowDeleteModal(false);
    // Add deletion logic here
  };

  if (!userData) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>Loading profile...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
        <Text className="text-4xl font-semibold text-black mb-6">Profile</Text>

        <View className="mb-4 p-4 bg-gray-50 rounded-lg">
          <View className="flex-row items-center mb-4">
            <Image
              source={{ uri: userData.avatar }}
              className="w-16 h-16 rounded-full mr-3"
            />
            <View className="flex-1">
              <Text className="text-sm text-gray-500 mb-1">Username</Text>
              <Text className="text-base">{userData.username}</Text>
            </View>
          </View>

          <View className="mb-3">
            <Text className="text-sm text-gray-500 mb-1">Email</Text>
            <Text className="text-base">{userData.email}</Text>
          </View>

          <TouchableOpacity className="flex-row items-center mt-2">
            <Text className="text-sm text-gray-500">Forgot password? </Text>
            <Text className="text-red-500 underline">reset</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-white mb-4 p-4 rounded-lg">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold">Signed In Devices</Text>
            <TouchableOpacity onPress={logout}>
              <Text className="text-blue-500 text-sm">Sign Out of All...</Text>
            </TouchableOpacity>
          </View>

          {sessions.map((device, index) => (
            <View
              key={index}
              className="flex-row justify-between items-center mb-4"
            >
              <View className="flex-1">
                <View className="flex-row items-center mb-1">
                  <View
                    className={`w-2 h-2 rounded-full mr-2 ${
                      index === 0 ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                  <Text className="text-base">{device.deviceName}</Text>
                </View>
                <Text className="text-sm text-gray-500">
                  {device.ipAddress}
                </Text>
              </View>
              <TouchableOpacity
                className="bg-gray-100 py-2 px-4 rounded-md"
                onPress={logout}
              >
                <Text className="text-sm">Sign out</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View className="p-4 pb-32">
          <TouchableOpacity
            className="border border-red-500 p-4 rounded-lg items-center mb-6"
            onPress={handleDeleteAccount}
          >
            <Text className="text-red-500 font-semibold">Delete Account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="border border-gray-900 p-4 rounded-lg items-center"
            onPress={() => router.push("/")}
          >
            <Text className="text-gray-900 font-semibold">
              Provide Feedback
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <Pressable
          className="flex-1 bg-black/50 justify-center items-center"
          onPress={() => setShowDeleteModal(false)}
        >
          <Pressable className="bg-white p-6 rounded-2xl mx-4 w-[90%] max-w-sm">
            <Text className="text-xl font-bold text-center mb-4">
              Delete Account?
            </Text>
            <Text className="text-gray-600 text-center mb-6">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </Text>
            <View className="flex-row space-x-3">
              <TouchableOpacity
                className="flex-1 bg-gray-100 p-4 rounded-lg"
                onPress={() => setShowDeleteModal(false)}
              >
                <Text className="text-center font-semibold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 bg-red-500 p-4 rounded-lg"
                onPress={confirmDelete}
              >
                <Text className="text-white text-center font-semibold">
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
