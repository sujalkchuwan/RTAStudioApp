import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import RenderHtml from "react-native-render-html";
import { router, useLocalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface Motif {
  id: string;
  name: string;
  imageUrl: string;
}

interface Technique {
  id: string;
  technique: string;
}

interface TextileFormData {
  id: string;
  textileName: string;
  origin: string;
  duration: string;
  description: string;
  weavingProcesses: string;
  status: string;
  image: string;
  motifImage: string;
  symbolismImage: string;
  originImage: string;
  weavingTechniqueImage: string;
  symbolismText: string;
  weavingTechniqueText: string;
  techniques: Technique[];
  motifs: Motif[];
}

export default function TextileDetailScreen() {
  const { id, textile: textileParam } = useLocalSearchParams();
  const [textile, setTextile] = useState<TextileFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({
    motifs: false,
    processes: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    const initialize = async () => {
      if (textileParam) {
        try {
          const parsed: TextileFormData = JSON.parse(textileParam as string);
          setTextile(parsed);
          setLoading(false);
          return;
        } catch (err) {
          setError("Failed to parse textile data");
          setLoading(false);
          return;
        }
      }

      try {
        const response = await fetch(`https://your-api.com/textile/${id}`);
        const [data]: TextileFormData[] = await response.json();
        setTextile(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch textile data");
        setLoading(false);
      }
    };

    initialize();
  }, [id, textileParam]);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  if (error || !textile) return <Text style={{ marginTop: 50 }}>{error ?? "Textile not found"}</Text>;

  return (
    <ScrollView className="p-[26px] mt-10">
      <View className="border-b border-borderseparators h-12 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome name="angle-left" size={24} color="black" style={{ marginRight: 12 }} />
        </TouchableOpacity>
        <Text className="font-bold text-2xl">{textile.textileName}</Text>
      </View>

      {/* Description (Museum-style Glass Box with Gradient) */}
      <Text className="font-bold text-base mt-6 mb-2">Description</Text>
      <GlassDescriptionContainer>
        <Text style={{ fontSize: 14, lineHeight: 22 }}>{textile.description}</Text>
      </GlassDescriptionContainer>

      {/* Textile Image */}
     
    <Text className="font-bold text-base mt-4 mb-0">Textile</Text>
<View style={{ paddingTop: 4 }}>
  <Image
  source={{ uri: textile.image }}
  style={{
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
    marginTop: -60,
    marginBottom : -20
  }}
/>
</View>


      {/* Motifs */}
      {textile.motifs?.length > 0 && (
        <>
          <SectionHeader
            title="Motifs"
            section="motifs"
            expanded={expandedSections.motifs}
            toggleSection={toggleSection}
          />
          {expandedSections.motifs && (
            <View style={{ marginVertical: 10 }}>
              <View style={{ padding: 10 }}>
                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
                  {textile.motifs.map((motif) => (
                    <View key={motif.id} style={{ width: "48%", marginBottom: 16 }}>
                      <Image
                        source={{ uri: motif.imageUrl }}
                        style={{ width: "100%", height: 150, borderRadius: 8 }}
                        resizeMode="cover"
                      />
                      <Text style={{ marginTop: 6, textAlign: "center" }}>{motif.name}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}
        </>
      )}

      {/* Weaving Techniques and Processes */}
      <SectionHeader
        title="Weaving Techniques and Processes"
        section="processes"
        expanded={expandedSections.processes}
        toggleSection={toggleSection}
      />
      {expandedSections.processes && (
        <View style={{ marginVertical: 10 }}>
          <RenderHtml
            contentWidth={width - 52}
            source={{ html: `<p>${textile.weavingProcesses}</p>` }}
            baseStyle={{ padding: 10 }}
          />
        </View>
      )}
    </ScrollView>
  );
}

function SectionHeader({
  title,
  section,
  expanded,
  toggleSection,
}: {
  title: string;
  section: string;
  expanded?: boolean;
  toggleSection: (section: string) => void;
}) {
  return (
    <TouchableOpacity
      onPress={() => toggleSection(section)}
      className="h-11 justify-center flex-row items-center border-b border-borderseparators"
    >
      <Text className="font-bold text-base flex-1">{title}</Text>
      <FontAwesome name={expanded ? "angle-up" : "angle-down"} size={20} color="black" />
    </TouchableOpacity>
  );
}
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';


// GlassDescriptionContainer with gradient and improved glass effect
function GlassDescriptionContainer({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        position: "relative",
        overflow: "hidden",
        marginVertical: 12,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 8,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.3)", // subtle border for glass edge
      }}
    >
      <BlurView
        intensity={50} // soften the blur a bit
        tint="light"
        style={{
          padding: 20,
          borderRadius: 20,
          backgroundColor: "rgba(255, 255, 255, 0.1)", // reduce solid white background opacity
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gradient overlay for glass shimmer */}
        <LinearGradient
          colors={[
            "rgba(255, 255, 255, 0.25)",
            "rgba(255, 255, 255, 0.05)",
            "rgba(255, 255, 255, 0.25)",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            ...StyleSheet.absoluteFillObject,
            borderRadius: 20,
          }}
        />
        {/* Metallic corner circles */}
        {["topLeft", "topRight", "bottomLeft", "bottomRight"].map((pos, index) => (
          <View
            key={index}
            style={{
              position: "absolute",
              width: 14,
              height: 14,
              borderRadius: 7,
              backgroundColor: "#E6E8F0", // lighter metallic color
              borderColor: "#B0C4DE",
              borderWidth: 1,
              shadowColor: "#A0A8B9",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 3,
              ...(pos === "topLeft" && { top: 6, left: 6 }),
              ...(pos === "topRight" && { top: 6, right: 6 }),
              ...(pos === "bottomLeft" && { bottom: 6, left: 6 }),
              ...(pos === "bottomRight" && { bottom: 6, right: 6 }),
              zIndex: 10,
            }}
          />
        ))}
        {/* Content children */}
        <View style={{ position: "relative", zIndex: 20 }}>
          {children}
        </View>
      </BlurView>
    </View>
  );
}
