// Import padrão para
import { Platform } from "react-native";

export const Colors = {
  light: {
    // Backgrounds
    background: "#F3F4FB",
    surface: "#FFFFFF",

    // Brand
    primary: "#2563EB",
    secondary: "#38A47F",

    // Text
    textPrimary: "#1F2937",
    textSecondary: "#808080",

    // UI Elements
    border: "#E8E9EF",
    error: "#C35050",

    // Extras
    icon: "#808080",
  },
  dark: {
    // (opcional futuramente)
    background: "#151718",
    surface: "#1F2937",

    primary: "#2563EB",
    secondary: "#38A47F",

    textPrimary: "#ECEDEE",
    textSecondary: "#9BA1A6",

    border: "#374151",
    error: "#C35050",

    icon: "#9BA1A6",
  },
};

export const Fonts = {
  text: Platform.select({
    ios: "KumbhSans-Regular",
    android: "KumbhSans-Regular",
    default: "KumbhSans-Regular",
  }),
  textMedium: Platform.select({
    ios: "KumbhSans-Medium",
    android: "KumbhSans-Medium",
    default: "KumbhSans-Medium",
  }),
  textBold: Platform.select({
    ios: "KumbhSans-Bold",
    android: "KumbhSans-Bold",
    default: "KumbhSans-Bold",
  }),
  numbers: Platform.select({
    ios: "EncodeSansExpanded-Regular",
    android: "EncodeSansExpanded-Regular",
    default: "EncodeSansExpanded-Regular",
  }),
  numbersBold: Platform.select({
    ios: "EncodeSansExpanded-Bold",
    android: "EncodeSansExpanded-Bold",
    default: "EncodeSansExpanded-Bold",
  }),
};
