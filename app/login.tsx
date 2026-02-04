import { Input } from "@/components/ui/input";
import { Colors, Fonts } from "@/constants/theme";
import { moderateScale, scaleFont } from "@/utils/responsive";
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

  const handleGoToSignup = () => {
    router.push("/signup");
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
            <TouchableOpacity onPress={handleGoToSignup}>
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
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(60),
    paddingBottom: moderateScale(30),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: moderateScale(90),
    gap: moderateScale(10),
  },
  logo: {
    width: moderateScale(55),
    height: moderateScale(55),
  },
  titleImage: {
    width: moderateScale(90),
    height: moderateScale(25),
  },
  form: {
    flex: 1,
  },
  title: {
    fontSize: scaleFont(32),
    fontFamily: Fonts.textBold,
    color: Colors.light.textPrimary,
    marginBottom: moderateScale(4),
    textAlign: "center",
  },
  subtitle: {
    fontSize: scaleFont(16),
    fontFamily: Fonts.text,
    color: Colors.light.textSecondary,
    marginBottom: moderateScale(28),
    textAlign: "center",
  },
  inputsContainer: {
    marginBottom: moderateScale(20),
  },
  inputSpacing: {
    height: moderateScale(14),
  },
  loginButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: moderateScale(18),
    paddingVertical: moderateScale(14),
    alignItems: "center",
    marginBottom: moderateScale(18),
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
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(16),
    fontFamily: Fonts.textBold,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: moderateScale(2),
  },
  signupText: {
    fontSize: scaleFont(14),
    fontFamily: Fonts.text,
    color: Colors.light.textSecondary,
  },
  signupLink: {
    fontSize: scaleFont(14),
    fontFamily: Fonts.textBold,
    fontWeight: "700",
    color: Colors.light.primary,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    paddingTop: moderateScale(20),
  },
  forgotPasswordText: {
    fontSize: scaleFont(14),
    fontFamily: Fonts.text,
    color: Colors.light.textSecondary,
  },
  forgotPasswordLink: {
    fontSize: scaleFont(14),
    fontFamily: Fonts.textBold,
    fontWeight: "700",
    color: Colors.light.primary,
  },
});
