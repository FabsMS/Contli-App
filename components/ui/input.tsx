import { Colors, Fonts } from "@/constants/theme";
import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { scaleFont, moderateScale } from "@/utils/responsive";

interface InputProps extends TextInputProps {
  iconSource: any;
  placeholder: string;
}

export function Input({ iconSource, placeholder, ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, isFocused && styles.containerFocused]}>
      <Image source={iconSource} style={styles.icon} contentFit="contain" />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.light.textSecondary}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.surface,
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: Colors.light.border,
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(12),
  },
  containerFocused: {
    borderColor: Colors.light.primary,
  },
  icon: {
    width: moderateScale(18),
    height: moderateScale(18),
    marginRight: moderateScale(10),
  },
  input: {
    flex: 1,
    fontSize: scaleFont(15),
    fontFamily: Fonts.text,
    color: Colors.light.textPrimary,
  },
});
