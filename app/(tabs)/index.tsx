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
        const storedRooms = await SecureStore.getItemAsync("rooms");
        const parsedRooms = storedRooms ? JSON.parse(storedRooms) : [];

        // Add dummy data for display
        const augmentedRooms = parsedRooms.map(
          (room: { id: any; title: any }) => ({
            id: room.id,
            name: room.title || "Untitled",
            designer: "John Doe", // dummy
            image: "https://via.placeholder.com/150", // dummy
            lastViewedAt: new Date().toISOString(), // dummy
          })
        );

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
      <View className="flex-1 bg-gray-100 p-4 mt-10">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-8 mt-5">
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
              title="Sort by Alphabet"
            />
            <Menu.Item
              onPress={() => {
                setSortBy("recent");
                closeMenu();
              }}
              title="Sort by Recently Viewed"
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
                  <Image
                    source={{ uri: item.image }}
                    className="w-20 h-20 rounded-lg mr-4"
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
        />
      </View>
    </Provider>
  );
};

export default Recents;
