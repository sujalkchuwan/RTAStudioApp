// src/regions/samtse.tsx
import PemagatshelPattern from "../../assets/textile_patterns/pg.svg"; // Update with correct pattern
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

export const pemagatshelTextiles: Textile[] =    [
    { id: 'pemagatshel-t1', name: 'Pemagatshel Silk', color: '#483D8B', detailPage: '/textiles/pemagatshel-t1' },
    { id: 'pemagatshel-t2', name: 'Pema Motif', color: '#008B8B', detailPage: '/textiles/pemagatshel-t2' },
    { id: 'pemagatshel-t3', name: 'Eastern Border', color: '#B8860B', detailPage: '/textiles/pemagatshel-t3' },
  ];

export const pemagatshelData ={
   id: "BT-43", 
name: 'Pemagatshel',
 d:"m 617.20556,281.60095 4.04,1.17 3.89,-1.49 8.04,0.61 -0.43,-2.22 1.74,-0.71 3.71,1.42 2.9,5.48 -0.67,3.6 0.81,1.46 -0.31,0.55 -2.15,-0.21 -0.17,0.56 4.44,2.15 1.59,1.5 1.09,4.21 1.59,0.75 0,4.12 0.67,0.75 3.77,-1.13 1.67,1.69 1.76,-0.1 1.84,1.78 -3.26,7.48 -1.01,1.22 -1.76,0.56 0.4,2.57 0,0 -1.01,1.08 -2.05,-0.31 -1.29,-2.14 -2.11,-0.82 -1.93,0.98 -2.25,2.73 -3.34,-0.23 -0.73,4.13 -5.74,6.93 0.01,5.78 1.06,2.71 -4.58,7.77 -2.88,0.65 -3.71,4.72 0.15,8.87 -2.6,1.39 0.96,2.13 4.52,2.32 0,0 -1.47,0.11 -5.27,8.8 -4.69,3.15 -5.47,2.57 -9.69,-1.44 -7.68,-5.19 -5.97,-1.04 -8.11,0.06 -5.16,-0.71 -11.88,0.78 -5.62,-1.5 -2.15,-1.46 -1.76,0.35 -3.17,4.7 -5.07,5.49 -2.93,0.12 -6.91,-1.73 0,0 -4.2,-11.38 1.97,-1.66 -0.75,-2.54 1.69,-0.92 1.47,-3.19 1.56,0.21 2.2,-1.05 1.07,0.75 2.39,-0.02 7.16,-3.17 1.86,-1.54 0.19,2 3.5,-2.04 1.66,1.71 3.55,1.61 2.74,-2.58 3.9,-0.98 2.42,-2.11 -0.82,-2.39 0.54,-2.6 1.27,-2.1 -0.36,-1.3 0.95,-1.07 2.3,-0.48 0.2,-1.65 0,0 -1.09,-2.96 0.15,-3.2 4.05,-2.28 0.7,-5.1 4.67,-4.45 0.41,-2.91 1.76,-1.46 0.37,-3.13 2.89,-2.03 0.3,-2.64 3.69,-0.53 3.48,-1.64 3.66,0.1 2.18,-1.04 2.22,-2.21 1.38,0.68 1.45,-2.45 4.63,0.36 2.83,-1.62 -0.38,-1.5 1.15,-4.21 1.96,-0.31 -1.02,-0.79 0.29,-1.37 1.62,-0.64 0.33,-1.44 1.8,0.07 0.48,-0.64 0.01,-1.22 -1.33,-0.37 0.17,-1.2 -0.87,-0.7 0.8,-1.11 -0.87,-2.12 1.48,-1.01 1.33,-1.66 -0.07,-1.53 z"
 , textiles: pemagatshelTextiles,
    labelX: 300,
    labelY: 80,
   patternId: getPatternId("Pemagatshel"), PatternComponent: PemagatshelPattern
  };