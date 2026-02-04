import { StyleSheet, Text, View } from "react-native";
import { Colors, Fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { scaleFont, moderateScale } from "@/utils/responsive";

export interface PaymentHistoryData {
  id: string;
  date: string;
  amount: number;
  type: "payment" | "debt";
  description?: string;
}

interface PaymentHistoryItemProps {
  payment: PaymentHistoryData;
}

export function PaymentHistoryItem({ payment }: PaymentHistoryItemProps) {
  const isPayment = payment.type === "payment";

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: isPayment
              ? `${Colors.light.secondary}20`
              : `${Colors.light.error}20`,
          },
        ]}
      >
        <Ionicons
          name={isPayment ? "arrow-down" : "arrow-up"}
          size={moderateScale(18)}
          color={isPayment ? Colors.light.secondary : Colors.light.error}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.leftContent}>
          <Text style={styles.description}>
            {payment.description || (isPayment ? "Pagamento" : "Dívida")}
          </Text>
          <Text style={styles.date}>{payment.date}</Text>
        </View>

        <Text
          style={[
            styles.amount,
            { color: isPayment ? Colors.light.secondary : Colors.light.error },
          ]}
        >
          {isPayment ? "+" : "-"} R${" "}
          {payment.amount.toFixed(2).replace(".", ",")}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.surface,
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    borderWidth: 1,
    borderColor: Colors.light.border,
    marginBottom: moderateScale(8),
  },
  iconContainer: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    alignItems: "center",
    justifyContent: "center",
    marginRight: moderateScale(12),
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftContent: {
    flex: 1,
  },
  description: {
    fontSize: scaleFont(14),
    fontFamily: Fonts.textBold,
    color: Colors.light.textPrimary,
    marginBottom: moderateScale(2),
  },
  date: {
    fontSize: scaleFont(12),
    fontFamily: Fonts.text,
    color: Colors.light.textSecondary,
  },
  amount: {
    fontSize: scaleFont(16),
    fontFamily: Fonts.numbersBold,
  },
});
