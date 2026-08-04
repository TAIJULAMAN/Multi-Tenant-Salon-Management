import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import CustomInput from "@/components/ui/CustomInput";
import CustomButton from "@/components/ui/CustomButton";
import CustomBottomSheet from "@/components/ui/CustomBottomSheet";

const { width, height } = Dimensions.get("window");

const BUSINESS_TYPES = ["Salon", "Barbershop", "Clinic/Medical", "Spa/Wellness", "Other"];

const GOALS = [
  "Manage team & shifts",
  "Automate reminders",
  "Online bookings",
  "Inventory management",
  "Financial reports",
  "Grow revenue",
];

const CITIES = ["Rome", "Milan", "Naples", "Turin", "Palermo", "Genoa", "Florence"];
const POSTCODES = ["00100", "20100", "80100", "10100", "90100", "16100", "50100"];

export default function SubscriptionIndexScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [step, setStep] = useState(1); // steps 1 to 5 (Step 5 is the paywall)

  // Step 1: Personal Information
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [fullName, setFullName] = useState("Darlene Robertson");
  const [email, setEmail] = useState("wildzr18@gmail.com");
  const [phone, setPhone] = useState("0931567890");

  // Step 2: Contact & Business Information
  const [businessLogo, setBusinessLogo] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [certifiedEmail, setCertifiedEmail] = useState("");
  const [vatId, setVatId] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");

  const [showCityPicker, setShowCityPicker] = useState(false);
  const [showPostcodePicker, setShowPostcodePicker] = useState(false);

  // Step 3: Business Type
  const [selectedBusinessType, setSelectedBusinessType] = useState("");

  // Step 4: Goals
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  // Step 5: Paywall
  const [billingCycle, setBillingCycle] = useState<"annual" | "monthly">("annual");

  const handleNext = () => {
    if (step < 5) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    } else {
      router.back();
    }
  };

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const renderProgressBar = () => {
    if (step > 4) return null;
    return (
      <View style={styles.progressContainer}>
        <Text style={styles.progressHeader}>Verify your identity</Text>
        <View style={styles.progressBarRow}>
          {[1, 2, 3, 4].map((i) => {
            const isActive = i <= step;
            return (
              <View
                key={i}
                style={[
                  styles.progressBarSegment,
                  isActive ? styles.progressBarSegmentActive : styles.progressBarSegmentInactive,
                ]}
              />
            );
          })}
        </View>
        <Text style={styles.stepIndicatorText}>Step {step} of 4</Text>
      </View>
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepWrapper}>
            <Text style={styles.stepTitle}>Your Profile Photo</Text>
            <Text style={styles.stepSubtitle}>
              Upload a professional photo to help others recognize you.
            </Text>

            {/* Photo Upload Circle */}
            <View style={styles.uploadCircleContainer}>
              <TouchableOpacity style={styles.uploadCircle} activeOpacity={0.8}>
                <Ionicons name="camera-outline" size={28} color="#9CA3AF" />
                <View style={styles.editBadge}>
                  <Ionicons name="add" size={14} color="#FFFFFF" />
                </View>
              </TouchableOpacity>
            </View>

            {/* Personal Information Form */}
            <Text style={styles.sectionHeader}>Personal Information</Text>

            <CustomInput
              label="Full Name"
              placeholder="Full Name"
              iconName="person-outline"
              value={fullName}
              onChangeText={setFullName}
            />

            <CustomInput
              label="Email Address"
              placeholder="Email Address"
              iconName="mail-outline"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              editable={false} // Match disabled look in the image
              style={styles.disabledInput}
            />

            <View style={styles.phoneFieldContainer}>
              <Text style={styles.fieldLabel}>Phone number</Text>
              <View style={styles.phoneInputRow}>
                <View style={styles.flagBadge}>
                  <Text style={styles.flagEmoji}>🇮🇹</Text>
                  <Text style={styles.countryCode}>+39</Text>
                </View>
                <TextInput
                  style={styles.phoneInput}
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="0931 567 890"
                />
              </View>
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepWrapper}>
            <Text style={styles.stepTitle}>Your Business Logo</Text>
            <Text style={styles.stepSubtitle}>
              Upload your business logo to help others recognize you.
            </Text>

            {/* Logo Upload Circle */}
            <View style={styles.uploadCircleContainer}>
              <TouchableOpacity style={styles.uploadCircle} activeOpacity={0.8}>
                <Ionicons name="image-outline" size={28} color="#9CA3AF" />
                <View style={styles.editBadge}>
                  <Ionicons name="add" size={14} color="#FFFFFF" />
                </View>
              </TouchableOpacity>
            </View>

            {/* Contact & Business Info Form */}
            <Text style={styles.sectionHeader}>Contact & Business Information</Text>

            <CustomInput
              label="Legal business name"
              placeholder="Enter legal business name"
              iconName="business-outline"
              value={businessName}
              onChangeText={setBusinessName}
            />

            <CustomInput
              label="Certified Email (PEC)"
              placeholder="Company@pec.it"
              iconName="mail-outline"
              value={certifiedEmail}
              onChangeText={setCertifiedEmail}
              keyboardType="email-address"
            />

            <CustomInput
              label="VAT ID *"
              placeholder="e.g. 1234567890"
              iconName="card-outline"
              value={vatId}
              onChangeText={setVatId}
              keyboardType="numeric"
            />

            <CustomInput
              label="Address Line 1"
              placeholder="Office Address"
              iconName="location-outline"
              value={address1}
              onChangeText={setAddress1}
            />

            <CustomInput
              label="Address Line 2"
              placeholder="Office Address"
              iconName="location-outline"
              value={address2}
              onChangeText={setAddress2}
            />

            <View style={styles.dropdownRow}>
              {/* City */}
              <View style={styles.halfField}>
                <Text style={styles.fieldLabel}>City Name</Text>
                <TouchableOpacity
                  style={styles.halfDropdown}
                  onPress={() => setShowCityPicker(true)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.dropdownValueText, !city && styles.placeholderText]}>
                    {city || "Select city"}
                  </Text>
                  <Ionicons name="chevron-down" size={16} color="#6B7280" />
                </TouchableOpacity>
              </View>

              {/* Post Code */}
              <View style={styles.halfField}>
                <Text style={styles.fieldLabel}>Post Code</Text>
                <TouchableOpacity
                  style={styles.halfDropdown}
                  onPress={() => setShowPostcodePicker(true)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.dropdownValueText, !postcode && styles.placeholderText]}>
                    {postcode || "Select code"}
                  </Text>
                  <Ionicons name="chevron-down" size={16} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );

      case 3:
        return (
          <View style={styles.stepWrapper}>
            <Text style={styles.stepTitle}>What best describes Your Business?</Text>
            <Text style={styles.stepSubtitle}>
              This helps us tailor the experience to your business needs.
            </Text>

            <Text style={styles.sectionHeader}>Select one option to continue</Text>

            <View style={styles.businessOptionsContainer}>
              {BUSINESS_TYPES.map((type) => {
                const isSelected = selectedBusinessType === type;
                return (
                  <TouchableOpacity
                    key={type}
                    style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                    onPress={() => setSelectedBusinessType(type)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );

      case 4:
        return (
          <View style={styles.stepWrapper}>
            <Text style={styles.stepTitle}>What are you looking to achieve first?</Text>
            <Text style={styles.stepSubtitle}>
              Choose the goals that are most important to you right now.
            </Text>

            <Text style={styles.sectionHeader}>Select all that apply</Text>

            <View style={styles.goalsContainer}>
              {GOALS.map((goal) => {
                const isSelected = selectedGoals.includes(goal);
                return (
                  <TouchableOpacity
                    key={goal}
                    style={[styles.goalCard, isSelected && styles.goalCardSelected]}
                    onPress={() => toggleGoal(goal)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.goalText, isSelected && styles.goalTextSelected]}>
                      {goal}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  // Render Paywall screen directly (step === 5)
  if (step === 5) {
    return (
      <View style={styles.paywallContainer}>
        {/* Background Image Header */}
        <View style={styles.paywallImageContainer}>
          <Image
            source={require("../../../assets/app/subscription.png")}
            style={styles.paywallImage}
            resizeMode="cover"
          />
          {/* Top Buttons Overlay */}
          <View style={[styles.paywallHeaderRow, { top: Math.max(insets.top, 16) }]}>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => router.replace("/" as any)} // Tapping X returns to root/tabs index
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.restoreBtn} activeOpacity={0.7}>
              <Text style={styles.restoreBtnText}>Restore</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Paywall details */}
        <View style={styles.paywallContent}>
          <Text style={styles.paywallTitle}>Enjoy All Premium Features</Text>

          {/* Bullet points */}
          <View style={styles.bulletsContainer}>
            <View style={styles.bulletRow}>
              <Ionicons name="checkmark-circle" size={20} color="#635BFF" style={styles.bulletIcon} />
              <Text style={styles.bulletText}>Unlimited Appointments</Text>
            </View>
            <View style={styles.bulletRow}>
              <Ionicons name="checkmark-circle" size={20} color="#635BFF" style={styles.bulletIcon} />
              <Text style={styles.bulletText}>Inventory Alerts</Text>
            </View>
            <View style={styles.bulletRow}>
              <Ionicons name="checkmark-circle" size={20} color="#635BFF" style={styles.bulletIcon} />
              <Text style={styles.bulletText}>Tax & Payroll Reports</Text>
            </View>
          </View>

          {/* Pricing cards selection */}
          <View style={styles.billingPlansRow}>
            {/* Annual plan */}
            <TouchableOpacity
              style={[styles.billingCard, billingCycle === "annual" && styles.billingCardSelected]}
              onPress={() => setBillingCycle("annual")}
              activeOpacity={0.85}
            >
              <View style={styles.billingCardLeft}>
                <View style={[styles.radioCircle, billingCycle === "annual" && styles.radioCircleSelected]}>
                  {billingCycle === "annual" && <View style={styles.radioInnerCircle} />}
                </View>
                <Text style={styles.billingPlanLabel}>Annual</Text>
              </View>
              <View style={styles.billingCardRight}>
                <View style={styles.badgeDiscount}>
                  <Text style={styles.badgeDiscountText}>50% OFF</Text>
                </View>
                <Text style={styles.billingPriceText}>$899.10/m</Text>
              </View>
            </TouchableOpacity>

            {/* Monthly plan */}
            <TouchableOpacity
              style={[styles.billingCard, billingCycle === "monthly" && styles.billingCardSelected]}
              onPress={() => setBillingCycle("monthly")}
              activeOpacity={0.85}
            >
              <View style={styles.billingCardLeft}>
                <View style={[styles.radioCircle, billingCycle === "monthly" && styles.radioCircleSelected]}>
                  {billingCycle === "monthly" && <View style={styles.radioInnerCircle} />}
                </View>
                <Text style={styles.billingPlanLabel}>Monthly</Text>
              </View>
              <View style={styles.billingCardRight}>
                <Text style={styles.billingPriceText}>$399.99/m</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Trial / Purchase button */}
          <CustomButton
            title="Start 7 Days Free Trial"
            onPress={() => {
              // Confirm subscription and go to pricing plans
              router.push("/subscription/plans" as any);
            }}
            buttonStyle={styles.trialBtn}
          />

          {/* View all plans link */}
          <TouchableOpacity
            onPress={() => router.push("/subscription/plans" as any)}
            style={styles.allPlansLink}
            activeOpacity={0.7}
          >
            <Text style={styles.allPlansLinkText}>View All Plans</Text>
          </TouchableOpacity>

          <Text style={styles.cancelText}>Cancel anytime. No commitment.</Text>

          {/* Footer links */}
          <View style={styles.paywallFooterLinks}>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.footerLinkText}>Terms of Service</Text>
            </TouchableOpacity>
            <Text style={styles.footerLinkDivider}> | </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.footerLinkText}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Top Progress bar step-by-step indicator */}
      <View style={{ paddingTop: Math.max(insets.top, 12) }}>
        {renderProgressBar()}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderStepContent()}
      </ScrollView>

      {/* Footer Navigation Buttons */}
      <View style={[styles.footerContainer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.continueButton,
            (step === 3 && !selectedBusinessType) || (step === 4 && selectedGoals.length === 0)
              ? styles.continueButtonDisabled
              : null,
          ]}
          onPress={handleNext}
          disabled={(step === 3 && !selectedBusinessType) || (step === 4 && selectedGoals.length === 0)}
          activeOpacity={0.85}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* City Picker Bottom Sheet */}
      <CustomBottomSheet
        visible={showCityPicker}
        onClose={() => setShowCityPicker(false)}
        title="Select City"
      >
        <ScrollView style={styles.pickerScroll} showsVerticalScrollIndicator={false}>
          {CITIES.map((c) => (
            <TouchableOpacity
              key={c}
              style={styles.pickerItem}
              onPress={() => {
                setCity(c);
                setShowCityPicker(false);
              }}
            >
              <Text style={styles.pickerItemText}>{c}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </CustomBottomSheet>

      {/* Postcode Picker Bottom Sheet */}
      <CustomBottomSheet
        visible={showPostcodePicker}
        onClose={() => setShowPostcodePicker(false)}
        title="Select Post Code"
      >
        <ScrollView style={styles.pickerScroll} showsVerticalScrollIndicator={false}>
          {POSTCODES.map((p) => (
            <TouchableOpacity
              key={p}
              style={styles.pickerItem}
              onPress={() => {
                setPostcode(p);
                setShowPostcodePicker(false);
              }}
            >
              <Text style={styles.pickerItemText}>{p}</Text>
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
  progressContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  progressHeader: {
    fontSize: 12,
    fontWeight: "600",
    color: "#635BFF",
    alignSelf: "center",
    marginBottom: 12,
    fontFamily: "System",
  },
  progressBarRow: {
    flexDirection: "row",
    height: 4,
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  progressBarSegment: {
    flex: 1,
    height: "100%",
    borderRadius: 2,
    marginHorizontal: 2,
  },
  progressBarSegmentActive: {
    backgroundColor: "#635BFF",
  },
  progressBarSegmentInactive: {
    backgroundColor: "#E5E7EB",
  },
  stepIndicatorText: {
    fontSize: 10,
    fontWeight: "500",
    color: "#9CA3AF",
    alignSelf: "center",
    fontFamily: "System",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  stepWrapper: {
    width: "100%",
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 6,
    fontFamily: "System",
  },
  stepSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 24,
    fontFamily: "System",
  },
  uploadCircleContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  uploadCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  editBadge: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#6B7280",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: "700",
    color: "#635BFF",
    marginBottom: 16,
    fontFamily: "System",
  },
  disabledInput: {
    backgroundColor: "#F9FAFB",
    color: "#9CA3AF",
  },
  phoneFieldContainer: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
    fontFamily: "System",
  },
  phoneInputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    height: 48,
    backgroundColor: "#FFFFFF",
  },
  flagBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
    height: "100%",
  },
  flagEmoji: {
    fontSize: 16,
    marginRight: 4,
  },
  countryCode: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1F2937",
    fontFamily: "System",
  },
  phoneInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 12,
    color: "#1F2937",
    fontSize: 14,
    fontFamily: "System",
  },
  dropdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfField: {
    width: "48%",
    marginBottom: 16,
  },
  halfDropdown: {
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
  dropdownValueText: {
    fontSize: 14,
    color: "#1F2937",
    fontFamily: "System",
  },
  placeholderText: {
    color: "#9CA3AF",
  },
  businessOptionsContainer: {
    width: "100%",
  },
  optionCard: {
    width: "100%",
    height: 48,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
  },
  optionCardSelected: {
    borderColor: "#635BFF",
    backgroundColor: "#EEECFF",
  },
  optionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4B5563",
    fontFamily: "System",
  },
  optionTextSelected: {
    color: "#635BFF",
    fontWeight: "600",
  },
  goalsContainer: {
    width: "100%",
  },
  goalCard: {
    width: "100%",
    height: 48,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
  },
  goalCardSelected: {
    borderColor: "#635BFF",
    backgroundColor: "#EEECFF",
  },
  goalText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4B5563",
    fontFamily: "System",
  },
  goalTextSelected: {
    color: "#635BFF",
    fontWeight: "600",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    width: "48%",
    height: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#635BFF",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    color: "#635BFF",
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "System",
  },
  continueButton: {
    width: "48%",
    height: 48,
    borderRadius: 12,
    backgroundColor: "#635BFF",
    alignItems: "center",
    justifyContent: "center",
  },
  continueButtonDisabled: {
    opacity: 0.5,
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "System",
  },
  pickerScroll: {
    maxHeight: 250,
  },
  pickerItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  pickerItemText: {
    fontSize: 14,
    color: "#1F2937",
    fontFamily: "System",
  },

  // ================== PAYWALL STYLING ==================
  paywallContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  paywallImageContainer: {
    width: width,
    height: height * 0.45,
    position: "relative",
  },
  paywallImage: {
    width: "100%",
    height: "100%",
  },
  paywallHeaderRow: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  restoreBtn: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  restoreBtnText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "System",
  },
  paywallContent: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingHorizontal: 24,
    paddingTop: 24,
    alignItems: "center",
  },
  paywallTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#635BFF",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "System",
  },
  bulletsContainer: {
    alignSelf: "stretch",
    marginBottom: 24,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
  billingPlansRow: {
    width: "100%",
    marginBottom: 20,
  },
  billingCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
  },
  billingCardSelected: {
    borderColor: "#635BFF",
    backgroundColor: "#EEECFF",
  },
  billingCardLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    backgroundColor: "#FFFFFF",
  },
  radioCircleSelected: {
    borderColor: "#635BFF",
  },
  radioInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#635BFF",
  },
  billingPlanLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    fontFamily: "System",
  },
  billingCardRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  badgeDiscount: {
    backgroundColor: "#EEECFF",
    borderWidth: 1,
    borderColor: "#635BFF",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
  },
  badgeDiscountText: {
    fontSize: 9,
    fontWeight: "700",
    color: "#635BFF",
    fontFamily: "System",
  },
  billingPriceText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2937",
    fontFamily: "System",
  },
  trialBtn: {
    marginBottom: 16,
  },
  allPlansLink: {
    paddingVertical: 4,
    marginBottom: 12,
  },
  allPlansLinkText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#635BFF",
    textDecorationLine: "underline",
    fontFamily: "System",
  },
  cancelText: {
    fontSize: 11,
    color: "#9CA3AF",
    marginBottom: 20,
    fontFamily: "System",
  },
  paywallFooterLinks: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerLinkText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#635BFF",
    fontFamily: "System",
  },
  footerLinkDivider: {
    fontSize: 11,
    color: "#D1D5DB",
  },
});
