import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";

const { width } = Dimensions.get("window");

export default function ExceptionPage() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Top Back Button */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
          accessibilityLabel="Go back"
        >
          {/* <Ionicons name="arrow-back" size={28} color="#333" /> */}
        </TouchableOpacity>
      </View>

      {/* Center Content */}
      <View style={styles.content}>
        {/* Placeholder Bhutanese Textile Vector */}
      <Svg
  width={150}
  height={150}
  viewBox="0 0 64 64"
  fill="none"
  accessibilityLabel="Bhutanese textile kite loop pattern"
>
  {/* Outer kite shape */}
  <Path
    d="M32 2 L58 32 L32 62 L6 32 Z"
    stroke="#E53935"
    strokeWidth={3}
    fill="none"
  />
  {/* Inner infinite loop style figure-eight */}
  <Path
    d="M20 20
       C28 12, 36 12, 44 20
       C52 28, 52 36, 44 44
       C36 52, 28 52, 20 44
       C12 36, 12 28, 20 20
       Z"
    stroke="#E53935"
    strokeWidth={2}
    fill="none"
  />
</Svg>


        <Text style={styles.message}>No Data Found</Text>

        <TouchableOpacity
          onPress={() => router.push("/explore")}
          style={styles.okButton}
          accessibilityRole="button"
          accessibilityLabel="Go to Explore page"
        >
          <Text style={styles.okButtonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  topBar: {
    height: 60,
    justifyContent: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  message: {
    marginTop: 24,
    fontSize: 22,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  okButton: {
    marginTop: 40,
    backgroundColor: "#E53935",
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
    shadowColor: "#E53935",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  okButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
});
