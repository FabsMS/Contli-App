import { Colors, Fonts } from "@/constants/theme";
import { moderateScale, scaleFont } from "@/utils/responsive";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useState, useCallback } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MovimentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ mode?: "debt" | "payment" }>();
  const [display, setDisplay] = useState("");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  // Reset calculator when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      setDisplay("");
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(false);
    }, [])
  );

  const handleNumberPress = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleDecimalPress = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display === "") {
      setDisplay("0.");
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const handleOperationPress = (nextOperation: string) => {
    if (display === "") return;

    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(display);
    } else if (operation) {
      const currentValue = previousValue || "0";
      const newValue = calculate(
        parseFloat(currentValue),
        inputValue,
        operation,
      );
      setDisplay(String(newValue));
      setPreviousValue(String(newValue));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (prev: number, current: number, op: string): number => {
    switch (op) {
      case "+":
        return prev + current;
      case "-":
        return prev - current;
      case "×":
        return prev * current;
      case "÷":
        return current !== 0 ? prev / current : 0;
      default:
        return current;
    }
  };

  const handleEquals = () => {
    if (display === "" || previousValue === null || !operation) return;

    const inputValue = parseFloat(display);
    const currentValue = parseFloat(previousValue);
    const newValue = calculate(currentValue, inputValue, operation);
    setDisplay(String(newValue));
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  };

  const handleClear = () => {
    setDisplay("");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const handleBackspace = () => {
    if (!waitingForOperand && display.length > 0) {
      setDisplay(display.slice(0, -1));
    }
  };

  const formatDisplayValue = () => {
    if (display === "") return "";

    const value = parseFloat(display);
    if (isNaN(value)) return "";

    // Se está digitando (não é resultado de operação)
    if (!waitingForOperand) {
      // Se tem ponto decimal, mostrar com os decimais que o usuário digitou
      if (display.indexOf(".") !== -1) {
        return display.replace(".", ",");
      }
      // Sem ponto decimal, mostrar número inteiro sem centavos
      return value.toString();
    }

    // É resultado de operação, formatar com 2 casas decimais
    return value.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const renderButton = (
    label: string,
    onPress: () => void,
    variant: "number" | "operation" | "special" | "equals" = "number",
    icon?: keyof typeof Ionicons.glyphMap,
  ) => {
    return (
      <TouchableOpacity
        style={[
          styles.button,
          variant === "operation" && styles.buttonOperation,
          variant === "special" && styles.buttonSpecial,
          variant === "equals" && styles.buttonEquals,
        ]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {icon ? (
          <Ionicons
            name={icon}
            size={moderateScale(24)}
            color={
              variant === "operation" || variant === "equals"
                ? Colors.light.surface
                : Colors.light.textPrimary
            }
          />
        ) : (
          <Text
            style={[
              styles.buttonText,
              variant === "operation" && styles.buttonTextOperation,
              variant === "special" && styles.buttonTextSpecial,
              variant === "equals" && styles.buttonTextEquals,
            ]}
          >
            {label}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  const handleAddDebt = () => {
    if (display === "" || parseFloat(display) === 0) {
      Alert.alert(
        "Valor inválido",
        "Por favor, digite um valor antes de adicionar uma conta.",
      );
      return;
    }

    const value = parseFloat(display);
    router.push({
      pathname: "/select-client",
      params: {
        value: value.toFixed(2),
        type: "debt",
      },
    });
  };

  const handleAddPayment = () => {
    if (display === "" || parseFloat(display) === 0) {
      Alert.alert(
        "Valor inválido",
        "Por favor, digite um valor antes de registrar um pagamento.",
      );
      return;
    }

    const value = parseFloat(display);
    router.push({
      pathname: "/select-client",
      params: {
        value: value.toFixed(2),
        type: "payment",
      },
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.content}>
        {/* Display */}
        <View style={styles.displayContainer}>
          <View style={styles.displayWrapper}>
            {operation && previousValue && (
              <Text style={styles.operationText}>
                {parseFloat(previousValue).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                {operation}
              </Text>
            )}
            <Text
              style={styles.displayText}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              R$ {formatDisplayValue()}
            </Text>
          </View>
        </View>

        {/* Calculator */}
        <View style={styles.calculatorContainer}>
          {/* Row 1 - Special operations */}
          <View style={styles.buttonRow}>
            {renderButton("C", handleClear, "special")}
            {renderButton("", handleBackspace, "special", "backspace-outline")}
            {renderButton("÷", () => handleOperationPress("÷"), "operation")}
            {renderButton("×", () => handleOperationPress("×"), "operation")}
          </View>

          {/* Row 2 */}
          <View style={styles.buttonRow}>
            {renderButton("7", () => handleNumberPress("7"))}
            {renderButton("8", () => handleNumberPress("8"))}
            {renderButton("9", () => handleNumberPress("9"))}
            {renderButton("-", () => handleOperationPress("-"), "operation")}
          </View>

          {/* Row 3 */}
          <View style={styles.buttonRow}>
            {renderButton("4", () => handleNumberPress("4"))}
            {renderButton("5", () => handleNumberPress("5"))}
            {renderButton("6", () => handleNumberPress("6"))}
            {renderButton("+", () => handleOperationPress("+"), "operation")}
          </View>

          {/* Row 4 */}
          <View style={styles.buttonRow}>
            {renderButton("1", () => handleNumberPress("1"))}
            {renderButton("2", () => handleNumberPress("2"))}
            {renderButton("3", () => handleNumberPress("3"))}
            {renderButton("=", handleEquals, "equals")}
          </View>

          {/* Row 5 */}
          <View style={styles.buttonRow}>
            {renderButton("0", () => handleNumberPress("0"))}
            {renderButton("00", () => handleNumberPress("00"))}
            {renderButton(",", handleDecimalPress)}
            {renderButton("=", handleEquals, "equals")}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          {(!params.mode || params.mode === "debt") && (
            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonPrimary]}
              activeOpacity={0.7}
              onPress={handleAddDebt}
            >
              <Ionicons
                name="add-circle-outline"
                size={moderateScale(24)}
                color={Colors.light.surface}
              />
              <Text style={styles.actionButtonText}>Adicionar Conta</Text>
            </TouchableOpacity>
          )}

          {(!params.mode || params.mode === "payment") && (
            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonSecondary]}
              activeOpacity={0.7}
              onPress={handleAddPayment}
            >
              <Ionicons
                name="arrow-down-circle-outline"
                size={moderateScale(24)}
                color={Colors.light.surface}
              />
              <Text style={styles.actionButtonText}>Registrar Pagamento</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(60),
    paddingBottom: moderateScale(100), // Extra space for navbar
  },
  displayContainer: {
    backgroundColor: Colors.light.surface,
    borderRadius: moderateScale(16),
    borderWidth: 1,
    borderColor: Colors.light.border,
    padding: moderateScale(24),
    marginBottom: moderateScale(20),
    minHeight: moderateScale(120),
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  displayWrapper: {
    alignItems: "flex-end",
  },
  operationText: {
    fontSize: scaleFont(16),
    fontFamily: Fonts.numbers,
    color: Colors.light.textSecondary,
    marginBottom: moderateScale(8),
  },
  displayText: {
    fontSize: scaleFont(48),
    fontFamily: Fonts.numbersBold,
    color: Colors.light.textPrimary,
    minHeight: scaleFont(48),
  },
  calculatorContainer: {
    backgroundColor: Colors.light.surface,
    borderRadius: moderateScale(16),
    borderWidth: 1,
    borderColor: Colors.light.border,
    padding: moderateScale(16),
    marginBottom: moderateScale(20),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  buttonRow: {
    flexDirection: "row",
    marginBottom: moderateScale(12),
    gap: moderateScale(12),
  },
  button: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: Colors.light.background,
    borderRadius: moderateScale(12),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  buttonOperation: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  buttonSpecial: {
    backgroundColor: Colors.light.background,
    borderColor: Colors.light.border,
  },
  buttonEquals: {
    backgroundColor: Colors.light.secondary,
    borderColor: Colors.light.secondary,
  },
  buttonText: {
    fontSize: scaleFont(24),
    fontFamily: Fonts.numbersBold,
    color: Colors.light.textPrimary,
  },
  buttonTextOperation: {
    color: Colors.light.surface,
  },
  buttonTextSpecial: {
    color: Colors.light.textPrimary,
  },
  buttonTextEquals: {
    color: Colors.light.surface,
    fontSize: scaleFont(28),
  },
  actionButtonsContainer: {
    gap: moderateScale(12),
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: moderateScale(16),
    paddingHorizontal: moderateScale(24),
    borderRadius: moderateScale(12),
    gap: moderateScale(8),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionButtonPrimary: {
    backgroundColor: Colors.light.primary,
  },
  actionButtonSecondary: {
    backgroundColor: Colors.light.secondary,
  },
  actionButtonText: {
    fontSize: scaleFont(16),
    fontFamily: Fonts.textMedium,
    color: Colors.light.surface,
  },
});
