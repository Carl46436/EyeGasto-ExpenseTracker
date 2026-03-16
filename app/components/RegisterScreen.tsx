import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
  Alert,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  onRegister: (email: string, password: string, name: string) => void;
  onBackPress: () => void;
  onLoginPress: () => void;
}

export default function RegisterScreen({
  onRegister,
  onBackPress,
  onLoginPress,
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState({ name: "", email: "", password: "", terms: "" });

  const eyeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(100)).current; // start off-screen

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleRegister = () => {
    let valid = true;
    const newErrors = { name: "", email: "", password: "", terms: "" };

    if (!name.trim()) {
      newErrors.name = "Full name is required";
      valid = false;
    }
    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (!agreeToTerms) {
      newErrors.terms = "You must agree to the Terms and Conditions";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) onRegister(email, password, name);
  };

  const togglePassword = () => {
    Animated.sequence([
      Animated.timing(eyeAnim, { toValue: 1.3, duration: 100, useNativeDriver: true }),
      Animated.timing(eyeAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();

    setShowPassword(!showPassword);
  };

  return (
    <LinearGradient colors={["#020617", "#0F172A", "#1E293B"]} style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
            <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
              <Text style={styles.backText}>← Back</Text>
            </TouchableOpacity>

            <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
              <BlurView intensity={40} tint="dark" style={styles.card}>
                <Text style={styles.title}>Register</Text>
                <Text style={styles.subtitle}>Create your EyeGasto account</Text>

                {/* NAME */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Full Name</Text>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.icon}>👤</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Kean Kyle Perez"
                      value={name}
                      onChangeText={setName}
                      placeholderTextColor="#9CA3AF"
                      returnKeyType="next"
                      onSubmitEditing={() => emailRef.current?.focus()}
                      autoCapitalize="words"
                    />
                  </View>
                  {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}
                </View>

                {/* EMAIL */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Email</Text>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.icon}>📩</Text>
                    <TextInput
                      ref={emailRef}
                      style={styles.input}
                      placeholder="Enter your email"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      placeholderTextColor="#9CA3AF"
                      returnKeyType="next"
                      onSubmitEditing={() => passwordRef.current?.focus()}
                      autoCapitalize="none"
                    />
                  </View>
                  {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}
                </View>

                {/* PASSWORD */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Password</Text>
                  <View style={styles.inputWrapper}>
                    <Text style={styles.icon}>🔑</Text>
                    <TextInput
                      ref={passwordRef}
                      style={styles.input}
                      placeholder="********"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      placeholderTextColor="#9CA3AF"
                      returnKeyType="go"
                      onSubmitEditing={handleRegister}
                    />
                    <Animated.View style={{ transform: [{ scale: eyeAnim }] }}>
                      <TouchableOpacity onPress={togglePassword}>
                        <Text style={styles.eye}>{showPassword ? "🙈" : "👁"}</Text>
                      </TouchableOpacity>
                    </Animated.View>
                  </View>
                  {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}
                </View>

                {/* TERMS AND CONDITIONS */}
                <View style={styles.termsContainer}>
                  <TouchableOpacity
                    style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}
                    onPress={() => setAgreeToTerms(!agreeToTerms)}
                    activeOpacity={0.8}
                  >
                    {agreeToTerms && <Text style={styles.checkboxCheck}>✓</Text>}
                  </TouchableOpacity>
                  <Text style={styles.termsText}>
                    I agree to the{" "}
                    <Text
                      style={styles.termsLink}
                      onPress={() =>
                        Alert.alert(
                          "Terms and Conditions",
                          "By creating an account, you agree to:\n\n1. Use this app for personal expense tracking only.\n2. We are not responsible for financial discrepancies.\n3. Keep your account credentials secure.\n4. Your local data will only be deleted if you clear it or delete the app."
                        )
                      }
                    >
                      Terms and Conditions
                    </Text>
                  </Text>
                </View>
                {errors.terms ? <Text style={styles.error}>{errors.terms}</Text> : null}

                {/* REGISTER BUTTON */}
                <TouchableOpacity style={styles.registerButton} onPress={handleRegister} activeOpacity={0.8}>
                  <Text style={styles.registerButtonText}>Create Account</Text>
                </TouchableOpacity>

                {/* LOGIN LINK */}
                <TouchableOpacity style={styles.loginLink} onPress={onLoginPress}>
                  <Text style={styles.loginText}>Already have an account? Login</Text>
                </TouchableOpacity>
              </BlurView>
            </Animated.View>
          </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 40, justifyContent: "center" },
  backButton: { marginBottom: 20 },
  backText: { color: "#A5B4FC", fontWeight: "600" },
  card: {
    borderRadius: 20,
    padding: 24,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    maxWidth: 500,
    alignSelf: "center",
    width: "100%",
  },
  title: { fontSize: 28, fontWeight: "700", color: "#E5E7EB" },
  subtitle: { fontSize: 14, color: "#9CA3AF", marginBottom: 20 },
  inputGroup: { marginBottom: 18 },
  label: { color: "#9CA3AF", fontSize: 12, marginBottom: 6, fontWeight: "600" },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#020617",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#374151",
    paddingHorizontal: 12,
  },
  icon: { marginRight: 8, fontSize: 16 },
  input: { flex: 1, paddingVertical: 12, color: "#E5E7EB" },
  eye: { fontSize: 18, marginLeft: 6 },
  registerButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 15,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 4,
  },
  registerButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  loginLink: { alignItems: "center", marginTop: 18 },
  loginText: { color: "#A5B4FC", fontSize: 14 },
  error: { color: "#F87171", fontSize: 12, marginTop: 4 },
  termsContainer: { flexDirection: "row", alignItems: "center", marginBottom: 16, marginTop: 8 },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#4F46E5",
    borderRadius: 6,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  checkboxChecked: { backgroundColor: "#4F46E5", borderColor: "#4F46E5" },
  checkboxCheck: { color: "#FFF", fontSize: 14, fontWeight: "900" },
  termsText: { color: "#9CA3AF", fontSize: 13, flex: 1, flexWrap: "wrap", lineHeight: 18 },
  termsLink: { color: "#A5B4FC", textDecorationLine: "underline", fontWeight: "600" },
});