import { InfoCard } from "@/components/info-card";
import { Colors, Fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingsScreen() {
  const router = useRouter();
  const userData = {
    name: "João Silva",
    email: "joao@minhaloja.com",
    storeName: "Loja do João",
  };

  const handleEditProfile = () => {
    // TODO: Navegar para tela de edição de perfil
    Alert.alert("Editar Perfil", "Funcionalidade em desenvolvimento");
  };

  const handleChangePassword = () => {
    // TODO: Navegar para tela de alteração de senha
    Alert.alert("Alterar Senha", "Funcionalidade em desenvolvimento");
  };

  const handleNotifications = () => {
    // TODO: Navegar para configurações de notificações
    Alert.alert(
      "Notificações",
      "Configure quando e como você quer receber notificações",
    );
  };

  const handleSecurity = () => {
    // TODO: Navegar para configurações de segurança
    Alert.alert(
      "Segurança",
      "Configure PIN ou autenticação biométrica (impressão digital/Face ID)",
    );
  };

  const handleBillingSettings = () => {
    // TODO: Navegar para configurações de cobrança
    Alert.alert(
      "Configurações de Cobrança",
      "Defina após quantos dias sem pagamento você quer ser notificado sobre clientes inadimplentes",
    );
  };

  const handleWhatsAppIntegration = () => {
    // TODO: Navegar para integração com WhatsApp
    Alert.alert(
      "Integração WhatsApp",
      "Configure o envio automático de cobranças e lembretes via WhatsApp",
    );
  };

  const handlePlanManagement = () => {
    // TODO: Navegar para gerenciamento de plano
    Alert.alert(
      "Gerenciar Plano",
      "Visualize seu plano atual, faça upgrade ou gerencie sua assinatura",
    );
  };

  const handleHelp = () => {
    // TODO: Navegar para ajuda/FAQ
    Alert.alert(
      "Ajuda",
      "Central de ajuda, tutoriais e FAQ em desenvolvimento",
    );
  };

  const handleTerms = () => {
    // TODO: Mostrar termos de uso e política de privacidade
    Alert.alert(
      "Termos e Privacidade",
      "Visualize nossos termos de uso e política de privacidade",
    );
  };

  const handleLogout = () => {
    Alert.alert(
      "Sair da Conta",
      "Tem certeza que deseja sair?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: () => {
            // TODO: Implementar lógica de logout (limpar AsyncStorage, etc)
            router.replace("/login");
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Header com Avatar */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Ionicons
              name="person"
              size={40}
              color={Colors.light.textSecondary}
            />
          </View>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>
          <View style={styles.storeTag}>
            <Ionicons
              name="storefront-outline"
              size={16}
              color={Colors.light.primary}
            />
            <Text style={styles.storeText}>{userData.storeName}</Text>
          </View>
        </View>

        {/* Seção de Conta */}
        <Text style={styles.sectionTitle}>Conta</Text>

        <InfoCard
          iconSource={require("@/assets/icons/icon-user-name.svg")}
          title="Editar Perfil"
          subtitle="Alterar nome, email e dados da loja"
          onPress={handleEditProfile}
        />

        <View style={styles.cardSpacing} />

        <InfoCard
          iconSource={require("@/assets/icons/icon-password.svg")}
          title="Alterar Senha"
          subtitle="Troque sua senha de acesso"
          onPress={handleChangePassword}
        />

        {/* Seção de Segurança */}
        <Text style={styles.sectionTitle}>Segurança</Text>

        <View style={styles.securityCard}>
          <TouchableOpacity
            style={styles.securityCardContent}
            onPress={handleSecurity}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="shield-checkmark-outline" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitleWhite}>PIN e Biometria</Text>
              <Text style={styles.cardSubtitleWhite}>
                Proteja o app com PIN ou impressão digital
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Seção de Preferências */}
        <Text style={styles.sectionTitle}>Preferências</Text>

        <View style={styles.notificationCard}>
          <TouchableOpacity
            style={styles.notificationCardContent}
            onPress={handleNotifications}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#FFFFFF"
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitleWhite}>Notificações</Text>
              <Text style={styles.cardSubtitleWhite}>
                Configure alertas e lembretes
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.cardSpacing} />

        <InfoCard
          iconSource={require("@/assets/icons/icon-payment.svg")}
          title="Configurações de Cobrança"
          subtitle="Defina dias para alertas de inadimplência"
          onPress={handleBillingSettings}
        />

        {/* Seção de Integrações */}
        <Text style={styles.sectionTitle}>Integrações</Text>

        <View style={styles.whatsappCard}>
          <TouchableOpacity
            style={styles.whatsappCardContent}
            onPress={handleWhatsAppIntegration}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="logo-whatsapp" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitleWhite}>WhatsApp</Text>
              <Text style={styles.cardSubtitleWhite}>
                Envie cobranças e lembretes automáticos
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Seção de Plano */}
        <Text style={styles.sectionTitle}>Plano</Text>

        <InfoCard
          iconSource={require("@/assets/icons/icon-store-name.svg")}
          title="Gerenciar Plano"
          subtitle="Visualize e gerencie sua assinatura"
          onPress={handlePlanManagement}
        />

        {/* Seção de Suporte */}
        <Text style={styles.sectionTitle}>Suporte</Text>

        <View style={styles.helpCard}>
          <TouchableOpacity
            style={styles.helpCardContent}
            onPress={handleHelp}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainerNeutral}>
              <Ionicons
                name="help-circle-outline"
                size={24}
                color={Colors.light.primary}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Ajuda</Text>
              <Text style={styles.cardSubtitle}>
                Central de ajuda e tutoriais
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.light.textSecondary}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.cardSpacing} />

        <View style={styles.helpCard}>
          <TouchableOpacity
            style={styles.helpCardContent}
            onPress={handleTerms}
            activeOpacity={0.7}
          >
            <View style={styles.iconContainerNeutral}>
              <Ionicons
                name="document-text-outline"
                size={24}
                color={Colors.light.primary}
              />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.cardTitle}>Termos e Privacidade</Text>
              <Text style={styles.cardSubtitle}>Leia nossos termos de uso</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.light.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* Botão de Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Ionicons
            name="log-out-outline"
            size={20}
            color={Colors.light.error}
          />
          <Text style={styles.logoutText}>Sair da Conta</Text>
        </TouchableOpacity>

        {/* Versão do app */}
        <Text style={styles.versionText}>Versão 1.0.0</Text>
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
    padding: 24,
    paddingTop: 80,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.light.surface,
    borderWidth: 2,
    borderColor: Colors.light.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontFamily: Fonts.textBold,
    color: Colors.light.textPrimary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: Fonts.text,
    color: Colors.light.textSecondary,
    marginBottom: 12,
  },
  storeTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.surface,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  storeText: {
    fontSize: 14,
    fontFamily: Fonts.textMedium,
    color: Colors.light.primary,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: Fonts.textBold,
    color: Colors.light.textPrimary,
    marginTop: 24,
    marginBottom: 16,
  },
  cardSpacing: {
    height: 12,
  },
  notificationCard: {
    borderRadius: 12,
    backgroundColor: Colors.light.primary,
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Sombra para Android
    elevation: 2,
  },
  notificationCardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  securityCard: {
    borderRadius: 12,
    backgroundColor: "#8B5CF6",
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Sombra para Android
    elevation: 2,
  },
  securityCardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  whatsappCard: {
    borderRadius: 12,
    backgroundColor: "#25D366",
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Sombra para Android
    elevation: 2,
  },
  whatsappCardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  helpCard: {
    borderRadius: 12,
    backgroundColor: Colors.light.surface,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  helpCardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  iconContainerNeutral: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.light.background,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: Fonts.textBold,
    color: Colors.light.textPrimary,
    marginBottom: 2,
  },
  cardTitleWhite: {
    fontSize: 16,
    fontFamily: Fonts.textBold,
    color: "#FFFFFF",
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: Fonts.text,
    color: Colors.light.textSecondary,
  },
  cardSubtitleWhite: {
    fontSize: 14,
    fontFamily: Fonts.text,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.surface,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop: 32,
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: Fonts.textBold,
    color: Colors.light.error,
  },
  versionText: {
    fontSize: 12,
    fontFamily: Fonts.text,
    color: Colors.light.textSecondary,
    textAlign: "center",
    marginTop: 24,
    marginBottom: 16,
  },
});
