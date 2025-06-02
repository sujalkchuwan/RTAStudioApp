export type Color = {
  r: number;
  g: number;
  b: number;
};

export type Camera = {
  x: number;
  y: number;
  zoom: number;
};

export enum LayerType {
  Rectangle,
  Ellipse,
  Path,
  Text,
  Image,
  Group,
  Triangle,
}

export type TriangleLayer = {
  type: LayerType.Triangle;
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
  strokeWidth?: number;
  rotation?: number;
};

export type ImageLayer = {
  type: LayerType.Image;
  name: string;
  x: number;
  y: number;
  height: number;
  width: number;
  src: string;
  opacity: number;
  parentId?: string;
};

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
  strokeWidth?: number;
  rotation?: number;
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
  strokeWidth?: number;
};

export type PathLayer = {
  type: LayerType.Path;
  x: number;
  name: string;
  y: number;
  height: number;
  width: number;
  fill: Color;
  stroke: Color;
  opacity: number;
  points: number[][];
  parentId?: string;
  strokewidth?: number;
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
  groupType: "motif" | "textile" | "group";
  children: string[]; // IDs of child layers
  parentId?: string;
  rotation?: number;
};

export type TextLayer = {
  type: LayerType.Text;
  name: string;
  x: number;
  y: number;
  height: number;
  width: number;
  text: string;
  fontSize: number;
  fontWeight: number;
  fontFamily: string;
  fill: Color;
  stroke: Color;
  opacity: number;
  parentId?: string;
};

export type Layer =
  | RectangleLayer
  | EllipseLayer
  | PathLayer
  | TextLayer
  | ImageLayer
  | GroupLayer
  | TriangleLayer;

export type Point = {
  x: number;
  y: number;
};

export type XYWH = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
};

export enum Side {
  Top = 1,
  Bottom = 2,
  Left = 4,
  Right = 8,
}

export type CanvasState =
  | {
      mode: CanvasMode.None;
    }
  | {
      mode: CanvasMode.RightClick;
    }
  | {
      mode: CanvasMode.SelectionNet;
      origin: Point;
      current?: Point;
    }
  | {
      mode: CanvasMode.Dragging;
      origin: Point | null;
    }
  | {
      mode: CanvasMode.Inserting;
      layerType:
        | LayerType.Rectangle
        | LayerType.Ellipse
        | LayerType.Text
        | LayerType.Image;
      imageSrc?: string;
    }
  | {
      mode: CanvasMode.Pencil;
    }
  | {
      mode: CanvasMode.Resizing;
      initialBounds: XYWH;
      corner: Side;
    }
  | {
      mode: CanvasMode.Translating;
      current: Point;
    }
  | {
      mode: CanvasMode.Pressing;
      origin: Point;
    };

export enum CanvasMode {
  None,
  Dragging,
  Inserting,
  Pencil,
  Resizing,
  Translating,
  SelectionNet,
  Pressing,
  RightClick,
}
