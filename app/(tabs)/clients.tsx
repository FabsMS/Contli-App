import React, { useState, useMemo, useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { Colors, Fonts } from "@/constants/theme";
import { ClientListItem, ClientData } from "@/components/client-list-item";
import { scaleFont, moderateScale } from "@/utils/responsive";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

// Função para remover acentos e normalizar texto
const removeAccents = (text: string): string => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

// Dados mockados para demonstração
const MOCK_CLIENTS: ClientData[] = [
  {
    id: "1",
    name: "João Silva",
    phone: "(11) 98765-4321",
    email: "joao@email.com",
    status: "overdue",
    overdueAmount: 250.0,
  },
  {
    id: "2",
    name: "Maria Santos",
    phone: "(11) 91234-5678",
    email: "maria@email.com",
    status: "up_to_date",
  },
  {
    id: "3",
    name: "Pedro Oliveira",
    phone: "(11) 99876-5432",
    email: "pedro@email.com",
    status: "overdue",
    overdueAmount: 500.0,
  },
  {
    id: "4",
    name: "Ana Costa",
    phone: "(11) 94567-8901",
    email: "ana@email.com",
    status: "up_to_date",
  },
  {
    id: "5",
    name: "Carlos Pereira",
    phone: "(11) 93456-7890",
    email: "carlos@email.com",
    status: "overdue",
    overdueAmount: 150.0,
  },
  {
    id: "6",
    name: "Juliana Souza",
    phone: "(11) 92345-6789",
    email: "juliana@email.com",
    status: "up_to_date",
  },
  {
    id: "7",
    name: "Roberto Lima",
    phone: "(11) 91234-5670",
    email: "roberto@email.com",
    status: "overdue",
    overdueAmount: 1200.5,
  },
  {
    id: "8",
    name: "Fernanda Alves",
    phone: "(11) 98765-4320",
    email: "fernanda@email.com",
    status: "up_to_date",
  },
];

export default function ClientsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = MOCK_CLIENTS.filter((client) =>
    removeAccents(client.name).includes(removeAccents(searchQuery))
  );

  const overdueClients = filteredClients.filter((c) => c.status === "overdue");
  const upToDateClients = filteredClients.filter(
    (c) => c.status === "up_to_date"
  );

  const totalOverdue = overdueClients.reduce(
    (sum, client) => sum + (client.overdueAmount || 0),
    0
  );

  const handleClientPress = useCallback((client: ClientData) => {
    router.push({
      pathname: "/client-details",
      params: {
        id: client.id,
        name: client.name,
        phone: client.phone || "",
        email: client.email || "",
        status: client.status,
        overdueAmount: client.overdueAmount?.toString() || "0",
      },
    });
  }, [router]);

  const renderHeader = useMemo(
    () => (
      <View style={styles.header}>
        {/* Search Input */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={moderateScale(18)}
            color={Colors.light.textSecondary}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar cliente..."
            placeholderTextColor={Colors.light.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons
                name="close-circle"
                size={moderateScale(18)}
                color={Colors.light.textSecondary}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total de Clientes</Text>
            <Text style={styles.summaryValue}>{filteredClients.length}</Text>
          </View>
          <View style={styles.summaryCardDivider} />
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Clientes Devendo</Text>
            <Text style={[styles.summaryValue, { color: Colors.light.error }]}>
              {overdueClients.length}
            </Text>
          </View>
          <View style={styles.summaryCardDivider} />
          <View style={styles.summaryCard}>
            <Text style={styles.summaryLabel}>Total em Aberto</Text>
            <Text style={[styles.summaryValue, { color: Colors.light.error }]}>
              R$ {totalOverdue.toFixed(2).replace(".", ",")}
            </Text>
          </View>
        </View>

        {/* Section Title */}
        {overdueClients.length > 0 && (
          <Text style={styles.sectionTitle}>Clientes Devendo</Text>
        )}
      </View>
    ),
    [searchQuery, filteredClients.length, overdueClients.length, totalOverdue]
  );

  const renderItem = useCallback(
    ({ item }: { item: ClientData }) => (
      <ClientListItem client={item} onPress={() => handleClientPress(item)} />
    ),
    [handleClientPress]
  );

  const renderSectionSeparator = () => {
    if (overdueClients.length > 0 && upToDateClients.length > 0) {
      return <Text style={styles.sectionTitle}>Clientes em Dia</Text>;
    }
    return null;
  };

  const renderEmptyState = useMemo(
    () => (
      <View style={styles.emptyContainer}>
        <Ionicons
          name="people-outline"
          size={moderateScale(64)}
          color={Colors.light.textSecondary}
        />
        <Text style={styles.emptyTitle}>Nenhum cliente encontrado</Text>
        <Text style={styles.emptySubtitle}>
          {searchQuery
            ? "Tente buscar com outro nome"
            : "Comece adicionando seu primeiro cliente"}
        </Text>
      </View>
    ),
    [searchQuery]
  );

  // Combina clientes devendo primeiro, depois os em dia
  const sortedClients = [...overdueClients, ...upToDateClients];

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedClients}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  listContent: {
    padding: moderateScale(20),
    paddingTop: moderateScale(50),
    flexGrow: 1,
  },
  header: {
    marginBottom: moderateScale(20),
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.surface,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: Colors.light.border,
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(12),
    marginBottom: moderateScale(16),
  },
  searchIcon: {
    marginRight: moderateScale(10),
  },
  searchInput: {
    flex: 1,
    fontSize: scaleFont(15),
    fontFamily: Fonts.text,
    color: Colors.light.textPrimary,
  },
  summaryContainer: {
    flexDirection: "row",
    backgroundColor: Colors.light.surface,
    borderRadius: moderateScale(14),
    padding: moderateScale(16),
    marginBottom: moderateScale(20),
    borderWidth: 1,
    borderColor: Colors.light.border,
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
  summaryCard: {
    flex: 1,
    alignItems: "center",
  },
  summaryCardDivider: {
    width: 1,
    backgroundColor: Colors.light.border,
    marginHorizontal: moderateScale(12),
  },
  summaryLabel: {
    fontSize: scaleFont(11),
    fontFamily: Fonts.text,
    color: Colors.light.textSecondary,
    marginBottom: moderateScale(4),
    textAlign: "center",
  },
  summaryValue: {
    fontSize: scaleFont(18),
    fontFamily: Fonts.numbersBold,
    color: Colors.light.textPrimary,
  },
  sectionTitle: {
    fontSize: scaleFont(16),
    fontFamily: Fonts.textBold,
    color: Colors.light.textPrimary,
    marginTop: moderateScale(8),
    marginBottom: moderateScale(12),
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: moderateScale(60),
  },
  emptyTitle: {
    fontSize: scaleFont(18),
    fontFamily: Fonts.textBold,
    color: Colors.light.textPrimary,
    marginTop: moderateScale(16),
    marginBottom: moderateScale(4),
  },
  emptySubtitle: {
    fontSize: scaleFont(14),
    fontFamily: Fonts.text,
    color: Colors.light.textSecondary,
    textAlign: "center",
  },
});
