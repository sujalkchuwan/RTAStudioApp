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

// Interfaces matching backend response
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
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({});

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
        const [data]: TextileFormData[] = await response.json(); // matches your sample
        setTextile(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch textile data");
        setLoading(false);
      }
    };

    initialize();
  }, [id, textileParam]);

  if (loading)
    return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  if (error || !textile)
    return (
      <Text style={{ marginTop: 50 }}>{error ?? "Textile not found"}</Text>
    );

  return (
    <ScrollView className="p-[26px]">
      {/* Header */}
      <View className="border-b border-borderseparators h-12 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome
            name="angle-left"
            size={24}
            color="black"
            style={{ marginRight: 12 }}
          />
        </TouchableOpacity>
        <Text className="font-bold text-2xl">{textile.textileName}</Text>
      </View>

      {/* Description */}
      <SectionHeader
        title="Description"
        section="description"
        expanded={expandedSections.description}
        toggleSection={toggleSection}
      />
      {expandedSections.description && (
        <GlassContainer>
          <Text style={{ fontSize: 14, lineHeight: 22, padding: 10 }}>
            {textile.description}
          </Text>
        </GlassContainer>
      )}

      {/* Textile Image */}
      {/* Textile Image */}
      <SectionHeader
        title="Textile"
        section="textile"
        expanded={expandedSections.textile}
        toggleSection={toggleSection}
      />
      {expandedSections.textile && (
        <View style={{ marginVertical: 10 }}>
          <Image
            source={{ uri: textile.image }}
            style={{
              width: "100%",
              height: undefined,
              aspectRatio: 1, // or remove this if the image already has its own aspect
              borderRadius: 0,
              resizeMode: "contain", // this preserves the original shape
            }}
          />
        </View>
      )}

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
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  {textile.motifs.map((motif) => (
                    <View
                      key={motif.id}
                      style={{
                        width: "48%",
                        marginBottom: 16,
                      }}
                    >
                      <Image
                        source={{ uri: motif.imageUrl }}
                        style={{
                          width: "100%",
                          height: 150,
                          borderRadius: 8,
                        }}
                        resizeMode="cover"
                      />
                      <Text style={{ marginTop: 6, textAlign: "center" }}>
                        {motif.name}
                      </Text>
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

// Section Header Component
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
  // Define sections where you DON’T want the bottom border when collapsed
  const noBorderSections = ["processes"];

  return (
    <TouchableOpacity
      onPress={() => toggleSection(section)}
      className={`h-11 justify-center flex-row items-center ${
        expanded || noBorderSections.includes(section)
          ? ""
          : "border-b border-borderseparators"
      }`}
    >
      <Text className="font-bold text-base flex-1">{title}</Text>
      <FontAwesome
        name={expanded ? "angle-up" : "angle-down"}
        size={20}
        color="black"
      />
    </TouchableOpacity>
  );
}

// Glass Container
function GlassContainer({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        overflow: "hidden",
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 5, height: 3 }, // x:5, y:3
        shadowOpacity: 0.25,
        shadowRadius: 4.9, // blur
        elevation: 5, // for Android shadow
      }}
    >
      <BlurView
        intensity={70}
        tint="light"
        style={{
          padding: 10,
          backgroundColor: "rgba(255,255,255,0.7)",
        }}
      >
        {children}
      </BlurView>
    </View>
  );
}
