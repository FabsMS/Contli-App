import { Input } from "@/components/ui/input";
import { Colors, Fonts } from "@/constants/theme";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo e título Contli */}
        <View style={styles.header}>
          <Image
            source={require("@/assets/icons/icon-contli.svg")}
            style={styles.logo}
            contentFit="contain"
          />
          <Image
            source={require("@/assets/images/title-contli.svg")}
            style={styles.titleImage}
            contentFit="contain"
          />
        </View>

        {/* Formulário de login */}
        <View style={styles.form}>
          <Text style={styles.title}>Entrar</Text>
          <Text style={styles.subtitle}>Controle simples, contas em dia</Text>

          <View style={styles.inputsContainer}>
            <Input
              iconSource={require("@/assets/icons/icon-email.svg")}
              placeholder="Seu email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />

            <View style={styles.inputSpacing} />

            <Input
              iconSource={require("@/assets/icons/icon-password.svg")}
              placeholder="Sua Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Ainda não tem uma conta? </Text>
            <TouchableOpacity>
              <Text style={styles.signupLink}>Cadastrar a sua loja</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Esqueceu a senha - parte inferior */}
        <View style={styles.footer}>
          <Text style={styles.forgotPasswordText}>Esqueceu sua senha? </Text>
          <TouchableOpacity>
            <Text style={styles.forgotPasswordLink}>Clique aqui</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 70,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
    gap: 12,
  },
  logo: {
    width: 60,
    height: 60,
  },
  titleImage: {
    width: 100,
    height: 28,
  },
  form: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontFamily: Fonts.textBold,
    color: Colors.light.textPrimary,
    marginBottom: 4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.text,
    color: Colors.light.textSecondary,
    marginBottom: 32,
    textAlign: "center",
  },
  inputsContainer: {
    marginBottom: 24,
  },
  inputSpacing: {
    height: 16,
  },
  loginButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: Fonts.textBold,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontSize: 14,
    fontFamily: Fonts.text,
    color: Colors.light.textSecondary,
  },
  signupLink: {
    fontSize: 14,
    fontFamily: Fonts.textBold,
    fontWeight: "700",
    color: Colors.light.primary,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    paddingTop: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: Fonts.text,
    color: Colors.light.textSecondary,
  },
  forgotPasswordLink: {
    fontSize: 14,
    fontFamily: Fonts.textBold,
    fontWeight: "700",
    color: Colors.light.primary,
  },
});
