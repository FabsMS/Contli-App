import {
  PaymentHistoryData,
  PaymentHistoryItem,
} from "@/components/payment-history-item";
import { Colors, Fonts } from "@/constants/theme";
import { moderateScale, scaleFont } from "@/utils/responsive";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Dados mockados para demonstração
const MOCK_PAYMENT_HISTORY: PaymentHistoryData[] = [
  {
    id: "1",
    date: "15/01/2024",
    amount: 100.0,
    type: "payment",
    description: "Pagamento parcial",
  },
  {
    id: "2",
    date: "10/01/2024",
    amount: 200.0,
    type: "debt",
    description: "Compra de materiais",
  },
  {
    id: "3",
    date: "05/01/2024",
    amount: 50.0,
    type: "payment",
    description: "Pagamento parcial",
  },
  {
    id: "4",
    date: "28/12/2023",
    amount: 300.0,
    type: "debt",
    description: "Serviço de manutenção",
  },
  {
    id: "5",
    date: "20/12/2023",
    amount: 150.0,
    type: "payment",
    description: "Pagamento",
  },
];

export default function ClientDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Em produção, você buscaria os dados do cliente com base no ID
  const clientName = (params.name as string) || "Cliente";
  const clientPhone = (params.phone as string) || "";
  const clientEmail = (params.email as string) || "";
  const clientStatus = (params.status as string) || "up_to_date";
  const overdueAmount = params.overdueAmount
    ? parseFloat(params.overdueAmount as string)
    : 0;

  const isOverdue = clientStatus === "overdue";

  // Calcula totais do histórico
  const totalDebts = MOCK_PAYMENT_HISTORY.filter(
    (p) => p.type === "debt",
  ).reduce((sum, p) => sum + p.amount, 0);
  const totalPayments = MOCK_PAYMENT_HISTORY.filter(
    (p) => p.type === "payment",
  ).reduce((sum, p) => sum + p.amount, 0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={moderateScale(24)}
            color={Colors.light.textPrimary}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes do Cliente</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Client Info Card */}
        <View style={styles.clientCard}>
          <View style={styles.clientCardHeader}>
            <View style={styles.clientAvatar}>
              <Text style={styles.clientAvatarText}>
                {clientName.charAt(0).toUpperCase()}
              </Text>
            </View>
            {isOverdue ? (
              <View style={styles.overdueBadge}>
                <Text style={styles.overdueBadgeText}>Devendo</Text>
              </View>
            ) : (
              <View style={styles.upToDateBadge}>
                <Ionicons
                  name="checkmark-circle"
                  size={moderateScale(16)}
                  color={Colors.light.secondary}
                />
                <Text style={styles.upToDateBadgeText}>Em dia</Text>
              </View>
            )}
          </View>

          <Text style={styles.clientName}>{clientName}</Text>

          {clientPhone && (
            <View style={styles.infoRow}>
              <Ionicons
                name="call-outline"
                size={moderateScale(16)}
                color={Colors.light.textSecondary}
              />
              <Text style={styles.infoText}>{clientPhone}</Text>
            </View>
          )}

          {clientEmail && (
            <View style={styles.infoRow}>
              <Ionicons
                name="mail-outline"
                size={moderateScale(16)}
                color={Colors.light.textSecondary}
              />
              <Text style={styles.infoText}>{clientEmail}</Text>
            </View>
          )}
        </View>

        {/* Financial Summary */}
        <View style={styles.financialSummary}>
          <View style={styles.financialCard}>
            <Text style={styles.financialLabel}>Total em Dívidas</Text>
            <Text
              style={[styles.financialValue, { color: Colors.light.error }]}
            >
              R$ {totalDebts.toFixed(2).replace(".", ",")}
            </Text>
          </View>
          <View style={styles.financialCardDivider} />
          <View style={styles.financialCard}>
            <Text style={styles.financialLabel}>Total Pago</Text>
            <Text
              style={[styles.financialValue, { color: Colors.light.secondary }]}
            >
              R$ {totalPayments.toFixed(2).replace(".", ",")}
            </Text>
          </View>
        </View>

        {isOverdue && (
          <View style={styles.overdueCard}>
            <Ionicons
              name="alert-circle"
              size={moderateScale(24)}
              color={Colors.light.error}
            />
            <View style={styles.overdueInfo}>
              <Text style={styles.overdueLabel}>Valor em Aberto</Text>
              <Text style={styles.overdueValue}>
                R$ {overdueAmount.toFixed(2).replace(".", ",")}
              </Text>
            </View>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.primaryButton]}
            onPress={() => console.log("Adicionar pagamento")}
          >
            <Ionicons
              name="add-circle-outline"
              size={moderateScale(20)}
              color="#FFFFFF"
            />
            <Text style={styles.primaryButtonText}>Adicionar Pagamento</Text>
          </TouchableOpacity>

          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.secondaryButton,
                styles.halfButton,
              ]}
              onPress={() => console.log("Adicionar dívida")}
            >
              <Ionicons
                name="card-outline"
                size={moderateScale(18)}
                color={Colors.light.primary}
              />
              <Text style={styles.secondaryButtonText}>Nova Dívida</Text>
            </TouchableOpacity>

            <View style={styles.buttonSpacing} />

            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.secondaryButton,
                styles.halfButton,
              ]}
              onPress={() => console.log("Editar cliente")}
            >
              <Ionicons
                name="create-outline"
                size={moderateScale(18)}
                color={Colors.light.primary}
              />
              <Text style={styles.secondaryButtonText}>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment History */}
        <View style={styles.historySection}>
          <Text style={styles.sectionTitle}>Histórico de Movimentações</Text>
          {MOCK_PAYMENT_HISTORY.map((payment) => (
            <PaymentHistoryItem key={payment.id} payment={payment} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(50),
    paddingBottom: moderateScale(16),
    backgroundColor: Colors.light.background,
  },
  backButton: {
    padding: moderateScale(4),
  },
  headerTitle: {
    fontSize: scaleFont(18),
    fontFamily: Fonts.textBold,
    color: Colors.light.textPrimary,
  },
  headerRight: {
    width: moderateScale(32),
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: moderateScale(20),
    paddingTop: moderateScale(8),
  },
  clientCard: {
    backgroundColor: Colors.light.surface,
    borderRadius: moderateScale(16),
    padding: moderateScale(20),
    borderWidth: 1,
    borderColor: Colors.light.border,
    marginBottom: moderateScale(16),
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    // Sombra para Android
    elevation: 1,
  },
  clientCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: moderateScale(16),
  },
  clientAvatar: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    backgroundColor: Colors.light.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  clientAvatarText: {
    fontSize: scaleFont(28),
    fontFamily: Fonts.textBold,
    color: "#FFFFFF",
  },
  overdueBadge: {
    backgroundColor: Colors.light.error,
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(8),
  },
  overdueBadgeText: {
    fontSize: scaleFont(12),
    fontFamily: Fonts.textBold,
    color: "#FFFFFF",
  },
  upToDateBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(4),
    backgroundColor: `${Colors.light.secondary}15`,
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(8),
  },
  upToDateBadgeText: {
    fontSize: scaleFont(12),
    fontFamily: Fonts.textBold,
    color: Colors.light.secondary,
  },
  clientName: {
    fontSize: scaleFont(24),
    fontFamily: Fonts.textBold,
    color: Colors.light.textPrimary,
    marginBottom: moderateScale(12),
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(8),
    marginBottom: moderateScale(8),
  },
  infoText: {
    fontSize: scaleFont(14),
    fontFamily: Fonts.text,
    color: Colors.light.textSecondary,
  },
  financialSummary: {
    flexDirection: "row",
    backgroundColor: Colors.light.surface,
    borderRadius: moderateScale(14),
    padding: moderateScale(16),
    marginBottom: moderateScale(16),
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  financialCard: {
    flex: 1,
    alignItems: "center",
  },
  financialCardDivider: {
    width: 1,
    backgroundColor: Colors.light.border,
    marginHorizontal: moderateScale(12),
  },
  financialLabel: {
    fontSize: scaleFont(12),
    fontFamily: Fonts.text,
    color: Colors.light.textSecondary,
    marginBottom: moderateScale(6),
    textAlign: "center",
  },
  financialValue: {
    fontSize: scaleFont(20),
    fontFamily: Fonts.numbersBold,
  },
  overdueCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `${Colors.light.error}10`,
    borderRadius: moderateScale(12),
    padding: moderateScale(16),
    borderWidth: 1,
    borderColor: `${Colors.light.error}30`,
    marginBottom: moderateScale(16),
  },
  overdueInfo: {
    marginLeft: moderateScale(12),
  },
  overdueLabel: {
    fontSize: scaleFont(13),
    fontFamily: Fonts.text,
    color: Colors.light.textSecondary,
    marginBottom: moderateScale(2),
  },
  overdueValue: {
    fontSize: scaleFont(22),
    fontFamily: Fonts.numbersBold,
    color: Colors.light.error,
  },
  actionsContainer: {
    marginBottom: moderateScale(24),
  },
  actionsRow: {
    flexDirection: "row",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(12),
    paddingVertical: moderateScale(14),
    paddingHorizontal: moderateScale(16),
    gap: moderateScale(6),
  },
  primaryButton: {
    backgroundColor: Colors.light.primary,
    marginBottom: moderateScale(10),
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    // Sombra para Android
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: scaleFont(15),
    fontFamily: Fonts.textBold,
    color: "#FFFFFF",
  },
  secondaryButton: {
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  secondaryButtonText: {
    fontSize: scaleFont(14),
    fontFamily: Fonts.textBold,
    color: Colors.light.primary,
  },
  halfButton: {
    flex: 1,
  },
  buttonSpacing: {
    width: moderateScale(10),
  },
  historySection: {
    marginBottom: moderateScale(20),
  },
  sectionTitle: {
    fontSize: scaleFont(18),
    fontFamily: Fonts.textBold,
    color: Colors.light.textPrimary,
    marginBottom: moderateScale(14),
  },
});
