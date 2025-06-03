// src/regions/samtse.tsx
import SamdrupJongkharPattern from "../../assets/textile_patterns/sj.svg"; // Update with correct pattern
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

export const samdrup_jongkhaTextiles: Textile[] =   [
    { id: 'sj-t1', name: 'Samdrup Jongkhar Silk', color: '#556B2F', detailPage: '/textiles/sj-t1' },
    { id: 'sj-t2', name: 'Jachenrdema', color: '#8FBC8F', detailPage: '/textiles/sj-t2' },
    { id: 'sj-t3', name: 'Eastern Motif', color: '#9ACD32', detailPage: '/textiles/sj-t3' },
  ];
export const samdrup_jongkhagData =  {
   id: "BT-45", 
name: 'Samdrup Jongkhar',
   d:"m 651.39556,319.37095 6.22,-2.25 3.64,-3.13 5.48,-1.47 2.38,-1.43 0.94,-2.43 2.36,1.07 3.12,0.07 1.77,1.65 2.65,0.5 4.7,-1.36 3,-2.79 5.2,-2 2.4,0.27 3.69,-2.12 2.3,0.75 1.43,-1.63 1.97,-0.62 3.11,0.5 3.72,-1.06 1.68,-1.65 0.61,-1.83 2.8,-2.46 0.64,-2.22 1.14,-0.93 1.32,-2.75 4.04,-3.66 3.52,-0.68 2.35,-1.58 6.99,-1.52 2.71,0.84 0.57,-1.03 1.74,-0.42 4.2,1.44 -0.38,-2.59 1.14,-8.54 -0.81,-2.05 0.66,-3.67 -0.51,-2.93 0.41,-1.36 1.92,-2.1 2.01,0.18 1.73,1.4 1.65,6.41 2.07,2.99 -0.02,2.09 0.6,0.71 5.26,2.48 9.24,-0.05 2.29,0.83 0,0 -3.02,2.54 -0.07,2.3 1.68,7.22 -0.42,2.38 -2.3,4.47 1.88,3.98 -0.07,2.73 1.36,5.5 2.34,2.28 2.41,0.04 5.9,3.16 -0.94,3.15 0.27,2.5 5.69,3.08 0.7,7.38 3.52,2.5 0.21,3.66 -1.67,1.48 -0.14,0.93 1.04,2.34 -0.76,5.61 1.18,2.49 -1.18,3.89 -3.08,3.35 0,3.89 -1.25,1.09 -9.5,4.44 -3.35,0.15 -3.93,-1.47 -8.19,-1.39 -5.02,-3.05 -3.02,-2.79 -1.39,-2.66 -2.81,-1.87 -10.5,-5.56 -1.96,-0.1 -8.32,1.11 -5.07,9.39 -7.02,6.37 -17.61,10.33 -6.96,0.18 -2.35,1.77 -1.87,0.09 -6.03,-2.7 -6.99,-1.63 -7.75,4.33 -23,3.92 -3.41,-0.53 -16.4,-11.45 0,0 -4.52,-2.32 -0.96,-2.13 2.6,-1.39 -0.15,-8.87 3.71,-4.72 2.88,-0.65 4.58,-7.77 -1.06,-2.71 -0.01,-5.78 5.74,-6.93 0.73,-4.13 3.34,0.23 2.25,-2.73 1.93,-0.98 2.11,0.82 1.29,2.14 2.05,0.31 z"
   , textiles: samdrup_jongkhaTextiles,
    labelX: 300,
    labelY: 80,
    patternId: getPatternId("Samdrup Jongkhar"), PatternComponent: SamdrupJongkharPattern
  };