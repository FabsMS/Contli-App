import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { Colors, Fonts } from "@/constants/theme";
import { SummaryCard } from "@/components/summary-card";
import { InfoCard } from "@/components/info-card";
import { QuickActionButton } from "@/components/quick-action-button";
import { scaleFont, moderateScale } from "@/utils/responsive";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("@/assets/icons/icon-contli.svg")}
            style={styles.logo}
            contentFit="contain"
          />
        </View>

        <Text style={styles.title}>Contli</Text>
        <Text style={styles.subtitle}>Controle simples, contas em dia</Text>

        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <SummaryCard
            title="Total em Aberto"
            value="R$ 2.450,00"
            variant="primary"
          />
          <View style={styles.cardSpacing} />
          <SummaryCard
            title="Total Recebido (no mês)"
            value="R$ 1.320,00"
            variant="secondary"
          />
        </View>

        {/* Info Card */}
        <InfoCard
          iconSource={require("@/assets/icons/icon-peoples.svg")}
          title="Clientes devendo"
          subtitle="5 clientes"
          onPress={() => console.log("Ver clientes devendo")}
        />

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>

        <View style={styles.quickActionsRow}>
          <View style={styles.quickActionHalf}>
            <QuickActionButton
              label="Nova Dívida"
              variant="primary"
              icon="add"
              onPress={() => console.log("Nova Dívida")}
            />
          </View>
          <View style={styles.cardSpacing} />
          <View style={styles.quickActionHalf}>
            <QuickActionButton
              label="Novo Pagamento"
              variant="secondary"
              iconSource={require("@/assets/icons/icon-payment.svg")}
              onPress={() => console.log("Novo Pagamento")}
            />
          </View>
        </View>

        <QuickActionButton
          label="Novo Cliente"
          variant="neutral"
          icon="add"
          onPress={() => console.log("Novo Cliente")}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    padding: moderateScale(20),
    paddingTop: moderateScale(50),
  },
  header: {
    alignItems: "center",
    marginBottom: moderateScale(10),
  },
  logo: {
    width: moderateScale(55),
    height: moderateScale(55),
  },
  title: {
    fontSize: scaleFont(28),
    fontFamily: Fonts.textBold,
    color: Colors.light.textPrimary,
    textAlign: "center",
    marginBottom: moderateScale(4),
  },
  subtitle: {
    fontSize: scaleFont(13),
    fontFamily: Fonts.text,
    color: Colors.light.textSecondary,
    textAlign: "center",
    marginBottom: moderateScale(28),
  },
  summaryContainer: {
    flexDirection: "row",
    marginBottom: moderateScale(16),
  },
  cardSpacing: {
    width: moderateScale(10),
  },
  sectionTitle: {
    fontSize: scaleFont(18),
    fontFamily: Fonts.textBold,
    color: Colors.light.textPrimary,
    marginTop: moderateScale(20),
    marginBottom: moderateScale(14),
  },
  quickActionsRow: {
    flexDirection: "row",
    marginBottom: moderateScale(10),
  },
  quickActionHalf: {
    flex: 1,
  },
});
