import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import CustomModal from "@/components/ui/CustomModal";
import CustomButton from "@/components/ui/CustomButton";

const { width } = Dimensions.get("window");

interface PlanItem {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  popular?: boolean;
}

const PLANS_DATA: PlanItem[] = [
  {
    id: "single",
    name: "Single Use",
    description: "Perfect for freelancers starting their journey.",
    monthlyPrice: 49,
    annualPrice: 39,
    features: ["Client Management", "Basic Reports", "Email Support", "1 User Account"],
  },
  {
    id: "multiple",
    name: "Multiple Use",
    description: "Great for small teams expanding their reach.",
    monthlyPrice: 89,
    annualPrice: 69,
    features: ["Everything in Single", "Team Scheduling", "SMS Reminders", "Up to 5 Users"],
  },
  {
    id: "extended",
    name: "Extended Use",
    description: "Ideal for growing businesses with multiple locations.",
    monthlyPrice: 299,
    annualPrice: 239,
    features: ["Everything in Multiple", "Advanced Analytics", "Priority Support", "Unlimited Users"],
    popular: true,
  },
  {
    id: "unlimited",
    name: "Unlimited Use",
    description: "The ultimate toolkit for enterprise scaling.",
    monthlyPrice: 499,
    annualPrice: 399,
    features: ["White Labeling", "API Access", "Dedicated Account Mgr", "Custom Integration's"],
  },
];

