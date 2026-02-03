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
import { scaleFont, moderateScale } from "@/utils/responsive";

export default function SignupScreen() {
  const router = useRouter();
  const [storeName, setStoreName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    // Aqui você implementará a lógica de cadastro
    // Por enquanto, apenas navega para a home
    router.replace("/(tabs)");
  };

  const handleGoToLogin = () => {
    router.push("/login");
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

        {/* Formulário de cadastro */}
        <View style={styles.form}>
          <Text style={styles.title}>Cadastrar sua Loja</Text>
          <Text style={styles.subtitle}>Controle simples, contas em dia</Text>

          <View style={styles.inputsContainer}>
            <Input
              iconSource={require("@/assets/icons/icon-store-name.svg")}
              placeholder="Nome da Loja"
              value={storeName}
              onChangeText={setStoreName}
              autoCapitalize="words"
            />

            <View style={styles.inputSpacing} />

            <Input
              iconSource={require("@/assets/icons/icon-user-name.svg")}
              placeholder="Seu nome"
              value={userName}
              onChangeText={setUserName}
              autoCapitalize="words"
            />

            <View style={styles.inputSpacing} />

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
              placeholder="Crie sua senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
            />

            <View style={styles.inputSpacing} />

            <Input
              iconSource={require("@/assets/icons/icon-password.svg")}
              placeholder="Repita a sua senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoComplete="password"
            />
          </View>

          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupButtonText}>Cadastrar</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Já tem uma conta? </Text>
            <TouchableOpacity onPress={handleGoToLogin}>
              <Text style={styles.loginLink}>Entrar</Text>
            </TouchableOpacity>
          </View>
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
    paddingTop: moderateScale(50),
    paddingBottom: moderateScale(30),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: moderateScale(50),
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
  signupButton: {
    backgroundColor: Colors.light.secondary,
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
  signupButtonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(16),
    fontFamily: Fonts.textBold,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontSize: scaleFont(14),
    fontFamily: Fonts.text,
    color: Colors.light.textSecondary,
  },
  loginLink: {
    fontSize: scaleFont(14),
    fontFamily: Fonts.textBold,
    fontWeight: "700",
    color: Colors.light.primary,
  },
});
