import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Menu, Provider } from "react-native-paper";

const textileData = [
  {
    id: "1",
    name: "Kira Textile",
    designer: "Simone",
    viewed: "An hour ago",
    image:
      "https://tse4.mm.bing.net/th?id=OIP.PEufYV0wYNWXvPxJ32Ih0wHaFe&pid=Api",
  },
  {
    id: "2",
    name: "Gho Fabric",
    designer: "Pedro",
    viewed: "An hour ago",
    image:
      "https://tse2.mm.bing.net/th?id=OIP.rus-GYyS-BeFkejSYcj7WgHaFc&pid=Api",
  },
  {
    id: "3",
    name: "Yathra Weaving",
    designer: "Alice",
    viewed: "2 hours ago",
    image:
      "https://tse4.mm.bing.net/th?id=OIP.01Yv_-9WfQHwbMKZZbyzbQHaL4&pid=Api",
  },
  {
    id: "4",
    name: "Silk Embroidered Textile",
    designer: "Maria",
    viewed: "3 hours ago",
    image:
      "https://tse3.mm.bing.net/th?id=OIP.e1gTiXZO1KD6LWKns4mwQwHaFc&pid=Api",
  },
  {
    id: "5",
    name: "Kira Textile",
    designer: "Simone",
    viewed: "An hour ago",
    image:
      "https://tse4.mm.bing.net/th?id=OIP.PEufYV0wYNWXvPxJ32Ih0wHaFe&pid=Api",
  },
  {
    id: "6",
    name: "Gho Fabric",
    designer: "Pedro",
    viewed: "An hour ago",
    image:
      "https://tse2.mm.bing.net/th?id=OIP.rus-GYyS-BeFkejSYcj7WgHaFc&pid=Api",
  },
  {
    id: "7",
    name: "Yathra Weaving",
    designer: "Alice",
    viewed: "2 hours ago",
    image:
      "https://tse4.mm.bing.net/th?id=OIP.01Yv_-9WfQHwbMKZZbyzbQHaL4&pid=Api",
  },
  {
    id: "8",
    name: "Silk Embroidered Textile",
    designer: "Maria",
    viewed: "3 hours ago",
    image:
      "https://tse3.mm.bing.net/th?id=OIP.e1gTiXZO1KD6LWKns4mwQwHaFc&pid=Api",
  },
  {
    id: "9",
    name: "Kira Textile",
    designer: "Simone",
    viewed: "An hour ago",
    image:
      "https://tse4.mm.bing.net/th?id=OIP.PEufYV0wYNWXvPxJ32Ih0wHaFe&pid=Api",
  },
  {
    id: "10",
    name: "Gho Fabric",
    designer: "Pedro",
    viewed: "An hour ago",
    image:
      "https://tse2.mm.bing.net/th?id=OIP.rus-GYyS-BeFkejSYcj7WgHaFc&pid=Api",
  },
];

const recent = () => {
  const [sortBy, setSortBy] = useState("time");
  const [menuVisible, setMenuVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const sortedData = [...textileData].sort((a, b) => {
    if (sortBy === "alphabet") return a.name.localeCompare(b.name);
    return a.viewed.localeCompare(b.viewed);
  });

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
                setSortBy("time");
                closeMenu();
              }}
              title="Sort by Time"
            />
          </Menu>
        </View>

        {/* List of Textiles */}
        <FlatList
          data={sortedData}
          keyExtractor={(item) => item.id}
          onScroll={(e) => {
            const contentOffsetY = e.nativeEvent.contentOffset.y;
            setIsScrolling(contentOffsetY > 0); // Only show indicator if scrolled
          }}
          renderItem={({ item }) => (
            <View className="flex-row p-5 bg-white rounded-lg mb-3 items-center ">
              {/* Left Side: Image + Textile Info */}
              <View className="flex-row flex-1 items-center">
                <Image
                  source={{ uri: item.image }}
                  className="w-20 h-20 rounded-lg mr-4"
                />
                <View>
                  <Text className="text-lg font-semibold text-gray-900">
                    {item.name}
                  </Text>
                  <Text className="text-sm text-gray-600">{item.designer}</Text>
                </View>
              </View>

              {/* Right Side: Viewed Time */}
              <Text className="text-xs text-gray-400 text-right">
                {item.viewed}
              </Text>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 50 }} // Adjusting padding for better visual
        />

        {/* Scroll Indicator */}
        {isScrolling && (
          <View
            style={{
              position: "absolute",
              top: 80, // Adjust this to position the scroll indicator properly
              right: 10,
              width: 4,
              height: 50,
              backgroundColor: "white",
              opacity: 0.3,
              borderRadius: 2,
            }}
          />
        )}
      </View>
    </Provider>
  );
};

export default recent;
