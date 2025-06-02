import { useStorage } from "@/liveblocks.config";
import { useRoom, useSelf } from "@liveblocks/react";
import {
  View,
  PanResponder,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import Svg, { G } from "react-native-svg";
import {
  GestureHandlerRootView,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  PinchGestureHandlerStateChangeEvent,
  State,
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

// Define SIDEBAR_WIDTH using Dimensions for responsive design
const SIDEBAR_WIDTH = Dimensions.get("window").width * 0.6;

export function CanvasView() {
  // Liveblocks storage hooks to get layer data and room color
  const layerIds = useStorage((root) => root.layerIds);
  const layers = useStorage((root) => root.layers);
  const roomColor = useStorage((root) => root.roomColor);
  const room = useRoom(); // Liveblocks room instance
  const self = useSelf(); // Current user's presence
  // Get the currently selected layer ID from presence, or null if nothing is selected
  const selectedLayer = useSelf((me) =>
    me.presence?.selection?.length > 0 ? me.presence.selection[0] : null
  );

  // State for camera position and zoom
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, zoom: 1 });
  // State to control the visibility of the right sidebar
  const [showRightSidebar, setShowRightSidebar] = useState(false);

  // Refs for managing pan and zoom gestures
  const lastPan = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const baseZoom = useRef(1);
  const [hasInitializedCamera, setHasInitializedCamera] = useState(false);

  // Ref to hold the latest camera state for PanResponder callbacks,
  // ensuring callbacks have access to the most up-to-date camera values.
  const cameraRef = useRef(camera);
  useEffect(() => {
    cameraRef.current = camera;
  }, [camera]);

  // Animated value for the sidebar's horizontal translation
  const sidebarTranslateX = useRef(new Animated.Value(SIDEBAR_WIDTH)).current;

  // Animate sidebar in/out based on showRightSidebar state
  useEffect(() => {
    Animated.timing(sidebarTranslateX, {
      toValue: showRightSidebar ? 0 : SIDEBAR_WIDTH,
      duration: 300,
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  }, [showRightSidebar, sidebarTranslateX]);

  // Initialize camera position to center around existing layers when component mounts
  useEffect(() => {
    if (!hasInitializedCamera && layerIds && layers && layerIds.length > 0) {
      const positions = layerIds
        .map((id) => layers.get(id)) // Get layer data for each ID
        .filter(
          (l): l is NonNullable<typeof l> =>
            !!l && typeof l.x === "number" && typeof l.y === "number"
        ); // Filter for valid layers with x, y coordinates
      if (positions.length > 0) {
        // Calculate min X and Y to set camera origin
        const minX = Math.min(...positions.map((l) => l.x));
        const minY = Math.min(...positions.map((l) => l.y));
        // Set camera slightly offset from the minimum coordinates
        setCamera({ x: minX - 100, y: minY - 100, zoom: 1 });
        setHasInitializedCamera(true); // Mark camera as initialized
      }
    }
  }, [layerIds, layers, hasInitializedCamera]);

  // PanResponder for canvas dragging/panning
  const panResponder = useRef(
    PanResponder.create({
      // Allow pan responder to activate
      onStartShouldSetPanResponder: () => true,
      // Only activate if there's significant movement (to differentiate from taps)
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
      },
      // When pan starts, record the current camera position
      onPanResponderGrant: () => {
        lastPan.current = { x: cameraRef.current.x, y: cameraRef.current.y };
      },
      // On pan move, update camera position based on gesture delta
      onPanResponderMove: (_, gestureState) => {
        setCamera((prev) => ({
          ...prev,
          x: lastPan.current.x - gestureState.dx / prev.zoom,
          y: lastPan.current.y - gestureState.dy / prev.zoom,
        }));
      },
      onPanResponderRelease: () => {}, // No specific action on release
      onPanResponderTerminate: () => {}, // No specific action on terminate
    })
  ).current;

  // Callback for pinch gesture events (zoom)
  const onPinchGestureEvent = useCallback(
    (event: PinchGestureHandlerGestureEvent) => {
      const scale = event.nativeEvent.scale;
      // Calculate new zoom, clamping between 0.1 and 10
      const newZoom = Math.min(Math.max(baseZoom.current * scale, 0.1), 10);
      setCamera((prev) => ({ ...prev, zoom: newZoom }));
    },
    []
  );

  // Callback for pinch gesture state changes (to update base zoom)
  const onPinchStateChange = useCallback(
    (event: PinchGestureHandlerStateChangeEvent) => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        // When pinch gesture ends, update baseZoom for subsequent gestures
        baseZoom.current = camera.zoom;
      }
    },
    [camera.zoom] // Dependency on camera.zoom ensures we get the latest value
  );

  // Handler for when a layer is pressed
  const handleLayerPress = (id: string) => {
    room.updatePresence({ selection: [id] }); // Select the layer
    setShowRightSidebar(true); // Show the sidebar
  };

  // Handler for clicking on the canvas (background)
  const handleCanvasClick = useCallback(() => {
    const isLayerSelected =
      self?.presence?.selection && self.presence.selection.length > 0;

    if (isLayerSelected) {
      // If a layer is selected, unselect it and close the sidebar
      room.updatePresence({ selection: [] });
      setShowRightSidebar(false);
    } else {
      // If no layer is selected, open the sidebar to show canvas properties
      setShowRightSidebar(true);
      // Ensure no layer is selected in presence (already true if isLayerSelected is false)
      room.updatePresence({ selection: [] });
    }
  }, [self?.presence?.selection, room, setShowRightSidebar]);

  // All layers are visible, no filtering based on component type
  const visibleLayerIds = layerIds;

  // Render null if layer data is not yet available
  if (!layerIds || !layers) {
    return null;
  }

  return (
    <View className="flex-1 bg-white">
      {/* Top bar with back button */}
      <View className="flex flex-row justify-start items-center p-3 bg-gray-100 border-b border-gray-200">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-3 p-2 rounded-full bg-white shadow-sm"
        >
          <FontAwesome name="angle-left" size={24} color="black" />
        </TouchableOpacity>
        <View className="flex-1">
          {/* You can add a title or other elements here if needed */}
        </View>
      </View>

      {/* Main canvas container */}
      <View className="flex-1 overflow-hidden">
        <PinchGestureHandler
          onGestureEvent={onPinchGestureEvent}
          onHandlerStateChange={onPinchStateChange}
        >
          {/* PanResponder handlers applied to this View */}
          <View className="flex-1" {...panResponder.panHandlers}>
            <Svg
              width="100%"
              height="100%"
              // viewBox defines the visible area of the SVG in user coordinates
              viewBox={`${camera.x} ${camera.y} ${1000 / camera.zoom} ${
                1000 / camera.zoom
              }`}
              // Dynamically set background color from roomColor, fallback to white
              style={{
                backgroundColor: roomColor ? colorToCss(roomColor) : "#fff",
              }}
              onPress={handleCanvasClick} // Handle canvas clicks
            >
              <G>
                {/* Render each layer component */}
                {visibleLayerIds?.map((id) => (
                  <LayerComponent
                    key={id}
                    id={id}
                    onLayerPointerDown={() => handleLayerPress(id)}
                  />
                ))}
              </G>
            </Svg>
          </View>
        </PinchGestureHandler>
      </View>

      {/* Right sidebar for properties */}
      <Animated.View
        style={[
          { transform: [{ translateX: sidebarTranslateX }] },
          {
            height: "100%",
            width: SIDEBAR_WIDTH, // Use dynamic width here
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            zIndex: 10,
          },
        ]}
        className="bg-gray-50 shadow-lg" // NativeWind classes for background and shadow
      >
        <RightSidebar
          // Pass the selected layer ID (or empty string for canvas properties)
          selectedLayerId={selectedLayer ?? ""}
          onClose={() => {
            setShowRightSidebar(false); // Close the sidebar
            room.updatePresence({ selection: [] }); // Clear any selection
          }}
        />
      </Animated.View>
    </View>
  );
}
