import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "./BottomSheet";

interface DropdownSelectProps {
  label?: string;
  required?: boolean;
  value?: string;
  placeholder?: string;
  options: string[];
  onSelect: (option: string) => void;
  error?: string;
}

export default function DropdownSelect({
  label,
  required,
  value,
  placeholder = "Select an option",
  options,
  onSelect,
  error,
}: DropdownSelectProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}
      <TouchableOpacity
        style={[styles.selector, error ? styles.selectorError : null]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={[styles.valueText, !value && styles.placeholderText]}>
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <BottomSheet
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title={label || "Select Option"}
      >
        <View style={styles.listContainer}>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.optionItem, item === value && styles.optionItemSelected]}
                onPress={() => {
                  onSelect(item);
                  setModalVisible(false);
                }}
              >
                <Text style={[styles.optionText, item === value && styles.optionTextSelected]}>
                  {item}
                </Text>
                {item === value && <Ionicons name="checkmark" size={18} color="#6366F1" />}
              </TouchableOpacity>
            )}
          />
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    fontSize: 14,
    fontFamily: "Manrope_600SemiBold",
    color: "#374151",
    marginBottom: 6,
  },
  required: {
    color: "#EF4444",
    marginLeft: 2,
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 12,
  },
  selectorError: {
    borderColor: "#EF4444",
  },
  valueText: {
    fontSize: 14,
    fontFamily: "Manrope_400Regular",
    color: "#111827",
  },
  placeholderText: {
    color: "#9CA3AF",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    fontFamily: "Manrope_400Regular",
    marginTop: 4,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  optionItemSelected: {
    backgroundColor: "#EEF2F6",
  },
  optionText: {
    fontSize: 15,
    fontFamily: "Manrope_400Regular",
    color: "#374151",
  },
  optionTextSelected: {
    color: "#6366F1",
    fontFamily: "Manrope_600SemiBold",
  },
  listContainer: {
    maxHeight: 350,
  },
});
