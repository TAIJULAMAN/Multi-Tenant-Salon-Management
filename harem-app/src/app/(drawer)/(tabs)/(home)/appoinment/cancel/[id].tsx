import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomSheet from "@/components/ui/BottomSheet";

export default function CancelAppointmentScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  // Screen interactive states
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [cancellationDetails, setCancellationDetails] = useState<string>("");
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState<boolean>(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState<boolean>(false);

  // Temporary states inside the bottom sheet
  const [tempReason, setTempReason] = useState<string>("");
  const [tempDetails, setTempDetails] = useState<string>("");

  const reasons = [
    "Client Cancelled",
    "Client Didn't Show Up",
    "Need to Move Appointment",
    "Other",
  ];

  const handleOpenSheet = () => {
    setTempReason(selectedReason);
    setTempDetails(cancellationDetails);
    setIsBottomSheetVisible(true);
  };

  const handleConfirmSheet = () => {
    setSelectedReason(tempReason);
    setCancellationDetails(tempDetails);
    setIsBottomSheetVisible(false);
  };

  const handleCancelAppointment = () => {
    // Show success cancelled overlay
    setIsSuccessModalVisible(true);
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 15) }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cancel Appointment</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.warningContainer}>
          <View style={styles.warningCircle}>
            <Ionicons name="calendar-outline" size={28} color="#EF4444" />
            <View style={styles.badgeCloseIcon}>
              <Ionicons name="close" size={10} color="#FFFFFF" />
            </View>
          </View>
        </View>

        <Text style={styles.warningTitle}>Are you sure you want to cancel this appointment?</Text>
        <Text style={styles.warningSub}>
          If you proceed, your slot will be made available to other clients. This action cannot be undone.
        </Text>

        <Text style={styles.inputLabel}>Reason for cancellation</Text>
        <TouchableOpacity
          style={styles.selectorBtn}
          onPress={handleOpenSheet}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.selectorBtnText,
              !selectedReason && { color: "#9CA3AF" }
            ]}
          >
            {selectedReason || "Select reason"}
          </Text>
          <Ionicons
            name={selectedReason ? "chevron-down" : "chevron-forward"}
            size={18}
            color="#4B5563"
          />
        </TouchableOpacity>

        {selectedReason === "Other" && cancellationDetails.trim().length > 0 && (
          <View style={styles.detailsBox}>
            <Text style={styles.detailsBoxText}>{cancellationDetails}</Text>
          </View>
        )}

        <View style={styles.bottomButtons}>
          <TouchableOpacity
            style={[
              styles.btnCancelAppt,
              !selectedReason && styles.btnCancelApptDisabled,
            ]}
            disabled={!selectedReason}
            onPress={handleCancelAppointment}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.btnCancelApptText,
                !selectedReason && { color: "#9CA3AF" },
              ]}
            >
              Cancel Appointment
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnKeepAppt}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Text style={styles.btnKeepApptText}>Keep Appointment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomSheet
        visible={isBottomSheetVisible}
        onClose={() => setIsBottomSheetVisible(false)}
        title="Select Reason"
      >
        <ScrollView style={styles.sheetScroll} showsVerticalScrollIndicator={false}>
          {tempReason !== "Other" ? (
            reasons.map((r) => {
              const isChecked = tempReason === r;
              return (
                <TouchableOpacity
                  key={r}
                  style={[styles.sheetRow, isChecked && styles.sheetRowChecked]}
                  onPress={() => setTempReason(r)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.sheetRowText}>{r}</Text>
                  <View style={[styles.checkbox, isChecked && styles.checkboxActive]}>
                    {isChecked && <Ionicons name="checkmark" size={10} color="#FFFFFF" />}
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={styles.otherInputWrapper}>
              <TouchableOpacity
                style={[styles.sheetRow, styles.sheetRowChecked]}
                onPress={() => setTempReason("")}
                activeOpacity={0.7}
              >
                <Text style={styles.sheetRowText}>Other</Text>
                <View style={[styles.checkbox, styles.checkboxActive]}>
                  <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                </View>
              </TouchableOpacity>

              <TextInput
                style={styles.otherInputBox}
                placeholder="Please provide details"
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={4}
                maxLength={500}
                value={tempDetails}
                onChangeText={setTempDetails}
              />
              <Text style={styles.charCounter}>{tempDetails.length}/500 letters</Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.sheetButtons}>
          <TouchableOpacity
            style={styles.sheetConfirmBtn}
            onPress={handleConfirmSheet}
            activeOpacity={0.8}
          >
            <Text style={styles.sheetConfirmBtnText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sheetCancelBtn}
            onPress={() => setIsBottomSheetVisible(false)}
            activeOpacity={0.7}
          >
            <Text style={styles.sheetCancelBtnText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>

      {/* Success Cancellation Modal Overlay (Mockup 5) */}
      <Modal
        visible={isSuccessModalVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.successOverlay}>
          <View style={styles.successCard}>
            <View style={styles.successIconCircle}>
              <Ionicons name="trash-outline" size={28} color="#EF4444" />
            </View>
            <Text style={styles.successTitle}>Cancel Appointment</Text>
            <Text style={styles.successSub}>Appointment has been cancelled.</Text>
            <TouchableOpacity
              style={styles.btnBackToCalendar}
              onPress={() => {
                setIsSuccessModalVisible(false);
                router.replace("/appointments");
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.btnBackToCalendarText}>Back to calendar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  headerTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 16,
    color: "#1F2937",
  },
  scrollContent: {
    padding: 24,
    alignItems: "center",
  },
  warningContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  warningCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFF5F5",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  badgeCloseIcon: {
    position: "absolute",
    bottom: 18,
    right: 18,
    backgroundColor: "#EF4444",
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#FFF5F5",
  },
  warningTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 18,
    color: "#1F2937",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  warningSub: {
    fontFamily: "Manrope_500Medium",
    fontSize: 13,
    color: "#EF4444",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  inputLabel: {
    alignSelf: "flex-start",
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: "#4B5563",
    marginBottom: 8,
  },
  selectorBtn: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  selectorBtnText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 14,
    color: "#1F2937",
  },
  detailsBox: {
    width: "100%",
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 14,
    marginBottom: 30,
  },
  detailsBoxText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 13,
    color: "#4B5563",
    lineHeight: 18,
  },
  bottomButtons: {
    width: "100%",
    marginTop: 40,
  },
  btnCancelAppt: {
    backgroundColor: "#5C55FF",
    height: 46,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  btnCancelApptDisabled: {
    backgroundColor: "#E5E7EB",
  },
  btnCancelApptText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 14,
    color: "#FFFFFF",
  },
  btnKeepAppt: {
    borderWidth: 1,
    borderColor: "#5C55FF",
    height: 46,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  btnKeepApptText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 14,
    color: "#5C55FF",
  },
  // Bottom Sheet Styles
  sheetScroll: {
    width: "100%",
    maxHeight: 330,
    marginBottom: 16,
  },
  sheetRow: {
    width: "100%",
    height: 46,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  sheetRowChecked: {
    backgroundColor: "#F5F3FF",
    borderColor: "#5C55FF",
  },
  sheetRowText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 13,
    color: "#111827",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#BFC5D0",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxActive: {
    borderColor: "#5C55FF",
    backgroundColor: "#5C55FF",
  },
  // "Other" details styles inside bottom sheet
  otherInputWrapper: {
    width: "100%",
    marginTop: 0,
  },
  otherInputBox: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: "Manrope_500Medium",
    fontSize: 13,
    color: "#1F2937",
    height: 120,
    textAlignVertical: "top",
    marginTop: 8,
  },
  charCounter: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    color: "#9CA3AF",
    textAlign: "right",
    marginTop: 6,
  },
  // Bottom Sheet Actions
  sheetButtons: {
    width: "100%",
    gap: 8,
  },
  sheetConfirmBtn: {
    width: "100%",
    height: 46,
    backgroundColor: "#5C55FF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  sheetConfirmBtnText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#FFFFFF",
  },
  sheetCancelBtn: {
    width: "100%",
    height: 46,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  sheetCancelBtnText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#5C55FF",
  },
  // Success Cancel Overlay Styles
  successOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  successCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  successIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFF5F5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  successTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 16,
    color: "#1F2937",
    marginBottom: 6,
  },
  successSub: {
    fontFamily: "Manrope_500Medium",
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
  },
  btnBackToCalendar: {
    backgroundColor: "#5C55FF",
    height: 44,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnBackToCalendarText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 14,
    color: "#FFFFFF",
  },
});
