import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useEffect, useState, useMemo } from "react";
import { generateLightColor } from "@/utils/color"; // Assuming this utility exists
import { SafeAreaView } from "react-native-safe-area-context";

const colorCache: Record<string, { durationColor: string; nameColor: string }> =
  {};

type Textile = {
  id: string;
  textileName: string;
  origin: string;
  duration: string;
  description: string;
  weavingProcesses: string;
  dateAdded: string;
  status: string;
  image: string;
  motifImage: string;
  symbolismImage: string;
  originImage: string;
  weavingTechniqueImage: string;
  symbolismText: string;
  weavingTechniqueText: string;
};

export default function ExploreScreen() {
  const router = useRouter();
  const screenWidth = Dimensions.get("window").width;
  const [textiles, setTextiles] = useState<Textile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const trimWords = (text: string, maxWords = 6) => {
    const words = text.trim().split(/\s+/);
    return words.length <= maxWords
      ? text
      : words.slice(0, maxWords).join(" ") + "...";
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetch("https://rta-server.onrender.com/api/textile")
      .then((res) => res.json())
      .then((data: Textile[]) => {
        setTextiles(data);
        setRefreshing(false);
      })
      .catch((err) => {
        console.error("Failed to refresh textiles:", err);
        setRefreshing(false);
      });
  };

  const filteredTextiles = textiles.filter(
    (item) =>
      item.textileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.origin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetch("https://rta-server.onrender.com/api/textile")
      .then((res) => res.json())
      .then((data: Textile[]) => {
        setTextiles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch textiles:", err);
        setLoading(false);
      });
  }, []);

  // Helper to generate a random dark color for the gradient background
  const generateRandomDarkColor = () => {
    const colors = [
      "#5D3A3A", // Dark Red-Brown
      "#3A5D5D", // Dark Teal
      "#5D3A5D", // Dark Purple
      "#3A5D3A", // Dark Green
      "#5D5D3A", // Dark Yellow-Brown
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    // <SafeAreaView style={{ flex: 1}}>
    //   <KeyboardAvoidingView
    //   style={{ flex: 1 }}
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // 'padding' for iOS, 'height' for Android
    //   keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // Adjust as needed
    // >
    <View className="flex-1 bg-gray-100 px-4 pt-6 mt-10 ">
      <Text className="text-4xl font-semibold text-black mb-5">Explore</Text>

      <View className="flex-row mb-4">
        <TouchableOpacity className="bg-red-200 px-4 py-2 rounded-lg mr-2">
          <Text className="text-red-500">List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-gray-200 px-4 py-2 rounded-lg"
          onPress={() => router.push("/exploremap")}
        >
          <Text className="text-gray-600">Map</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Type in a pattern or dzongkhag"
        className="bg-white p-3 rounded-lg shadow mb-4"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="gray" />
        </View>
      ) : (
        <FlatList
          refreshing={refreshing}
          onRefresh={handleRefresh}
          data={filteredTextiles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            if (!colorCache[item.id]) {
              colorCache[item.id] = {
                durationColor: generateLightColor(), // This was previously used for duration, now replaced
                nameColor: generateLightColor(),
              };
            }
            // Use a dark random color for the duration background
            const durationBgColor = generateRandomDarkColor();
            // Use a dark random color for the textile name background
            const textileNameBgColor = generateRandomDarkColor();

            return (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/explore/[id]",
                    params: {
                      id: item.id,
                      textile: JSON.stringify(item),
                    },
                  })
                }
              >
                <View
                  style={{
                    width: screenWidth - 32,
                    backgroundColor: "white",
                    borderRadius: 12,
                    padding: 8,
                    marginBottom: 16,
                    alignSelf: "center",
                    overflow: "hidden"
                  }}
                >
                  {/* ROW 1 */}
                  <View style={{ flexDirection: "row", height: 220 }}>
                    {/* Column 1 */}
                    <View style={{ flex: 2, marginRight: 8 }}>
                      {/* Row 1: Duration + Textile Name */}
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          marginBottom: 4,
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            justifyContent: "center",
                            // Use dark random color for duration background
                            backgroundColor: durationBgColor,
                            borderRadius: 8,
                          }}
                        >
                          {/* Text color changed to white for contrast */}
                          <Text
                            className="text-xs text-center"
                            style={{ color: "white" }}
                          >
                            {item.duration}
                          </Text>
                        </View>
                        {/* Textile Name Section with dark overlay and white text */}
                        <View
                          style={{
                            flex: 2,
                            marginLeft: 4,
                            borderRadius: 8,
                            overflow: "hidden",
                            position: "relative",
                            justifyContent: "center", // Center text vertically
                            alignItems: "center", // Center text horizontally
                          }}
                        >
                          {/* Dark overlay for exposure effect */}
                          <View
                            style={{
                              position: "absolute",
                              width: "100%",
                              height: "100%",
                              backgroundColor: textileNameBgColor,
                              borderRadius: 8, // Match container border radius
                            }}
                          />
                          {/* Textile Name Text directly on top, now white */}
                          <Text className="font-sm"
                            style={{
                              color: "white", // Text color is white
                              textAlign: "center",
                              fontWeight: "bold",
                            }}
                          >
                            {item.textileName}
                          </Text>
                        </View>
                      </View>

                      {/* Row 2: Origin Image + Main Image */}
                      <View style={{ flex: 2, flexDirection: "row" }}>
                        <View
                          style={{
                            flex: 1,
                            marginRight: 4,
                            position: "relative",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {/* Image */}
                          <Image
                            source={{ uri: item.originImage }}
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: 8,
                            }}
                            resizeMode="cover"
                          />
                          {/* Dark overlay for exposure effect */}
                          <View
                            style={{
                              position: "absolute",
                              width: "100%",
                              height: "100%",
                              borderRadius: 8, // Match image border radius
                              backgroundColor: "rgba(0,0,0,0.4)", // Semi-transparent dark overlay
                            }}
                          />
                          {/* Changed from absolute text to a View with background for better visibility */}
                          <View
                            style={{
                              position: "absolute",
                              bottom: 6,
                              backgroundColor: "rgba(0,0,0,0.5)", // Dark semi-transparent background
                              paddingHorizontal: 6,
                              paddingVertical: 2,
                              borderRadius: 4,
                            }}
                          >
                            {/* Text color changed to white */}
                            <Text
                              className="text-center"
                              style={{
                                color: "white",
                                fontWeight: "bold",
                                fontSize: 10,
                              }}
                            >
                              Origin
                            </Text>
                          </View>
                        </View>

                        <View style={{ flex: 2, position: "relative" }}>
                          {/* Image */}
                          <Image
                            source={{ uri: item.image }}
                            style={{
                              width: "100%",
                              height: "100%",
                              borderRadius: 12,
                            }}
                            resizeMode="cover"
                          />
                          {/* Dark overlay for exposure effect */}
                          <View
                            style={{
                              position: "absolute",
                              width: "100%",
                              height: "100%",
                              borderRadius: 12, // Match image border radius
                              backgroundColor: "rgba(0,0,0,0.4)", // Semi-transparent dark overlay
                            }}
                          />
                        </View>
                      </View>
                    </View>

                    {/* Column 2: Weaving Technique Image */}
                    <View
                      style={{
                        flex: 1,
                        position: "relative",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {/* Image */}
                      <Image
                        source={{ uri: item.weavingTechniqueImage }}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: 12,
                        }}
                        resizeMode="cover"
                      />
                      {/* Dark overlay for exposure effect */}
                      <View
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          borderRadius: 12, // Match image border radius
                          backgroundColor: "rgba(0,0,0,0.4)", // Semi-transparent dark overlay
                        }}
                      />
                      {/* Changed from absolute text to a View with background for better visibility */}
                      <View
                        style={{
                          position: "absolute",
                          top: 6,
                          backgroundColor: "rgba(0,0,0,0.5)", // Dark semi-transparent background
                          paddingHorizontal: 6,
                          paddingVertical: 2,
                          borderRadius: 4,
                        }}
                      >
                        {/* Text color changed to white */}
                        <Text
                          className="text-center"
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 10,
                          }}
                        >
                          WEAVING TECHNIQUE
                        </Text>
                      </View>
                      {/* Text color changed to white */}
                      <Text
                        className="absolute bottom-6"
                        style={{ color: "white" }}
                      >
                        {item.weavingTechniqueText}
                      </Text>
                    </View>
                  </View>

                  {/* ROW 2 */}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 8,
                      gap: 5,
                    }}
                  >
                    <View
                      style={{
                        position: "relative",
                        width: (screenWidth - 48) / 2,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {/* Image */}
                      <Image
                        source={{ uri: item.motifImage }}
                        style={{ width: "100%", height: 80, borderRadius: 12 }}
                        resizeMode="cover"
                      />
                      {/* Dark overlay for exposure effect */}
                      <View
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          borderRadius: 12, // Match image border radius
                          backgroundColor: "rgba(0,0,0,0.4)", // Semi-transparent dark overlay
                        }}
                      />
                      <View
                        style={{
                          position: "absolute",
                          bottom: 6,
                          backgroundColor: "rgba(0,0,0,0.5)",
                          paddingHorizontal: 6,
                          paddingVertical: 2,
                          borderRadius: 4,
                        }}
                      >
                        {/* Text color changed to white */}
                        <Text
                          className="text-center"
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 10,
                          }}
                        >
                          Motifs Found
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        position: "relative",
                        width: (screenWidth - 48) / 2,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {/* Image */}
                      <Image
                        source={{ uri: item.symbolismImage }}
                        style={{ width: "100%", height: 80, borderRadius: 12 }}
                        resizeMode="cover"
                      />
                      {/* Dark overlay for exposure effect */}
                      <View
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          borderRadius: 12, // Match image border radius
                          backgroundColor: "rgba(0,0,0,0.4)", // Semi-transparent dark overlay
                        }}
                      />
                      <View
                        style={{
                          position: "absolute",
                          bottom: 6,
                          backgroundColor: "rgba(0,0,0,0.5)",
                          paddingHorizontal: 6,
                          paddingVertical: 2,
                          borderRadius: 4,
                        }}
                      >
                        {/* Text color changed to white */}
                        <Text
                          className="text-center"
                          style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 10,
                          }}
                        >
                          SYMBOLISM & FACTS
                        </Text>
                      </View>
                      {/* Text color changed to white */}
                      <Text
                        className="absolute top-6"
                        style={{ color: "white" }}
                      >
                        {trimWords(item.symbolismText)}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
    // </KeyboardAvoidingView>
    // </SafeAreaView>
  );
}
