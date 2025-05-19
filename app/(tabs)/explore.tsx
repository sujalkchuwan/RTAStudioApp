import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useEffect, useState, useMemo } from "react";
import { generateLightColor } from "@/utils/color";

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

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 px-4 pt-6 mt-10 ">
      <Text className="text-4xl font-semibold text-black mb-5">Explore</Text>

      <View className="flex-row mb-4">
        <TouchableOpacity className="bg-red-200 px-4 py-2 rounded-lg mr-2">
          <Text className="text-red-500">List</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-gray-200 px-4 py-2 rounded-lg"
          onPress={() => router.push("/map/exploremap")}
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

      <FlatList
        refreshing={refreshing}
        onRefresh={handleRefresh}
        data={filteredTextiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if (!colorCache[item.id]) {
            colorCache[item.id] = {
              durationColor: generateLightColor(),
              nameColor: generateLightColor(),
            };
          }
          const { durationColor, nameColor } = colorCache[item.id];

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
                  overflow: "hidden",
                }}
              >
                {/* ROW 1 */}
                <View style={{ flexDirection: "row", height: 220 }}>
                  {/* Column 1 */}
                  <View style={{ flex: 2, marginRight: 8 }}>
                    {/* Row 1: Duration + Textile Name */}
                    <View
                      style={{ flex: 1, flexDirection: "row", marginBottom: 4 }}
                    >
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          backgroundColor: durationColor,
                          borderRadius: 8,
                        }}
                      >
                        <Text className="text-xs text-gray-600 text-center">
                          {item.duration}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 2,
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: nameColor,
                          borderRadius: 8,
                          marginLeft: 4,
                        }}
                      >
                        <Text className="text-sm font-semibold text-center">
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
                        <Image
                          source={{ uri: item.originImage }}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 8,
                          }}
                          resizeMode="cover"
                        />
                        <Text className="absolute">{item.origin}</Text>
                        <Text
                          className="text-center"
                          style={{
                            position: "absolute",
                            bottom: 6,
                            color: "white",
                            fontWeight: "bold",
                            paddingHorizontal: 6,
                            paddingVertical: 2,
                            borderRadius: 4,
                            fontSize: 10,
                          }}
                        >
                          Origin
                        </Text>
                      </View>

                      <View style={{ flex: 2, position: "relative" }}>
                        <Image
                          source={{ uri: item.image }}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: 12,
                          }}
                          resizeMode="cover"
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
                    <Image
                      source={{ uri: item.weavingTechniqueImage }}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 12,
                      }}
                      resizeMode="cover"
                    />
                    <Text className="absolute text-white">
                      {item.weavingTechniqueText}
                    </Text>
                    <Text
                      className="text-center"
                      style={{
                        position: "absolute",
                        top: 6,
                        color: "white",
                        fontWeight: "bold",
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                        borderRadius: 4,
                        fontSize: 10,
                      }}
                    >
                      WEAVING TECHNIQUE
                    </Text>
                  </View>
                </View>

                {/* ROW 2 */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 8,
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
                    <Image
                      source={{ uri: item.motifImage }}
                      style={{ width: "100%", height: 80, borderRadius: 12 }}
                      resizeMode="cover"
                    />
                    <Text
                      className="text-center"
                      style={{
                        position: "absolute",
                        bottom: 6,
                        color: "white",
                        fontWeight: "bold",
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                        borderRadius: 4,
                        fontSize: 10,
                      }}
                    >
                      Motifs Found
                    </Text>
                  </View>

                  <View
                    style={{
                      position: "relative",
                      width: (screenWidth - 48) / 2,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={{ uri: item.symbolismImage }}
                      style={{ width: "100%", height: 80, borderRadius: 12 }}
                      resizeMode="cover"
                    />
                    <Text className="absolute text-white">
                      {trimWords(item.symbolismText)}
                    </Text>
                    <Text
                      className="text-center"
                      style={{
                        position: "absolute",
                        bottom: 6,
                        color: "white",
                        fontWeight: "bold",
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                        borderRadius: 4,
                        fontSize: 10,
                      }}
                    >
                      SYMBOLISM & FACTS
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
