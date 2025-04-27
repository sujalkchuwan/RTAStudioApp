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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedData = await AsyncStorage.getItem("userInfo"); // Assumes userInfo contains user & sessions
        if (storedData) {
          const parsed = JSON.parse(storedData);
          setUserData(parsed.user);
          setSessions(parsed.sessions || []);
        }
      } catch (error) {
        console.error("Error loading user profile:", error);
      }
    };
    fetchUserData();
  }, []);

  if (!userData) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>Loading profile...</Text>
      </SafeAreaView>
    );
  }

  const handleSignOutAll = () => {
    console.log("Signing out of all sessions...");
    // API call to sign out of all sessions
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log("Deleting account...");
    setShowDeleteModal(false);
    // Add delete logic here
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        <Text className="text-2xl font-bold p-4">Profile</Text>

        {/* Profile Section */}
        <View className="bg-white mb-4 p-4">
          <View className="flex-row items-center mb-4">
            <Image
              source={{
                uri: userData.avatar || "https://via.placeholder.com/150",
              }}
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

        {/* Signed-In Devices */}
        <View className="bg-white mb-4 p-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold">Signed In Devices</Text>
            <TouchableOpacity onPress={handleSignOutAll}>
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
              <TouchableOpacity className="bg-gray-100 py-2 px-4 rounded-md">
                <Text className="text-sm">Sign out</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Bottom buttons */}
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

      {/* Delete Modal */}
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
