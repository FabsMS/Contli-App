import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Fonts } from "@/constants/theme";
import { moderateScale, scaleFont } from "@/utils/responsive";
import { SearchBar, removeAccents } from "@/components/search-bar";

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

// Mock data - mesmos clientes da tela de clientes
const MOCK_CLIENTS = [
  {
    id: "1",
    name: "João Silva",
    phone: "(11) 98765-4321",
    email: "joao.silva@email.com",
    status: "overdue" as const,
    overdueAmount: 150.0,
  },
  {
    id: "2",
    name: "Maria Santos",
    phone: "(11) 91234-5678",
    email: "maria.santos@email.com",
    status: "upToDate" as const,
    overdueAmount: 0,
  },
  {
    id: "3",
    name: "Pedro Costa",
    phone: "(11) 99876-5432",
    email: "pedro.costa@email.com",
    status: "overdue" as const,
    overdueAmount: 320.5,
  },
  {
    id: "4",
    name: "Ana Oliveira",
    phone: "(11) 97654-3210",
    email: "ana.oliveira@email.com",
    status: "upToDate" as const,
    overdueAmount: 0,
  },
  {
    id: "5",
    name: "Carlos Ferreira",
    phone: "(11) 96543-2109",
    email: "carlos.ferreira@email.com",
    status: "overdue" as const,
    overdueAmount: 89.9,
  },
];

interface ClientData {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: "upToDate" | "overdue";
  overdueAmount: number;
}

