import { View, Text } from "react-native";
import ColorPicker from "react-native-wheel-color-picker";

export default function MobileColorPicker({
  value,
  onChange,
  label = "Color",
}: {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}) {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 12, marginBottom: 6 }}>{label}</Text>
      <View style={{ height: 200 }}>
        <ColorPicker
          color={value}
          onColorChangeComplete={onChange}
          thumbSize={20}
          sliderSize={20}
          noSnap={true}
          row={false}
        />
      </View>
    </View>
  );
}
