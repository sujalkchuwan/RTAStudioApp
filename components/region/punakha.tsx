import PunakhaPattern from "../../assets/textile_patterns/pumo_pattern.svg";
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

export const punakhaTextiles: Textile[] =   [

  ];

export const punakhaData =   {
   id: "BT-23", 
name: 'Punakha',
d:"m 210.64556,144.61095 1.91,-3.17 3.71,0.5 2.46,-1.09 6.27,2.37 2.04,-0.85 3.74,0.15 3.71,-2.3 -1.06,-2.46 2.07,-0.73 2.61,-4.59 1.5,-1.25 0.98,-0.24 2.51,1.53 1.9,3.85 3.24,-1.86 1.58,-4.23 3.41,-1.99 1.24,-2.71 3.19,-1.97 4.5,-8.8 3.88,-2.01 3.35,-0.63 2.54,0.3 4.74,-2.91 2.58,0.55 6.79,6.1 3.24,0.19 3.97,2.24 4.36,1.34 1.48,2.2 4.77,0.86 0,0 1.08,7.53 -0.45,1.62 -0.87,1.77 -4.33,2.52 -5.21,5.49 -1.53,5.96 0.25,1.83 -0.75,0.99 2.01,1.99 3.22,0.87 4.22,-1.3 3.17,0.7 3.33,4.31 2.9,2.42 0.53,1.32 -0.39,1.69 -2.6,1.75 -2.61,3.71 -4.97,0.46 -5.1,7.4 -5.3,2.65 -1.05,2.53 -4.27,2.49 0.15,2.82 -5.42,4.45 0.68,2.86 -0.63,2.66 -2.26,0.9 -3.36,-1.6 -3.7,0.31 -1.39,1.74 1.34,2.85 -0.36,1.04 -2.3,0.38 -3.11,1.93 -2.3,0.05 -4.12,2.4 -1.84,0.17 -3.41,-1.23 -1.79,1.92 -3.07,-0.29 -2.54,1.33 -5.39,0.41 0,0 -0.62,-0.12 -2.55,-5.26 -2.59,-1.45 -0.85,-1.2 0.18,-1.11 -1.03,-2.2 -2.28,-0.45 -2.19,-1.55 -1.2,-3.21 1.01,-2.77 -0.76,-2.6 -1.96,-2.57 -3.04,-1.05 -2.9,-9.09 -2.76,-1.42 -2.28,-4.03 -0.3,-2.67 1.44,-2.86 -0.29,-4.94 1.16,-4.23 -1.15,-0.77 -0.32,-2.52 -1.51,-1.22 -1.73,0.52 -0.61,-0.45 z"
, textiles: punakhaTextiles,
    labelX: 280,
    labelY: 180,
     patternId: getPatternId("Punakha"), PatternComponent: PunakhaPattern
 };