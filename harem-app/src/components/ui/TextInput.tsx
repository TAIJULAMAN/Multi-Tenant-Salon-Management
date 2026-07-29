import React from "react";
import { View, Text, StyleSheet, TextInput as RNTextInput, StyleProp, ViewStyle, TextStyle } from "react-native";
import type { TextInputProps as RNTextInputProps } from "react-native";

interface CustomTextInputProps extends RNTextInputProps {
  label?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  error?: string;
}

export default function TextInput({
  label,
  required,
  leftIcon,
  rightIcon,
  containerStyle,
  inputContainerStyle,
  inputStyle,
  error,
  placeholderTextColor = "#9CA3AF",
  style,
  ...props
}: CustomTextInputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}>*</Text>}
        </Text>
      )}
      <View
        style={[
          styles.inputWrapper,
          leftIcon ? { paddingLeft: 12 } : null,
          rightIcon ? { paddingRight: 12 } : null,
          error ? styles.inputWrapperError : null,
          inputContainerStyle,
        ]}
      >
        {leftIcon}
        <RNTextInput
          placeholderTextColor={placeholderTextColor}
          style={[styles.input, inputStyle, style]}
          {...props}
        />
        {rightIcon}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
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
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 12,
  },
  inputWrapperError: {
    borderColor: "#EF4444",
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    fontFamily: "Manrope_400Regular",
    color: "#111827",
    paddingVertical: 0, // Resets default padding on Android to align placeholder vertically
  },
  errorText: {
    color: "#EF4444",
    fontSize: 12,
    fontFamily: "Manrope_400Regular",
    marginTop: 4,
  },
});
