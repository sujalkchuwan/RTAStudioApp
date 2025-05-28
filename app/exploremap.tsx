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
  Rect,
  Text as SvgText,
} from "react-native-svg";
// import { regions, Region, Textile } from "./map"; // Ensure Textile interface is also exported from map.tsx if not already
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedSvgText = Animated.createAnimatedComponent(SvgText);

const ExploreMap = () => {
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: Platform.OS !== "web", // Svg animations might not support native driver fully
    }).start();
  }, [fadeAnim]);

  const selectedRegionData = regions.find((r) => r.id === selectedRegionId);
  const currentRegionTextiles = selectedRegionData?.textiles || [];

  const handleRegionPress = (regionId: string) => {
    setSelectedRegionId(regionId);
  };

  const handleTextilePress = (textile: Textile) => {
    console.log(`Navigate to: ${textile.detailPage}`);
    // Actual navigation logic would go here
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
    {
      regionName: "Samdrup Jongkhar",
      dzongkhagLabelX: 280,
      dzongkhagLabelY: 320,
      lineToX: 260,
      lineToY: 300,
      nameOffsetY: -10,
      customName: "S/Jongkhar:",
    },
  ];

  const renderMap = () => (
    <View style={styles.mapViewContainer}>
      <Svg
        width={width}
        height={height * 0.9} // And takes most of the screen width
        viewBox="0 0 404.41379 792.44208" // Original viewBox for the SVG data
        preserveAspectRatio="xMidYMid meet"
      >
        <Defs>
          <Filter id="blurFilter">
            <FeGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </Filter>
          {regions.map((region) => {
            const PatternComp = region.PatternComponent;
            console.log("Rendering pattern for:", region.name);
            return (
              <Pattern
                key={`${region.id}-pattern-def`}
                id={region.patternId}
                x="0"
                y="0"
                width="1" // 100% of the shape's bounding box width
                height="1" // 100% of the shape's bounding box height
                patternUnits="objectBoundingBox"
              >
                {/* Render the imported SVG component directly */}
                <PatternComp
                  width="280" // Fill 100% of the pattern tile (which is the bounding box)
                  height="280" // Fill 100% of the pattern tile
                  preserveAspectRatio="none" // Scale to fill, maintain aspect, crop if needed
                />
              </Pattern>
            );
          })}
        </Defs>

        {/* Rotate the Group containing paths to display map vertically */}
        {/* Adjust translation to center the rotated map within the Svg viewport */}
        <G transform="translate(-20, 30) rotate(90 202.206895 202.206895) scale(0.9)">
          {regions.map((region) => (
            <AnimatedPath
              key={region.id}
              d={region.d || "M0,0"} // Provide a fallback d path
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

          {/* Annotations: Render only if no region is selected */}
          {!selectedRegionId &&
            designAnnotations.map((annot) => {
              const regionDataForAnnotation = regions.find(
                (r) => r.name === annot.regionName
              );
              if (!regionDataForAnnotation || !regionDataForAnnotation.textiles)
                return null;

              return (
                <G key={`annot-${annot.regionName}`}>
                  <AnimatedLine
                    x1={annot.dzongkhagLabelX}
                    y1={annot.dzongkhagLabelY + (annot.nameOffsetY || 0) + 15}
                    x2={annot.lineToX}
                    y2={annot.lineToY}
                    stroke="#000000"
                    strokeWidth={1}
                    opacity={fadeAnim}
                  />
                  <AnimatedSvgText
                    x={annot.dzongkhagLabelX + 5}
                    y={annot.dzongkhagLabelY + (annot.nameOffsetY || 0)}
                    fontSize="10"
                    fill="#000000"
                    textAnchor="start"
                    opacity={fadeAnim}
                  >
                    {annot.customName || `${annot.regionName}:`}
                  </AnimatedSvgText>
                  {regionDataForAnnotation.textiles
                    .slice(0, 3)
                    .map((textile, index) => (
                      <AnimatedCircle
                        key={`${annot.regionName}-textile-${textile.id}`}
                        cx={annot.dzongkhagLabelX + 10 + index * 12}
                        cy={
                          annot.dzongkhagLabelY + (annot.nameOffsetY || 0) + 25
                        }
                        r={4}
                        fill={textile.color}
                        stroke="#000000"
                        strokeWidth={0.5}
                        opacity={fadeAnim}
                      />
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
              <Text style={styles.selectedRegionName}>
                {selectedRegionData.name}
              </Text>
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
                      style={[
                        styles.textileDot,
                        { backgroundColor: textile.color },
                      ]}
                    />
                    <Text style={styles.textileName}>{textile.name}</Text>
                    <Ionicons
                      name="chevron-forward-outline"
                      size={18}
                      color="#666"
                    />
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
              {
                backgroundColor:
                  (region.textiles && region.textiles[0]?.color) || "#ccc",
              },
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
      {/* Sidebar can be uncommented if needed */}
      {/* <View style={styles.sidebar}> ... </View> */}
      <View style={styles.mainContent}>
        <View style={styles.topBar}>
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
          {/* System icons can be uncommented if needed */}
          {/* <View style={styles.systemIconsContainer}> ... </View> */}
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
    marginTop: -29,
  },
  sidebar: {
    width: 80,
    backgroundColor: "#FFFFFF",
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  sidebarIconContainer: {
    marginBottom: 40,
    alignItems: "center",
  },
  activeSidebarIcon: {},
  exploreText: {
    color: "#E53935",
    fontSize: 12,
    marginTop: 4,
  },
  mainContent: {
    flex: 1,
    flexDirection: "column",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between", // Changed to space-between to push toggle to left and system icons to right
    alignItems: "center",
    paddingHorizontal: 15,
    paddingTop: Platform.OS === "ios" ? 50 : 20, // Adjusted for status bar
    paddingBottom: 10,
    backgroundColor: "#F7F7F7", // Or your desired background
  },
  toggleButtonsContainer: {
    flexDirection: "row",
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    padding: 2,
    // Removed marginTop: -39 as topBar padding handles spacing
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
  systemIconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  systemIconText: {
    fontSize: 14,
    color: "#000000",
    marginRight: 8,
    fontWeight: "500",
  },
  systemIcon: {
    marginLeft: 5,
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
