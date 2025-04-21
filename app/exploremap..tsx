import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Svg, {
  Path,
  G,
  Defs,
  Pattern,
  Image as SvgImage,
  Filter,
  FeGaussianBlur,
} from 'react-native-svg';
import { regions } from './map';

const { width, height } = Dimensions.get('window');

const ExploreMap = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const selected = regions.find((r) => r.id === selectedRegion);

  return (
    <View style={styles.container}>
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
            {regions.map((region) => (
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
            ))}
          </Defs>

          <G origin="396.22104,202.206895">
            {regions.map((region) => (
              <Path
                key={region.id}
                d={region.d}
                fill={region.imageUrl ? `url(#pattern-${region.id})` : '#6b7280'}
                stroke="#ffffff" // Always show white border
                strokeWidth={0.5}
                filter={
                  selectedRegion && selectedRegion !== region.id
                    ? 'url(#blurFilter)'
                    : undefined
                }
                onPress={() => setSelectedRegion(region.id)}
              />
            ))}
          </G>
        </Svg>

        {selected && (
          <View style={styles.floatingInfo}>
            <View style={styles.selectedInfo}>
              <Text style={styles.selectedText}>{selected.name}</Text>
              <Text style={styles.selectedSubText}>Population: {selected.population}</Text>
            </View>
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
  mapContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -110,
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
});

export default ExploreMap;
