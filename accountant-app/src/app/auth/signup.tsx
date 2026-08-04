import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";
import CustomBottomSheet from "@/components/ui/CustomBottomSheet";

const ROLES = ["Owner", "Manager", "Accountant", "Stylist", "Receptionist"];

export default function SignUpScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Error states
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [roleError, setRoleError] = useState("");

  const [showRoleBottomSheet, setShowRoleBottomSheet] = useState(false);

  const handleSignUp = () => {
    let isValid = true;

    if (!fullName) {
      setNameError("Full Name is required");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

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
      setConfirmError("Please confirm your password");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmError("");
    }

    if (!selectedRole) {
      setRoleError("Please select a role");
      isValid = false;
    } else {
      setRoleError("");
    }

    if (!agreeTerms) {
      alert("You must agree to the Terms & Conditions");
      isValid = false;
    }

    if (isValid) {
      // Directs to OTP screen on continue
      router.push({
        pathname: "/auth/otp-verification",
        params: { email, fromSignUp: "true" },
      } as any);
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
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: Math.max(insets.top, 24), paddingBottom: Math.max(insets.bottom, 24) },
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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join us to elevate your salon business</Text>
        </View>

        {/* Form Inputs */}
        <View style={styles.form}>
          <CustomInput
            label="Full Name"
            placeholder="Enter your full name"
            iconName="person-outline"
            value={fullName}
            onChangeText={(text) => {
              setFullName(text);
              if (nameError) setNameError("");
            }}
            error={nameError}
          />

          <CustomInput
            label="Email ID"
            placeholder="Enter Email Address"
            iconName="mail-outline"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              if (emailError) setEmailError("");
            }}
            error={emailError}
            keyboardType="email-address"
          />

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
            label="Re-enter Password"
            placeholder="Confirm Password"
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

          {/* Role Dropdown Button */}
          <View style={styles.roleField}>
            <Text style={styles.fieldLabel}>Role *</Text>
            <TouchableOpacity
              style={[styles.dropdownButton, roleError ? styles.dropdownErrorBorder : null]}
              onPress={() => setShowRoleBottomSheet(true)}
              activeOpacity={0.7}
            >
              <View style={styles.dropdownLeft}>
                <Ionicons name="briefcase-outline" size={20} color="#9CA3AF" style={styles.dropdownIcon} />
                <Text style={[styles.dropdownText, !selectedRole && styles.placeholderText]}>
                  {selectedRole || "Select Role"}
                </Text>
              </View>
              <Ionicons name="chevron-down-outline" size={18} color="#6B7280" />
            </TouchableOpacity>
            {roleError ? <Text style={styles.errorText}>{roleError}</Text> : null}
          </View>

          {/* Terms Checkbox */}
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAgreeTerms(!agreeTerms)}
            activeOpacity={0.8}
          >
            <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
              {agreeTerms && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
            </View>
            <Text style={styles.checkboxText}>
              I agree to the{" "}
              <Text style={styles.checkboxLink}>terms and conditions</Text> and{" "}
              <Text style={styles.checkboxLink}>Privacy Policy</Text>.
            </Text>
          </TouchableOpacity>
        </View>

        {/* Continue Button */}
        <CustomButton
          title="Continue"
          onPress={handleSignUp}
          buttonStyle={styles.continueBtn}
        />

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Buttons */}
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
            <Image
              source={require("../../../assets/icons/Google.png")}
              style={styles.socialIcon}
              resizeMode="contain"
            />
            <Text style={styles.socialBtnText}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialBtn} activeOpacity={0.8}>
            <Image
              source={require("../../../assets/icons/Apple.png")}
              style={styles.socialIcon}
              resizeMode="contain"
            />
            <Text style={styles.socialBtnText}>Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Signin Footer */}
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => router.push("/auth/signin" as any)}
            activeOpacity={0.7}
          >
            <Text style={styles.footerLink}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Role Picker Bottom Sheet */}
      <CustomBottomSheet
        visible={showRoleBottomSheet}
        onClose={() => setShowRoleBottomSheet(false)}
        title="Select Role"
      >
        <ScrollView style={styles.bottomSheetScroll} showsVerticalScrollIndicator={false}>
          {ROLES.map((role) => (
            <TouchableOpacity
              key={role}
              style={styles.roleItem}
              onPress={() => {
                setSelectedRole(role);
                setRoleError("");
                setShowRoleBottomSheet(false);
              }}
            >
              <Text style={styles.roleItemText}>{role}</Text>
              {selectedRole === role && (
                <Ionicons name="checkmark" size={20} color="#635BFF" />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </CustomBottomSheet>
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
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
    fontFamily: "System",
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
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
  roleField: {
    width: "100%",
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
    fontFamily: "System",
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
  },
  dropdownErrorBorder: {
    borderColor: "#EF4444",
  },
  dropdownLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownIcon: {
    marginRight: 8,
  },
  dropdownText: {
    fontSize: 14,
    color: "#1F2937",
    fontFamily: "System",
  },
  placeholderText: {
    color: "#9CA3AF",
  },
  errorText: {
    fontSize: 11,
    color: "#EF4444",
    marginTop: 4,
    fontFamily: "System",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 4,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginTop: 1,
  },
  checkboxChecked: {
    backgroundColor: "#635BFF",
    borderColor: "#635BFF",
  },
  checkboxText: {
    flex: 1,
    fontSize: 12,
    color: "#4B5563",
    lineHeight: 18,
    fontFamily: "System",
  },
  checkboxLink: {
    fontWeight: "600",
    color: "#635BFF",
  },
  continueBtn: {
    marginBottom: 24,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#F3F4F6",
  },
  dividerText: {
    fontSize: 12,
    color: "#9CA3AF",
    marginHorizontal: 12,
    fontFamily: "System",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    width: "48%",
    height: 48,
    backgroundColor: "#FFFFFF",
  },
  socialIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  socialBtnText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    fontFamily: "System",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  footerText: {
    fontSize: 12,
    color: "#6B7280",
    fontFamily: "System",
  },
  footerLink: {
    fontSize: 12,
    fontWeight: "600",
    color: "#635BFF",
    fontFamily: "System",
  },
  bottomSheetScroll: {
    maxHeight: 250,
  },
  roleItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  roleItemText: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "500",
    fontFamily: "System",
  },
});
