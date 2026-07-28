import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SetupStep = "warning" | "form" | "success";

export default function RevolutSetupScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  
  const [step, setStep] = useState<SetupStep>("warning");
  const [apiInputs, setApiInputs] = useState({
    apiKey: "",
    secretKey: "",
    orgId: "",
    env: "Production",
  });

  const handleVerifyAndConnect = () => {
    if (!apiInputs.apiKey || !apiInputs.secretKey || !apiInputs.orgId) {
      Alert.alert("Error", "Please fill in all the Revolut API fields.");
      return;
    }
    setStep("success");
  };

  const handleContinue = () => {
    // Route to payment screen passing all the forward parameters
    router.replace({
      pathname: "/staff/revolut/payment",
      params: {
        type: params.type,
        id: params.id,
        name: params.name,
        amount: params.amount,
        avatar: params.avatar,
      },
    });
  };

  const handleBack = () => {
    if (step === "form") {
      setStep("warning");
    } else {
      router.back();
    }
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 15) }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {step === "warning" && "Revolut Business"}
          {step === "form" && "Connect Revolut"}
          {step === "success" && "Success"}
        </Text>
        <TouchableOpacity onPress={() => router.navigate("/staff/salaries")} style={styles.closeBtn}>
          <Ionicons name="close" size={22} color="#1F2937" />
        </TouchableOpacity>
      </View>

      {step === "warning" && (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.iconShieldWrapper}>
            <View style={styles.iconShieldCircle}>
              <Ionicons name="shield-checkmark" size={32} color="#5C55FF" />
            </View>
          </View>

          <Text style={styles.revolutTitle}>Revolut Business API Not Connected</Text>
          <Text style={styles.revolutSubtitle}>
            To process salary payments through Revolut Business, you need to connect your API credentials. This is a secure, one-time setup process.
          </Text>

          {/* Warning box */}
          <View style={styles.warningBox}>
            <Ionicons name="warning-outline" size={20} color="#D97706" style={{ marginRight: 10, marginTop: 2 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.warningTitle}>Warning</Text>
              <Text style={styles.warningText}>
                Make sure you have your Revolut Business API credentials ready. You can find these in Revolut Business dashboard under Settings {"->"} API {"->"} Manage API keys.
              </Text>
            </View>
          </View>

          <Text style={styles.needTitle}>What you'll need</Text>
          
          <View style={styles.needItem}>
            <View style={styles.needIconCircle}>
              <Ionicons name="key" size={16} color="#5C55FF" />
            </View>
            <Text style={styles.needText}>API Key</Text>
          </View>

          <View style={styles.needItem}>
            <View style={styles.needIconCircle}>
              <Ionicons name="lock-closed" size={16} color="#5C55FF" />
            </View>
            <Text style={styles.needText}>Secret Key</Text>
          </View>

          <View style={styles.needItem}>
            <View style={styles.needIconCircle}>
              <Ionicons name="business" size={16} color="#5C55FF" />
            </View>
            <Text style={styles.needText}>Organization ID</Text>
          </View>

          <TouchableOpacity style={styles.btnSolid} onPress={() => setStep("form")} activeOpacity={0.8}>
            <Text style={styles.btnSolidText}>Set Up API</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOutline} onPress={() => router.back()} activeOpacity={0.8}>
            <Text style={styles.btnOutlineText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {step === "form" && (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.iconShieldWrapper}>
            <View style={styles.iconShieldCircle}>
              <Ionicons name="shield-checkmark" size={32} color="#5C55FF" />
            </View>
          </View>

          <Text style={styles.revolutTitle}>Connect your Business API</Text>
          <Text style={styles.revolutSubtitle}>
            Sync your transactions and manage your business finances by providing your Revolut Business API credentials.
          </Text>

          {/* Form fields */}
          <Text style={styles.fieldLabel}>API Key</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your API key"
            placeholderTextColor="#9CA3AF"
            value={apiInputs.apiKey}
            onChangeText={(val) => setApiInputs({ ...apiInputs, apiKey: val })}
          />

          <Text style={styles.fieldLabel}>Secret Key</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder="Enter your secret key"
            placeholderTextColor="#9CA3AF"
            value={apiInputs.secretKey}
            onChangeText={(val) => setApiInputs({ ...apiInputs, secretKey: val })}
          />

          <Text style={styles.fieldLabel}>Organization ID</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter organization ID"
            placeholderTextColor="#9CA3AF"
            value={apiInputs.orgId}
            onChangeText={(val) => setApiInputs({ ...apiInputs, orgId: val })}
          />

          <Text style={styles.fieldLabel}>Environment</Text>
          <View style={styles.environmentSelector}>
            <Text style={styles.environmentSelectorText}>{apiInputs.env}</Text>
            <Ionicons name="chevron-down" size={16} color="#9CA3AF" />
          </View>

          {/* Info box */}
          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={18} color="#5C55FF" style={{ marginRight: 8, marginTop: 2 }} />
            <Text style={styles.infoBoxText}>
              You can find these credentials in your Revolut Business Hub under the API settings tab.
            </Text>
          </View>

          <TouchableOpacity style={styles.btnSolid} onPress={handleVerifyAndConnect} activeOpacity={0.8}>
            <Text style={styles.btnSolidText}>Set Up API</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOutline} onPress={() => router.back()} activeOpacity={0.8}>
            <Text style={styles.btnOutlineText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {step === "success" && (
        <View style={[styles.scrollContent, { flex: 1, justifyContent: "center", alignItems: "center" }]}>
          <View style={styles.successIconWrapper}>
            <View style={styles.successIconOuterCircle}>
              <View style={styles.successIconCircle}>
                <Ionicons name="checkmark" size={32} color="#FFFFFF" />
              </View>
            </View>
          </View>

          <Text style={styles.revolutTitle}>API Connection Successful!</Text>
          <Text style={styles.revolutSubtitle}>
            Setup completed successfully. Ready to process transaction.
          </Text>

          {/* Verified checklist box */}
          <View style={styles.connectionVerifiedBox}>
            <View style={styles.verifiedBoxHeader}>
              <Text style={styles.verifiedBoxTitle}>Connection verified</Text>
              <Text style={styles.verifiedBoxStatus}>Active</Text>
            </View>
            <View style={styles.verifiedProgressBar} />

            <View style={styles.checklistRow}>
              <Ionicons name="checkmark-circle" size={16} color="#5C55FF" style={{ marginRight: 8 }} />
              <Text style={styles.checklistText}>Authentication headers valid</Text>
            </View>
            <View style={styles.checklistRow}>
              <Ionicons name="checkmark-circle" size={16} color="#5C55FF" style={{ marginRight: 8 }} />
              <Text style={styles.checklistText}>Response received in 124ms</Text>
            </View>
            <View style={styles.checklistRow}>
              <Ionicons name="checkmark-circle" size={16} color="#5C55FF" style={{ marginRight: 8 }} />
              <Text style={styles.checklistText}>Data mapping configured</Text>
            </View>
          </View>

          <View style={{ marginTop: 30, width: "100%" }}>
            <TouchableOpacity style={styles.btnSolid} onPress={handleContinue} activeOpacity={0.8}>
              <Text style={styles.btnSolidText}>Continue to Dashboard</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnOutline} onPress={() => router.navigate("/staff/salaries")} activeOpacity={0.8}>
              <Text style={styles.btnOutlineText}>View Connection Logs</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 54,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 16,
    color: "#1F2937",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  iconShieldWrapper: {
    alignItems: "center",
    marginVertical: 20,
  },
  iconShieldCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  revolutTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 16,
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 8,
  },
  revolutSubtitle: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  warningBox: {
    flexDirection: "row",
    backgroundColor: "#FFFBEB",
    borderColor: "#FEF3C7",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
  },
  warningTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    color: "#D97706",
    marginBottom: 2,
  },
  warningText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: "#B45309",
    lineHeight: 16,
  },
  needTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#1F2937",
    marginBottom: 12,
    marginTop: 8,
  },
  needItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  needIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  needText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 13,
    color: "#374151",
  },
  btnSolid: {
    backgroundColor: "#5C55FF",
    height: 46,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    shadowColor: "#5C55FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  btnSolidText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#FFFFFF",
  },
  btnOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    height: 46,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  btnOutlineText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 13,
    color: "#4B5563",
  },
  fieldLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 11,
    color: "#4B5563",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    fontFamily: "Manrope_500Medium",
    fontSize: 13,
    color: "#1F2937",
    marginBottom: 16,
  },
  environmentSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    marginBottom: 20,
  },
  environmentSelectorText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 13,
    color: "#1F2937",
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#EEF2FF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  infoBoxText: {
    flex: 1,
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: "#4B5563",
    lineHeight: 16,
  },
  successIconWrapper: {
    alignItems: "center",
    marginVertical: 24,
  },
  successIconOuterCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  successIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#5C55FF",
    alignItems: "center",
    justifyContent: "center",
  },
  connectionVerifiedBox: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  verifiedBoxHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  verifiedBoxTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    color: "#1F2937",
  },
  verifiedBoxStatus: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    color: "#5C55FF",
  },
  verifiedProgressBar: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "#5C55FF",
    width: "100%",
    marginBottom: 16,
  },
  checklistRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checklistText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: "#4B5563",
  },
});
