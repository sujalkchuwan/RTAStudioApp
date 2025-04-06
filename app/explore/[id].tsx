import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";

const textileData: Record<
  string,
  {
    name: string;
    description: string;
    image: any;
    textileImage: any;
    motifs: { name: string; image: any }[];
    weavingTechniques: string[];
    processes: string[];
  }
> = {
  "1": {
    name: "KUSHUTHARA",
    description: "",
    image: require("../../assets/images/glass.png"),
    textileImage: require("../../assets/textile/Kushuthara.png"),
    motifs: [
      { name: "Monkeys Nails", image: require("../../assets/motif/motif.png") },
      { name: "Horse Motif", image: require("../../assets/motif/motif.png") },
      { name: "Pigeons Eye", image: require("../../assets/motif/motif.png") },
      {
        name: "Ritual Offering / Torma",
        image: require("../../assets/motif/motif.png"),
      },
      {
        name: "Dorji Ngong (Double Vajra)",
        image: require("../../assets/motif/motif.png"),
      },
      { name: "Flys Wings", image: require("../../assets/motif/motif.png") },
    ],
    weavingTechniques: [
      "Yarns: Cotton, silk, and wool are the primary materials. Traditionally, raw silk (bura) was used.",
      "Dyes: Natural plant-based and synthetic dyes are used for coloring.",
      "Looms: A traditional backstrap loom (thrue) is used, allowing for manual control of intricate designs.",
    ],
    processes: [
      "Step 1: Preparation of Raw Materials - Spinning and dyeing using organic materials.",
      "Step 2: Warping (Pangthra) - Measuring and stretching warp onto the backstrap loom.",
      "Step 3: Setting Up the Loom - Adjusting tension and setting up heddles.",
      "Step 4: Weaving the Base Fabric - Creating a plain-weave foundation.",
      "Step 5: Creating Motifs and Patterns - Using supplementary weft technique.",
      "Step 6: Finishing Touches - Inspecting, trimming, and washing the fabric.",
    ],
  },
};

export default function TextileDetailScreen() {
  const { id } = useLocalSearchParams();
  const textile = textileData[id as keyof typeof textileData];
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  if (!textile) return <Text>Textile not found</Text>;

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{textile.name}</Text>

      {/* Description Section */}
      <TouchableOpacity onPress={() => toggleSection("description")}>
        <Text style={{ fontWeight: "bold", marginVertical: 5 }}>
          Description ▼
        </Text>
      </TouchableOpacity>
      {expandedSections.description && (
        <View>
          <Text>{textile.description}</Text>
          <Image
            source={textile.image}
            style={{ width: "100%", marginVertical: 10 }} // Keeping original dimensions
            resizeMode="contain"
          />
        </View>
      )}

      {/* Textile Section */}
      <TouchableOpacity onPress={() => toggleSection("textile")}>
        <Text style={{ fontWeight: "bold", marginVertical: 5 }}>Textile ▼</Text>
      </TouchableOpacity>
      {expandedSections.textile && (
        <Image
          source={textile.textileImage}
          style={{ width: "100%" }} // Keeping original dimensions
          resizeMode="contain"
        />
      )}

      {/* Motifs Section */}
      <TouchableOpacity onPress={() => toggleSection("motifs")}>
        <Text style={{ fontWeight: "bold", marginVertical: 5 }}>Motifs ▼</Text>
      </TouchableOpacity>
      {expandedSections.motifs && (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {textile.motifs.map((motif, index) => (
            <View key={index} style={{ width: "48%", marginBottom: 10 }}>
              <Image
                source={motif.image}
                style={{ width: "100%", height: 120, borderRadius: 8 }}
              />
              <Text style={{ textAlign: "center" }}>{motif.name}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Weaving Techniques Section */}
      <TouchableOpacity onPress={() => toggleSection("weavingTechniques")}>
        <Text style={{ fontWeight: "bold", marginVertical: 5 }}>
          Weaving Techniques and Processes ▼
        </Text>
      </TouchableOpacity>
      {expandedSections.weavingTechniques && (
        <View>
          <Text style={{ fontWeight: "bold" }}>1. Materials Used</Text>
          {textile.weavingTechniques.map((tech, index) => (
            <Text key={index}>{tech}</Text>
          ))}
          <Text style={{ fontWeight: "bold", marginTop: 10 }}>
            2. Weaving Techniques
          </Text>
          {textile.processes.map((process, index) => (
            <Text key={index}>{process}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
