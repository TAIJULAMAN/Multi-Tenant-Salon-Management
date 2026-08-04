import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomHeader from "@/components/ui/CustomHeader";
import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";

export default function ResetPasswordScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const handleReset = () => {
    let isValid = true;

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmError("Confirm Password is required");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmError("");
    }

    if (isValid) {
      Alert.alert(
        "Success",
        "Your password has been reset successfully. Please sign in with your new password.",
        [
          {
            text: "OK",
            onPress: () => {
              router.replace("/auth/signin" as any);
            },
          },
        ]
      );
    }
  };

  const getPasswordStrength = () => {
    if (!password) return { label: "", color: "#9CA3AF" };
    if (password.length < 6) return { label: "Weak", color: "#EF4444" };
    if (password.length < 10) return { label: "Medium", color: "#F59E0B" };
    return { label: "Strong", color: "#10B981" };
  };

  const strength = getPasswordStrength();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <CustomHeader title="" />
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 24) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* App Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../assets/app/appIcon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Header Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Set a new password</Text>
          <Text style={styles.subtitle}>
            Create a new password. Ensure it differs from previous ones for security
          </Text>
        </View>

        {/* Inputs */}
        <View style={styles.form}>
          <CustomInput
            label="Password"
            placeholder="Enter Password"
            iconName="lock-closed-outline"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (passwordError) setPasswordError("");
            }}
            error={passwordError}
            isPassword
          />

          <CustomInput
            label="Confirm Password"
            placeholder="Re-enter Password"
            iconName="lock-closed-outline"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              if (confirmError) setConfirmError("");
            }}
            error={confirmError}
            isPassword
          />

          {/* Password Strength Indicator */}
          {password.length > 0 && (
            <View style={styles.strengthRow}>
              <Text style={styles.strengthLabel}>Password Strength </Text>
              <Text style={[styles.strengthValue, { color: strength.color }]}>
                {strength.label}
              </Text>
            </View>
          )}
        </View>

        {/* Reset Button */}
        <CustomButton
          title="Reset"
          onPress={handleReset}
          disabled={!password || !confirmPassword || password !== confirmPassword}
          buttonStyle={styles.resetBtn}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
    fontFamily: "System",
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
    fontFamily: "System",
  },
  form: {
    width: "100%",
    marginBottom: 24,
  },
  strengthRow: {
    flexDirection: "row",
    marginBottom: 16,
    marginTop: -8,
  },
  strengthLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontFamily: "System",
  },
  strengthValue: {
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "System",
  },
  resetBtn: {
    width: "100%",
  },
});
