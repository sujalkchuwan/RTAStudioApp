// src/regions/samtse.tsx
import TrashiyangtsePattern from "../../assets/textile_patterns/pumo_pattern.svg"; // Update with correct pattern
// src/types.ts
import { SvgProps } from 'react-native-svg';

export interface Textile {
  id: string;
  name: string;
  color: string;
  detailPage: string;
}

export interface Region {
  id: string;
  name: string;
  d: string;
  textiles: Textile[];
  labelX: number;
  labelY: number;
  patternId: string;
  PatternComponent: React.FC<SvgProps>;
}

const getPatternId = (name: string): string => {
  const sanitizedName = name.toLowerCase().replace(/\s+/g, "_");
  return `${sanitizedName}-textile-pattern`;
};

export const trashiyangtsheTextiles: Textile[] =       [

  ];

export const trashiyangtsheData = {
   id: "BT-47",
name: 'Trashi Yangtse',
    d:"m 684.68556,196.14095 3.21,-0.29 0.71,-1.91 1.85,-0.55 4.36,2.64 0.75,4.64 1.88,1.65 2.9,0.71 3.86,-1.87 4.15,-0.66 0.66,2.44 0,0 -1.92,5.17 -2.14,2.83 -3.68,0.43 -2.48,-0.93 -10.31,4.3 -3.65,0.17 -2.52,2.46 -2.5,1.19 -7.59,-0.12 -6.72,8.2 -5.49,1.15 -0.91,1.72 -2.37,0.26 -4.54,-2.61 -6.1,-1.05 -2,-1.51 -1.52,0.28 -6.17,-3.57 -6,-1.36 -2.27,0.52 0,0 2.9,-5.28 1.93,-1.05 0.62,-1.21 -1.51,-2.29 -0.61,-4.72 -1.81,-1.7 -1.07,-4.13 -1.48,-0.21 -1.71,-1.45 -3.12,-5.43 -5.82,-6.05 0.12,-2.63 -4.04,-2.27 -0.84,-4.69 -3.04,-2.37 -1.51,-2.76 0,0 1.19,-3.83 1.34,-1.23 1.08,-2.62 -1.67,-3.27 0.85,-5.59 -1.62,-6.33 2.16,-2.17 0.58,-2.2 -2.53,-5.35 -0.39,-3.27 2.13,-2.7 1.8,-4.27 0.36,-4.05 -1.28,-3.05 2.97,-6.65 -0.21,-4.56 -1.52,-5.35 1.6,-7.66 0.24,-7.64 -1.3,-1.91 0.16,-1.06 1.92,-4.19 2.58,0.16 1.12,-0.55 3.84,-4.09 3.84,-7.07 2.51,-1.26 4.75,1.41 3.49,-3.46 0,0 1.46,0.4 1.99,3.79 -1.34,5.09 1.25,1.7 3.61,0.76 2.93,2.64 2.43,1.22 4.02,0.76 0.83,3.67 1.35,2.17 3.18,-0.09 2.34,-2.08 3.35,-1.69 0.17,1.51 1.51,1.41 2.18,1.13 3.1,0.19 0.5,1.98 -0.34,2.45 -1,3.2 -1.53,1.72 -1.35,-0.6 -2.12,0.56 -3.91,-1.67 -2.69,2.8 -2.14,-1.13 -0.96,1.08 4.79,9.23 1.76,0.69 2.63,-1.6 3.44,-0.55 6.88,5.29 0.7,7.72 1.99,1.68 0.1,1.9 -2.44,2.9 0.49,5.19 -2.48,9.37 -5.34,2.9 -3.04,5.25 -2.41,1.88 -1.96,0.33 -2.13,5.01 -0.68,3.35 4.6,5.48 -3.53,5.09 1.41,3.01 2.68,2.25 -0.1,2.86 3.59,3.23 2.22,-0.86 1.43,0.41 0.17,2.26 1.58,3.2 6.89,5.13 0.78,3.76 1.37,0.46 z"
    , textiles: trashiyangtsheTextiles,
    labelX: 300,
    labelY: 80,
    patternId: getPatternId("Trashiyangtse"), PatternComponent: TrashiyangtsePattern
  };