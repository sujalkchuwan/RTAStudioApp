import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function FeedbackForm() {
  const { email: routeEmail, id: routeId } = useLocalSearchParams();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (routeEmail && typeof routeEmail === 'string') setEmail(routeEmail);
    if (routeId && typeof routeId === 'string') setUserId(routeId);
    else {
      (async () => {
        const storedUser = await SecureStore.getItemAsync('usedData');
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          if (parsed?.email) setEmail(parsed.email);
          if (parsed?.id) setUserId(parsed.id);
        }
      })();
    }
  }, [routeEmail, routeId]);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const pickedImage = result.assets[0];
      setImage({
        uri: pickedImage.uri,
        name: pickedImage.fileName || pickedImage.uri.split('/').pop(),
        type: pickedImage.type || 'image/jpeg',
      });
    }
  };

  const handleSubmit = async () => {
    if (!email.trim() || !subject.trim() || !description.trim() || !image) {
      Alert.alert('Error', 'All fields are required, including an image.');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('id', userId);
      formData.append('subject', subject);
      formData.append('description', description);
      formData.append('image', {
        uri: image.uri,
        name: image.name,
        type: image.type,
      });

      const response = await fetch('https://rta-server.onrender.com/api/feedback/userFeedback', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        Alert.alert('Success', 'Feedback submitted successfully', [
          { text: 'OK', onPress: () => router.replace('/profile') },
        ]);
        setSubject('');
        setDescription('');
        setImage(null);
      } else {
        const errorText = await response.text();
        console.log('Server error response:', errorText);
        throw new Error(errorText || 'Submission failed');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-6 pt-12 mt-10">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-8">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="black" />
        </TouchableOpacity>
        <Text className="text-2xl font-semibold">Feedback</Text>
        <TouchableOpacity onPress={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <ActivityIndicator color="red" />
          ) : (
            <Ionicons name="send" size={28} color="red" />
          )}
        </TouchableOpacity>
      </View>

      {/* Form Fields */}
      <View className="mb-6">
        <Text className="text-base font-medium text-gray-800 mb-2">Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="your@email.com"
          className="border border-gray-300 p-4 rounded-md mb-4"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text className="text-base font-medium text-gray-800 mb-2">Subject</Text>
        <TextInput
          value={subject}
          onChangeText={setSubject}
          placeholder="Give the primary subject of the issue"
          className="border border-gray-300 p-4 rounded-md mb-4"
        />

        <Text className="text-base font-medium text-gray-800 mb-2">Description</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Be as detailed as possible. What did you expect and what happened instead?"
          multiline
          numberOfLines={6}
          className="border border-gray-300 p-4 rounded-md text-base mb-4"
          textAlignVertical="top"
        />

        <TouchableOpacity
          onPress={handlePickImage}
          className="flex-row items-center justify-center gap-2 p-4 border border-dashed border-red-400 rounded-md mb-4"
        >
          <Ionicons name="image-outline" size={24} color="red" />
          <Text className="text-sm text-gray-800">Select image</Text>
        </TouchableOpacity>

        {image && (
          <Image
            source={{ uri: image.uri }}
            style={{ width: '100%', height: 240, borderRadius: 8 }}
            className="mb-4"
          />
        )}
      </View>
    </ScrollView>
  );
}