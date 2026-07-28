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
import Avatar from "@/components/Avatar";

export default function AppointmentDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  // Screen interactive states
  const [status, setStatus] = useState("Booked");
  const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
  const [note, setNote] = useState(
    "Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
  );
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteInputValue, setNoteInputValue] = useState(note);
  const [expandedServices, setExpandedServices] = useState<Record<string, boolean>>({
    "3": true, // Beard trim expanded by default as shown in mockup
  });

  const statuses = ["Booked", "Confirmed", "Arrived", "Started", "Completed", "Cancelled"];

  const toggleService = (serviceId: string) => {
    setExpandedServices((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }));
  };

  const handleSaveNote = () => {
    setNote(noteInputValue);
    setIsEditingNote(false);
  };

  const getStatusStyle = (currentStatus: string) => {
    switch (currentStatus) {
      case "Booked":
        return { bg: "#F0EFFF", text: "#5C55FF" };
      case "Confirmed":
        return { bg: "#EBFDF5", text: "#10B981" };
      case "Arrived":
        return { bg: "#FFFBEB", text: "#F59E0B" };
      case "Started":
        return { bg: "#E0F2FE", text: "#0284C7" };
      case "Completed":
        return { bg: "#EBFDF5", text: "#10B981" };
      case "Cancelled":
        return { bg: "#FEF2F2", text: "#EF4444" };
      default:
        return { bg: "#F3F4F6", text: "#4B5563" };
    }
  };

  const activeStatusStyle = getStatusStyle(status);

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 15) }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>View Appointment</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.headerAvatarWrapper}>
            <Avatar
              name="Maria Fernandez"
              uri="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
              size={34}
            />
            <View style={styles.avatarStatusDot} />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Basic Informations Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Basic Informations</Text>
            <Text style={styles.apptIdBadge}>#000</Text>
          </View>

          {/* Profile Section */}
          <View style={styles.profileRow}>
            <Avatar
              name="Maria Fernandez"
              uri="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
              size={48}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Maria Fernandez</Text>
              <Text style={styles.profileEmail}>maria@gmail.com</Text>
            </View>
            <TouchableOpacity style={styles.viewProfileBtn} activeOpacity={0.7}>
              <Text style={styles.viewProfileText}>View profile</Text>
            </TouchableOpacity>
          </View>

          {/* Date & Time Grid */}
          <View style={styles.gridRow}>
            <View style={styles.gridCol}>
              <Text style={styles.gridLabel}>Date</Text>
              <View style={styles.gridValRow}>
                <Ionicons name="calendar-outline" size={16} color="#5C55FF" style={{ marginRight: 6 }} />
                <Text style={styles.gridValue}>02/08/2025</Text>
              </View>
            </View>
            <View style={styles.gridCol}>
              <Text style={styles.gridLabel}>Time</Text>
              <View style={styles.gridValRow}>
                <Ionicons name="time-outline" size={16} color="#5C55FF" style={{ marginRight: 6 }} />
                <Text style={styles.gridValue}>11:00 - 11:15</Text>
              </View>
            </View>
          </View>

          {/* Status & Repeating Grid */}
          <View style={[styles.gridRow, { marginTop: 16 }]}>
            <View style={styles.gridCol}>
              <Text style={styles.gridLabel}>Status</Text>
              <TouchableOpacity
                style={[styles.statusDropdown, { backgroundColor: activeStatusStyle.bg }]}
                onPress={() => setIsStatusModalVisible(true)}
                activeOpacity={0.7}
              >
                <Text style={[styles.statusDropdownText, { color: activeStatusStyle.text }]}>
                  {status}
                </Text>
                <Ionicons name="chevron-down" size={14} color={activeStatusStyle.text} />
              </TouchableOpacity>
            </View>
            <View style={styles.gridCol}>
              <Text style={styles.gridLabel}>Repeating</Text>
              <TouchableOpacity
                style={styles.repeatingBtn}
                activeOpacity={0.7}
                onPress={() => router.push(`/appoinment/repeating/${id}`)}
              >
                <Text style={styles.repeatingBtnText}>Set as Repeating</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Card Action Buttons */}
          <View style={styles.cardActionsRow}>
            <TouchableOpacity style={styles.btnCancel} activeOpacity={0.7}>
              <Text style={styles.btnCancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnEdit}
              activeOpacity={0.7}
              onPress={() => router.push(`/appoinment/edit/${id}`)}
            >
              <Text style={styles.btnEditText}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Appointment Activity Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Appointment Activity</Text>

          <View style={styles.activityTimeline}>
            {/* Step 1 */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineLeftCol}>
                <View style={[styles.activityCircle, styles.activityCircleActive]}>
                  <View style={styles.activityDotInner} />
                </View>
                <View style={styles.timelineVerticalLine} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Appointment Created</Text>
                <Text style={styles.activityTime}>02 Aug 2025 • 07:00</Text>
              </View>
            </View>

            {/* Step 2 */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineLeftCol}>
                <View style={[styles.activityCircle, styles.activityCircleActive]}>
                  <View style={styles.activityDotInner} />
                </View>
                <View style={styles.timelineVerticalLine} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Appointment Confirmed</Text>
                <Text style={styles.activityTime}>02 Aug 2025 • 07:00</Text>
              </View>
            </View>

            {/* Step 3 */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineLeftCol}>
                <View style={[styles.activityCircle, styles.activityCircleActive]}>
                  <View style={styles.activityDotInner} />
                </View>
                <View style={styles.timelineVerticalLine} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Appointment Started</Text>
                <Text style={styles.activityTime}>02 Aug 2025 • 07:00</Text>
              </View>
            </View>

            {/* Step 4 */}
            <View style={styles.timelineItem}>
              <View style={styles.timelineLeftCol}>
                <View style={[styles.activityCircle, styles.activityCircleActive]}>
                  <View style={styles.activityDotInner} />
                </View>
                <View style={styles.timelineVerticalLine} />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Receipt Printed</Text>
                <Text style={styles.activityTime}>02 Aug 2025 • 07:00</Text>
              </View>
            </View>

            {/* Step 5 */}
            <View style={[styles.timelineItem, { marginBottom: 0 }]}>
              <View style={styles.timelineLeftCol}>
                <View style={[styles.activityCircle, styles.activityCircleGreen]}>
                  <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                </View>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Paid</Text>
                <Text style={styles.activityTime}>02 Aug 2025 • 07:00</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Note Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Note</Text>
            <TouchableOpacity
              onPress={() => {
                setNoteInputValue(note);
                setIsEditingNote(true);
              }}
            >
              <Ionicons name="create-outline" size={20} color="#5C55FF" />
            </TouchableOpacity>
          </View>

          {isEditingNote ? (
            <View style={styles.noteEditContainer}>
              <TextInput
                style={styles.noteInput}
                multiline
                value={noteInputValue}
                onChangeText={setNoteInputValue}
              />
              <TouchableOpacity style={styles.btnSaveNote} onPress={handleSaveNote}>
                <Text style={styles.btnSaveNoteText}>Save</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <View style={styles.noteBox}>
                <Text style={styles.noteText}>{note}</Text>
              </View>
              <TouchableOpacity
                style={styles.btnSaveNotePlaceholder}
                onPress={() => {
                  setNoteInputValue(note);
                  setIsEditingNote(true);
                }}
              >
                <Text style={styles.btnSaveNoteText}>Save</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Services Card */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <Text style={styles.cardTitle}>Services</Text>
            <TouchableOpacity style={styles.btnAddService} activeOpacity={0.7}>
              <Ionicons name="add" size={14} color="#5C55FF" style={{ marginRight: 2 }} />
              <Text style={styles.btnAddServiceText}>Add</Text>
            </TouchableOpacity>
          </View>

          {/* Service items list */}
          <View style={styles.servicesList}>
            {/* Service 1: Haircut */}
            <View style={styles.serviceItemWrapper}>
              <TouchableOpacity
                style={styles.serviceItemHeader}
                onPress={() => toggleService("1")}
                activeOpacity={0.7}
              >
                <View style={styles.serviceItemLeft}>
                  <View style={styles.serviceNumBadge}>
                    <Text style={styles.serviceNumText}>1</Text>
                  </View>
                  <Text style={styles.serviceNameText}>Haircut</Text>
                </View>
                <View style={styles.serviceItemRight}>
                  <Text style={styles.servicePriceDot}>•</Text>
                  <Text style={styles.servicePriceText}>€ 170</Text>
                  <Ionicons
                    name={expandedServices["1"] ? "chevron-up" : "chevron-down"}
                    size={18}
                    color="#9CA3AF"
                    style={{ marginLeft: 8 }}
                  />
                </View>
              </TouchableOpacity>
            </View>

            {/* Service 2: Hair coloring */}
            <View style={styles.serviceItemWrapper}>
              <TouchableOpacity
                style={styles.serviceItemHeader}
                onPress={() => toggleService("2")}
                activeOpacity={0.7}
              >
                <View style={styles.serviceItemLeft}>
                  <View style={styles.serviceNumBadge}>
                    <Text style={styles.serviceNumText}>2</Text>
                  </View>
                  <Text style={styles.serviceNameText}>Hair coloring</Text>
                </View>
                <View style={styles.serviceItemRight}>
                  <Text style={styles.servicePriceDot}>•</Text>
                  <Text style={styles.servicePriceText}>€ 170</Text>
                  <Ionicons
                    name={expandedServices["2"] ? "chevron-up" : "chevron-down"}
                    size={18}
                    color="#9CA3AF"
                    style={{ marginLeft: 8 }}
                  />
                </View>
              </TouchableOpacity>
            </View>

            {/* Service 3: Beard trim (Expanded) */}
            <View style={styles.serviceItemWrapper}>
              <TouchableOpacity
                style={styles.serviceItemHeader}
                onPress={() => toggleService("3")}
                activeOpacity={0.7}
              >
                <View style={styles.serviceItemLeft}>
                  <View style={styles.serviceNumBadge}>
                    <Text style={styles.serviceNumText}>3</Text>
                  </View>
                  <Text style={styles.serviceNameText}>Beard trim</Text>
                </View>
                <View style={styles.serviceItemRight}>
                  <Text style={styles.servicePriceDot}>•</Text>
                  <Text style={styles.servicePriceText}>€ 170</Text>
                  <Ionicons
                    name={expandedServices["3"] ? "chevron-up" : "chevron-down"}
                    size={18}
                    color="#9CA3AF"
                    style={{ marginLeft: 8 }}
                  />
                </View>
              </TouchableOpacity>

              {expandedServices["3"] && (
                <View style={styles.serviceExpandedContent}>
                  {/* Duration and Edit */}
                  <View style={styles.expandedMetaRow}>
                    <View style={styles.durationBadge}>
                      <Ionicons name="time" size={14} color="#5C55FF" style={{ marginRight: 4 }} />
                      <Text style={styles.durationText}>15 min</Text>
                    </View>
                    <TouchableOpacity style={styles.editServiceBtn} activeOpacity={0.7}>
                      <Ionicons name="create-outline" size={16} color="#5C55FF" />
                    </TouchableOpacity>
                  </View>

                  {/* Date/Time container */}
                  <View style={styles.dateTimeContainer}>
                    <View style={styles.dateTimeCol}>
                      <Text style={styles.dateTimeLabel}>DATE</Text>
                      <Text style={styles.dateTimeValue}>02/08/2025</Text>
                    </View>
                    <View style={styles.dateTimeDividerLine} />
                    <View style={styles.dateTimeCol}>
                      <Text style={styles.dateTimeLabel}>TIME</Text>
                      <Text style={styles.dateTimeValue}>11:00 - 11:15 AM</Text>
                    </View>
                  </View>

                  {/* Employee Dropdown Selector */}
                  <Text style={styles.employeeLabel}>Employee</Text>
                  <TouchableOpacity style={styles.employeeDropdown} activeOpacity={0.7}>
                    <View style={styles.employeeLeft}>
                      <View style={styles.employeeInitialsBadge}>
                        <Text style={styles.employeeInitialsText}>MR</Text>
                      </View>
                      <Text style={styles.employeeNameText}>Maria Rodriguez</Text>
                    </View>
                    <Ionicons name="chevron-down" size={14} color="#4B5563" />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Service 4: Shampoo */}
            <View style={styles.serviceItemWrapper}>
              <TouchableOpacity
                style={styles.serviceItemHeader}
                onPress={() => toggleService("4")}
                activeOpacity={0.7}
              >
                <View style={styles.serviceItemLeft}>
                  <View style={styles.serviceNumBadge}>
                    <Text style={styles.serviceNumText}>4</Text>
                  </View>
                  <Text style={styles.serviceNameText}>Shampoo</Text>
                </View>
                <View style={styles.serviceItemRight}>
                  <Text style={styles.servicePriceDot}>•</Text>
                  <Text style={styles.servicePriceText}>€ 170</Text>
                  <Ionicons
                    name={expandedServices["4"] ? "chevron-up" : "chevron-down"}
                    size={18}
                    color="#9CA3AF"
                    style={{ marginLeft: 8 }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Services Total Row */}
          <View style={styles.servicesTotalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>€ 170</Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Checkout Button */}
      <View style={styles.checkoutFooter}>
        <TouchableOpacity style={styles.btnCheckout} activeOpacity={0.8}>
          <Text style={styles.btnCheckoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>

      {/* Status Picker Modal */}
      <Modal
        visible={isStatusModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsStatusModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsStatusModalVisible(false)}
        >
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <Text style={styles.modalTitle}>Change Status</Text>
            <ScrollView style={styles.modalScroll}>
              {statuses.map((itemStatus) => {
                const isSelected = itemStatus === status;
                return (
                  <TouchableOpacity
                    key={itemStatus}
                    style={[styles.modalItem, isSelected && styles.modalItemActive]}
                    onPress={() => {
                      setStatus(itemStatus);
                      setIsStatusModalVisible(false);
                    }}
                  >
                    <Text style={[styles.modalItemText, isSelected && styles.modalItemTextActive]}>
                      {itemStatus}
                    </Text>
                    {isSelected && <Ionicons name="checkmark" size={18} color="#5C55FF" />}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </TouchableOpacity>
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
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  headerTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 16,
    color: "#1F2937",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerAvatarWrapper: {
    position: "relative",
  },
  avatarStatusDot: {
    position: "absolute",
    bottom: -1,
    right: -1,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#10B981",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // extra padding to avoid overlapping the checkout button
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 14,
    color: "#1F2937",
  },
  apptIdBadge: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#9CA3AF",
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    marginBottom: 16,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 12,
  },
  profileName: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14,
    color: "#1F2937",
    marginBottom: 2,
  },
  profileEmail: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    color: "#9CA3AF",
  },
  viewProfileBtn: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewProfileText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 11,
    color: "#5C55FF",
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gridCol: {
    width: "48%",
  },
  gridLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: "#9CA3AF",
    marginBottom: 6,
  },
  gridValRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  gridValue: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#1F2937",
  },
  statusDropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "transparent",
  },
  statusDropdownText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
  },
  repeatingBtn: {
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  repeatingBtnText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#059669",
  },
  cardActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  btnCancel: {
    width: "48%",
    height: 38,
    backgroundColor: "#FFF5F5",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  btnCancelText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#EF4444",
  },
  btnEdit: {
    width: "48%",
    height: 38,
    backgroundColor: "#EEF2FF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  btnEditText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#5C55FF",
  },
  // Timeline styles
  activityTimeline: {
    marginTop: 8,
    paddingLeft: 6,
  },
  timelineItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  timelineLeftCol: {
    alignItems: "center",
    width: 24,
    marginRight: 10,
  },
  activityCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  activityCircleActive: {
    borderColor: "#5C55FF",
  },
  activityCircleGreen: {
    borderColor: "#10B981",
    backgroundColor: "#10B981",
  },
  activityDotInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#5C55FF",
  },
  timelineVerticalLine: {
    width: 1,
    height: 32,
    backgroundColor: "#E5E7EB",
    position: "absolute",
    top: 20,
    zIndex: -1,
  },
  activityContent: {
    flex: 1,
    paddingTop: 1,
  },
  activityTitle: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 13,
    color: "#1F2937",
    marginBottom: 2,
  },
  activityTime: {
    fontFamily: "Manrope_400Regular",
    fontSize: 11,
    color: "#9CA3AF",
  },
  // Note styles
  noteBox: {
    backgroundColor: "#F9FAFB",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  noteText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: "#4B5563",
    lineHeight: 18,
  },
  noteEditContainer: {
    marginTop: 4,
  },
  noteInput: {
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: "#1F2937",
    height: 100,
    textAlignVertical: "top",
  },
  btnSaveNote: {
    alignSelf: "flex-end",
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 10,
  },
  btnSaveNotePlaceholder: {
    alignSelf: "flex-end",
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 10,
  },
  btnSaveNoteText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    color: "#5C55FF",
  },
  // Services styles
  btnAddService: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  btnAddServiceText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#5C55FF",
  },
  servicesList: {
    marginTop: 10,
  },
  serviceItemWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    paddingVertical: 12,
  },
  serviceItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  serviceNumBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#E0E7FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  serviceNumText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    color: "#5C55FF",
  },
  serviceNameText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 13,
    color: "#1F2937",
  },
  serviceItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  servicePriceDot: {
    fontSize: 12,
    color: "#5C55FF",
    marginRight: 6,
  },
  servicePriceText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#5C55FF",
  },
  // Expanded service styling
  serviceExpandedContent: {
    marginTop: 12,
    paddingLeft: 30,
  },
  expandedMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  durationBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  durationText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 11,
    color: "#5C55FF",
  },
  editServiceBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  dateTimeContainer: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  dateTimeCol: {
    flex: 1,
  },
  dateTimeLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 9,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  dateTimeValue: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 11,
    color: "#1F2937",
  },
  dateTimeDividerLine: {
    width: 1,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 12,
  },
  employeeLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: "#9CA3AF",
    marginBottom: 6,
  },
  employeeDropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
  },
  employeeLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  employeeInitialsBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#5C55FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  employeeInitialsText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
    color: "#FFFFFF",
  },
  employeeNameText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#1F2937",
  },
  servicesTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    paddingTop: 12,
  },
  totalLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 13,
    color: "#9CA3AF",
  },
  totalValue: {
    fontFamily: "Manrope_700Bold",
    fontSize: 16,
    color: "#1F2937",
  },
  // Floating Footer Styles
  checkoutFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  btnCheckout: {
    backgroundColor: "#5C55FF",
    height: 44,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#5C55FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  btnCheckoutText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 14,
    color: "#FFFFFF",
  },
  // Modal dialog styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    maxHeight: "50%",
  },
  modalTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 16,
    color: "#1F2937",
    marginBottom: 16,
    textAlign: "center",
  },
  modalScroll: {
    marginBottom: 10,
  },
  modalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  modalItemActive: {
    borderBottomColor: "#EEF2FF",
  },
  modalItemText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 14,
    color: "#4B5563",
  },
  modalItemTextActive: {
    fontFamily: "Manrope_700Bold",
    fontSize: 14,
    color: "#5C55FF",
  },
});
