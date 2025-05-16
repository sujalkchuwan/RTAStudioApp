// components/canvas/Path.tsx
import { Path as SvgPath } from "react-native-svg";
import { getStroke } from "perfect-freehand";
import { getSvgPathFromStroke } from "@/utils/utils"; // same file for now

export default function Path({
  x,
  y,
  points,
  fill,
  stroke,
  opacity,
}: {
  x: number;
  y: number;
  points: number[][];
  fill: string;
  stroke?: string;
  opacity: number;
}) {
  const pathData = getSvgPathFromStroke(
    getStroke(points, {
      size: 16,
      thinning: 0.5,
      smoothing: 0.5,
      streamline: 0.5,
    })
  );

  return (
    <SvgPath
      d={pathData}
      fill={fill}
      stroke={stroke ?? "#ccc"}
      strokeWidth={1}
      opacity={opacity ? opacity / 100 : 1}
      transform={`translate(${x}, ${y})`}
    />
  );
}
