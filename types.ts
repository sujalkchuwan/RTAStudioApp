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
}

// Shared base layer properties
export type BaseLayer = {
  id: string;
  name: string;
  x: number;
  y: number;
  height: number;
  width: number;
  opacity: number;
  parentId?: string;
};

export type ImageLayer = BaseLayer & {
  type: LayerType.Image;
  src: string;
};

export type RectangleLayer = BaseLayer & {
  type: LayerType.Rectangle;
  fill: Color;
  stroke: Color;
  cornerRadius?: number;
  strokeWidth?: number;
  rotation?: number;
};

export type EllipseLayer = BaseLayer & {
  type: LayerType.Ellipse;
  fill: Color;
  stroke: Color;
  strokeWidth?: number;
};

export type PathLayer = BaseLayer & {
  type: LayerType.Path;
  fill: Color;
  stroke: Color;
  points: number[][];
  strokewidth?: number;
};

export type GroupLayer = BaseLayer & {
  type: LayerType.Group;
  groupType: "component" | "textile" | "group";
  children: string[]; // IDs of child layers
  rotation?: number;
};

export type TextLayer = BaseLayer & {
  type: LayerType.Text;
  text: string;
  fontSize: number;
  fontWeight: number;
  fontFamily: string;
  fill: Color;
  stroke: Color;
};

export type Layer =
  | RectangleLayer
  | EllipseLayer
  | PathLayer
  | TextLayer
  | ImageLayer
  | GroupLayer;

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
