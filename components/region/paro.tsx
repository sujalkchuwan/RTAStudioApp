import ParoPattern from "../../assets/textile_patterns/pumo_pattern.svg";
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

export const paroTextiles: Textile[] = [
   
  ];

export const paroData =   {
      id: 'BT-11',
      name: 'Paro',
         d:"m 113.72556,127.95095 2.5,2.54 -0.17,0.94 1.55,1.4 0.69,2.53 1.75,0.98 4.05,0.04 1.29,0.67 0.03,1.26 -1.32,0.43 -0.73,1.29 0.1,2.47 4.78,-1.06 0.28,-2.35 0.76,-0.13 4.63,2.37 3.39,0.28 1.3,-0.91 0.58,-2.27 3.3,-1.69 2.4,0.08 3.62,2.8 3.14,-2.91 6.5,-2.15 0.71,1.91 -0.02,3.76 -0.33,2.6 -1.29,1.46 1.2,2.69 -0.99,2.57 2.34,1.82 2.23,4.18 -1.66,2.42 -1.52,0.16 -2.4,1.56 -0.35,1.49 -1.1,0.83 0.97,1.56 1.43,0.49 1.64,-1.78 2.27,-0.39 0.62,1.89 6.26,5.16 2.89,3.86 2.84,1.09 -0.2,0.9 -1.39,1 1.84,2.73 0.67,2.66 1.28,1.91 3.15,1.16 1.36,1.7 -1.76,1.46 -0.98,-0.11 -0.58,1.39 -0.32,5.54 0.8,3.48 -1.67,4.24 0.13,4.61 -1.55,2.49 0.75,4.42 -1.15,5.65 1.56,2.26 3.18,-0.35 4.3,2.21 0.86,4.75 -2.64,3.8 0.04,2.56 1.17,1.37 2.36,0.56 5.18,3.86 -0.25,7.26 0,0 -1.26,4.09 -0.08,3.21 -2.83,3.33 -1.87,6.53 -1.59,3.01 -0.43,3.15 1.49,4.47 -2.12,2.61 -1.77,-0.71 -2.9,0.22 -6.37,-1.13 -1.89,-2.03 -4.59,-1.92 -3.7,-3.7 -0.85,0.2 -1.43,1.9 -3.58,1.07 -3.86,-0.7 -4.37,1.15 -3.79,-0.28 0,0 -2.29,-5.84 0.71,-3.09 -0.91,-3.33 -0.11,-4.43 1.79,-2.14 5.98,-1.96 1.38,-1.84 2.26,-1.33 1.28,-2.62 -1.92,-1.19 -0.49,-1.45 -2.29,-2.3 -0.22,-2.3 -1.22,-2.35 -1.58,-0.84 -3.48,-4.93 -1.33,-0.74 -3.09,-8.37 -2.76,-1.73 0.14,-1.19 -1.84,-1.06 -1.35,-2 -0.25,-1.12 0.98,-2.41 -0.85,-1.72 -1.74,-0.67 -3.64,-3.07 -2.35,-0.45 -0.1,-3.69 -1.19,-2.07 0.11,-3.46 -0.98,-0.53 -0.05,-4.1 -2.02,-2.28 -0.56,-6.07 -1.51,-2.96 -5.03,1.43 -5.2,-4.26 -6.530001,-0.27 -1.24,-1.63 -3.59,-0.85 -0.62,-3.45 -3.68,-1.31 -1.34,-1.63 0,0 1.92,-1.61 -0.39,-2.05 2.86,-1.45 -0.45,-2.93 0.76,-1.65 2.41,-1.49 0.91,-1.96 1.26,-0.04 0.24,0.82 1.610001,-0.23 1.57,-6.55 0.34,-0.66 3.18,-0.82 1.29,-4.98 3.56,-0.2 1.92,-1.45 1.33,-4.92 -1.57,-3.73 z"
        , textiles: paroTextiles,
        labelX: 630,
    labelY: 40, 
    patternId: getPatternId("Paro"), PatternComponent: ParoPattern

      };
