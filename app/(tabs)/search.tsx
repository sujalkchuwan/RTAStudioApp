import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { formatDistanceToNow } from "date-fns";

type Room = {
  id: string;
  title?: string;
  createdAt?: string;
};

type SharedFile = {
  id: string;
  room?: Room;
};

export default function Search() {
  const [sharedFiles, setSharedFiles] = useState<SharedFile[]>([]);
  const [userProjects, setUserProjects] = useState<Room[]>([]);

  const fetchFromStorage = async () => {
    try {
      const storedRooms = await SecureStore.getItemAsync("rooms");
      const storedInvites = await SecureStore.getItemAsync("roomInvites");

      if (storedRooms) {
        const parsedRooms = JSON.parse(storedRooms);
        setUserProjects(parsedRooms);
      }

      if (storedInvites) {
        const parsedInvites = JSON.parse(storedInvites);
        setSharedFiles(parsedInvites);
      } else {
        setSharedFiles([]); // default to empty
      }
    } catch (error) {
      console.error("Error loading search data:", error);
    }
  };

  useEffect(() => {
    fetchFromStorage();
  }, []);

  return (
    <View className="flex-1 bg-gray-100 px-4 pt-6 gap-4 mt-10">
      {/* Search Bar */}
      <Text className="text-4xl font-semibold text-black">Search</Text>
      <TextInput
        placeholder="Find files"
        placeholderTextColor="#9ca3af"
        className="bg-white px-4 py-3 rounded-xl text-base text-gray-800 mb-6 border border-gray-200"
      />

      {/* Shared Files Section */}
      <Text className="text-lg font-semibold mb-2">Shared with You</Text>
      {sharedFiles.length === 0 ? (
        <Text className="text-gray-500 mb-4">
          No files shared with you yet.
        </Text>
      ) : (
        <FlatList
          data={sharedFiles}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.room?.id || item.id}
          renderItem={({ item }) => (
            <TouchableOpacity className="mr-4">
              <Image
                source={{ uri: "" }}
                className="w-32 h-24 rounded-lg bg-gray-300"
              />
              <Text className="text-sm font-medium">
                {item.room?.title || "Untitled"}
              </Text>
              <Text className="text-xs text-gray-500">
                {item.room?.createdAt
                  ? `${formatDistanceToNow(new Date(item.room.createdAt))} ago`
                  : "Unknown"}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      {/* User Projects Section */}
      <Text className="text-lg font-semibold mt-6 mb-2">Your Projects</Text>
      {userProjects.length === 0 ? (
        <Text className="text-gray-500">No projects yet.</Text>
      ) : (
        <FlatList
          data={userProjects}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity className="mb-4 flex-row items-center">
              <Image
                source={{ uri: "" }}
                className="w-32 h-24 rounded-lg mr-3 bg-gray-300"
              />
              <View>
                <Text className="text-base font-medium">{item.title}</Text>
                <Text className="text-gray-500 text-sm">
                  {item.createdAt
                    ? `${formatDistanceToNow(new Date(item.createdAt))} ago`
                    : "Unknown"}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
