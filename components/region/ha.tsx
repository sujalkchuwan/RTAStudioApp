import HaaPattern from "../../assets/textile_patterns/pumo_pattern.svg";
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

export const haTextiles: Textile[] =  [
   
  ];

export const haData =   {
      id: "BT-13", 
   name: 'Ha',
   d: "m 89.515559,168.27095 1.34,1.63 3.68,1.31 0.62,3.45 3.59,0.85 1.24,1.63 6.530001,0.27 5.2,4.26 5.03,-1.43 1.51,2.96 0.56,6.07 2.02,2.28 0.05,4.1 0.98,0.53 -0.11,3.46 1.19,2.07 0.1,3.69 2.35,0.45 3.64,3.07 1.74,0.67 0.85,1.72 -0.98,2.41 0.25,1.12 1.35,2 1.84,1.06 -0.14,1.19 2.76,1.73 3.09,8.37 1.33,0.74 3.48,4.93 1.58,0.84 1.22,2.35 0.22,2.3 2.29,2.3 0.49,1.45 1.92,1.19 -1.28,2.62 -2.26,1.33 -1.38,1.84 -5.98,1.96 -1.79,2.14 0.11,4.43 0.91,3.33 -0.71,3.09 2.29,5.84 0,0 0.05,2.24 1.81,3.41 3.48,2.44 0.78,1.8 -3.77,3.47 -2.91,3.8 -0.67,2.07 0.82,2.76 -7.55,4.73 0.02,2.64 1.24,2.97 0,0 -6.31,0.64 -5.2,-1.41 -1.19,0.98 -3.21,-0.02 -3.31,3.72 -0.14,2.96 -3.75,6.4 -2.44,0.71 -2.69,-4.19 -3.36,-2.53 -2.23,-6.12 -2.080001,-2.45 -0.74,0.35 -1.35,3.36 -0.21,3.44 -2.12,2.69 -2.55,1.54 -2.4,0.39 -2.13,1.59 -2.58,-0.12 -2.23,-2.65 -2.3,-0.24 -1.7,-2.01 -3.22,-1.5 -0.39,-3.09 -8.84,-5.57 -1.28,-1.82 0,-2.17 -1.52,-3.27 -4.38,-2.37 -1.56,0.39 -2.44,-1.38 0.21,-5.46 1.49,-4.31 -0.5,-6 -5.98,-6.22 -2.4,-3.48 -1.03,-3.24 -5.63,-3.53 -4.53,-1.35 -1.87,-1.53 0,0 1.4,-3.47 -1.49,-2.01 -0.23,-3.2 1.16,-1.5 0.36,-2.66 2.5,-2.6 1.48,0.66 6.92,8.05 4.84,4.01 1.19,-1 0,-2.41 0.85,-1.6 2.82,-1.8 0.22,-1.55 -1.83,-4.67 -4.78,-3.74 0.36,-1.9 -0.63,-3.7 1.03,-4.63 -1.19,-4.04 1.3,-2.6 1.68,-1.62 -0.56,-3.45 4.97,-5.69 -0.95,-4.19 -1.23,-1.19 -0.72,-2.01 3.52,-2.88 3.35,0 0.11,-0.81 -2.08,-2.61 -0.33,-2.32 1.22,-1.75 6.76,-4.01 0.33,-4.07 1.29,-1.26 -0.78,-3.13 0.7,-2.26 1.7,-0.5 1.56,-1.88 2.96,-0.81 3.02,-2.38 2.73,0 4.47,1.5 1.12,-2.07 z"
,textiles: haTextiles,
    labelX: 80,
    labelY: 200,
     patternId: getPatternId("Haa"), PatternComponent: HaaPattern
};
 