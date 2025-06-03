// src/regions/samtse.tsx
import TrongsaPattern from "../../assets/textile_patterns/tt.svg"; // Update with correct pattern
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

export const trongsaTextiles: Textile[] =    [
    { id: 'trongsa-t1', name: 'Trongsa Traditional', color: '#9932CC', detailPage: '/textiles/trongsa-t1' },
    { id: 'trongsa-t2', name: 'Trongsa Royal', color: '#4682B4', detailPage: '/textiles/trongsa-t2' },
    { id: 'trongsa-t3', name: 'Trongsa Heritage', color: '#D2691E', detailPage: '/textiles/trongsa-t3' },
  ];

export const trongsaData =  {
   id: "BT-32", 
name: 'Trongsa',
    d : "m 412.59556,128.38095 2.93,3.25 2.83,-1.1 3.88,1.58 3.13,4.59 0.05,1.52 1.57,2.43 -1.29,1.77 1.67,1.6 0.51,1.46 -0.31,3.13 -1.64,1.91 0.94,2.14 -0.36,1.2 -2.31,0.24 -0.71,0.99 -0.04,3.74 -0.8,2.77 0.43,1.99 -1.11,1.68 0.7,1.06 2.83,-0.05 -1.14,3.4 0.75,1.71 0.7,6.23 1.64,-0.12 0.73,0.92 0.75,6.86 1.99,6.19 1.8,2.12 -0.4,2.96 1.67,3.62 0.52,3.36 -2.1,2.01 1.64,4.73 2.76,2.22 6.39,0.29 1.23,0.69 0.27,2.53 11.38,3.53 1.75,2.94 2.82,1.91 1.28,2.81 1.44,0.24 1.28,1.43 1.69,0.26 1.52,2.42 0,0 0.35,0.33 0,0 2.07,3.86 0.19,2.25 -1.28,3.59 -2.34,3.42 -1.7,4.9 0.25,2.19 0.64,0.46 -0.6,3.8 0.41,2.59 -6.29,4.75 -12.27,3.45 -6.54,3.92 1.87,3.36 3.48,4.47 1.08,0.41 2.23,4.43 1.18,1.05 -4.57,-1.22 -5.43,1.79 -3.14,-0.56 -2.76,-2.82 -2.76,-0.47 -1.6,1.83 -3.09,0.59 -0.21,3.65 -3.97,-0.11 -2.23,1.44 -1.08,2.24 0,0 -3.38,-0.02 -0.9,-1.88 -2.61,0.2 -0.96,-0.88 -0.6,0.78 -2.61,0.86 -1.58,-1.17 -1.7,-0.06 -1.29,-1.62 -0.42,-1.88 -3.59,-0.41 -2.77,-3.92 -2.78,-2.32 -3.6,-0.94 -1.95,-1.23 -2.22,-2.75 -3.3,-0.91 -5.16,-2.7 0,0 0.5,-2.24 4.79,-3.76 0.79,-3.89 -0.23,-3.31 -1.52,-0.2 -1.3,-1.74 -1.39,-0.52 0.78,-2.13 -1.93,-4.16 0.86,-1.93 -2.64,-3.08 -4.91,-3.19 -3.39,-3.55 0,-2.36 1.36,-1.7 -2.82,-2.81 -1.65,-3.19 -3.22,-3.83 -0.59,-1.71 1.35,-4.31 -0.49,-2.76 -4.15,-2.59 -0.42,-3.75 -1.41,-1.23 2.97,-1.76 7.33,-0.48 1.43,-1.48 1.25,-2.96 2.38,-1.3 5.1,-0.31 1.13,-1.18 3.4,2.25 1.31,-2.28 3.74,-2.65 -0.34,-1.46 -1.59,-1.37 -3.84,0.23 -2.43,-1.19 0.04,-1.36 -2,-4.31 -0.92,-0.56 -0.26,-2.24 -0.81,-0.33 -1.13,-2.2 -2.1,-7.77 -1.77,-1.19 0.02,-2.61 4.85,-4.32 0.6,-2.27 -0.66,-1.79 1.19,-4.23 2.36,-2.16 4.48,1.21 3.17,-0.31 4.06,-1.88 1.8,2.37 2.43,0.55 7.29,-3.52 4.23,-0.69 3,-2.14 3.35,-12.07 z"
    , textiles: trongsaTextiles,
    labelX: 630,
    labelY: 40,
     patternId: getPatternId("Trongsa"), PatternComponent: TrongsaPattern
  };