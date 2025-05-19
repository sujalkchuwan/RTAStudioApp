import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { Buffer } from "buffer";
import Color from "color";

/**
 * Opens image picker and returns image brightness type: 'light' or 'dark'
 */
export async function pickImageAndDetectBrightness(): Promise<{
  uri: string | null;
  brightness: "light" | "dark";
}> {
  try {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      console.warn("Permission to access media library was denied");
      return { uri: null, brightness: "light" };
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (pickerResult.canceled) {
      return { uri: null, brightness: "light" };
    }

    const uri = pickerResult.assets?.[0]?.uri;
    if (!uri) {
      console.warn("No image URI found");
      return { uri: null, brightness: "light" };
    }

    const manipulated = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 10, height: 10 } }],
      { base64: true }
    );

    if (!manipulated.base64) {
      console.warn("No base64 data returned from image");
      return { uri, brightness: "light" };
    }

    const buffer = Buffer.from(manipulated.base64, "base64");
    const hexColor = `#${buffer.toString("hex").slice(0, 6)}`;

    const color = Color(hexColor);
    const brightness = color.isLight() ? "light" : "dark";

    return { uri, brightness };
  } catch (error) {
    console.error("Error picking image and detecting brightness:", error);
    return { uri: null, brightness: "light" };
  }
}
