// components/canvas/Rectangle.tsx
import React from "react";
import { Rect } from "react-native-svg";
import { RectangleLayer } from "@/types";
import { colorToCss } from "@/utils/utils";

export default function Rectangle({
  id,
  layer,
}: {
  id: string;
  layer: RectangleLayer;
}) {
  const { x, y, width, height, fill, stroke, opacity, cornerRadius } = layer;

  return (
    <Rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={colorToCss(fill)}
      stroke={colorToCss(stroke)}
      strokeWidth={1}
      opacity={opacity ? opacity / 100 : 1}
      rx={cornerRadius ?? 0}
      ry={cornerRadius ?? 0}
      transform={`rotate(${layer.rotation ?? 0}, ${
        layer.x + layer.width / 2
      }, ${layer.y + layer.height / 2})`}
      // onPress not needed now but you can handle later here
    />
  );
}
