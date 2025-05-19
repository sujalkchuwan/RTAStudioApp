import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useStorage } from "@/liveblocks.config";
import { useMutation, useSelf } from "@liveblocks/react";
import ColorPicker from "./MobileColorPicker";
import NumberInput from "./NumberInput";
import Slider from "./MobileSlider";
import { LayerType } from "@/types";
import { hexToRgb, colorToCss } from "@/utils/utils";
import { useSelf as useLiveblocksSelf } from "@liveblocks/react";

export default function RightSidebar() {
  const selection = useSelf((me) => me.presence.selection);
  const layers = useStorage((root) => root.layers);
  const roomColor = useStorage((root) => root.roomColor);
  const selectedLayer =
    selection?.length === 1 ? layers?.get(selection[0]) : null;

  const updateLayer = useMutation(
    (
      { storage },
      updates: {
        id?: string;
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        opacity?: number;
        cornerRadius?: number;
        fill?: string;
        stroke?: string;
        fontSize?: number;
        fontWeight?: number;
        fontFamily?: string;
        strokeWidth?: number;
        rotation?: number;
      }
    ) => {
      const targetId = updates.id ?? selection?.[0];
      if (!targetId) return;

      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(targetId);

      if (layer) {
        layer.update({
          ...(updates.x !== undefined && { x: updates.x }),
          ...(updates.y !== undefined && { y: updates.y }),
          ...(updates.width !== undefined && { width: updates.width }),
          ...(updates.height !== undefined && { height: updates.height }),
          ...(updates.opacity !== undefined && { opacity: updates.opacity }),
          ...(updates.cornerRadius !== undefined && {
            cornerRadius: updates.cornerRadius,
          }),
          ...(updates.strokeWidth !== undefined && {
            strokeWidth: updates.strokeWidth,
          }),
          ...(updates.fill !== undefined && { fill: hexToRgb(updates.fill) }),
          ...(updates.stroke !== undefined && {
            stroke: hexToRgb(updates.stroke),
          }),
          ...(updates.rotation !== undefined && { rotation: updates.rotation }),
          ...(updates.fontSize !== undefined && { fontSize: updates.fontSize }),
          ...(updates.fontWeight !== undefined && {
            fontWeight: updates.fontWeight,
          }),
          ...(updates.fontFamily !== undefined && {
            fontFamily: updates.fontFamily,
          }),
        });
      }
    },
    [selection]
  );

  const updateRoomColor = useMutation(({ storage }, color: string) => {
    storage.set("roomColor", hexToRgb(color));
  }, []);

  return (
    <View style={styles.sidebar}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.title}>Canvas</Text>
        <ColorPicker
          label="Canvas Background"
          value={colorToCss(roomColor ?? { r: 255, g: 255, b: 255 })}
          onChange={updateRoomColor}
        />

        {selectedLayer ? (
          <>
            <Text style={[styles.title, { marginTop: 24 }]}>
              Layer: {selectedLayer.name || selection?.[0] || ""}
            </Text>

            {"x" in selectedLayer && "y" in selectedLayer && (
              <View style={styles.row}>
                <NumberInput
                  label="X"
                  value={selectedLayer.x}
                  onChange={(val) => updateLayer({ x: val })}
                />
                <NumberInput
                  label="Y"
                  value={selectedLayer.y}
                  onChange={(val) => updateLayer({ y: val })}
                />
              </View>
            )}

            {"width" in selectedLayer && "height" in selectedLayer && (
              <View style={styles.row}>
                <NumberInput
                  label="W"
                  value={selectedLayer.width}
                  onChange={(val) => updateLayer({ width: val })}
                />
                <NumberInput
                  label="H"
                  value={selectedLayer.height}
                  onChange={(val) => updateLayer({ height: val })}
                />
              </View>
            )}

            {"rotation" in selectedLayer && (
              <NumberInput
                label="Rotation"
                value={selectedLayer.rotation ?? 0}
                onChange={(val) => updateLayer({ rotation: val })}
              />
            )}

            {"cornerRadius" in selectedLayer && (
              <NumberInput
                label="Corners"
                value={selectedLayer.cornerRadius ?? 0}
                onChange={(val) => updateLayer({ cornerRadius: val })}
              />
            )}

            {"opacity" in selectedLayer && (
              <Slider
                label="Opacity"
                value={selectedLayer.opacity}
                onChange={(val) => updateLayer({ opacity: val })}
                min={0}
                max={100}
              />
            )}

            {"fill" in selectedLayer && (
              <ColorPicker
                label="Fill"
                value={`rgb(${selectedLayer.fill.r}, ${selectedLayer.fill.g}, ${selectedLayer.fill.b})`}
                onChange={(val) => updateLayer({ fill: val })}
              />
            )}

            {"stroke" in selectedLayer && (
              <ColorPicker
                label="Stroke"
                value={`rgb(${selectedLayer.stroke.r}, ${selectedLayer.stroke.g}, ${selectedLayer.stroke.b})`}
                onChange={(val) => updateLayer({ stroke: val })}
              />
            )}

            {selectedLayer.type === LayerType.Text && (
              <>
                <NumberInput
                  label="Font Size"
                  value={selectedLayer.fontSize}
                  onChange={(val) => updateLayer({ fontSize: val })}
                />
                <NumberInput
                  label="Font Weight"
                  value={selectedLayer.fontWeight}
                  onChange={(val) => updateLayer({ fontWeight: val })}
                />
              </>
            )}
          </>
        ) : (
          <Text style={{ marginTop: 16 }}>No layer selected</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: "#fff",
    width: 320,
    borderLeftWidth: 1,
    borderLeftColor: "#eee",
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#222",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 12,
  },
});
