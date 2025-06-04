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
import { SafeAreaView } from "react-native-safe-area-context";

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
      const storedOwnedRooms = await SecureStore.getItemAsync("rooms"); // Get owned rooms
      const storedInvitedRooms = await SecureStore.getItemAsync("roomInvites"); // Get invited rooms
      const storedColors = await SecureStore.getItemAsync("roomColors");

      if (storedOwnedRooms) {
        const parsedOwnedRooms = JSON.parse(storedOwnedRooms);
        setUserProjects(parsedOwnedRooms);
      } else {
        setUserProjects([]);
      }

      console.log("Stored Invited Rooms Raw:", storedInvitedRooms); // Debugging: Raw invites from SecureStore
      if (storedInvitedRooms) {
        const parsedInvitedRooms = JSON.parse(storedInvitedRooms);
        console.log("Parsed Invited Rooms:", parsedInvitedRooms); // Debugging: Parsed invites
        // Map invited rooms to SharedFile type if necessary, assuming 'room' property
        const mappedInvitedRooms: SharedFile[] = parsedInvitedRooms.map(
          (room: Room) => ({
            id: room.id,
            room: room,
          })
        );
        console.log("Mapped Shared Files:", mappedInvitedRooms); // Debugging: Mapped to SharedFile type
        setSharedFiles(mappedInvitedRooms);
      } else {
        setSharedFiles([]);
        console.log("No stored invited rooms found."); // Debugging: No invites
      }
      // Note: sharedFiles state update is asynchronous, so logging it immediately after setSharedFiles might show old value.
      // The useEffect hook below will log the updated state.

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

  // Log sharedFiles state after it's updated (due to useEffect dependency)
  useEffect(() => {
    console.log("Shared Files State (after render):", sharedFiles);
  }, [sharedFiles]);

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
  console.log(
    "Filtered Shared Files (after filter logic):",
    filteredSharedFiles
  ); // Debugging: Final filtered shared files

  const filteredUserProjects = userProjects.filter((room) =>
    room.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={{flex:1}} >
    <View className="flex-1 bg-gray-100 px-4 pt-4 mt-5">
      <Text className="text-4xl font-semibold text-black mb-4 mt-10">Search</Text>
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Find files"
        placeholderTextColor="#9ca3af"
        className="bg-white px-4 py-3 rounded-xl text-base text-gray-800 mb-4 border border-gray-200" // Adjusted mb-4
      />
      <View className="mb-4 h-60">
        
        <Text className="text-lg font-semibold mb-2">Shared with You</Text>
        {filteredSharedFiles.length === 0 ? (
          <Text className="text-gray-500 mb-0">
       
            No files shared with you match this search.
          </Text>
        ) : (
          <FlatList
            data={filteredSharedFiles}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.room?.id || item.id}
            style={{ flex: 1 }}
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
                    backgroundColor:
                      roomColors[item.room?.id || ""] || "#e5e7eb",
                  }}
                />

                <Text className="text-sm font-medium">
                  {item.room?.title || "Untitled"}
                </Text>
                <Text className="text-xs text-gray-500">
                  {item.room?.createdAt
                    ? `${formatDistanceToNow(
                        new Date(item.room.createdAt)
                      )} ago`
                    : "Unknown"}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      <View style={{ flex: 1 }}>
     
        <Text className="text-lg font-semibold mt-4 mb-2">

          Your Projects
        </Text>
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
    </View>
    </SafeAreaView>
  );
}
