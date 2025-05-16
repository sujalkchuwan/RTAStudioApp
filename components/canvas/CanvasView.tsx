import { useStorage } from "@/liveblocks.config";
import { View } from "react-native";
import Svg, { G } from "react-native-svg";
import LayerComponent from "./LayerComponent";
import type { Layer } from "@/types";
import { LiveMap, LiveObject } from "@liveblocks/client";
import { colorToCss } from "@/utils/utils";

export function CanvasView() {
  const layerIds = useStorage((root) => root.layerIds);
  const layers = useStorage((root) => root.layers);
  const roomColor = useStorage((root) => root.roomColor);

  if (!layerIds || !layers) return null;

  console.log("layerIds", layerIds);

  return (
    <View style={{ flex: 1 }}>
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 1000"
        style={{ backgroundColor: roomColor ? colorToCss(roomColor) : "#fff" }}
      >
        <G>
          {layerIds?.map((id: string) => {
            const layer = layers?.get(id);

            if (layer?.parentId) return null;

            return (
              <LayerComponent key={id} id={id} onLayerPointerDown={() => {}} />
            );
          })}
        </G>
      </Svg>
    </View>
  );
}
