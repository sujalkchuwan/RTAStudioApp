// src/regions/samtse.tsx
import TsirangPattern from "../../assets/textile_patterns/pumo_pattern.svg"; // Update with correct pattern
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

export const tsirangTextiles: Textile[] =    [
  
  ];

export const TsirangData =  {
   id: "BT-21", 
name: 'Tsirang',
d: "m 311.67556,297.40095 0.78,-1.62 -1.51,-3.02 0.51,-2.91 1.26,-2.03 -0.75,-1.27 -0.05,-5.71 0.22,-0.83 3.46,-2.09 6.76,2.38 1.74,1.38 4.67,1.83 0.42,1.21 0.95,0.31 2.66,-0.38 2.05,-1.14 6.36,0.35 1.57,-1.63 2.46,-0.41 4.02,4 1.99,0.29 2.85,3.11 1.05,0.17 2.83,-3.27 3.29,0.72 2.06,-2.01 2.23,0.1 3.32,-1.38 1.73,-2.84 1.79,-0.17 0,0 3.26,1.9 1.04,3.44 -1.49,3.51 -2.24,-1.13 -2.06,0.4 -5.37,3.34 -2.72,3.69 -2.93,1.36 -1,2.72 0.7,3.52 -3.11,3.51 0.38,1.93 -0.63,3.74 -3.01,1.35 -1.79,1.82 0.58,1.14 -0.03,3.55 -0.81,5.14 -3.28,4.23 -1.65,0.23 -1.21,2.42 -4.21,3.97 -0.64,2.95 0.38,2.41 -1.52,1.58 -0.87,-0.64 -2.88,1.49 -1.81,1.67 -0.41,2.57 -4.97,3.4 -1.57,4.8 -1.28,1.85 0.69,1.5 -0.33,4.66 -3.29,0.57 -2.04,1.64 -2.32,-0.87 -0.43,-0.86 -2.39,0.96 -2.64,1.69 -0.6,4.13 -3.47,1.17 -1.64,0.2 -1.74,-1.59 -3.17,-0.64 0,0 -2.46,1.13 -0.93,-3.02 -2.23,-2.53 -1.52,-3.06 2.59,-2.53 -3.33,-0.42 0.93,-0.36 0.2,-0.85 -0.84,-2.12 1.42,-0.51 0.54,-1.39 -0.66,-4.05 3.31,-2.76 2.13,0.61 0.76,-0.44 1.19,-1.88 -0.24,-1.72 0.67,-1.21 3.67,-2.97 1.58,-2.64 0.48,-3.41 1.26,-2.02 -0.46,-1.41 0.81,-1 -0.81,-1.01 0.15,-3.3 2.23,-9.7 -0.5,-2.37 0.51,-1.66 -1.84,-1.5 2.36,-4.35 -1.52,-3.28 0.7,-1.8 z"
,  textiles: tsirangTextiles,
    labelX: 280,
    labelY: 300,
      patternId: getPatternId("Tsirang"), PatternComponent: TsirangPattern
  };