import {
  Alert,
  Keyboard,
  KeyboardEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput as RNTextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
  KeyboardAvoidingView,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { staffStore } from "@/components/staff/CreateStaff/staffStore";

// Step Components
import GeneralInfoForm, { GeneralInfoData } from "@/components/staff/CreateStaff/GeneralInfoForm";
import ContactInfoForm, { ContactInfoData } from "@/components/staff/CreateStaff/ContactInfoForm";
import ContractForm, { ContractData } from "@/components/staff/CreateStaff/ContractForm";
import ServicesForm from "@/components/staff/CreateStaff/ServicesForm";

const AVATARS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
];

const STEP_TITLES = [
  "General Information",
  "Contact Information",
  "Contract",
  "Services",
];

export default function AddStaffScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const scrollYRef = useRef(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const footerBottomPadding = Math.max(insets.bottom, 16);
  const footerHeight = 48 + 12 + footerBottomPadding;

  const scrollFocusedInputIntoView = useCallback(
    (activeKeyboardHeight = keyboardHeight) => {
      const focusedInput = RNTextInput.State.currentlyFocusedInput();

      if (!focusedInput) {
        return;
      }

      focusedInput.measureInWindow((_x, y, _width, height) => {
        const visibleBottom = windowHeight - activeKeyboardHeight - footerHeight;
        const overlap = y + height + 16 - visibleBottom;

        if (overlap > 0) {
          scrollRef.current?.scrollTo({
            y: scrollYRef.current + overlap,
            animated: true,
          });
        }
      });
    },
    [footerHeight, keyboardHeight, windowHeight],
  );

  useEffect(() => {
    const handleKeyboardShow = (event: KeyboardEvent) => {
      Keyboard.scheduleLayoutAnimation(event);
      const nextKeyboardHeight = Math.max(
        0,
        event.endCoordinates.height - insets.bottom,
      );

      setKeyboardHeight(nextKeyboardHeight);
      setTimeout(() => scrollFocusedInputIntoView(nextKeyboardHeight), 80);
    };
    const handleKeyboardHide = (event: KeyboardEvent) => {
      Keyboard.scheduleLayoutAnimation(event);
      setKeyboardHeight(0);
    };

    const showSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      handleKeyboardShow,
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      handleKeyboardHide,
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [insets.bottom, scrollFocusedInputIntoView]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollYRef.current = event.nativeEvent.contentOffset.y;
  };

  const handleScrollTouchEnd = () => {
    if (keyboardHeight > 0) {
      setTimeout(() => scrollFocusedInputIntoView(), 80);
    }
  };

  // Step 1: General Info State
  const [generalInfo, setGeneralInfo] = useState<GeneralInfoData>({
    firstName: "",
    lastName: "",
    dob: "",
    address: "",
    city: "",
    province: "",
    cap: "",
  });
  const [generalErrors, setGeneralErrors] = useState<Partial<Record<keyof GeneralInfoData, string>>>({});

  // Step 2: Contact Info State
  const [contactInfo, setContactInfo] = useState<ContactInfoData>({
    email: "",
    telephone: "",
    emergencyContactName: "",
    emergencyContactTelephone: "",
  });
  const [contactErrors, setContactErrors] = useState<Partial<Record<keyof ContactInfoData, string>>>({});

  // Step 3: Contract State
  const [contractInfo, setContractInfo] = useState<ContractData>({
    contractType: "Permanent",
    taxId: "",
    iban: "",
    startDate: "",
    endDate: "",
    role: "",
    remunerationType: "Fixed",
    amount: "",
  });
  const [contractErrors, setContractErrors] = useState<Partial<Record<keyof ContractData, string>>>({});

  // Step 4: Services State
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);

  // Update handlers
  const handleGeneralChange = (key: keyof GeneralInfoData, value: string) => {
    setGeneralInfo((prev) => ({ ...prev, [key]: value }));
    if (generalErrors[key]) {
      setGeneralErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleContactChange = (key: keyof ContactInfoData, value: string) => {
    setContactInfo((prev) => ({ ...prev, [key]: value }));
    if (contactErrors[key]) {
      setContactErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleContractChange = (key: keyof ContractData, value: string) => {
    setContractInfo((prev) => ({ ...prev, [key]: value }));
    if (contractErrors[key]) {
      setContractErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  // Validators
  const validateStep1 = (): boolean => {
    const errors: Partial<Record<keyof GeneralInfoData, string>> = {};
    if (!generalInfo.firstName.trim()) errors.firstName = "First name is required";
    if (!generalInfo.lastName.trim()) errors.lastName = "Last name is required";
    if (!generalInfo.dob.trim()) errors.dob = "Date of birth is required";
    if (!generalInfo.address.trim()) errors.address = "Address is required";
    if (!generalInfo.city.trim()) errors.city = "City is required";
    if (!generalInfo.province.trim()) errors.province = "Province is required";
    if (!generalInfo.cap.trim()) errors.cap = "CAP (ZIP code) is required";
    
    setGeneralErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errors: Partial<Record<keyof ContactInfoData, string>> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactInfo.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(contactInfo.email.trim())) {
      errors.email = "Please enter a valid email address";
    }
    setContactErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep3 = (): boolean => {
    const errors: Partial<Record<keyof ContractData, string>> = {};
    if (!contractInfo.contractType.trim()) errors.contractType = "Contract type is required";
    if (!contractInfo.taxId.trim()) errors.taxId = "Tax ID is required";
    if (!contractInfo.startDate.trim()) errors.startDate = "Start date is required";
    if (!contractInfo.role.trim()) errors.role = "Role is required";
    if (!contractInfo.remunerationType.trim()) errors.remunerationType = "Remuneration type is required";
    setContractErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Navigations
  const handleBack = () => {
    if (currentStep === 1) {
      router.back();
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    } else if (currentStep === 3) {
      if (validateStep3()) setCurrentStep(4);
    } else if (currentStep === 4) {
      // Done - save and exit
      const randomAvatar = AVATARS[Math.floor(Math.random() * AVATARS.length)];
      staffStore.addMember({
        name: `${generalInfo.firstName} ${generalInfo.lastName}`,
        role: contractInfo.role,
        avatar: randomAvatar,
        isSuspended: false,
      });
      Alert.alert("Success", "New staff member added successfully!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    }
  };

  // Progress Bar Calculations
  const progressPercent = (currentStep / 4) * 100;

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: Math.max(insets.top, 15) }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Staff</Text>
        <View style={styles.headerRightSpacer} />
      </View>

      {/* Progress tracker */}
      <View style={styles.progressSection}>
        <View style={styles.progressTextRow}>
          <Text style={styles.stepTitle}>{STEP_TITLES[currentStep - 1]}</Text>
          <Text style={styles.stepCounter}>{currentStep} of 4</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
        </View>
      </View>

      {/* Form Content */}
      <ScrollView
        ref={scrollRef}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        onTouchEnd={handleScrollTouchEnd}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {currentStep === 1 && (
          <GeneralInfoForm
            data={generalInfo}
            onChange={handleGeneralChange}
            errors={generalErrors}
          />
        )}
        {currentStep === 2 && (
          <ContactInfoForm
            data={contactInfo}
            onChange={handleContactChange}
            errors={contactErrors}
          />
        )}
        {currentStep === 3 && (
          <ContractForm
            data={contractInfo}
            onChange={handleContractChange}
            errors={contractErrors}
          />
        )}
        {currentStep === 4 && (
          <ServicesForm
            selectedIds={selectedServiceIds}
            onChange={setSelectedServiceIds}
          />
        )}
      </ScrollView>

      {/* Bottom Button */}
      <View
        style={[
          styles.bottomContainer,
          { paddingBottom: keyboardHeight > 0 ? 16 : 60 },
        ]}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>
            {currentStep === 4 ? "Done" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    paddingHorizontal: 16,
    height: 54,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: "Manrope_700Bold",
    color: "#111827",
    textAlign: "center",
  },
  headerRightSpacer: {
    width: 40,
  },
  progressSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  progressTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  stepTitle: {
    fontSize: 14,
    fontFamily: "Manrope_600SemiBold",
    color: "#374151",
  },
  stepCounter: {
    fontSize: 12,
    fontFamily: "Manrope_500Medium",
    color: "#6B7280",
  },
  progressTrack: {
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#5C55FF",
    borderRadius: 2,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  footerPosition: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 999,
    elevation: 999,
  },
  button: {
    height: 48,
    borderRadius: 8,
    backgroundColor: "#5C55FF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#5C55FF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontSize: 15,
    fontFamily: "Manrope_700Bold",
    color: "#FFFFFF",
  },
});
