import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Fonts } from "@/constants/theme";
import { moderateScale, scaleFont } from "@/utils/responsive";

// Função para formatar telefone
const formatPhone = (text: string): string => {
  // Remove tudo que não é número
  const numbers = text.replace(/\D/g, "");

  // Limita a 11 dígitos
  const limited = numbers.substring(0, 11);

  // Aplica a máscara
  if (limited.length <= 2) {
    return limited;
  } else if (limited.length <= 7) {
    return `(${limited.substring(0, 2)}) ${limited.substring(2)}`;
  } else {
    return `(${limited.substring(0, 2)}) ${limited.substring(2, 7)}-${limited.substring(7)}`;
  }
};

export default function NewClientScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhone(text);
    setPhone(formatted);
  };

  const handleSave = () => {
    // Validação
    if (!name.trim()) {
      Alert.alert("Campo obrigatório", "Por favor, preencha o nome do cliente.");
      return;
    }

    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) {
      Alert.alert(
        "Campo obrigatório",
        "Por favor, preencha um telefone válido com DDD."
      );
      return;
    }

    // Criar novo cliente (mock - aqui você salvaria no banco de dados)
    const newClient = {
      id: String(Date.now()),
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      status: "upToDate",
      overdueAmount: 0,
    };

    console.log("Criando novo cliente:", newClient);

    // Mostrar feedback de sucesso
    Alert.alert(
      "Sucesso!",
      `Cliente ${newClient.name} cadastrado com sucesso!`,
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons
              name="arrow-back"
              size={moderateScale(24)}
              color={Colors.light.textPrimary}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Novo Cliente</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Ionicons
                name="person-add"
                size={moderateScale(48)}
                color={Colors.light.primary}
              />
            </View>
          </View>

          <Text style={styles.title}>Cadastrar Cliente</Text>
          <Text style={styles.subtitle}>
            Preencha os dados do novo cliente
          </Text>

          {/* Form */}
          <View style={styles.form}>
            {/* Nome */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Nome Completo <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Digite o nome completo"
                placeholderTextColor={Colors.light.textSecondary}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            {/* Telefone */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Telefone <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="(00) 00000-0000"
                placeholderTextColor={Colors.light.textSecondary}
                value={phone}
                onChangeText={handlePhoneChange}
                keyboardType="phone-pad"
                maxLength={15}
              />
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email (opcional)</Text>
              <TextInput
                style={styles.input}
                placeholder="email@exemplo.com"
                placeholderTextColor={Colors.light.textSecondary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.7}
        >
          <Ionicons
            name="checkmark-circle"
            size={moderateScale(24)}
            color={Colors.light.surface}
          />
          <Text style={styles.saveButtonText}>Cadastrar Cliente</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(60),
    paddingBottom: moderateScale(16),
    backgroundColor: Colors.light.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  backButton: {
    padding: moderateScale(8),
  },
  headerTitle: {
    fontSize: scaleFont(18),
    fontFamily: Fonts.textBold,
    color: Colors.light.textPrimary,
  },
  headerRight: {
    width: moderateScale(40),
  },
  content: {
    flex: 1,
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(32),
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: moderateScale(24),
  },
  iconCircle: {
    width: moderateScale(120),
    height: moderateScale(120),
    borderRadius: moderateScale(60),
    backgroundColor: Colors.light.primary + "15",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.light.primary + "30",
  },
  title: {
    fontSize: scaleFont(28),
    fontFamily: Fonts.textBold,
    color: Colors.light.textPrimary,
    textAlign: "center",
    marginBottom: moderateScale(8),
  },
  subtitle: {
    fontSize: scaleFont(15),
    fontFamily: Fonts.text,
    color: Colors.light.textSecondary,
    textAlign: "center",
    marginBottom: moderateScale(32),
  },
  form: {
    gap: moderateScale(20),
  },
  inputGroup: {
    gap: moderateScale(8),
  },
  inputLabel: {
    fontSize: scaleFont(14),
    fontFamily: Fonts.textMedium,
    color: Colors.light.textPrimary,
  },
  required: {
    color: Colors.light.error,
  },
  input: {
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(16),
    fontSize: scaleFont(16),
    fontFamily: Fonts.text,
    color: Colors.light.textPrimary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  footer: {
    padding: moderateScale(20),
    paddingBottom: moderateScale(32),
    backgroundColor: Colors.light.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.primary,
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
  saveButtonText: {
    fontSize: scaleFont(16),
    fontFamily: Fonts.textBold,
    color: Colors.light.surface,
  },
});
