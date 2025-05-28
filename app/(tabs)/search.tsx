import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "expo-router";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [roomColors, setRoomColors] = useState<Record<string, string>>({});
  const router = useRouter();

  const fetchFromStorage = async () => {
    try {
      const storedRooms = await SecureStore.getItemAsync("rooms");
      const storedInvites = await SecureStore.getItemAsync("roomInvites");
      const storedColors = await SecureStore.getItemAsync("roomColors");

      if (storedRooms) {
        const parsedRooms = JSON.parse(storedRooms);
        setUserProjects(parsedRooms);
      }

      console.log("Stored Invites Raw:", storedInvites); // Debugging: Raw invites from SecureStore
      if (storedInvites) {
        const parsedInvites = JSON.parse(storedInvites);
        console.log("Parsed Invites:", parsedInvites); // Debugging: Parsed invites
        setSharedFiles(parsedInvites);
      } else {
        setSharedFiles([]);
        console.log("No stored invites found."); // Debugging: No invites
      }
      console.log("Shared Files State after set:", sharedFiles); // Debugging: sharedFiles state

      if (storedColors) {
        const parsedColors = JSON.parse(storedColors);
        setRoomColors(parsedColors);
      }
    } catch (error) {
      console.error("Error loading search data:", error);
    }
  };

  useEffect(() => {
    fetchFromStorage();
  }, []);

  const filteredSharedFiles = sharedFiles.filter((file) => {
    const matches = file.room?.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    console.log(
      `Filtering shared file: ${
        file.room?.title || "Untitled"
      } - Matches: ${matches}`
    ); // Debugging filter
    return matches;
  });
  console.log("Filtered Shared Files:", filteredSharedFiles); // Debugging: Final filtered shared files

  const filteredUserProjects = userProjects.filter((room) =>
    room.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className="flex-1 bg-gray-100 px-4 pt-4">
      <Text className="text-4xl font-semibold text-black mb-4">Search</Text>

      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Find files"
        placeholderTextColor="#9ca3af"
        className="bg-white px-4 py-3 rounded-xl text-base text-gray-800 mb-6 border border-gray-200"
      />

      <Text className="text-lg font-semibold mb-2">Shared with You</Text>
      {filteredSharedFiles.length === 0 ? (
        <Text className="text-gray-500 mb-4">
          No files shared with you match this search.
        </Text>
      ) : (
        <FlatList
          data={filteredSharedFiles}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.room?.id || item.id}
          className="mb-6"
          style={{ height: 160 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="mr-4"
              onPress={() => {
                if (item.room?.id) {
                  router.push(`/canvas/${item.room.id}`);
                }
              }}
            >
              <View
                className="w-32 h-24 rounded-lg mb-1"
                style={{
                  backgroundColor: roomColors[item.room?.id || ""] || "#e5e7eb",
                }}
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

      <Text className="text-lg font-semibold mb-2">Your Projects</Text>
      {filteredUserProjects.length === 0 ? (
        <Text className="text-gray-500">No projects match this search.</Text>
      ) : (
        <FlatList
          data={filteredUserProjects}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          style={{ flex: 1 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="mb-4 flex-row items-center"
              onPress={() => {
                router.push(`/canvas/${item.id}`);
              }}
            >
              <View
                className="w-32 h-24 rounded-lg mr-3"
                style={{ backgroundColor: roomColors[item.id] || "#e5e7eb" }}
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
