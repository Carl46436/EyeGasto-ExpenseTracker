import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { BlurView } from "expo-blur";

interface Props {
  title: string;
  amount: number;
  type: "expense" | "income";
  period: "month" | "total";
}

export default function StatsCard({ title, amount, type, period }: Props) {
  const isExpense = type === "expense";
  const amountColor = isExpense ? "#FF6B6B" : "#4CAF50";

  return (
    <BlurView intensity={30} tint="dark" style={styles.card}>
      <View style={[styles.inner, { borderColor: amountColor }]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.amount, { color: amountColor }]}>
          {isExpense ? "-" : "+"} ₱{amount.toFixed(2)}
        </Text>
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12,
    width: "100%", // Default to full width for mobile
    ...Platform.select({
      web: {
        width: "30%",
        minWidth: 200,
        cursor: "pointer",
      } as any,
    }),
  },
  inner: {
    backgroundColor: "rgba(15,23,42,0.7)",
    padding: 20, // Increased padding
    borderRadius: 16,
    borderWidth: 1, // Visible border
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 14, // Slightly larger
    color: "#9CA3AF",
    fontWeight: "600",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  amount: {
    fontSize: 26, // Much larger for better visibility
    fontWeight: "800",
  },
});
