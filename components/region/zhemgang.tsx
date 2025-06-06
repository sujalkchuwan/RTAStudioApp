// src/regions/samtse.tsx
import ZhemgangPattern from "../../assets/textile_patterns/tyang.svg"; // Update with correct pattern
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

export const zhemgangTextiles: Textile[] =  [
    { id: 'zhemgang-t1', name: 'Zhemgang Khengpa', color: '#008080', detailPage: '/textiles/zhemgang-t1' },
    { id: 'zhemgang-t2', name: 'Zhemgang Tribal', color: '#FF6347', detailPage: '/textiles/zhemgang-t2' },
    { id: 'zhemgang-t3', name: 'Zhemgang Natural', color: '#7B68EE', detailPage: '/textiles/zhemgang-t3' },
  ];

export const zhemgangData = {
   id: "BT-34", 
name: 'Zhemgang',
d: "m 468.02556,231.70095 3.73,-3.28 5.71,-0.73 2.36,0.55 2.61,2.99 2.8,1.95 0.94,2.98 3.57,3.74 4.59,-0.58 1.33,1.99 0.66,-0.01 6.03,-4.1 5.22,-0.04 1.24,-2.27 5.12,0.7 1.13,-1.32 2.82,-0.96 1.41,-3.22 0,0 1.49,4.23 0.05,3.02 2.62,1.42 -0.13,6.45 1.33,1.19 0.07,3.59 1.7,1.78 -0.28,3.35 3.43,2.6 2.07,0.62 0.89,1.88 -0.71,3.37 0.33,1.78 3.29,4.16 -0.76,2.12 -0.26,6.92 -4.22,8.05 0.79,2.79 -0.61,4.4 0.4,2.08 2.02,2.08 2.95,1.01 1.5,11.3 5.12,1.76 4.92,0.46 2.5,3.54 -1.03,3.03 0.72,1.67 -0.79,3.52 1.63,2.28 -0.2,3.47 3.56,1.11 3.25,-0.18 3.03,2.05 0.44,3.69 0.9,0.92 2.83,1.89 0.85,-0.11 4.35,3.25 0,0 -0.2,1.65 -2.3,0.48 -0.95,1.07 0.36,1.3 -1.27,2.1 -0.54,2.6 0.82,2.39 -2.42,2.11 -3.9,0.98 -2.74,2.58 -3.55,-1.61 -1.66,-1.71 -3.5,2.04 -0.19,-2 -1.86,1.54 -7.16,3.17 -2.39,0.02 -1.07,-0.75 -2.2,1.05 -1.56,-0.21 -1.47,3.19 -1.69,0.92 0.75,2.54 -1.97,1.66 4.2,11.38 0,0 -3.77,-0.69 -23.25,2.52 -6.15,-0.26 -16.09,1.46 -8.5,0.1 0,0 1.06,-4.92 -1.17,-2.52 0.5,-1.03 -0.5,-3.92 -1,0 -0.59,1.31 -1.09,0.37 -1.09,-1.21 -1.42,1.4 -2.43,1.03 -5.44,0.37 -0.76,-0.75 -0.08,-2.8 -1.18,-1.4 -1.75,-0.37 -2.27,-1.96 -6.78,-0.28 -3.43,-1.87 -2.69,0.19 -0.5,-0.66 0.34,-3.83 -0.76,-2.52 1.01,-1.77 3.01,-1.87 0.25,-1.49 3.1,-2.9 2.01,-6.07 3.27,-1.97 3.27,-4.95 1.75,-1.08 -2.48,-1.21 -1.06,-4.52 1.97,-2.04 0.61,-1.66 -1.35,-4.23 0.76,-4.24 -2.1,-0.83 -1.14,-2.29 1.26,-5.23 -3.68,-3.87 -2.57,-0.3 -1.66,-2.04 -6.78,3.35 -4.53,-1.83 -1.22,-2.77 -0.85,-0.55 -3.32,1.27 -1.04,-1.61 0.58,-1.06 -1.37,-0.24 -1.44,-1.99 -2.36,0.03 -0.46,-1.79 -3.17,-1.84 -0.61,-4.16 0,0 1.08,-2.24 2.23,-1.44 3.97,0.11 0.21,-3.65 3.09,-0.59 1.6,-1.83 2.76,0.47 2.76,2.82 3.14,0.56 5.43,-1.79 4.57,1.22 -1.18,-1.05 -2.23,-4.43 -1.08,-0.41 -3.48,-4.47 -1.87,-3.36 6.54,-3.92 12.27,-3.45 6.29,-4.75 -0.41,-2.59 0.6,-3.8 -0.64,-0.46 -0.25,-2.19 1.7,-4.9 2.34,-3.42 1.28,-3.59 -0.19,-2.25 -2.07,-3.86 0,0 z"
, textiles: zhemgangTextiles,
    labelX: 630,
    labelY: 40,
    patternId: getPatternId("Zhemgang"), PatternComponent: ZhemgangPattern
  };