import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

export default function LoadingScreen({
  message = "Loading...",
}: {
  message?: string;
}) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#7C3AED" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
});
