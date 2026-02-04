import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, Fonts } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { scaleFont, moderateScale } from "@/utils/responsive";

export interface ClientData {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  status: "up_to_date" | "overdue";
  overdueAmount?: number;
}

interface ClientListItemProps {
  client: ClientData;
  onPress: () => void;
}

export function ClientListItem({ client, onPress }: ClientListItemProps) {
  const isOverdue = client.status === "overdue";

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.leftContent}>
          <Text style={styles.name}>{client.name}</Text>
          {client.phone && (
            <Text style={styles.info}>{client.phone}</Text>
          )}
        </View>

        <View style={styles.rightContent}>
          {isOverdue ? (
            <View style={styles.overdueContainer}>
              <Text style={styles.overdueAmount}>
                R$ {client.overdueAmount?.toFixed(2).replace(".", ",")}
              </Text>
              <View style={styles.overdueBadge}>
                <Text style={styles.overdueBadgeText}>Devendo</Text>
              </View>
            </View>
          ) : (
            <View style={styles.upToDateBadge}>
              <Ionicons
                name="checkmark-circle"
                size={moderateScale(18)}
                color={Colors.light.secondary}
              />
              <Text style={styles.upToDateText}>Em dia</Text>
            </View>
          )}
        </View>
      </View>

      <Ionicons
        name="chevron-forward"
        size={moderateScale(18)}
        color={Colors.light.textSecondary}
        style={styles.chevron}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.surface,
    borderRadius: moderateScale(12),
    padding: moderateScale(14),
    borderWidth: 1,
    borderColor: Colors.light.border,
    marginBottom: moderateScale(10),
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftContent: {
    flex: 1,
  },
  rightContent: {
    alignItems: "flex-end",
    marginRight: moderateScale(8),
  },
  name: {
    fontSize: scaleFont(16),
    fontFamily: Fonts.textBold,
    color: Colors.light.textPrimary,
    marginBottom: moderateScale(2),
  },
  info: {
    fontSize: scaleFont(13),
    fontFamily: Fonts.text,
    color: Colors.light.textSecondary,
  },
  overdueContainer: {
    alignItems: "flex-end",
  },
  overdueAmount: {
    fontSize: scaleFont(16),
    fontFamily: Fonts.numbersBold,
    color: Colors.light.error,
    marginBottom: moderateScale(4),
  },
  overdueBadge: {
    backgroundColor: Colors.light.error,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(8),
  },
  overdueBadgeText: {
    fontSize: scaleFont(11),
    fontFamily: Fonts.textBold,
    color: "#FFFFFF",
  },
  upToDateBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(4),
    backgroundColor: `${Colors.light.secondary}15`,
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(8),
  },
  upToDateText: {
    fontSize: scaleFont(12),
    fontFamily: Fonts.textBold,
    color: Colors.light.secondary,
  },
  chevron: {
    marginLeft: moderateScale(4),
  },
});
