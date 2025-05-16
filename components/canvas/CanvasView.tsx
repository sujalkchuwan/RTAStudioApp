import { useStorage } from "@/liveblocks.config";
import { View } from "react-native";
import Svg, { G } from "react-native-svg";
import LayerComponent from "./LayerComponent";
import type { Layer } from "@/types";
import { LiveMap, LiveObject } from "@liveblocks/client";

export function CanvasView() {
  const layerIds = useStorage((root) => root.layerIds);
  const layers = useStorage((root) => root.layers);

  if (!layerIds || !layers) return null;

  return (
    <View style={{ flex: 1 }}>
      <Svg width="100%" height="100%" viewBox="0 0 1000 1000">
        <G>
          {(layerIds as any[]).map((id: string) => {
            const layer = (
              layers as unknown as LiveMap<string, LiveObject<Layer>>
            )
              .get(id)
              ?.toObject() as Layer;
            if (!layer || layer.parentId) return null;

            return (
              <LayerComponent
                key={id}
                id={id}
                layer={layer}
                onLayerPointerDown={() => {}}
              />
            );
          })}
        </G>
      </Svg>
    </View>
  );
}
