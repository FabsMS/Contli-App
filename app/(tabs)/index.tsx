import { StyleSheet, Text, View } from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { Colors, Fonts } from "@/constants/theme";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: Colors.light.primary,
        dark: Colors.dark.primary,
      }}
      headerImage={
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Contli</Text>
          <Text style={styles.headerSubtitle}>
            Controle simples das contas dos seus clientes
          </Text>
        </View>
      }
    >
      {/* Card principal */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total em aberto</Text>

        <Text style={styles.cardValue}>R$ 1.250,00</Text>

        <Text style={styles.cardDescription}>
          Valor total que seus clientes ainda têm para pagar.
        </Text>
      </View>

      {/* Texto informativo */}
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Aqui você poderá cadastrar clientes, acompanhar pagamentos e evitar
          esquecimentos no controle das contas.
        </Text>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContent: {
    height: 160,
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 32,
    fontFamily: Fonts.textBold,
  },

  headerSubtitle: {
    color: "#FFFFFF",
    fontSize: 14,
    marginTop: 4,
    fontFamily: Fonts.text,
  },

  card: {
    backgroundColor: Colors.light.surface,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },

  cardTitle: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    fontFamily: Fonts.text,
    marginBottom: 8,
  },

  cardValue: {
    fontSize: 28,
    color: Colors.light.primary,
    fontFamily: Fonts.numbersBold,
    marginBottom: 8,
  },

  cardDescription: {
    fontSize: 13,
    color: Colors.light.textSecondary,
    fontFamily: Fonts.text,
  },

  infoBox: {
    backgroundColor: Colors.light.background,
    padding: 16,
    borderRadius: 8,
  },

  infoText: {
    fontSize: 14,
    color: Colors.light.textPrimary,
    fontFamily: Fonts.text,
    lineHeight: 20,
  },
});
