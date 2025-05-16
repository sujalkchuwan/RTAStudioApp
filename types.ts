export type Color = {
  r: number;
  g: number;
  b: number;
};

export enum LayerType {
  Rectangle,
  Ellipse,
  Path,
  Group,
  // No Text or Image needed if not used
}

export type RectangleLayer = {
  type: LayerType.Rectangle;
  name: string;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  stroke: Color;
  opacity: number;
  cornerRadius?: number;
  parentId?: string;
};

export type EllipseLayer = {
  type: LayerType.Ellipse;
  name: string;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  stroke: Color;
  opacity: number;
  parentId?: string;
};

export type PathLayer = {
  type: LayerType.Path;
  name: string;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  stroke: Color;
  opacity: number;
  points: number[][];
  parentId?: string;
};

export type GroupLayer = {
  type: LayerType.Group;
  name: string;
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  groupType: "component" | "textile" | "group";
  children: string[];
  parentId?: string;
};

export type Layer = RectangleLayer | EllipseLayer | PathLayer | GroupLayer;
