import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { BlurView } from "expo-blur";


interface Props {
  onAdd: (
    description: string,
    amount: number,
    category?: string,
    notes?: string,
  ) => void;
}

export default function AddExpenseForm({ onAdd }: Props) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    const num = parseFloat(amount);
    if (!description.trim() || isNaN(num)) {
      return; // could show validation
    }
    onAdd(
      description.trim(),
      num,
      category.trim() || undefined,
      notes.trim() || undefined,
    );
    setDescription("");
    setAmount("");
    setCategory("");
    setNotes("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <BlurView intensity={30} tint="dark" style={styles.container}>
        <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
        <TextInput
        style={styles.input}
        placeholder="Amount (₱)"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
        <TextInput
        style={styles.input}
        placeholder="Category (e.g. Food, Bills, Transport)"
        value={category}
        onChangeText={setCategory}
      />
        <TextInput
        style={[styles.input, styles.notesInput]}
        placeholder="Notes (optional)"
        value={notes}
        onChangeText={setNotes}
        multiline
      />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </BlurView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 0,
    marginTop: 16,
  },
  container: {
    padding: 14,
    backgroundColor: "rgba(15,23,42,0.75)",
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#ede2e2",
  },
  input: {
    height: 40,
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 10,
    backgroundColor: "rgb(255, 255, 255)",
    color: "#000000",
  },
  notesInput: {
    height: 64,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#7ecb55",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
