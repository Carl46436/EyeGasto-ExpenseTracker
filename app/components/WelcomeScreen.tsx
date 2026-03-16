import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  onLoginPress: () => void;
  onRegisterPress: () => void;
}

export default function WelcomeScreen({
  onLoginPress,
  onRegisterPress,
}: Props) {
  return (
    <LinearGradient
      colors={["#020617", "#0F172A", "#1E293B"]}
      style={styles.container}
    >
      {/* HERO SECTION */}
      <BlurView intensity={40} tint="dark" style={styles.hero}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>👁</Text>
        </View>

        <Text style={styles.title}>EyeGasto </Text>

        <Text style={styles.subtitle}>
          Track every peso. Understand your spending. Save smarter.
        </Text>
      </BlurView>

      {/* ABOUT SECTION */}
      <BlurView intensity={25} tint="dark" style={styles.aboutCard}>
        <Text style={styles.aboutTitle}>About EyeGasto</Text>

        <Text style={styles.feature}>
          <Text style={styles.emojiIcon}>💸</Text> Record your daily expenses
          easily
        </Text>
        <Text style={styles.feature}>
          <Text style={styles.emojiIcon}>📊</Text> View clear monthly spending
          reports
        </Text>
        <Text style={styles.feature}>
          <Text style={styles.emojiIcon}>🎯</Text> Stay in control of your money
        </Text>
      </BlurView>

      {/* FOOTER */}
      <BlurView intensity={30} tint="dark" style={styles.footer}>
        <Text style={styles.tagline}>See where your money really goes.</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={onLoginPress}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={onRegisterPress}
            activeOpacity={0.7}
          >
            <Text style={styles.registerButtonText}>Create an Account</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.version}>v1.0</Text>
      </BlurView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: "space-between",
  },

  /* HERO */

  hero: {
    alignItems: "center",
    marginTop: 50,
    padding: 30,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  logo: {
    width: 110,
    height: 110,
    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#4F46E5",

    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 35,
    elevation: 12,
  },

  logoText: {
    fontSize: 56,
    color: "#FACC15",
    fontWeight: "bold",
    lineHeight: 56,
    textAlign: "center",
  },

  emojiIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  title: {
    fontSize: 36,
    letterSpacing: 1,
    fontWeight: "700",
    color: "#E5E7EB",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: "#9CA3AF",
    textAlign: "center",
    maxWidth: 280,
    lineHeight: 22,
  },

  /* ABOUT CARD */

  aboutCard: {
    marginTop: 5,
    padding: 20,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },

  aboutTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#E5E7EB",
    marginBottom: 12,
    textAlign: "center",
  },

  feature: {
    fontSize: 15,
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 6,
  },

  /* FOOTER */

  footer: {
    width: "100%",
  },

  tagline: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 16,
  },

  buttonContainer: {
    width: "100%",
    gap: 12,
  },

  loginButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 16,
    borderRadius: 999,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 4,
  },

  registerButton: {
    backgroundColor: "transparent",
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4F46E5",
  },

  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F9FAFB",
  },

  registerButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E5E7EB",
  },

  version: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 12,
    marginTop: 12,
  },
});
