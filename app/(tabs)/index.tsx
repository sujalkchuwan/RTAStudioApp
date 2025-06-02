import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Menu, Provider } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { generateLightColor } from "@/utils/color";

type Room = {
  id: string;
  title: string;
  designer: string;
  image: string;
  lastViewedAt?: string;
};

const Recents = () => {
  const [rooms, setRooms] = useState<Array<Room & { name: string }>>([]);
  const [sortBy, setSortBy] = useState("recent");
  const [menuVisible, setMenuVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const storedOwnedRooms = await SecureStore.getItemAsync("rooms"); // Owned rooms
        const storedInvitedRooms = await SecureStore.getItemAsync(
          "roomInvites"
        ); // Invited rooms

        const parsedOwnedRooms = storedOwnedRooms
          ? JSON.parse(storedOwnedRooms)
          : [];
        const parsedInvitedRooms = storedInvitedRooms
          ? JSON.parse(storedInvitedRooms)
          : [];

        // Combine both owned and invited rooms
        const allRooms = [...parsedOwnedRooms, ...parsedInvitedRooms];

        const storedColors = await SecureStore.getItemAsync("roomColors");
        const roomColors = storedColors ? JSON.parse(storedColors) : {};

        let updated = false;

        const augmentedRooms = allRooms.map(
          (room: { id: string; title: string }) => {
            if (!roomColors[room.id]) {
              roomColors[room.id] = generateLightColor();
              updated = true;
            }

            return {
              id: room.id,
              title: room.title, // Add the required title property
              name: room.title || "Untitled",
              designer: "John Doe", // You might want to get actual designer from backend
              image: roomColors[room.id],
              lastViewedAt: new Date().toISOString(), // This will be current time, not actual last viewed
            };
          }
        );

        if (updated) {
          await SecureStore.setItemAsync(
            "roomColors",
            JSON.stringify(roomColors)
          );
        }

        setRooms(augmentedRooms);
      } catch (err) {
        console.error("Failed to load rooms:", err);
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const sortedRooms = [...rooms].sort((a, b) => {
    if (sortBy === "alphabet") return a.name.localeCompare(b.name);
    const dateA = a.lastViewedAt ? new Date(a.lastViewedAt).getTime() : 0;
    const dateB = b.lastViewedAt ? new Date(b.lastViewedAt).getTime() : 0;
    return dateB - dateA;
  });

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <Provider>
      <View className="flex-1 bg-gray-100 p-4 pt-4 mt-10">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-4 mt-5">
          <Text className="text-4xl font-semibold text-black">Recents</Text>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu}>
                <MaterialIcons name="sort" size={24} color="black" />
              </TouchableOpacity>
            }
          >
            <Menu.Item
              onPress={() => {
                setSortBy("alphabet");
                closeMenu();
              }}
              title={<Text>Sort by Alphabet</Text>}
            />
            <Menu.Item
              onPress={() => {
                setSortBy("recent");
                closeMenu();
              }}
              title={<Text>Sort by Recently Viewed</Text>}
            />
          </Menu>
        </View>

        {/* Room List */}
        <FlatList
          data={sortedRooms}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                router.push(`/canvas/${item.id}`);
              }}
            >
              <View className="flex-row p-5 bg-white rounded-lg mb-3 items-center">
                <View className="flex-row flex-1 items-center">
                  <View
                    className="w-32 h-24 rounded-lg mr-3"
                    style={{
                      backgroundColor: item.image,
                    }}
                  />

                  <View>
                    <Text className="text-lg font-semibold text-gray-900">
                      {item.name}
                    </Text>
                    <Text className="text-sm text-gray-600">
                      {item.designer}
                    </Text>
                  </View>
                </View>
                <Text className="text-xs text-gray-400 text-right">
                  {item.lastViewedAt
                    ? new Date(item.lastViewedAt).toLocaleTimeString()
                    : "No recent activity"}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 50 }}
          style={{ flex: 1 }}
          ListEmptyComponent={() => (
            <View className="flex-1 justify-center items-center mt-10">
              <Text className="text-gray-500 text-lg">No rooms found.</Text>
            </View>
          )}
        />
      </View>
    </Provider>
  );
};

export default Recents;
