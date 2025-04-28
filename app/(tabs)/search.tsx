import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

// Replace these later with your backend URLs
const TEMP_API_USER_ID = "cm9lsphc90000nzza1axab7q1"; // Replace with actual user ID from auth context
const TEMP_API_URL = "https://rta-studio.vercel.app/api"; // Replace when backend is ready

export default function Search() {
  const [sharedFiles, setSharedFiles] = useState([]);
  const [userProjects, setUserProjects] = useState([]);

  const fetchRoomsAndInvites = async () => {
    try {
      // Fetch owned rooms
      const ownedRes = await axios.get(
        "https://rta-studio.vercel.app/api/rooms/cm9lsphc90000nzza1axab7q1"
      );
      setUserProjects(ownedRes.data);

      // Fetch room invites
      const inviteRes = await axios.get(
        "https://rta-studio.vercel.app/api/rooms/cm9lsphc90000nzza1axab7q1"
      );
      setSharedFiles(inviteRes.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    fetchRoomsAndInvites();
  }, []);

  return (
    <View className="flex-1 bg-gray-100 px-4 pt-6 gap-4 mt-10">
      {/* Search Bar */}
      <Text className="text-4xl font-semibold text-black">Search</Text>
      <TextInput
  placeholder="Find files"
  placeholderTextColor="#9ca3af" // Optional: Tailwind's gray-400
  className="bg-white px-4 py-3 rounded-xl  text-base text-gray-800 mb-6 border border-gray-200"
/>

      {/* Shared Files Section */}
      <Text className="text-lg font-semibold mb-2">Shared with You</Text>
      <FlatList
        data={sharedFiles}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.room.id}
        renderItem={({ item }) => (
          <TouchableOpacity className="mr-4">
            <Image
              source={{ uri: "" }} // Empty for now, image not implemented
              className="w-32 h-24 rounded-lg bg-gray-300"
            />
            <Text className="text-sm font-medium">{item.room.title}</Text>
            <Text className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(item.room.createdAt))} ago
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* User Projects Section */}
      <Text className="text-lg font-semibold mt-6 mb-2">Your Projects</Text>
      <FlatList
        data={userProjects}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity className="mb-4 flex-row items-center">
            <Image
              source={{ uri: "" }} // Empty for now, image not implemented
              className="w-32 h-24 rounded-lg mr-3 bg-gray-300"
            />
            <View>
              <Text className="text-base font-medium">{item.title}</Text>
              <Text className="text-gray-500 text-sm">
                {formatDistanceToNow(new Date(item.createdAt))} ago
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
