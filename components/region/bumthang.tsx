import BumthangPattern from "../../assets/textile_patterns/bumthang.svg";
import { SvgProps } from 'react-native-svg';

export interface Textile {
  id: string;       // Unique ID for the textile, e.g., 'paro-textile-1'
  name: string;     // Name of the textile, e.g., 'Kishuthara'
  color: string;    // A representative color for the textile dot, e.g., '#FF6347'
  detailPage: string; // Placeholder URL for the textile's detail page, e.g., '/textiles/paro-textile-1'
}

export interface Region {
  id: string;                // e.g. 'BT-11'
  name: string;              // e.g. 'Paro'
  d?: string;               // SVG path data
  // population?: number; // Removed as per user request
  textiles: Textile[];       // List of 2-3 textiles for this dzongkhag
  imageUrl?: string;        // Original field, retained
  labelX: number;
  labelY: number;
  patternId: string;
  PatternComponent: React.FC<SvgProps>; // Changed from patternUrl
}

const getPatternId = (name: string): string => {
  const sanitizedName = name.toLowerCase().replace(/\s+/g, "_");
  return `${sanitizedName}-textile-pattern`;
};

export const bumthangTextiles: Textile[] = [
    { id: 'bumthang-t1', name: 'Bumthang Wool', color: '#B22222', detailPage: '/textiles/bumthang-t1' },
    { id: 'bumthang-t2', name: 'Bumthang Yathra', color: '#DA70D6', detailPage: '/textiles/bumthang-t2' },
    { id: 'bumthang-t3', name: 'Bumthang Pattern', color: '#6495ED', detailPage: '/textiles/bumthang-t3' },
  ]

export const bumthangData =   {
   id: "BT-33", 
name: 'Bumthang',
   d : "m 519.29556,230.09095 -1.41,3.22 -2.82,0.96 -1.13,1.32 -5.12,-0.7 -1.24,2.27 -5.22,0.04 -6.03,4.1 -0.66,0.01 -1.33,-1.99 -4.59,0.58 -3.57,-3.74 -0.94,-2.98 -2.8,-1.95 -2.61,-2.99 -2.36,-0.55 -5.71,0.73 -3.73,3.28 0,0 -0.17,-0.16 0,0 -1.52,-2.42 -1.69,-0.26 -1.28,-1.43 -1.44,-0.24 -1.28,-2.81 -2.82,-1.91 -1.75,-2.94 -11.38,-3.53 -0.27,-2.53 -1.23,-0.69 -6.39,-0.29 -2.76,-2.22 -1.64,-4.73 2.1,-2.01 -0.52,-3.36 -1.67,-3.62 0.4,-2.96 -1.8,-2.12 -1.99,-6.19 -0.75,-6.86 -0.73,-0.92 -1.64,0.12 -0.7,-6.23 -0.75,-1.71 1.14,-3.4 -2.83,0.05 -0.7,-1.06 1.11,-1.68 -0.43,-1.99 0.8,-2.77 0.04,-3.74 0.71,-0.99 2.31,-0.24 0.36,-1.2 -0.94,-2.14 1.64,-1.91 0.31,-3.13 -0.51,-1.46 -1.67,-1.6 1.29,-1.77 -1.57,-2.43 -0.05,-1.52 -3.13,-4.59 -3.88,-1.58 -2.83,1.1 -2.93,-3.25 0,0 -0.62,-2.49 0.69,-1.94 -2.18,-2.44 -0.28,-4.22 1.21,-1.4 1.52,0.6 3.06,-0.84 1.57,-2.01 2.21,-6.5 -0.48,-2.9 0.57,-1.91 -0.26,-4.68 -0.35,-2.43 -1.66,-1.43 -0.12,-5.06 -2.75,-1.45 -2.74,-0.35 -0.91,-3.55 -0.75,-0.54 0.4,-2.4 -1.78,-1.41 2.75,-6.64 0,-3.23 -0.87,-4.52 -3.67,-6.79 0,0 2.19,-1.98 0.45,-1.26 3.56,-1.61 5.21,1.81 2.72,2.05 4.51,1.33 2.72,2.2 0.73,2.05 4.15,1.81 3.25,-3.03 1.85,-2.91 2.58,0.28 2.69,-0.63 2.46,-2.27 4.15,-1.49 3.59,-3.97 2.87,-1.42 3.45,2.76 3.21,0.03 4.05,3.98 4.33,0.59 1.43,1.14 1.64,-0.99 1.29,2.09 1.15,0 1.64,-1.47 0,0 2.55,0.86 -0.76,3.98 0.22,3.12 1.75,1.05 -0.72,4.23 1.21,3.07 -0.81,4.08 -4.84,2.64 0.35,2.92 -2.51,3.16 -0.11,1.03 4.34,5.23 6.45,0.44 2.1,1.52 -0.36,2.27 0.85,3.38 3.29,7.19 0.04,2.78 -1.08,1.1 -0.16,1.33 1.72,1.66 1.79,-0.18 2.78,2.16 2.53,5.04 3.83,1.02 5.28,2.77 0.62,3.38 1.85,1.58 -0.41,2.86 2.21,5.06 -0.54,1.49 -1.9,1.01 -0.48,2.64 1.99,0.96 4.85,-0.44 5.5,4.65 3.84,4.16 -0.51,8.15 4.94,1.65 0.38,0.62 -5.31,6.57 0.33,1.13 -0.56,1.41 -1.63,2.02 0.84,1.86 -1.37,1.49 0.27,1.47 -1.87,1.99 3.68,5.8 -0.77,1.21 0.49,5.23 -1.77,2.22 0.59,2.64 4.98,2.52 2.73,4.31 -4.26,8.36 -3.49,3.76 0.3,1.85 3.26,2.8 0.89,3.33 0,0 0,1.13 -0.78,0.59 -4.74,-0.12 -0.87,1.45 -3.38,1.7 z"
   ,textiles: bumthangTextiles,
    labelX: 630,
    labelY: 40,
    patternId: getPatternId("Bumthang"), PatternComponent: BumthangPattern
  };
