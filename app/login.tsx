import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Colors, Fonts } from "@/constants/theme";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Aqui você implementará a lógica de login
    // Por enquanto, apenas navega para a home
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        {/* Logo e textos no topo */}
        <View style={styles.header}>
          <Image
            source={require("@/assets/icons/icon-contli.svg")}
            style={styles.logo}
            contentFit="contain"
          />
          <Image
            source={require("@/assets/images/title-contli.svg")}
            style={styles.title}
            contentFit="contain"
          />
          <Image
            source={require("@/assets/images/subtitle-contli.svg")}
            style={styles.subtitle}
            contentFit="contain"
          />
        </View>

        {/* Formulário de login */}
        <View style={styles.form}>
          <Text style={styles.formTitle}>Entrar</Text>
          <Text style={styles.formSubtitle}>Controle simples, contas em dia</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>📧 Seu email</Text>
            <TextInput
              style={styles.input}
              placeholder="seu@email.com"
              placeholderTextColor={Colors.light.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>🔒 Sua Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={Colors.light.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Ainda não tem uma conta? </Text>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Cadastrar a sua loja</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Esqueceu sua senha? Clique aqui</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  title: {
    width: 140,
    height: 40,
    marginBottom: 8,
  },
  subtitle: {
    width: 180,
    height: 20,
  },
  form: {
    flex: 1,
  },
  formTitle: {
    fontSize: 32,
    fontFamily: Fonts.textBold,
    color: Colors.light.textPrimary,
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.text,
    color: Colors.light.textSecondary,
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: Fonts.text,
    color: Colors.light.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.light.surface,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    fontFamily: Fonts.text,
    color: Colors.light.textPrimary,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  loginButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 12,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: Fonts.textBold,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    fontFamily: Fonts.text,
    color: Colors.light.textSecondary,
  },
  footerLink: {
    fontSize: 14,
    fontFamily: Fonts.textBold,
    color: Colors.light.primary,
  },
  forgotPassword: {
    alignItems: "center",
    marginTop: 16,
  },
  forgotPasswordText: {
    fontSize: 13,
    fontFamily: Fonts.text,
    color: Colors.light.primary,
  },
});
