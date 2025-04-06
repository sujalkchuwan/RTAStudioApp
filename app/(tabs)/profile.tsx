import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function Profile() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // Dummy user data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profileImage: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=60',
    devices: [
      {
        name: 'Web App on Chrome',
        ip: '220.158.237.129',
        isActive: true
      },
      {
        name: 'iPhone App',
        ip: '178.163.124.7',
        isActive: false
      }
    ]
  };

  const handleSave = () => {
    console.log('Saving profile changes...');
  };

  const handleEdit = () => {
    console.log('Editing profile...');
  };

  const handleReset = () => {
    console.log('Resetting password...');
  };

  const handleSubmitHelp = () => {
    console.log('Submitting help request...');
  };

  const handleSignOutAll = () => {
    console.log('Signing out from all devices...');
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log('Deleting account...');
    setShowDeleteModal(false);
  };

  const handleProvideFeedback = () => {
    router.push('/')
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView>
        {/* Header */}
        <Text className="text-2xl font-bold p-4">Profile</Text>

        {/* Profile Section */}
        <View className="bg-white mb-4 p-4">
          <View className="flex-row items-center mb-4">
            <Image 
              source={{ uri: userData.profileImage }} 
              className="w-16 h-16 rounded-full mr-3"
            />
            <View className="flex-1">
              <Text className="text-sm text-gray-500 mb-1">Name</Text>
              <Text className="text-base">{userData.name}</Text>
            </View>
            <TouchableOpacity onPress={handleSave}>
              <Text className="text-blue-500 text-base">Save</Text>
            </TouchableOpacity>
          </View>

          <View className="mb-3">
            <Text className="text-sm text-gray-500 mb-1">Email</Text>
            <View className="flex-row justify-between items-center">
              <Text className="text-base">{userData.email}</Text>
              <TouchableOpacity onPress={handleEdit}>
                <Text className="text-red-500 underline">Edit...</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={handleReset} className="flex-row items-center mt-2">
            <Text className="text-sm text-gray-500">Forgot password? </Text>
            <Text className="text-red-500 underline">reset</Text>
          </TouchableOpacity>
        </View>

        {/* Help Section */}
        <View className="bg-white mb-4 p-4">
          <Text className="text-lg font-semibold mb-3">Help</Text>
          <View className="flex-row justify-between items-start space-x-4">
            <Text className="text-sm text-gray-600 flex-1 leading-5">
              Issues with something in the app that is broken or doesn't work as expected or new ideas or desired enhancements for this app? Please let us know!
            </Text>
            <TouchableOpacity 
              className="bg-red-500 px-6 py-3 rounded-lg"
              onPress={handleSubmitHelp}
            >
              <Text className="text-white font-semibold">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 2FA Section */}
        <View className="bg-white mb-4 p-4">
          <Text className="text-lg font-semibold mb-3">Two-Factor Authentication (2FA)</Text>
          <Text className="text-sm text-gray-600 mb-4 leading-5">
            Two-factor authentication protects your account by adding an extra security steps when you sign in.
          </Text>
          <View className="flex-row justify-between items-center">
            <Text className="text-base">Enable 2FA</Text>
            <Switch
              value={is2FAEnabled}
              onValueChange={setIs2FAEnabled}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={is2FAEnabled ? '#f4f3f4' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Devices Section */}
        <View className="bg-white mb-4 p-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold">Signed In Devices</Text>
            <TouchableOpacity onPress={handleSignOutAll}>
              <Text className="text-blue-500 text-sm">Sign Out of All...</Text>
            </TouchableOpacity>
          </View>
          
          {userData.devices.map((device, index) => (
            <View key={index} className="flex-row justify-between items-center mb-4">
              <View className="flex-1">
                <View className="flex-row items-center mb-1">
                  <View className={`w-2 h-2 rounded-full mr-2 ${device.isActive ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <Text className="text-base">{device.name}</Text>
                </View>
                <Text className="text-sm text-gray-500">{device.ip}</Text>
              </View>
              <TouchableOpacity className="bg-gray-100 py-2 px-4 rounded-md">
                <Text className="text-sm">Sign out</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Bottom Buttons */}
        <View className="p-4 pb-32">
          <TouchableOpacity 
            className="border border-red-500 p-4 rounded-lg items-center mb-6"
            onPress={handleDeleteAccount}
          >
            <Text className="text-red-500 font-semibold">Delete Account</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="border border-gray-900 p-4 rounded-lg items-center"
            onPress={handleProvideFeedback}
          >
            <Text className="text-gray-900 font-semibold">Provide Feedback</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Delete Account Modal */}
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
            <Text className="text-xl font-bold text-center mb-4">Delete Account?</Text>
            <Text className="text-gray-600 text-center mb-6">
              Are you sure you want to delete your account? This action cannot be undone.
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
                <Text className="text-white text-center font-semibold">Delete</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}