import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  TextInputProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Fonts } from "@/constants/theme";
import { moderateScale, scaleFont } from "@/utils/responsive";

interface SearchBarProps extends Omit<TextInputProps, "style"> {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Buscar...",
  ...props
}: SearchBarProps) {
  return (
    <View style={styles.searchContainer}>
      <Ionicons
        name="search"
        size={moderateScale(18)}
        color={Colors.light.textSecondary}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        placeholderTextColor={Colors.light.textSecondary}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText("")} activeOpacity={0.7}>
          <Ionicons
            name="close-circle"
            size={moderateScale(18)}
            color={Colors.light.textSecondary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

// Função utilitária para remover acentos e normalizar texto
export const removeAccents = (text: string): string => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.surface,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: Colors.light.border,
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(12),
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
});
