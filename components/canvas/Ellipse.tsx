// components/canvas/Ellipse.tsx
import { Ellipse as SvgEllipse } from "react-native-svg";
import { EllipseLayer } from "@/types";
import { colorToCss } from "@/utils/utils";

export default function Ellipse({
  id,
  layer,
}: {
  id: string;
  layer: EllipseLayer;
}) {
  const { x, y, width, height, fill, stroke, opacity } = layer;

  return (
    <SvgEllipse
      cx={x + width / 2}
      cy={y + height / 2}
      rx={width / 2}
      ry={height / 2}
      fill={fill ? colorToCss(fill) : "#ccc"}
      stroke={stroke ? colorToCss(stroke) : "#ccc"}
      strokeWidth={1}
      opacity={opacity ? opacity / 100 : 1}
    />
  );
}
