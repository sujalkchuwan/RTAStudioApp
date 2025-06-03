import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  Platform,
} from "react-native";
import Svg, {
  Path,
  G,
  Defs,
  Pattern,
  Filter,
  FeGaussianBlur,
  Line,
  Circle,
  Text as SvgText,
} from "react-native-svg";
import { regions, Textile } from "./map";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedSvgText = Animated.createAnimatedComponent(SvgText);

const FIXED_TEXTILE_ID = "cmbgr6c15000gnl2fytnv0";

const ExploreMap = () => {
  const router = useRouter();
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // On mount, select region containing FIXED_TEXTILE_ID by default
  useEffect(() => {
    const regionWithTextile = regions.find((region) =>
      region.textiles.some((t) => t.id === FIXED_TEXTILE_ID)
    );
    if (regionWithTextile) {
      setSelectedRegionId(regionWithTextile.id);
    }
  }, []);

  // Animate fade in
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: Platform.OS !== "web",
    }).start();
  }, [fadeAnim]);

  const selectedRegionData = regions.find((r) => r.id === selectedRegionId);
  const currentRegionTextiles = selectedRegionData?.textiles || [];

  const handleRegionPress = (regionId: string) => {
    setSelectedRegionId(regionId);
  };

  // On textile press, always send the fixed textile id in the route params
  const handleTextilePress = (textile?: Textile) => {
    router.push({
      pathname: "/explore/[id]",
      params: {
        id: FIXED_TEXTILE_ID,
        textile: textile ? JSON.stringify(textile) : "",
      },
    });
  };

  const designAnnotations = [
    {
      regionName: "Gasa",
      dzongkhagLabelX: 280,
      dzongkhagLabelY: 80,
      lineToX: 260,
      lineToY: 120,
      nameOffsetY: -10,
    },
    {
      regionName: "Tashigang",
      dzongkhagLabelX: 280,
      dzongkhagLabelY: 220,
      lineToX: 260,
      lineToY: 200,
      nameOffsetY: -10,
    },
  ];

  const renderMap = () => (
    <View style={styles.mapViewContainer}>
      <Svg
        width={width}
        height={height * 0.9}
        viewBox="0 0 404.41379 792.44208"
        preserveAspectRatio="xMidYMid meet"
      >
        <Defs>
          <Filter id="blurFilter">
            <FeGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </Filter>
          {regions.map((region) => {
            const PatternComp = region.PatternComponent;
            return (
              <Pattern
                key={`${region.id}-pattern-def`}
                id={region.patternId}
                x="0"
                y="0"
                width="1"
                height="1"
                patternUnits="objectBoundingBox"
              >
                <PatternComp
                  width="280"
                  height="280"
                  preserveAspectRatio="none"
                />
              </Pattern>
            );
          })}
        </Defs>

        <G
          transform="translate(-20, 30) rotate(90 202.206895 202.206895) scale(0.9)"
        >
          {regions.map((region) => (
            <AnimatedPath
              key={region.id}
              d={region.d || "M0,0"}
              fill={`url(#${region.patternId})`}
              stroke="#FFFFFF"
              strokeWidth={selectedRegionId === region.id ? 1.5 : 0.7}
              opacity={fadeAnim}
              fillOpacity={
                selectedRegionId && selectedRegionId !== region.id ? 0.3 : 1
              }
              filter={
                selectedRegionId && selectedRegionId !== region.id
                  ? "url(#blurFilter)"
                  : undefined
              }
              onPress={() => handleRegionPress(region.id)}
            />
          ))}

          {/* Show Gasa annotation by default or when nothing selected */}
          {!selectedRegionId && (
            <G key="annot-Gasa">
              <AnimatedLine
                x1={280}
                y1={55}
                x2={40}
                y2={60}
                stroke="#000"
                strokeWidth={3}
                opacity={fadeAnim}
              />

              <AnimatedSvgText
                x={8}
                y={50}
                fontSize={14}
                fill="black"
                textAnchor="start"
                opacity={fadeAnim}
              >
                Gasa
              </AnimatedSvgText>

              {regions
                .find((r) => r.name === "Gasa")
                ?.textiles.slice(0, 3)
                .map((textile, index) => (
                  <AnimatedCircle
                    key={`gasa-textile-${textile.id}`}
                    cx={8 + index * 20}
                    cy={70}
                    r={6}
                    fill={textile.color}
                    stroke="#000"
                    strokeWidth={0.5}
                    opacity={fadeAnim}
                  />
                ))}
            </G>
          )}

          {/* Render other annotations if needed */}
          {selectedRegionId === null &&
            designAnnotations
              .filter((a) => a.regionName !== "Gasa")
              .map((annot) => {
                const regionData = regions.find(
                  (r) => r.name === annot.regionName
                );
                if (!regionData?.textiles) return null;

                return (
                  <G key={`annot-${annot.regionName}`}>
                    <AnimatedLine
                      x1={annot.dzongkhagLabelX}
                      y1={annot.dzongkhagLabelY + (annot.nameOffsetY || 0) + 15}
                      x2={annot.lineToX}
                      y2={annot.lineToY}
                      stroke="#000"
                      strokeWidth={1}
                      opacity={fadeAnim}
                    />
                    <AnimatedSvgText
                      x={annot.dzongkhagLabelX + 5}
                      y={annot.dzongkhagLabelY + (annot.nameOffsetY || 0)}
                      fontSize={10}
                      fill="#000"
                      textAnchor="start"
                      opacity={fadeAnim}
                    >
                      {/* label text can go here */}
                    </AnimatedSvgText>
                    {regions
                      .find((r) => r.name === "Gasa")
                      ?.textiles.slice(0, 3)
                      .map((textile, index) => (
                        <G key={`gasa-textile-${textile.id}`}>
                          <AnimatedCircle
                            cx={10}
                            cy={70 + index * 25}
                            r={6}
                            fill={textile.color}
                            stroke="#000"
                            strokeWidth={0.9}
                            opacity={fadeAnim}
                          />
                          <AnimatedSvgText
                            x={25}
                            y={70 + index * 25 + 5}
                            fontSize={12}
                            fill="black"
                            textAnchor="start"
                            opacity={fadeAnim}
                          >
                            {textile.name}
                          </AnimatedSvgText>
                        </G>
                      ))}
                  </G>
                );
              })}
        </G>
      </Svg>

      {selectedRegionData && (
        <View style={styles.floatingInfoContainer}>
          <View style={styles.selectedInfoCard}>
            <View style={styles.selectedInfoCardHeader}>
              <Text style={styles.selectedRegionName}>{selectedRegionData.name}</Text>
              <TouchableOpacity
                onPress={() => setSelectedRegionId(null)}
                style={styles.closeButton}
              >
                <Ionicons name="close-circle-outline" size={28} color="#333" />
              </TouchableOpacity>
            </View>
            <Text style={styles.textileListTitle}>Textiles:</Text>
            <ScrollView
              style={styles.textileListScrollView}
              contentContainerStyle={styles.textileListContentContainer}
            >
              {currentRegionTextiles.length > 0 ? (
                currentRegionTextiles.map((textile) => (
                  <TouchableOpacity
                    key={textile.id}
                    style={styles.textileItem}
                    onPress={() => handleTextilePress(textile)}
                  >
                    <View
                      style={[styles.textileDot, { backgroundColor: textile.color }]}
                    />
                    <Text style={styles.textileName}>{textile.name}</Text>
                    <Ionicons name="chevron-forward-outline" size={18} color="#666" />
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.noTextilesText}>
                  No textiles listed for this region.
                </Text>
              )}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );

  const renderList = () => (
    <ScrollView style={styles.listViewScrollView}>
      {regions.map((region) => (
        <TouchableOpacity
          key={region.id}
          style={styles.listItem}
          onPress={() => {
            setViewMode("map");
            handleRegionPress(region.id);
          }}
        >
          <View
            style={[
              styles.textileDotLarge,
              { backgroundColor: (region.textiles && region.textiles[0]?.color) || "#ccc" },
            ]}
          />
          <Text style={styles.listItemText}>{region.name}</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#666" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <View style={styles.fullScreenContainer}>
      <View style={styles.mainContent}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="close" size={28} color="black" />
          </TouchableOpacity>
          <View style={styles.toggleButtonsContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                viewMode === "list" ? styles.activeToggleButton : {},
              ]}
              onPress={() => setViewMode("list")}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  viewMode === "list" ? styles.activeToggleButtonText : {},
                ]}
              >
                RegionList
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                viewMode === "map" ? styles.activeToggleButton : {},
              ]}
              onPress={() => setViewMode("map")}
            >
              <Text
                style={[
                  styles.toggleButtonText,
                  viewMode === "map" ? styles.activeToggleButtonText : {},
                ]}
              >
                Map
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {viewMode === "map" ? renderMap() : renderList()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F7F7F7",
    marginTop: 0,
  },
  mainContent: {
    flex: 1,
    flexDirection: "column",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "ios" ? 50 : 20,
    paddingBottom: -11,
    backgroundColor: "#F7F7F7",
    marginTop: 0,
  },
  toggleButtonsContainer: {
    flexDirection: "row",
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    padding: 2,
    marginTop: 20,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 7,
  },
  activeToggleButton: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  toggleButtonText: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "500",
  },
  activeToggleButtonText: {
    color: "#E53935",
    fontWeight: "600",
  },
  mapViewContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7F7F7",
    overflow: "hidden",
  },
  floatingInfoContainer: {
    position: "absolute",
    top: "5%",
    right: "5%",
    width: 220,
    maxHeight: "40%",
    zIndex: 10,
    backgroundColor: "transparent",
  },
  selectedInfoCard: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    transform: [{ rotate: "90deg" }],
  },
  selectedInfoCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  selectedRegionName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    padding: 5,
  },
  textileListTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    marginBottom: 8,
  },
  textileListScrollView: {
    maxHeight: 120,
  },
  textileListContentContainer: {},
  textileItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    width: "100%",
  },
  textileDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  textileName: {
    fontSize: 14,
    color: "#555",
    flex: 1,
  },
  noTextilesText: {
    color: "#777",
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 10,
  },
  listViewScrollView: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
    backgroundColor: "#FFFFFF",
    marginBottom: 5,
    borderRadius: 8,
  },
  textileDotLarge: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  listItemText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});

export default ExploreMap;
