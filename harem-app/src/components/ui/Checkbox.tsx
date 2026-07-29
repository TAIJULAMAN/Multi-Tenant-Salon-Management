import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  color?: string;
}

export default function Checkbox({ checked, onPress, color = "#6366F1" }: CheckboxProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.checkbox,
        checked && { backgroundColor: color, borderColor: color },
      ]}
    >
      {checked && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
});
