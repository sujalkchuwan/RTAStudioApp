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
import React, { useState, useRef, useCallback, useEffect } from "react";
import { colorToCss } from "@/utils/utils";
import LayerComponent from "./LayerComponent"; // Assuming LayerComponent is already memoized or will be
import RightSidebar from "../sidebar/RightSidebar";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { V } from "@liveblocks/react/dist/room-CqT08uWZ.cjs";

// Define SIDEBAR_WIDTH using Dimensions for responsive design
const SIDEBAR_WIDTH = Dimensions.get("window").width * 0.6;

// Create an Animated G component for SVG transformations
const AnimatedG = Animated.createAnimatedComponent(G);

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

  // Animated values for camera transformations
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  // Refs to store the *current numerical values* of Animated.Values
  // These are updated via listeners to avoid direct access to internal properties
  const currentTranslateX = useRef(0);
  const currentTranslateY = useRef(0);
  const currentScale = useRef(1);

  // State to control the visibility of the right sidebar
  const [showRightSidebar, setShowRightSidebar] = useState(false);

  // Refs for managing pan and zoom gestures
  const lastPanX = useRef(0);
  const lastPanY = useRef(0);
  const baseScale = useRef(1);

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

  // Add listeners to Animated.Values to keep refs updated
  useEffect(() => {
    const txListener = translateX.addListener(({ value }) => {
      currentTranslateX.current = value;
    });
    const tyListener = translateY.addListener(({ value }) => {
      currentTranslateY.current = value;
    });
    const scaleListener = scale.addListener(({ value }) => {
      currentScale.current = value;
    });

    // Clean up listeners on component unmount
    return () => {
      translateX.removeListener(txListener);
      translateY.removeListener(tyListener);
      scale.removeListener(scaleListener);
    };
  }, [translateX, translateY, scale]); // Dependencies ensure listeners are re-attached if Animated.Values change (though they are refs, so typically won't)

  // Initialize camera position to center around existing layers when component mounts
  useEffect(() => {
    if (layerIds && layers && layerIds.length > 0) {
      const positions = layerIds
        .map((id) => layers.get(id)) // Get layer data for each ID
        .filter(
          (l): l is NonNullable<typeof l> =>
            !!l && typeof l.x === "number" && typeof l.y === "number"
        ); // Filter for valid layers with x, y coordinates

      if (positions.length > 0) {
        const minX = Math.min(...positions.map((l) => l.x));
        const minY = Math.min(...positions.map((l) => l.y));
        // Set initial animated values.
        // We're translating the content, so the initial position should be negative
        // of the desired offset to bring the content into view.
        translateX.setValue(-(minX - 100)); // Adjust to center
        translateY.setValue(-(minY - 100)); // Adjust to center
        scale.setValue(1);
      }
    }
  }, [layerIds, layers]);

  // PanResponder for canvas dragging/panning
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Only allow pan if not interacting with a layer (e.g., if a layer is selected,
        // you might want to prevent canvas pan to allow layer dragging).
        // For now, we allow pan always.
        return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {
        // Store the current animated values as the base for the gesture
        // Access values from the updated refs
        lastPanX.current = currentTranslateX.current;
        lastPanY.current = currentTranslateY.current;
      },
      onPanResponderMove: (_, gestureState) => {
        // Update animated values directly
        translateX.setValue(lastPanX.current + gestureState.dx);
        translateY.setValue(lastPanY.current + gestureState.dy);
      },
      onPanResponderRelease: () => {},
      onPanResponderTerminate: () => {},
    })
  ).current;

  // Pinch gesture handler for zoom
  const onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: scale } }],
    { useNativeDriver: true }
  );

  const onPinchStateChange = useCallback(
    (event: PinchGestureHandlerStateChangeEvent) => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        // When pinch gesture ends, update baseScale for subsequent gestures
        // Access value from the updated ref
        baseScale.current = currentScale.current;
      }
    },
    []
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
              // Static viewBox, transformations handled by AnimatedG
              viewBox={`0 0 1000 1000`}
              // Dynamically set background color from roomColor, fallback to white
              style={{
                backgroundColor: roomColor ? colorToCss(roomColor) : "#fff",
              }}
              onPress={handleCanvasClick} // Handle canvas clicks
            >
              {/* AnimatedG applies transformations to all child layers */}
              <AnimatedG
                // Pass animated values directly as SVG transform props
                translateX={translateX}
                translateY={translateY}
                scale={scale}
              >
                {/* Render each layer component */}
                {visibleLayerIds?.map((id) => (
                  <LayerComponent
                    key={id}
                    id={id}
                    onLayerPointerDown={() => handleLayerPress(id)}
                  />
                ))}
              </AnimatedG>
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
