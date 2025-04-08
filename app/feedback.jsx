import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Send, Image as ImageIcon, Paperclip } from 'lucide-react-native';

export default function Feedback() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);

  const handleSend = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmSend = () => {
    setShowConfirmModal(false);
    setShowThankYouModal(true);
  };

  const handleDone = () => {
    setShowThankYouModal(false);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-row justify-between items-center p-4 bg-white">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSend}>
          <Send size={24} color="#FF4B4B" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 p-4">
        <View className="mb-6">
          <Text className="text-sm text-gray-500 mb-2">Email</Text>
          <TextInput
            className="bg-white p-3 rounded-lg text-base"
            placeholder="ryoutamikasa@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View className="mb-6">
          <Text className="text-sm text-gray-500 mb-2">Subject</Text>
          <TextInput
            className="bg-white p-3 rounded-lg text-base"
            placeholder="please give us the primary subject of the issue"
            value={subject}
            onChangeText={setSubject}
          />
        </View>

        <View className="mb-6 flex-1">
          <Text className="text-sm text-gray-500 mb-2">Description</Text>
          <TextInput
            className="bg-white p-3 rounded-lg text-base flex-1"
            placeholder="Please be as detailed as possible. What did you expect and what happened instead?"
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />
        </View>

        <View className="flex-row space-x-4">
          <TouchableOpacity className="flex-row items-center space-x-2 p-4 bg-white rounded-lg flex-1">
            <ImageIcon size={24} color="#666" />
            <Text className="text-gray-600">Select image</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-row items-center space-x-2 p-4 bg-white rounded-lg flex-1">
            <Paperclip size={24} color="#666" />
            <Text className="text-gray-600">Select file</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Confirm Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showConfirmModal}
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <Pressable 
          className="flex-1 bg-black/50 justify-center items-center"
          onPress={() => setShowConfirmModal(false)}
        >
          <Pressable className="bg-white p-6 rounded-2xl mx-4 w-[90%] max-w-sm">
            <Text className="text-xl font-bold text-center mb-4">Send Feedback?</Text>
            <Text className="text-gray-600 text-center mb-6">
              Are you sure you want to send this feedback?
            </Text>
            <View className="flex-row space-x-3">
              <TouchableOpacity 
                className="flex-1 bg-gray-100 p-4 rounded-lg"
                onPress={() => setShowConfirmModal(false)}
              >
                <Text className="text-center font-semibold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="flex-1 bg-red-500 p-4 rounded-lg"
                onPress={handleConfirmSend}
              >
                <Text className="text-white text-center font-semibold">Send</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Thank You Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showThankYouModal}
        onRequestClose={() => setShowThankYouModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="bg-white p-6 rounded-2xl mx-4 w-[90%] max-w-sm items-center">
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1687692414405-210c5098c958?w=400&auto=format&fit=crop&q=60' }}
              className="w-32 h-32 rounded-full mb-4"
            />
            <Text className="text-xl font-bold text-center mb-2">Thank You!</Text>
            <Text className="text-gray-600 text-center mb-6">
              Your feedback has been submitted successfully.
            </Text>
            <TouchableOpacity 
              className="bg-red-500 px-8 py-4 rounded-lg w-full"
              onPress={handleDone}
            >
              <Text className="text-white text-center font-semibold">Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}