export default function SelectClientScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ value: string; type: "debt" | "payment" }>();
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // New client form states
  const [newClientModalVisible, setNewClientModalVisible] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");

  const value = parseFloat(params.value || "0");
  const isDebt = params.type === "debt";

  // Filtrar clientes baseado na pesquisa
  const filteredClients = MOCK_CLIENTS.filter((client) =>
    removeAccents(client.name).includes(removeAccents(searchQuery))
  );

  const handleSelectClient = (client: ClientData) => {
    setSelectedClient(client);
    setModalVisible(true);
  };

  const handleConfirm = () => {
    if (!selectedClient) return;

    // Aqui você salvaria a transação no banco de dados/storage
    console.log("Salvando transação:", {
      clientId: selectedClient.id,
      clientName: selectedClient.name,
      value,
      type: params.type,
      date: new Date().toISOString(),
    });

    setModalVisible(false);

    // Mostrar feedback de sucesso
    Alert.alert(
      "Sucesso!",
      isDebt
        ? `Conta de R$ ${value.toFixed(2)} adicionada para ${selectedClient.name}`
        : `Pagamento de R$ ${value.toFixed(2)} registrado para ${selectedClient.name}`,
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]
    );
  };

  const handleCancel = () => {
    setModalVisible(false);
    setSelectedClient(null);
  };

  const handleOpenNewClientModal = () => {
    setNewClientModalVisible(true);
  };

  const handleCancelNewClient = () => {
    setNewClientModalVisible(false);
    setNewClientName("");
    setNewClientPhone("");
    setNewClientEmail("");
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhone(text);
    setNewClientPhone(formatted);
  };

  const handleCreateClient = () => {
    // Validação
    if (!newClientName.trim()) {
      Alert.alert("Campo obrigatório", "Por favor, preencha o nome do cliente.");
      return;
    }

    if (!newClientPhone.trim() || newClientPhone.replace(/\D/g, "").length < 10) {
      Alert.alert(
        "Campo obrigatório",
        "Por favor, preencha um telefone válido com DDD."
      );
      return;
    }

    // Criar novo cliente (mock - aqui você salvaria no banco de dados)
    const newClient: ClientData = {
      id: String(Date.now()),
      name: newClientName.trim(),
      phone: newClientPhone.trim(),
      email: newClientEmail.trim(),
      status: "upToDate",
      overdueAmount: 0,
    };

    console.log("Criando novo cliente:", newClient);

    // Criar transação para o novo cliente
    console.log("Salvando transação:", {
      clientId: newClient.id,
      clientName: newClient.name,
      value,
      type: params.type,
      date: new Date().toISOString(),
    });

    // Limpar formulário
    handleCancelNewClient();

    // Mostrar feedback de sucesso
    Alert.alert(
      "Sucesso!",
      `Cliente ${newClient.name} cadastrado e ${
        isDebt ? "conta adicionada" : "pagamento registrado"
      } com sucesso!`,
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]
    );
  };

  const renderClientItem = ({ item }: { item: ClientData }) => (
    <TouchableOpacity
      style={styles.clientItem}
      onPress={() => handleSelectClient(item)}
      activeOpacity={0.7}
    >
      <View style={styles.clientInfo}>
        <Text style={styles.clientName}>{item.name}</Text>
        <Text style={styles.clientPhone}>{item.phone}</Text>
      </View>
      <View style={styles.clientStatus}>
        {item.status === "overdue" && (
          <Text style={styles.overdueAmount}>
            Deve: R$ {item.overdueAmount.toFixed(2).replace(".", ",")}
          </Text>
        )}
        <Ionicons
          name="chevron-forward"
          size={moderateScale(20)}
          color={Colors.light.textSecondary}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons
            name="arrow-back"
            size={moderateScale(24)}
            color={Colors.light.textPrimary}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Selecionar Cliente</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Value Display */}
      <View style={styles.valueContainer}>
        <Text style={styles.valueLabel}>
          {isDebt ? "Adicionar conta de:" : "Registrar pagamento de:"}
        </Text>
        <Text style={styles.valueText}>
          R$ {value.toFixed(2).replace(".", ",")}
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Buscar cliente..."
        />
      </View>

      {/* Client List */}
      <FlatList
        data={filteredClients}
        renderItem={renderClientItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          isDebt
            ? () => (
                <TouchableOpacity
                  style={styles.newClientButton}
                  onPress={handleOpenNewClientModal}
                  activeOpacity={0.7}
                >
                  <View style={styles.newClientIconContainer}>
                    <Ionicons
                      name="person-add"
                      size={moderateScale(24)}
                      color={Colors.light.primary}
                    />
                  </View>
                  <View style={styles.clientInfo}>
                    <Text style={styles.newClientText}>Novo Cliente</Text>
                    <Text style={styles.newClientSubtext}>
                      Cadastrar e adicionar transação
                    </Text>
                  </View>
                  <Ionicons
                    name="chevron-forward"
                    size={moderateScale(20)}
                    color={Colors.light.textSecondary}
                  />
                </TouchableOpacity>
              )
            : null
        }
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />

      {/* Confirmation Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons
              name={isDebt ? "add-circle" : "arrow-down-circle"}
              size={moderateScale(64)}
              color={isDebt ? Colors.light.primary : Colors.light.secondary}
              style={styles.modalIcon}
            />
            <Text style={styles.modalTitle}>Confirmar {isDebt ? "Conta" : "Pagamento"}</Text>
            <Text style={styles.modalMessage}>
              {isDebt ? "Adicionar conta de" : "Registrar pagamento de"}{" "}
              <Text style={styles.modalValue}>
                R$ {value.toFixed(2).replace(".", ",")}
              </Text>{" "}
              para{" "}
              <Text style={styles.modalClientName}>{selectedClient?.name}</Text>?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={handleCancel}
                activeOpacity={0.7}
              >
                <Text style={styles.modalButtonTextCancel}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  styles.modalButtonConfirm,
                  isDebt ? styles.modalButtonPrimary : styles.modalButtonSecondary,
                ]}
                onPress={handleConfirm}
                activeOpacity={0.7}
              >
                <Text style={styles.modalButtonTextConfirm}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* New Client Modal */}
      <Modal
        visible={newClientModalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCancelNewClient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoid}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContentLarge}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Novo Cliente</Text>
                <TouchableOpacity onPress={handleCancelNewClient}>
                  <Ionicons
                    name="close"
                    size={moderateScale(24)}
                    color={Colors.light.textPrimary}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.formContainer}>
                {/* Nome */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>
                    Nome <Text style={styles.required}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Digite o nome completo"
                    placeholderTextColor={Colors.light.textSecondary}
                    value={newClientName}
                    onChangeText={setNewClientName}
                    autoFocus
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
                    value={newClientPhone}
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
                    value={newClientEmail}
                    onChangeText={setNewClientEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                {/* Info sobre a transação */}
                <View style={styles.transactionInfo}>
                  <Ionicons
                    name="information-circle"
                    size={moderateScale(20)}
                    color={Colors.light.primary}
                  />
                  <Text style={styles.transactionInfoText}>
                    Após criar o cliente, a {isDebt ? "conta" : "pagamento"} de{" "}
                    <Text style={styles.bold}>
                      R$ {value.toFixed(2).replace(".", ",")}
                    </Text>{" "}
                    será automaticamente registrada.
                  </Text>
                </View>
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonCancel]}
                  onPress={handleCancelNewClient}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalButtonTextCancel}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    styles.modalButtonConfirm,
                    isDebt ? styles.modalButtonPrimary : styles.modalButtonSecondary,
                  ]}
                  onPress={handleCreateClient}
                  activeOpacity={0.7}
                >
                  <Text style={styles.modalButtonTextConfirm}>
                    Criar e Confirmar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
  valueContainer: {
    backgroundColor: Colors.light.surface,
    padding: moderateScale(20),
    marginHorizontal: moderateScale(20),
    marginTop: moderateScale(20),
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: Colors.light.border,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  valueLabel: {
    fontSize: scaleFont(14),
    fontFamily: Fonts.text,
    color: Colors.light.textSecondary,
    marginBottom: moderateScale(8),
  },
  valueText: {
    fontSize: scaleFont(32),
    fontFamily: Fonts.numbersBold,
    color: Colors.light.textPrimary,
  },
  searchWrapper: {
    paddingHorizontal: moderateScale(20),
    marginTop: moderateScale(16),
    marginBottom: moderateScale(8),
  },
  listContent: {
    paddingHorizontal: moderateScale(20),
    paddingTop: moderateScale(20),
    paddingBottom: moderateScale(20),
  },
  clientItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.light.surface,
    padding: moderateScale(16),
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  separator: {
    height: moderateScale(12),
  },
  newClientButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.light.primary + "10",
    padding: moderateScale(16),
    borderRadius: moderateScale(12),
    borderWidth: 2,
    borderColor: Colors.light.primary,
    borderStyle: "dashed",
    marginBottom: moderateScale(12),
  },
  newClientIconContainer: {
    width: moderateScale(48),
    height: moderateScale(48),
    borderRadius: moderateScale(24),
    backgroundColor: Colors.light.surface,
    alignItems: "center",
    justifyContent: "center",
    marginRight: moderateScale(12),
  },
  newClientText: {
    fontSize: scaleFont(16),
    fontFamily: Fonts.textBold,
    color: Colors.light.primary,
    marginBottom: moderateScale(2),
  },
  newClientSubtext: {
    fontSize: scaleFont(13),
    fontFamily: Fonts.text,
    color: Colors.light.textSecondary,
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: scaleFont(16),
    fontFamily: Fonts.textMedium,
    color: Colors.light.textPrimary,
    marginBottom: moderateScale(4),
  },
  clientPhone: {
    fontSize: scaleFont(14),
    fontFamily: Fonts.text,
    color: Colors.light.textSecondary,
  },
  clientStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(8),
  },
  overdueAmount: {
    fontSize: scaleFont(14),
    fontFamily: Fonts.numbersBold,
    color: Colors.light.error,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: moderateScale(20),
  },
  modalContent: {
    backgroundColor: Colors.light.surface,
    borderRadius: moderateScale(16),
    padding: moderateScale(24),
    width: "100%",
    maxWidth: moderateScale(400),
    alignItems: "center",
  },
  modalIcon: {
    marginBottom: moderateScale(16),
  },
  modalTitle: {
    fontSize: scaleFont(22),
    fontFamily: Fonts.textBold,
    color: Colors.light.textPrimary,
    marginBottom: moderateScale(12),
  },
  modalMessage: {
    fontSize: scaleFont(16),
    fontFamily: Fonts.text,
    color: Colors.light.textSecondary,
    textAlign: "center",
    lineHeight: scaleFont(24),
    marginBottom: moderateScale(24),
  },
  modalValue: {
    fontFamily: Fonts.numbersBold,
    color: Colors.light.textPrimary,
  },
  modalClientName: {
    fontFamily: Fonts.textBold,
    color: Colors.light.textPrimary,
  },
  modalButtons: {
    flexDirection: "row",
    gap: moderateScale(12),
    width: "100%",
  },
  modalButton: {
    flex: 1,
    paddingVertical: moderateScale(14),
    borderRadius: moderateScale(12),
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtonCancel: {
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  modalButtonConfirm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modalButtonPrimary: {
    backgroundColor: Colors.light.primary,
  },
  modalButtonSecondary: {
    backgroundColor: Colors.light.secondary,
  },
  modalButtonTextCancel: {
    fontSize: scaleFont(16),
    fontFamily: Fonts.textMedium,
    color: Colors.light.textPrimary,
  },
  modalButtonTextConfirm: {
    fontSize: scaleFont(16),
    fontFamily: Fonts.textMedium,
    color: Colors.light.surface,
  },
  keyboardAvoid: {
    flex: 1,
  },
  modalContentLarge: {
    backgroundColor: Colors.light.surface,
    borderRadius: moderateScale(16),
    padding: moderateScale(24),
    width: "100%",
    maxWidth: moderateScale(500),
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: moderateScale(24),
  },
  formContainer: {
    marginBottom: moderateScale(24),
  },
  inputGroup: {
    marginBottom: moderateScale(16),
  },
  inputLabel: {
    fontSize: scaleFont(14),
    fontFamily: Fonts.textMedium,
    color: Colors.light.textPrimary,
    marginBottom: moderateScale(8),
  },
  required: {
    color: Colors.light.error,
  },
  input: {
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: moderateScale(12),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(14),
    fontSize: scaleFont(15),
    fontFamily: Fonts.text,
    color: Colors.light.textPrimary,
  },
  transactionInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: Colors.light.primary + "10",
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    gap: moderateScale(8),
    marginTop: moderateScale(8),
  },
  transactionInfoText: {
    flex: 1,
    fontSize: scaleFont(13),
    fontFamily: Fonts.text,
    color: Colors.light.textSecondary,
    lineHeight: scaleFont(18),
  },
  bold: {
    fontFamily: Fonts.textBold,
    color: Colors.light.textPrimary,
  },
});
