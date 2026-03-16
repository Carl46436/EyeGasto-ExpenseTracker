import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { Expense } from "../types/index";

type Props = Omit<Expense, "id"> & {
  onDelete?: () => void;
  onPress?: () => void;
};

export default function ExpenseItem({
  description,
  amount,
  date,
  onDelete,
  onPress,
}: Props) {
  return (
    <BlurView intensity={25} tint="dark" style={styles.blurWrapper}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.content}
          onPress={onPress}
          activeOpacity={0.6}
        >
          <View style={styles.details}>
            <Text style={styles.desc}>{description}</Text>
            <Text style={styles.date}>
              {new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amount}>₱{amount.toFixed(2)}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.actions}>
          <TouchableOpacity onPress={onPress} style={styles.actionButton}>
            <Ionicons name="pencil" size={18} color="#9CA3AF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
            <Ionicons name="trash" size={18} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  blurWrapper: {
    borderRadius: 12,
    overflow: "hidden",
    marginVertical: 4,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "rgba(15,23,42,0.4)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.03)",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  details: {
    flex: 1,
  },
  desc: {
    fontSize: 15,
    fontWeight: "600",
    color: "#F9FAFB",
  },
  date: {
    marginTop: 2,
    fontSize: 11,
    color: "#6B7280",
    fontWeight: "500",
  },
  amountContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "rgba(249, 115, 22, 0.1)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(249, 115, 22, 0.2)",
  },
  amount: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FACC15",
  },
  actions: {
    flexDirection: "row",
    marginLeft: 8,
    gap: 4,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.03)",
  },
});
