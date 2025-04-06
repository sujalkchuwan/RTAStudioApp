import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";

export default function ExploreScreen() {
  const router = useRouter();
  const screenWidth = Dimensions.get("window").width; // Get screen width

  const textiles = [
    {
      id: "1",
      image: require("../../assets/images/Kushuthara.png"),
    },
    {
      id: "2",
      image: require("../../assets/images/YATHRA.png"),
    },
    {
      id: "3",
      image: "https://example.com/textile3.jpg",
    },
  ];

  return (
    <View className="flex-1 bg-gray-100 px-4 pt-6">
      {/* Header */}
      <Text className="text-2xl font-bold mb-4">Explore</Text>

      {/* Toggle Buttons */}
      <View className="flex-row mb-4">
        <TouchableOpacity className="bg-red-200 px-4 py-2 rounded-lg mr-2">
          <Text className="text-red-500">List</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-200 px-4 py-2 rounded-lg">
          <Text className="text-gray-600">Map</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TextInput
        placeholder="Type in a pattern or dzongkhag"
        className="bg-white p-3 rounded-lg shadow mb-4"
      />

      {/* Textiles List (1 Image Per Row) */}
      <FlatList
        data={textiles}
        numColumns={1} // Ensure only 1 item per row
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/explore/${item.id}`)}>
            <View
              style={{
                width: screenWidth - 32, // Full screen width minus padding
                height: 250, // Increase height for better visibility
                borderRadius: 12,
                overflow: "hidden",
                marginBottom: 16,
                alignSelf: "center", // Center the item
              }}
            >
              <Image
                source={
                  typeof item.image === "string"
                    ? { uri: item.image }
                    : item.image
                }
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
