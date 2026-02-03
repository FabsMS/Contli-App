import { StyleSheet, Text, View } from "react-native";
import { Colors, Fonts } from "@/constants/theme";

interface SummaryCardProps {
  title: string;
  value: string;
  variant: "primary" | "secondary";
}

export function SummaryCard({ title, value, variant }: SummaryCardProps) {
  const backgroundColor =
    variant === "primary" ? Colors.light.primary : Colors.light.secondary;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 16,
    padding: 20,
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
  title: {
    fontSize: 14,
    fontFamily: Fonts.text,
    color: "#FFFFFF",
    marginBottom: 8,
    opacity: 0.9,
  },
  value: {
    fontSize: 24,
    fontFamily: Fonts.numbersBold,
    color: "#FFFFFF",
  },
});
