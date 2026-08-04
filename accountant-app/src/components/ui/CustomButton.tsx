import React, { ComponentProps } from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  outline?: boolean;
  iconName?: ComponentProps<typeof Ionicons>["name"];
  iconPosition?: "left" | "right";
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

export default function CustomButton({
  title,
  loading,
  outline,
  iconName,
  iconPosition = "left",
  buttonStyle,
  textStyle,
  disabled,
  ...props
}: CustomButtonProps) {
  const isButtonDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        outline ? styles.outlineButton : styles.primaryButton,
        isButtonDisabled && styles.disabledButton,
        buttonStyle,
      ]}
      disabled={isButtonDisabled}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={outline ? "#635BFF" : "#FFFFFF"} size="small" />
      ) : (
        <>
          {iconName && iconPosition === "left" && (
            <Ionicons
              name={iconName as any}
              size={18}
              color={outline ? "#635BFF" : "#FFFFFF"}
              style={styles.leftIcon}
            />
          )}
          <Text
            style={[
              styles.text,
              outline ? styles.outlineText : styles.primaryText,
              textStyle,
            ]}
          >
            {title}
          </Text>
          {iconName && iconPosition === "right" && (
            <Ionicons
              name={iconName as any}
              size={18}
              color={outline ? "#635BFF" : "#FFFFFF"}
              style={styles.rightIcon}
            />
          )}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 48,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  primaryButton: {
    backgroundColor: "#635BFF",
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#635BFF",
  },
  disabledButton: {
    opacity: 0.5,
  },
  text: {
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "System",
  },
  primaryText: {
    color: "#FFFFFF",
  },
  outlineText: {
    color: "#635BFF",
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});
