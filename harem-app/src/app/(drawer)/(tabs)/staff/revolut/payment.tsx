import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type PaymentStep = "confirm" | "2fa" | "processing" | "success";

interface RecipientItem {
  id: string;
  name: string;
  avatar: string;
  netAmount: number;
}

export default function RevolutPaymentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  const [step, setStep] = useState<PaymentStep>("confirm");
  const [verificationCode, setVerificationCode] = useState("");
  const [processingProgress, setProcessingProgress] = useState(0);
  const inputRef = useRef<TextInput>(null);
  const spinValue = useRef(new Animated.Value(0)).current;

  // Spin animation loop
  useEffect(() => {
    if (step === "processing") {
      spinValue.setValue(0);
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1200,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinValue.setValue(0);
    }
  }, [step]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  // Build recipients list based on search parameters
  const isBatch = params.type === "batch";
  
  const recipients: RecipientItem[] = isBatch
    ? [
        {
          id: "sal_1",
          name: "Maria Rodriguez",
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
          netAmount: 2450,
        },
        {
          id: "sal_2",
          name: "Angelica Bell",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
          netAmount: 1980,
        },
      ]
    : [
        {
          id: (params.id as string) || "sal_1",
          name: (params.name as string) || "Maria Rodriguez",
          avatar: (params.avatar as string) || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
          netAmount: parseFloat((params.amount as string) || "2450"),
        },
      ];

  const totalAmount = recipients.reduce((sum, item) => sum + item.netAmount, 0);

  const handleVerify2FA = () => {
    if (verificationCode.length < 6) {
      Alert.alert("Error", "Please enter a valid 6-digit verification code.");
      return;
    }
    setStep("processing");
  };

  const handlePaymentComplete = () => {
    Alert.alert("Success", "Salary payout completed successfully!", [
      {
        text: "OK",
        onPress: () => {
          // Go back to salaries screen
          router.navigate("/staff/salaries");
        },
      },
    ]);
  };

  useEffect(() => {
    if (step === "processing") {
      setProcessingProgress(0);
      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        setProcessingProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setStep("success");
        }
      }, 600);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleBack = () => {
    if (step === "2fa") {
      setStep("confirm");
    } else {
      router.back();
    }
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 15) }]}>
      {/* Header */}
      <View style={styles.header}>
        {step !== "processing" && (
          <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#1F2937" />
          </TouchableOpacity>
        )}
        {step === "processing" && <View style={{ width: 36 }} />}

        <Text style={styles.headerTitle}>
          {step === "confirm" && "Confirm Payment"}
          {step === "2fa" && "Confirm Payment"}
          {step === "processing" && "Salary Processing"}
          {step === "success" && "Salary Payment"}
        </Text>

        {step !== "processing" ? (
          <TouchableOpacity onPress={() => router.navigate("/staff/salaries")} style={styles.closeBtn}>
            <Ionicons name="close" size={22} color="#1F2937" />
          </TouchableOpacity>
        ) : (
          <View style={{ width: 36 }} />
        )}
      </View>

      {step === "confirm" && (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.paymentSummaryBox}>
            <Text style={styles.paymentSummaryLabel}>Total Payroll Amount</Text>
            <Text style={styles.paymentSummaryAmount}>
              € {totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </Text>

            <View style={styles.paymentSummaryDetailsRow}>
              <View style={styles.summaryDetailCol}>
                <Ionicons name="people-outline" size={14} color="#9CA3AF" />
                <Text style={styles.summaryDetailText}>{recipients.length} Recipients</Text>
              </View>
              <View style={styles.summaryDetailCol}>
                <Ionicons name="card-outline" size={14} color="#9CA3AF" />
                <Text style={styles.summaryDetailText}>Bank Transfer</Text>
              </View>
              <View style={styles.summaryDetailCol}>
                <Ionicons name="time-outline" size={14} color="#9CA3AF" />
                <Text style={styles.summaryDetailText}>1-2 Days</Text>
              </View>
            </View>
          </View>

          <Text style={styles.needTitle}>Payment Recipients</Text>

          {recipients.map((item) => (
            <View key={item.id} style={styles.recipientRow}>
              <Image source={{ uri: item.avatar }} style={styles.recipientAvatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.recipientName}>{item.name}</Text>
                <Text style={styles.recipientDept}>Staff member</Text>
              </View>
              <Text style={styles.recipientAmount}>
                € {item.netAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </Text>
              <View style={styles.recipientBadge}>
                <Text style={styles.recipientBadgeText}>Approved</Text>
              </View>
            </View>
          ))}

          <Text style={styles.disclaimerText}>
            By confirming, you authorize the transfer of the total amount stated above to the listed recipients. Funds will be deducted from your primary business account immediately.
          </Text>

          <TouchableOpacity style={styles.btnSolid} onPress={() => setStep("2fa")} activeOpacity={0.8}>
            <Text style={styles.btnSolidText}>Confirm Payment</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnOutline} onPress={() => router.back()} activeOpacity={0.8}>
            <Text style={styles.btnOutlineText}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {step === "2fa" && (
        <View style={[styles.scrollContent, { flex: 1, justifyContent: "center", alignItems: "center" }]}>
          <View style={styles.paymentSummaryBox}>
            <Text style={styles.txRefText}>Ref: #TXN-9920</Text>
            <Text style={styles.paymentSummaryAmount}>
              € {totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </Text>
            <Text style={styles.payingAmountLabel}>Paying Amount</Text>
          </View>

          <Text style={styles.authTitle}>Enter verification code</Text>
          <Text style={styles.authSubtitle}>
            To authorize this payment, please enter the 6-digit code sent to +1 •••••• 8829.
          </Text>

          {/* 6 Digit Verification boxes */}
          <TouchableOpacity
            style={styles.codeContainer}
            activeOpacity={1}
            onPress={() => inputRef.current?.focus()}
          >
            {Array.from({ length: 6 }).map((_, index) => {
              const digit = verificationCode[index] || "";
              return (
                <View key={index} style={[styles.codeBox, digit !== "" && styles.codeBoxActive]}>
                  <Text style={styles.codeText}>{digit}</Text>
                </View>
              );
            })}
          </TouchableOpacity>

          <TextInput
            ref={inputRef}
            style={styles.hiddenInput}
            keyboardType="number-pad"
            maxLength={6}
            value={verificationCode}
            onChangeText={setVerificationCode}
            autoFocus={true}
            placeholder="Type 6 digits..."
          />

          <Text style={styles.resendText}>Didn't receive the code? Resend code in 0:45</Text>

          <View style={{ marginTop: 30, width: "100%" }}>
            <TouchableOpacity style={styles.btnSolid} onPress={handleVerify2FA} activeOpacity={0.8}>
              <Text style={styles.btnSolidText}>Verify and Process Payment</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnOutline} onPress={() => router.back()} activeOpacity={0.8}>
              <Text style={styles.btnOutlineText}>Cancel Transaction</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {step === "processing" && (
        <View style={[styles.scrollContent, { flex: 1, justifyContent: "center", alignItems: "center" }]}>
          <View style={styles.processingRingWrapper}>
            <Animated.View style={[styles.processingSpinnerCircle, { transform: [{ rotate: spin }] }]} />
            <View style={styles.percentTextContainer}>
              <Text style={styles.processingPercent}>{processingProgress}%</Text>
            </View>
          </View>

          <Text style={styles.revolutTitle}>Processing Payments</Text>
          <Text style={styles.revolutSubtitle}>
            Processing payment for{" "}
            <Text style={{ fontWeight: "700", color: "#5C55FF" }}>
              {recipients.length === 1 ? recipients[0].name : "all staff members"}
            </Text>
          </Text>

          {/* Progress note */}
          <View style={styles.processingNote}>
            <Ionicons name="information-circle-outline" size={18} color="#D97706" style={{ marginRight: 8, marginTop: 2 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.processingNoteTitle}>Processing payments via Revolut Business</Text>
              <Text style={styles.processingNoteText}>
                Please do not close this window or navigate away while the transaction is being verified by the bank.
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 30, width: "100%" }}>
            <TouchableOpacity style={styles.btnOutline} onPress={() => router.back()} activeOpacity={0.8}>
              <Text style={styles.btnOutlineText}>Cancel Transaction</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {step === "success" && (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.successIconWrapper}>
            <View style={styles.successIconOuterCircle}>
              <View style={styles.successIconCircle}>
                <Ionicons name="checkmark" size={32} color="#FFFFFF" />
              </View>
            </View>
          </View>

          <Text style={styles.revolutTitle}>Payment Complete</Text>
          <Text style={styles.revolutSubtitle}>
            Your salary batch has been processed successfully via Revolut Business.
          </Text>

          {/* Result Summary */}
          <View style={styles.resultsSummaryRow}>
            <View style={styles.resultColSuccess}>
              <Text style={styles.resultColLabel}>SUCCESSFUL</Text>
              <Text style={styles.resultColCount}>{recipients.length} items</Text>
              <Text style={styles.resultColAmount}>
                € {totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </Text>
            </View>
            <View style={styles.resultColFailed}>
              <Text style={styles.resultColLabel}>FAILED</Text>
              <Text style={styles.resultColCount}>0 items</Text>
              <Text style={styles.resultColAmount}>€ 0.00</Text>
            </View>
          </View>

          <Text style={styles.needTitle}>Recipient Details</Text>

          {recipients.map((item) => (
            <View key={item.id} style={styles.recipientRow}>
              <Image source={{ uri: item.avatar }} style={styles.recipientAvatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.recipientName}>{item.name}</Text>
                <Text style={styles.txidText}>TXID: REV-93821045</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.recipientAmount}>
                  € {item.netAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </Text>
                <View style={styles.successDotRow}>
                  <View style={styles.successDot} />
                  <Text style={styles.successDotText}>Success</Text>
                </View>
              </View>
            </View>
          ))}

          {/* Payment Channel Card */}
          <View style={styles.paymentChannelCard}>
            <Ionicons name="information-circle-outline" size={18} color="#5C55FF" style={{ marginRight: 8, marginTop: 2 }} />
            <View style={{ flex: 1 }}>
              <Text style={styles.channelTitle}>Payment Channel</Text>
              <Text style={styles.channelText}>
                This batch was successfully processed through the Revolut Business API. Confirmation emails have been sent to all recipients.
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.btnSolid} onPress={handlePaymentComplete} activeOpacity={0.8}>
            <Text style={styles.btnSolidText}>Ok, complete</Text>
          </TouchableOpacity>
        </ScrollView>
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
  needTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#1F2937",
    marginBottom: 12,
    marginTop: 8,
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
  paymentSummaryBox: {
    backgroundColor: "#5C55FF",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  paymentSummaryLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: "#E0E7FF",
    marginBottom: 6,
  },
  paymentSummaryAmount: {
    fontFamily: "Manrope_800ExtraBold",
    fontSize: 26,
    color: "#FFFFFF",
    marginBottom: 16,
  },
  paymentSummaryDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.2)",
    paddingTop: 12,
  },
  summaryDetailCol: {
    flexDirection: "row",
    alignItems: "center",
  },
  summaryDetailText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 10,
    color: "#FFFFFF",
    marginLeft: 4,
  },
  recipientRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    width: "100%",
  },
  recipientAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  recipientName: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#1F2937",
    marginBottom: 1,
  },
  recipientDept: {
    fontFamily: "Manrope_500Medium",
    fontSize: 10,
    color: "#9CA3AF",
  },
  recipientAmount: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#1F2937",
    marginRight: 8,
  },
  recipientBadge: {
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  recipientBadgeText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 9,
    color: "#059669",
  },
  disclaimerText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: "#9CA3AF",
    lineHeight: 16,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 16,
  },
  txRefText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 10,
    color: "#E0E7FF",
    alignSelf: "flex-end",
    marginBottom: 6,
  },
  payingAmountLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 10,
    color: "#E0E7FF",
  },
  authTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 16,
    color: "#1F2937",
    marginBottom: 8,
    marginTop: 12,
    textAlign: "center",
  },
  authSubtitle: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  codeBox: {
    width: 44,
    height: 44,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  codeBoxActive: {
    borderColor: "#5C55FF",
    backgroundColor: "#F5F3FF",
  },
  codeText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 18,
    color: "#1F2937",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    width: 0,
    height: 0,
  },
  resendText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 16,
  },
  processingRingWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 24,
    width: 100,
    height: 100,
  },
  processingSpinnerCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: "#5C55FF",
    borderLeftColor: "#E0E7FF",
    borderTopColor: "#E0E7FF",
  },
  percentTextContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  processingPercent: {
    fontFamily: "Manrope_700Bold",
    fontSize: 16,
    color: "#1F2937",
  },
  processingNote: {
    flexDirection: "row",
    backgroundColor: "#FFFBEB",
    borderColor: "#FEF3C7",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    marginBottom: 16,
    width: "100%",
  },
  processingNoteTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    color: "#D97706",
    marginBottom: 2,
  },
  processingNoteText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: "#B45309",
    lineHeight: 16,
  },
  resultsSummaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 14,
    marginBottom: 20,
  },
  resultColSuccess: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "#F3F4F6",
    paddingRight: 10,
  },
  resultColFailed: {
    flex: 1,
    paddingLeft: 14,
  },
  resultColLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 10,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  resultColCount: {
    fontFamily: "Manrope_700Bold",
    fontSize: 14,
    color: "#374151",
    marginBottom: 2,
  },
  resultColAmount: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    color: "#9CA3AF",
  },
  txidText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 10,
    color: "#9CA3AF",
  },
  successDotRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  successDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10B981",
    marginRight: 4,
  },
  successDotText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 10,
    color: "#10B981",
  },
  paymentChannelCard: {
    flexDirection: "row",
    backgroundColor: "#EEF2FF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    width: "100%",
  },
  channelTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    color: "#5C55FF",
    marginBottom: 2,
  },
  channelText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: "#4B5563",
    lineHeight: 16,
  },
});
