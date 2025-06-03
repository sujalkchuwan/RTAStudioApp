// src/regions/samtse.tsx
import MongarPattern from "../../assets/textile_patterns/mongar.svg"; // Update with correct pattern
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

export const monggarTextiles: Textile[] =   [
    { id: 'monggar-t1', name: 'Monggar Traditional', color: '#8B4513', detailPage: '/textiles/monggar-t1' },
    { id: 'monggar-t2', name: 'Monggar Modern', color: '#4169E1', detailPage: '/textiles/monggar-t2' },
    { id: 'monggar-t3', name: 'Monggar Pattern', color: '#DC143C', detailPage: '/textiles/monggar-t3' },
  ];

export const monggarData = {
   id: "BT-42", 
name: 'Monggar',
     d:"m 607.14556,172.23095 1.51,2.76 3.04,2.37 0.84,4.69 4.04,2.27 -0.12,2.63 5.82,6.05 3.12,5.43 1.71,1.45 1.48,0.21 1.07,4.13 1.81,1.7 0.61,4.72 1.51,2.29 -0.62,1.21 -1.93,1.05 -2.9,5.28 0,0 1.13,3.52 -2.46,2.71 4.9,1.76 4.17,5.66 1.62,0.56 2.35,-0.37 3.39,2.21 0.33,0.8 -0.8,1.58 2.73,3.11 0.06,3.87 -5.26,4.31 -3.02,0.8 -1.48,2.38 -2.46,0.54 -0.99,1.86 -5.08,1.43 -1.69,3.54 -4.31,4.03 -0.74,2.32 0.73,3.12 -0.87,1.05 0.99,3.87 -3.02,1.14 -1.27,3.16 0.45,0.24 -0.33,1.93 0,0 -1.26,0.77 0.07,1.53 -1.33,1.66 -1.48,1.01 0.87,2.12 -0.8,1.11 0.87,0.7 -0.17,1.2 1.33,0.37 -0.01,1.22 -0.48,0.64 -1.8,-0.07 -0.33,1.44 -1.62,0.64 -0.29,1.37 1.02,0.79 -1.96,0.31 -1.15,4.21 0.38,1.5 -2.83,1.62 -4.63,-0.36 -1.45,2.45 -1.38,-0.68 -2.22,2.21 -2.18,1.04 -3.66,-0.1 -3.48,1.64 -3.69,0.53 -0.3,2.64 -2.89,2.03 -0.37,3.13 -1.76,1.46 -0.41,2.91 -4.67,4.45 -0.7,5.1 -4.05,2.28 -0.15,3.2 1.09,2.96 0,0 -4.35,-3.25 -0.85,0.11 -2.83,-1.89 -0.9,-0.92 -0.44,-3.69 -3.03,-2.05 -3.25,0.18 -3.56,-1.11 0.2,-3.47 -1.63,-2.28 0.79,-3.52 -0.72,-1.67 1.03,-3.03 -2.5,-3.54 -4.92,-0.46 -5.12,-1.76 -1.5,-11.3 -2.95,-1.01 -2.02,-2.08 -0.4,-2.08 0.61,-4.4 -0.79,-2.79 4.22,-8.05 0.26,-6.92 0.76,-2.12 -3.29,-4.16 -0.33,-1.78 0.71,-3.37 -0.89,-1.88 -2.07,-0.62 -3.43,-2.6 0.28,-3.35 -1.7,-1.78 -0.07,-3.59 -1.33,-1.19 0.13,-6.45 -2.62,-1.42 -0.05,-3.02 -1.49,-4.23 0,0 -0.64,-0.81 3.38,-1.7 0.87,-1.45 4.74,0.12 0.78,-0.59 0,-1.13 0,0 2.11,0.79 3.28,-0.12 5.04,2.14 1.5,-0.27 1.2,-2.62 2.3,-0.59 4.07,-4.62 2.81,-1.62 4.69,-4.19 3.75,1.42 1.61,-0.59 8.21,1.54 1.47,4.8 3.49,4.32 3.88,-3.18 2.17,-0.29 3.23,-2.52 4.12,-1.12 2.97,-2.74 3.17,-0.45 3.83,-7.48 0.31,-4.85 -0.54,-1.48 -2.62,-2.07 -0.89,-3.15 1.48,-3.52 2.81,-1.36 1.42,-2.28 6.5,-3.08 -0.72,-3.16 -1.64,-2.1 1.26,-4 1.6,-1.67 z"
     , textiles: monggarTextiles,
    labelX: 300,
    labelY: 80,
    patternId: getPatternId("Mongar"), PatternComponent: MongarPattern
  };