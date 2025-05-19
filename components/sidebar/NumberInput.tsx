import { TextInput, View, Text, StyleSheet } from "react-native";

export default function NumberInput({
  label,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        keyboardType="numeric"
        value={value.toString()}
        onChangeText={(text) => {
          const num = parseFloat(text);
          if (!isNaN(num)) {
            const clamped = Math.max(min ?? num, Math.min(max ?? num, num));
            onChange(clamped);
          }
        }}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 8 },
  label: { fontSize: 12, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 6,
    fontSize: 14,
  },
});