export default function PlansScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [billingPeriod, setBillingPeriod] = useState<"month" | "annual">("month");
  const [selectedPlan, setSelectedPlan] = useState<PlanItem | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handlePurchase = (plan: PlanItem) => {
    setSelectedPlan(plan);
    setShowSuccessModal(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    // Navigate back to the home screen (index)
    router.replace("/" as any);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 12) }]}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={22} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subscription Plans</Text>
        <View style={styles.emptyView} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Toggle Switch Period (Month vs Annual) */}
        <View style={styles.switchContainer}>
          <TouchableOpacity
            style={[
              styles.switchSegment,
              billingPeriod === "month" && styles.switchSegmentActive,
            ]}
            onPress={() => setBillingPeriod("month")}
            activeOpacity={0.9}
          >
            <Text
              style={[
                styles.switchText,
                billingPeriod === "month" && styles.switchTextActive,
              ]}
            >
              Month
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.switchSegment,
              billingPeriod === "annual" && styles.switchSegmentActive,
            ]}
            onPress={() => setBillingPeriod("annual")}
            activeOpacity={0.9}
          >
            <Text
              style={[
                styles.switchText,
                billingPeriod === "annual" && styles.switchTextActive,
              ]}
            >
              Annual
            </Text>
          </TouchableOpacity>
        </View>

        {/* Section Header */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Plans for every stage of your salon</Text>
          <Text style={styles.subtitle}>
            Choose the right tools today and scale effortlessly tomorrow.
          </Text>
        </View>

        {/* Pricing Cards List */}
        {PLANS_DATA.map((plan) => {
          const price = billingPeriod === "month" ? plan.monthlyPrice : plan.annualPrice;
          return (
            <View
              key={plan.id}
              style={[styles.planCard, plan.popular && styles.planCardPopular]}
            >
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularBadgeText}>POPULAR</Text>
                </View>
              )}

              <Text style={styles.planName}>{plan.name}</Text>
              <Text style={styles.planDesc}>{plan.description}</Text>

              {/* Price */}
              <View style={styles.priceRow}>
                <Text style={styles.priceSymbol}>$</Text>
                <Text style={styles.priceAmount}>{price}</Text>
                <Text style={styles.pricePeriod}>
                  {billingPeriod === "month" ? " / month" : " / month (billed annually)"}
                </Text>
              </View>

              {/* Bullets */}
              <View style={styles.bulletsList}>
                {plan.features.map((feat, idx) => (
                  <View key={idx} style={styles.bulletRow}>
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color="#635BFF"
                      style={styles.bulletIcon}
                    />
                    <Text style={styles.bulletText}>{feat}</Text>
                  </View>
                ))}
              </View>

              {/* Button */}
              <TouchableOpacity
                style={[
                  styles.purchaseButton,
                  plan.popular ? styles.purchaseButtonPopular : styles.purchaseButtonStandard,
                ]}
                onPress={() => handlePurchase(plan)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.purchaseButtonText,
                    plan.popular ? styles.purchaseButtonTextPopular : styles.purchaseButtonTextStandard,
                  ]}
                >
                  Purchase Now
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>

      {/* Success Modal Confirmation */}
      <CustomModal
        visible={showSuccessModal}
        onClose={handleCloseSuccess}
        title="Purchase Successful"
      >
        <View style={styles.successModalContent}>
          <Ionicons
            name="checkmark-circle"
            size={56}
            color="#10B981"
            style={styles.successIcon}
          />
          <Text style={styles.successModalTitle}>Thank You!</Text>
          <Text style={styles.successModalText}>
            You have successfully subscribed to the{" "}
            <Text style={styles.boldText}>{selectedPlan?.name}</Text> plan.
          </Text>
          <CustomButton
            title="Go to Dashboard"
            onPress={handleCloseSuccess}
            buttonStyle={styles.successBtn}
          />
        </View>
      </CustomModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  closeBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    fontFamily: "System",
  },
  emptyView: {
    width: 24,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  switchContainer: {
    flexDirection: "row",
    backgroundColor: "#EEECFF",
    borderRadius: 24,
    padding: 4,
    width: 200,
    alignSelf: "center",
    marginBottom: 24,
  },
  switchSegment: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 20,
  },
  switchSegmentActive: {
    backgroundColor: "#635BFF",
  },
  switchText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#635BFF",
    fontFamily: "System",
  },
  switchTextActive: {
    color: "#FFFFFF",
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 28,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#635BFF",
    textAlign: "center",
    marginBottom: 8,
    fontFamily: "System",
  },
  subtitle: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 18,
    fontFamily: "System",
  },
  planCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  planCardPopular: {
    borderColor: "#635BFF",
  },
  popularBadge: {
    position: "absolute",
    top: -10,
    right: 20,
    backgroundColor: "#EEECFF",
    borderWidth: 1,
    borderColor: "#635BFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 2,
  },
  popularBadgeText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#635BFF",
    fontFamily: "System",
  },
  planName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 6,
    fontFamily: "System",
  },
  planDesc: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 16,
    lineHeight: 16,
    fontFamily: "System",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 20,
  },
  priceSymbol: {
    fontSize: 20,
    fontWeight: "700",
    color: "#635BFF",
    fontFamily: "System",
  },
  priceAmount: {
    fontSize: 32,
    fontWeight: "800",
    color: "#635BFF",
    fontFamily: "System",
  },
  pricePeriod: {
    fontSize: 12,
    fontWeight: "600",
    color: "#9CA3AF",
    fontFamily: "System",
  },
  bulletsList: {
    marginBottom: 24,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  bulletIcon: {
    marginRight: 10,
  },
  bulletText: {
    fontSize: 13,
    color: "#4B5563",
    fontWeight: "500",
    fontFamily: "System",
  },
  purchaseButton: {
    width: "100%",
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  purchaseButtonStandard: {
    backgroundColor: "#EEECFF",
  },
  purchaseButtonPopular: {
    backgroundColor: "#635BFF",
  },
  purchaseButtonText: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "System",
  },
  purchaseButtonTextStandard: {
    color: "#635BFF",
  },
  purchaseButtonTextPopular: {
    color: "#FFFFFF",
  },

  // Modal styling
  successModalContent: {
    alignItems: "center",
    paddingVertical: 10,
  },
  successIcon: {
    marginBottom: 16,
  },
  successModalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
    fontFamily: "System",
  },
  successModalText: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 24,
    fontFamily: "System",
  },
  boldText: {
    fontWeight: "700",
    color: "#111827",
  },
  successBtn: {
    width: "100%",
  },
});
