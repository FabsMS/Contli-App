import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Colors, Fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

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
        size={20}
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
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.light.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "#FFFFFF",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.textBold,
    color: Colors.light.textPrimary,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: Fonts.text,
    color: Colors.light.textSecondary,
  },
});
