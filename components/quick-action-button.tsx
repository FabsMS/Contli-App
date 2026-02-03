import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Colors, Fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { scaleFont, moderateScale } from "@/utils/responsive";

interface QuickActionButtonProps {
  label: string;
  variant: "primary" | "secondary" | "neutral";
  icon?: "add" | "cash";
  iconSource?: any;
  onPress?: () => void;
}

export function QuickActionButton({
  label,
  variant,
  icon,
  iconSource,
  onPress,
}: QuickActionButtonProps) {
  const backgroundColor =
    variant === "primary"
      ? Colors.light.primary
      : variant === "secondary"
      ? Colors.light.secondary
      : Colors.light.surface;

  const textColor = variant === "neutral" ? Colors.light.textPrimary : "#FFFFFF";

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {icon === "add" && (
        <Ionicons
          name="add"
          size={moderateScale(22)}
          color={textColor}
          style={styles.iconLeft}
        />
      )}
      {iconSource && (
        <Image
          source={iconSource}
          style={[
            styles.customIcon,
            { tintColor: textColor },
          ]}
          contentFit="contain"
        />
      )}
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(12),
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(16),
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Sombra para Android
    elevation: 2,
  },
  iconLeft: {
    marginRight: moderateScale(7),
  },
  customIcon: {
    width: moderateScale(18),
    height: moderateScale(18),
    marginRight: moderateScale(7),
  },
  label: {
    fontSize: scaleFont(15),
    fontFamily: Fonts.text,
  },
});
