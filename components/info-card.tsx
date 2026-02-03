import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Colors, Fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { scaleFont, moderateScale } from "@/utils/responsive";

interface InfoCardProps {
  iconSource: any;
  title: string;
  subtitle: string;
  onPress?: () => void;
}

export function InfoCard({
  iconSource,
  title,
  subtitle,
  onPress,
}: InfoCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Image source={iconSource} style={styles.icon} contentFit="contain" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={moderateScale(18)}
        color={Colors.light.textSecondary}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.surface,
    borderRadius: moderateScale(12),
    padding: moderateScale(14),
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  iconContainer: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    backgroundColor: Colors.light.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: moderateScale(12),
  },
  icon: {
    width: moderateScale(22),
    height: moderateScale(22),
    tintColor: "#FFFFFF",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: scaleFont(15),
    fontFamily: Fonts.textBold,
    color: Colors.light.textPrimary,
    marginBottom: moderateScale(2),
  },
  subtitle: {
    fontSize: scaleFont(13),
    fontFamily: Fonts.text,
    color: Colors.light.textSecondary,
  },
});
