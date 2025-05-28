import { useStorage } from "@/liveblocks.config";
import { useRoom, useSelf } from "@liveblocks/react";
import { View, TouchableOpacity, Animated, Dimensions } from "react-native";
import Svg, { G } from "react-native-svg";
import {
  GestureDetector,
  Gesture,
  State,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useState, useRef, useCallback, useEffect } from "react";
import { colorToCss } from "@/utils/utils";
import LayerComponent from "./LayerComponent";
import RightSidebar from "../sidebar/RightSidebar";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

interface Camera {
  x: number;
  y: number;
  zoom: number;
}

// Calculate SIDEBAR_WIDTH dynamically as 60% of screen width
const SIDEBAR_WIDTH = Dimensions.get("window").width * 0.6;

export function CanvasView() {
  const layerIds = useStorage((root) => root.layerIds);
  const layers = useStorage((root) => root.layers);
  const roomColor = useStorage((root) => root.roomColor);
  const room = useRoom();
  const self = useSelf();
  const selectedLayer = useSelf((me) =>
    me.presence.selection.length > 0 ? me.presence.selection[0] : null
  ); // Check if any layer is selected

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, zoom: 1 });
  const [renderOnlyComponent, setRenderOnlyComponent] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false); // State to control sidebar visibility

  const baseZoom = useRef(1);
  const [hasInitializedCamera, setHasInitializedCamera] = useState(false);

  // Initialize sidebarTranslateX to its hidden position (sidebar's width)
  const sidebarTranslateX = useRef(new Animated.Value(SIDEBAR_WIDTH)).current;

  // Animate the sidebar's position based on showRightSidebar state
  useEffect(() => {
    Animated.timing(sidebarTranslateX, {
      toValue: showRightSidebar ? 0 : SIDEBAR_WIDTH, // Animate to 0 (visible) or SIDEBAR_WIDTH (hidden)
      duration: 300,
      useNativeDriver: true, // Use native driver for smoother animation
    }).start();
  }, [showRightSidebar]);

  // Function to animate camera movement
  function animateCameraTo(x: number, y: number, zoom: number) {
    setCamera({ x, y, zoom });
  }

  // Initialize camera position based on existing layers
  useEffect(() => {
    if (!hasInitializedCamera && layerIds && layers && layerIds.length > 0) {
      const positions = layerIds
        .map((id) => layers.get(id))
        .filter(
          (l): l is NonNullable<typeof l> =>
            !!l && typeof l.x === "number" && typeof l.y === "number"
        );
      if (positions.length > 0) {
        const minX = Math.min(...positions.map((l) => l.x));
        const minY = Math.min(...positions.map((l) => l.y));
        setCamera({ x: minX - 100, y: minY - 100, zoom: 1 });
        setHasInitializedCamera(true);
      }
    }
  }, [layerIds, layers, hasInitializedCamera]);

  // Handle layer selection
  const handleLayerPress = (id: string) => {
    room.updatePresence({ selection: [id] });
    setShowRightSidebar(true); // Show sidebar when a layer is selected
    console.log("Layer selected:", id); // Debugging log
  };

  // Unselect all layers when canvas background is tapped
  const unselectLayers = useCallback(() => {
    // Check if there was a selection BEFORE updating presence
    const wasLayerSelected =
      self?.presence?.selection && self.presence.selection.length > 0;

    // Always deselect layers if any were selected
    if (wasLayerSelected) {
      room.updatePresence({ selection: [] });
      console.log("Canvas background tapped, unselecting layers.");
      setShowRightSidebar(false); // If a layer was selected, tapping background should close the sidebar
    } else {
      // If no layer was selected, toggle the sidebar's visibility
      setShowRightSidebar((prev) => !prev);
      console.log("Canvas background tapped, toggling sidebar visibility.");
    }
  }, [self?.presence?.selection, room, setShowRightSidebar]); // Added setShowRightSidebar to dependencies

  // Filter visible layers based on renderOnlyComponent state
  const visibleLayerIds = renderOnlyComponent
    ? layerIds?.filter((id) => {
        const layer = layers?.get(id);
        return (
          layer &&
          "groupType" in layer &&
          (layer as any).groupType === "component"
        );
      })
    : layerIds;

  if (!layerIds || !layers) return null;

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      baseZoom.current = camera.zoom;
    })
    .onUpdate((event) => {
      const newZoom = Math.min(
        Math.max(baseZoom.current * event.scale, 0.1),
        10
      );
      setCamera((prev) => ({ ...prev, zoom: newZoom }));
    });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((event) => {
      const zoomedIn = camera.zoom > 1;
      const newZoom = zoomedIn ? 1 : 2;
      animateCameraTo(camera.x, camera.y, newZoom);
    });

  const composedGestures = Gesture.Simultaneous(doubleTapGesture, pinchGesture);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 relative">
        {/* Top Bar */}
        <View className="flex-row justify-start items-center p-3 bg-gray-100 border-b border-gray-200">
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome
              name="angle-left"
              size={24}
              color="black"
              className="mr-3"
            />
          </TouchableOpacity>
        </View>

        {/* Canvas Area */}
        <View className="flex-1 overflow-hidden">
          <GestureDetector gesture={composedGestures}>
            <Svg
              width="100%"
              height="100%"
              viewBox={`${camera.x} ${camera.y} ${1000 / camera.zoom} ${
                1000 / camera.zoom
              }`}
              style={{
                backgroundColor: roomColor ? colorToCss(roomColor) : "#fff",
              }}
              onPress={unselectLayers}
            >
              <G>
                {visibleLayerIds?.map((id) => (
                  <LayerComponent
                    key={id}
                    id={id}
                    onLayerPointerDown={handleLayerPress}
                  />
                ))}
              </G>
            </Svg>
          </GestureDetector>
        </View>

        {/* Right Sidebar - Always rendered, position animated */}
        <Animated.View
          style={{
            transform: [{ translateX: sidebarTranslateX }], // Animate translateX
            height: "100%",
            width: SIDEBAR_WIDTH,
            position: "absolute", // Ensure absolute positioning
            top: 0,
            bottom: 0,
            right: 0, // Pin to the right edge
            backgroundColor: "#f9f9f9", // Using a hex color for background for consistency
            zIndex: 10,
            shadowColor: "#000",
            shadowOffset: { width: -2, height: 0 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <RightSidebar
            selectedLayerId={selectedLayer ?? ""}
            onClose={() => {
              setShowRightSidebar(false); // Hide sidebar
              room.updatePresence({ selection: [] }); // Deselect any layer
            }}
          />
        </Animated.View>
      </View>
    </GestureHandlerRootView>
  );
}
