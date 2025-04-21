import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Svg, { Path, G, Defs, Pattern, Image as SvgImage, Filter, FeGaussianBlur, Line, Circle, Rect, Text as SvgText } from 'react-native-svg';
import { regions } from './map';
import { Ionicons } from '@expo/vector-icons';


const { width, height } = Dimensions.get('window');

const ExploreMap = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const selected = regions.find((r) => r.id === selectedRegion);

  return (
    <View style={styles.container}>
      {/* LEFT annotation image */}
      {!selectedRegion && (
        <View style={styles.leftAnnotation}>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Pattern_Bhutanese_textile.jpg/800px-Pattern_Bhutanese_textile.jpg',
            }}
            style={styles.annotationImage}
            resizeMode="contain"
          />
        </View>
      )}

      <View style={styles.mapContainer}>
        <Svg
          width={height * 0.7}
          height={width * 0.99}
          viewBox="0 0 792.44208 404.41379"
          preserveAspectRatio="xMidYMid meet"
          style={{ transform: [{ rotate: '90deg' }] }}
        >
          <Defs>
            <Filter id="blurFilter">
              <FeGaussianBlur in="SourceGraphic" stdDeviation="3" />
            </Filter>
            {regions.map((region) =>
              region.imageUrl ? (
                <Pattern
                  key={region.id}
                  id={`pattern-${region.id}`}
                  width="100%"
                  height="100%"
                  patternUnits="objectBoundingBox"
                >
                  <SvgImage
                    href={{ uri: region.imageUrl }}
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </Pattern>
              ) : null
            )}
          </Defs>

          <G origin="396.22104,202.206895">
            {/* Dzongkhag paths */}
            {regions.map((region) => (
              <Path
                key={region.id}
                d={region.d}
                fill={
                  region.imageUrl
                    ? `url(#pattern-${region.id})`
                    : region.fillColor || '#6b7280'
                }
                stroke="#ffffff"
                strokeWidth={0.5}
                fillOpacity={
                  selectedRegion && selectedRegion !== region.id ? 0.4 : 1
                }
                filter={
                  selectedRegion && selectedRegion !== region.id
                    ? 'url(#blurFilter)'
                    : undefined
                }
                onPress={() => setSelectedRegion(region.id)}
              />
            ))}

    

            {/* Samtse Textile annotation */}
            {!selectedRegion && (
              <>
                <Line
                  x1={100}
                  y1={340}
                  x2={100}
                  y2={260}
                  stroke="#1f2937"
                  strokeWidth={2}
                />
                <Circle cx={100} cy={260} r={6} fill="#1f2937" />
                <G x={110} y={220}>
                  <Rect width={120} height={45} rx={6} fill="#fff7ed" stroke="#ea580c" />
                  <SvgText x={10} y={18} fontSize="12" fill="#b45309">
                    Samtse Textile
                  </SvgText>
                  <SvgText x={10} y={35} fontSize="10" fill="#78350f">
                    Traditional Weaving
                  </SvgText>
                </G>
              </>
            )}

            {/* Lhuntse Textile annotation */}
            {!selectedRegion && (
              <>
                <Line
                  x1={470}
                  y1={100}
                  x2={670}
                  y2={40}
                  stroke="#1f2937"
                  strokeWidth={2}
                />
                <Circle cx={670} cy={40} r={6} fill="#1f2937" />
                <G x={680} y={-5}>
                  <Rect width={120} height={45} rx={6} fill="#f0fdf4" stroke="#16a34a" />
                  <SvgText x={10} y={18} fontSize="12" fill="#166534">
                    Lhuntse Textile
                  </SvgText>
                  <SvgText x={10} y={35} fontSize="10" fill="#14532d">
                    Kurtoe Kushuthara
              
                  </SvgText>
                </G>
              </>
            )}
          </G>
        </Svg>

        {/* Floating info after selection */}
        {selected && (
          <View style={styles.floatingInfo}>
            <View style={styles.selectedInfo}>
              <Text style={styles.selectedText}>{selected.name}</Text>
              <Text style={styles.selectedSubText}>Population: {selected.population}</Text>
            </View>

            {/* Explore More Button */}
            <TouchableOpacity style={styles.exploreButton} onPress={() => console.log('Explore More')}>
              <Text style={styles.exploreButtonText}>Explore More</Text>
            </TouchableOpacity>

            {/* Clean button with an arrow */}
            <TouchableOpacity style={styles.cleanButton}>
              <Ionicons name="close-circle-outline" size={24} color="#1f2937" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
  },
  exploreButton: {
    marginTop: 5,
    backgroundColor: '#4CAF50', // Green color for the button
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  exploreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  cleanButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5,
    elevation: 3,
  },
  mapContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -80,
  },
  floatingInfo: {
    position: 'absolute',
    top: 640,
    left: 250,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
    transform: [{ rotate: '90deg' }],
  },
  selectedInfo: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
  },
  selectedSubText: {
    fontSize: 15,
    color: '#6b7280',
    marginTop: 5,
  },
  leftAnnotation: {
    position: 'absolute',
    left: 10,
    top: height * 0.3,
    zIndex: 5,
  },
  annotationImage: {
    width: 100,
    height: 150,
    transform: [{ rotate: '90deg' }],
  },
});

export default ExploreMap;
