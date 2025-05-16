// components/canvas/LayerComponent.tsx
import Rectangle from "./Rectangle";
import Ellipse from "./Ellipse";
import Path from "./Path";
import { Layer, LayerType } from "../../types";
import { colorToCss } from "@/utils/utils";

export default function LayerComponent({
  id,
  layer,
}: {
  id: string;
  layer: Layer;
  onLayerPointerDown: (e: any, layerId: string) => void;
}) {
  switch (layer.type) {
    case LayerType.Rectangle:
      return <Rectangle id={id} layer={layer} />;
    case LayerType.Ellipse:
      return <Ellipse id={id} layer={layer} />;
    case LayerType.Path:
      return (
        <Path
          x={layer.x}
          y={layer.y}
          points={layer.points}
          fill={colorToCss(layer.fill)}
          stroke={colorToCss(layer.stroke)}
          opacity={layer.opacity}
        />
      );
    default:
      return null;
  }
}
