// import { useStorage } from "@/liveblocks.config";
// import { View } from "react-native";
// import Svg, { G } from "react-native-svg";
// import LayerComponent from "./LayerComponent";
// import type { Layer } from "@/types";
// import { LiveMap, LiveObject } from "@liveblocks/client";
// import { colorToCss } from "@/utils/utils";
// import { useState } from "react";

// export function CanvasView() {
//   const layerIds = useStorage((root) => root.layerIds);
//   const layers = useStorage((root) => root.layers);
//   const roomColor = useStorage((root) => root.roomColor);
//   const [camera, setCamera] = useState({ x: 0, y: 0, zoom: 1 });

//   if (!layerIds || !layers) return null;

//   console.log("layerIds", layerIds);

//   return (
//     <View style={{ flex: 1 }}>
//       <Svg
//         width="100%"
//         height="100%"
//         viewBox={`${camera.x} ${camera.y} ${1000 / camera.zoom} ${
//           1000 / camera.zoom
//         }`}
//         style={{ backgroundColor: roomColor ? colorToCss(roomColor) : "#fff" }}
//       >
//         <G>
//           {layerIds?.map((id: string) => {
//             const layer = layers?.get(id);

//             if (layer?.parentId) return null;

//             return (
//               <LayerComponent key={id} id={id} onLayerPointerDown={() => {}} />
//             );
//           })}
//         </G>
//       </Svg>
//     </View>
//   );
// }

import { useStorage } from "@/liveblocks.config";
import { useRoom } from "@liveblocks/react";
import { View, PanResponder, Button, TouchableOpacity } from "react-native";
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

export function CanvasView() {
  const layerIds = useStorage((root) => root.layerIds);
  const layers = useStorage((root) => root.layers);
  const roomColor = useStorage((root) => root.roomColor);
  const room = useRoom();

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, zoom: 1 });
  const [renderOnlyComponent, setRenderOnlyComponent] = useState(false);
  const lastPan = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const baseZoom = useRef(1);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        lastPan.current = { x: camera.x, y: camera.y };
      },
      onPanResponderMove: (_, gestureState) => {
        setCamera((prev) => ({
          ...prev,
          x: lastPan.current.x + gestureState.dx,
          y: lastPan.current.y + gestureState.dy,
        }));
      },
    })
  ).current;

  const onPinchGestureEvent = useCallback(
    (event: PinchGestureHandlerGestureEvent) => {
      const scale = event.nativeEvent.scale;
      setCamera((prev) => ({ ...prev, zoom: baseZoom.current * scale }));
    },
    []
  );

  const onPinchStateChange = useCallback(
    (event: PinchGestureHandlerStateChangeEvent) => {
      if (event.nativeEvent.oldState === State.ACTIVE) {
        baseZoom.current = camera.zoom;
      }
    },
    [camera.zoom]
  );

  useEffect(() => {
    if (layerIds && layers && layerIds.length > 0) {
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
      }
    }
  }, [layerIds, layers]);

  const handleLayerPress = (id: string) => {
    room.updatePresence({ selection: [id] });
  };

  const visibleLayerIds = renderOnlyComponent
    ? layerIds?.filter((id) => {
        const layer = layers?.get(id);
        return (
          typeof layer === "object" &&
          layer !== null &&
          "groupType" in layer &&
          (layer as any).groupType === "component"
        );
      })
    : layerIds;

  if (!layerIds || !layers) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View>
        <TouchableOpacity onPress={() => router.back()}>
          <FontAwesome
            name="angle-left"
            size={24}
            color="black"
            style={{ marginRight: 12 }}
          />
        </TouchableOpacity>
      </View>
      <PinchGestureHandler
        onGestureEvent={onPinchGestureEvent}
        onHandlerStateChange={onPinchStateChange}
      >
        <View style={{ flex: 1 }} {...panResponder.panHandlers}>
          <Svg
            width="100%"
            height="100%"
            viewBox={`${camera.x} ${camera.y} ${1000 / camera.zoom} ${
              1000 / camera.zoom
            }`}
            style={{
              backgroundColor: roomColor ? colorToCss(roomColor) : "#fff",
            }}
          >
            <G>
              {visibleLayerIds?.map((id) => (
                <LayerComponent
                  key={id}
                  id={id}
                  onLayerPointerDown={() => handleLayerPress(id)}
                />
              ))}
            </G>
          </Svg>
          <View style={{ position: "absolute", top: 10, right: 260 }}>
            <Button
              title={renderOnlyComponent ? "Show All" : "Show Components"}
              onPress={() => setRenderOnlyComponent((val) => !val)}
            />
          </View>
          <RightSidebar />
        </View>
      </PinchGestureHandler>
    </GestureHandlerRootView>
  );
}
