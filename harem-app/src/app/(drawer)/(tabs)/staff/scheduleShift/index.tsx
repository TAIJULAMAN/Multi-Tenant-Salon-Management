import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Avatar from "@/components/Avatar";
import { staffStore, StaffMember } from "@/components/staff/CreateStaff/staffStore";
import { shiftsStore, Shift } from "@/components/staff/shiftsStore";
import BottomSheet from "@/components/ui/BottomSheet";

const TIME_OPTIONS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30", "22:00"
];

export default function ScheduledShiftsIndexScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Selected week starting Monday date
  const [weekStart, setWeekStart] = useState<Date>(new Date(2024, 7, 11)); // Aug 11, 2024
  const [shifts, setShifts] = useState<Shift[]>(shiftsStore.getShifts());
  const [selectedMemberFilter, setSelectedMemberFilter] = useState<string>("All Members");
  const [showFilterDropdown, setShowFilterDropdown] = useState<boolean>(false);
  const [members, setMembers] = useState<StaffMember[]>([]);

  // Modal and Edit states
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  
  // Fields for Modal
  const [modalMemberName, setModalMemberName] = useState<string>("");
  const [modalDateStr, setModalDateStr] = useState<string>("");
  const [modalStartTime, setModalStartTime] = useState<string>("");
  const [modalEndTime, setModalEndTime] = useState<string>("");
  
  // Custom picker modal states
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [timePickerTarget, setTimePickerTarget] = useState<"start" | "end" | null>(null);

  // Delete Confirmation state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);

  useEffect(() => {
    // Get members from staffStore
    const storeMembers = staffStore.getMembers();
    setMembers(storeMembers);

    // Subscribe to shifts store changes
    const unsubscribe = shiftsStore.subscribe(() => {
      setShifts(shiftsStore.getShifts());
    });

    return unsubscribe;
  }, []);

  // Format Date Range: e.g. "Aug 11 - Aug 17, 2024"
  const getWeekRangeString = () => {
    const start = new Date(weekStart);
    const end = new Date(weekStart);
    end.setDate(start.getDate() + 6);

    const formatMonthDay = (date: Date) => {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${months[date.getMonth()]} ${date.getDate()}`;
    };

    return `${formatMonthDay(start)} - ${formatMonthDay(end)}, ${start.getFullYear()}`;
  };

  // Navigate Weeks
  const handlePrevWeek = () => {
    const prev = new Date(weekStart);
    prev.setDate(prev.getDate() - 7);
    setWeekStart(prev);
  };

  const handleNextWeek = () => {
    const next = new Date(weekStart);
    next.setDate(next.getDate() + 7);
    setWeekStart(next);
  };

  // Generate 7 days for the selected week
  const getWeekDays = () => {
    const days = [];
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);
      
      const dayName = weekdays[date.getDay()];
      const dayNum = date.getDate();
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const monthStr = monthNames[date.getMonth()];
      
      // YYYY-MM-DD format
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(dayNum).padStart(2, "0");
      const formattedDateStr = `${year}-${month}-${day}`;

      days.push({
        dayHeader: `${dayName}, ${dayNum} ${monthStr}`,
        dateStr: formattedDateStr,
      });
    }
    return days;
  };

  const weekDays = getWeekDays();

  // Calculate shift duration
  const getShiftDuration = (start: string, end: string) => {
    if (!start || !end) return "0h";
    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);
    
    let totalMinutes = (endH * 60 + endM) - (startH * 60 + startM);
    if (totalMinutes < 0) totalMinutes += 24 * 60; // handle overnight

    const hours = totalMinutes / 60;
    return `Total: ${hours.toFixed(0)}h`;
  };

  // Edit Shift Trigger
  const handleEditPress = (shift: Shift) => {
    setSelectedShift(shift);
    setModalMemberName(shift.memberName);
    setModalDateStr(shift.dateStr);
    setModalStartTime(shift.startTime);
    setModalEndTime(shift.endTime);
    setShowDeleteConfirm(false);
    setModalVisible(true);
  };

  // Delete Shift Action
  const handleDeleteConfirm = () => {
    if (selectedShift) {
      shiftsStore.deleteShift(selectedShift.id);
      setModalVisible(false);
      setShowDeleteConfirm(false);
      setSelectedShift(null);
    }
  };

  // Save Shift Action
  const handleSaveShift = () => {
    if (!modalMemberName || !modalDateStr || !modalStartTime || !modalEndTime) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const durationStr = getShiftDuration(modalStartTime, modalEndTime);
    const hoursNumStr = durationStr.replace("Total: ", "");

    if (selectedShift) {
      shiftsStore.updateShift({
        ...selectedShift,
        memberName: modalMemberName,
        dateStr: modalDateStr,
        startTime: modalStartTime,
        endTime: modalEndTime,
        weeklyTotal: `${parseFloat(hoursNumStr) * 5}h`,
      });
    }
    setModalVisible(false);
  };

  // Get formatted day label for Modal, e.g. "Mon, 11 Aug"
  const getModalDateLabel = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]}`;
  };

  // Unique list of members for the filter
  const filterMemberList = ["All Members", ...Array.from(new Set(shifts.map((s) => s.memberName)))];

  // Filtered shifts based on search/dropdown filter
  const filteredShifts = shifts.filter((s) => {
    if (selectedMemberFilter === "All Members") return true;
    return s.memberName === selectedMemberFilter;
  });

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 15) }]}>
      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scheduled Shifts</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Member Selector Filter */}
        <View style={styles.filterWrapper}>
          <TouchableOpacity
            style={styles.filterSelector}
            onPress={() => setShowFilterDropdown(!showFilterDropdown)}
            activeOpacity={0.8}
          >
            <View style={styles.filterLeft}>
              <Ionicons name="people-outline" size={16} color="#6B7280" style={styles.filterIcon} />
              <Text style={styles.filterText}>{selectedMemberFilter}</Text>
            </View>
            <Ionicons name={showFilterDropdown ? "chevron-up" : "chevron-down"} size={16} color="#6B7280" />
          </TouchableOpacity>

          {showFilterDropdown && (
            <View style={styles.dropdownList}>
              {filterMemberList.map((m) => (
                <TouchableOpacity
                  key={m}
                  style={[styles.dropdownItem, selectedMemberFilter === m && styles.dropdownItemActive]}
                  onPress={() => {
                    setSelectedMemberFilter(m);
                    setShowFilterDropdown(false);
                  }}
                >
                  <Text style={[styles.dropdownItemText, selectedMemberFilter === m && styles.dropdownItemTextActive]}>
                    {m}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Date Selector Navigation */}
        <View style={styles.dateNavWrapper}>
          <View style={styles.dateNavLeft}>
            <Ionicons name="calendar-outline" size={16} color="#6B7280" style={styles.dateNavIcon} />
            <Text style={styles.dateRangeText}>{getWeekRangeString()}</Text>
          </View>
          <View style={styles.dateNavButtons}>
            <TouchableOpacity style={styles.navArrow} onPress={handlePrevWeek}>
              <Ionicons name="chevron-back" size={18} color="#4B5563" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navArrow} onPress={handleNextWeek}>
              <Ionicons name="chevron-forward" size={18} color="#4B5563" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Day-by-Day Shifts List */}
        {weekDays.map((day) => {
          const dayShifts = filteredShifts.filter((s) => s.dateStr === day.dateStr);

          return (
            <View key={day.dateStr} style={styles.daySection}>
              <Text style={styles.dayHeader}>{day.dayHeader}</Text>

              {dayShifts.length > 0 ? (
                dayShifts.map((shift) => (
                  <View key={shift.id} style={styles.shiftCard}>
                    <View style={styles.shiftUser}>
                      <View style={styles.avatarWrapper}>
                        <Avatar name={shift.memberName} uri={shift.avatar} size={36} />
                        <View style={styles.statusIndicator} />
                      </View>
                      <View style={styles.shiftUserInfo}>
                        <Text style={styles.shiftUserName}>{shift.memberName}</Text>
                        <Text style={styles.shiftUserHours}>
                          Weekly Total: <Text style={styles.hoursHighlight}>{shift.weeklyTotal}</Text>
                        </Text>
                      </View>
                    </View>

                    <View style={styles.shiftRight}>
                      <View style={styles.shiftTimeBadge}>
                        <Text style={styles.shiftTimeBadgeText}>{`${shift.startTime} - ${shift.endTime}`}</Text>
                      </View>
                      <TouchableOpacity
                        style={styles.shiftEditBtn}
                        onPress={() => handleEditPress(shift)}
                        activeOpacity={0.7}
                      >
                        <Ionicons name="create-outline" size={16} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              ) : (
                <View style={styles.emptyCard}>
                  <View style={styles.emptyIconCircle}>
                    <Ionicons name="time-outline" size={24} color="#9CA3AF" />
                  </View>
                  <Text style={styles.emptyCardText}>No shifts scheduled</Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* FAB (Floating Action Button) */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/staff/scheduleShift/add" as any)}
        activeOpacity={0.85}
      >
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Edit Shift Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          {!showDeleteConfirm ? (
            // ================== EDIT MODAL ==================
            <View style={styles.modalCard}>
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {`Edit ${modalMemberName}'s Shift`}
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseBtn}>
                  <Ionicons name="close" size={22} color="#4B5563" />
                </TouchableOpacity>
              </View>

              {/* Day header & Duration */}
              <View style={styles.modalSubHeader}>
                <Text style={styles.modalSubDate}>{getModalDateLabel(modalDateStr)}</Text>
                <View style={styles.durationBadge}>
                  <Text style={styles.durationBadgeText}>
                    {getShiftDuration(modalStartTime, modalEndTime)}
                  </Text>
                </View>
              </View>

              {/* Form Content */}
              <View style={styles.formGroup}>
                {/* Start Time */}
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>Start Time *</Text>
                  <TouchableOpacity
                    style={styles.pickerButton}
                    onPress={() => {
                      setTimePickerTarget("start");
                      setShowTimePicker(true);
                    }}
                  >
                    <Text style={styles.pickerButtonText}>{modalStartTime || "Select time"}</Text>
                    <Ionicons name="chevron-down" size={16} color="#6B7280" />
                  </TouchableOpacity>
                </View>

                {/* End Time */}
                <View style={styles.formField}>
                  <Text style={styles.fieldLabel}>End Time *</Text>
                  <TouchableOpacity
                    style={styles.pickerButton}
                    onPress={() => {
                      setTimePickerTarget("end");
                      setShowTimePicker(true);
                    }}
                  >
                    <Text style={styles.pickerButtonText}>{modalEndTime || "Select time"}</Text>
                    <Ionicons name="chevron-down" size={16} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Modal Buttons */}
              <View style={styles.modalActionRow}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => setShowDeleteConfirm(true)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="trash-outline" size={16} color="#FFFFFF" style={styles.btnIcon} />
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveShift}
                  activeOpacity={0.85}
                >
                  <Ionicons name="save-outline" size={16} color="#FFFFFF" style={styles.btnIcon} />
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            // ================== DELETE CONFIRMATION OVERLAY ==================
            <View style={styles.deleteCard}>
              <Text style={styles.deleteConfirmText}>Are you sure you want to delete?</Text>
              <View style={styles.deleteActionRow}>
                <TouchableOpacity
                  style={styles.deleteCancelBtn}
                  onPress={() => setShowDeleteConfirm(false)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.deleteCancelBtnText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteConfirmBtn}
                  onPress={handleDeleteConfirm}
                  activeOpacity={0.8}
                >
                  <Text style={styles.deleteConfirmBtnText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modal>

      {/* Internal helper picker: Time Selection */}
      <BottomSheet
        visible={showTimePicker}
        onClose={() => setShowTimePicker(false)}
        title={`Select ${timePickerTarget === "start" ? "Start" : "End"} Time`}
      >
        <FlatList
          data={TIME_OPTIONS}
          keyExtractor={(item) => item}
          style={{ maxHeight: 250 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.subPickerItem}
              onPress={() => {
                if (timePickerTarget === "start") {
                  setModalStartTime(item);
                } else {
                  setModalEndTime(item);
                }
                setShowTimePicker(false);
              }}
            >
              <Text style={styles.subPickerItemText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity style={styles.subPickerCloseBtn} onPress={() => setShowTimePicker(false)}>
          <Text style={styles.subPickerCloseText}>Close</Text>
        </TouchableOpacity>
      </BottomSheet>
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
    fontSize: 16,
    fontFamily: "Manrope_700Bold",
    color: "#111827",
  },
  headerRightPlaceholder: {
    width: 40,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  filterWrapper: {
    position: "relative",
    zIndex: 10,
    marginBottom: 12,
  },
  filterSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterIcon: {
    marginRight: 8,
  },
  filterText: {
    fontSize: 13,
    fontFamily: "Manrope_600SemiBold",
    color: "#1F2937",
  },
  dropdownList: {
    position: "absolute",
    top: 52,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    zIndex: 999,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  dropdownItemActive: {
    backgroundColor: "#F0EFFF",
  },
  dropdownItemText: {
    fontSize: 13,
    fontFamily: "Manrope_500Medium",
    color: "#4B5563",
  },
  dropdownItemTextActive: {
    color: "#5C55FF",
    fontFamily: "Manrope_600SemiBold",
  },
  dateNavWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  dateNavLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateNavIcon: {
    marginRight: 8,
  },
  dateRangeText: {
    fontSize: 13,
    fontFamily: "Manrope_600SemiBold",
    color: "#1F2937",
  },
  dateNavButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  navArrow: {
    padding: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 6,
    marginLeft: 8,
  },
  daySection: {
    marginBottom: 16,
  },
  dayHeader: {
    fontSize: 12,
    fontFamily: "Manrope_600SemiBold",
    color: "#9CA3AF",
    marginBottom: 8,
  },
  shiftCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.01,
    shadowRadius: 3,
    elevation: 1,
  },
  shiftUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarWrapper: {
    position: "relative",
  },
  statusIndicator: {
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
  shiftUserInfo: {
    marginLeft: 10,
  },
  shiftUserName: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 13,
    color: "#1F2937",
  },
  shiftUserHours: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 1,
  },
  hoursHighlight: {
    fontFamily: "Manrope_700Bold",
    color: "#5C55FF",
  },
  shiftRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  shiftTimeBadge: {
    backgroundColor: "#F0EFFF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
  },
  shiftTimeBadgeText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 11,
    color: "#5C55FF",
  },
  shiftEditBtn: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: "#5C55FF",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 16,
    justifyContent: "center",
    height: 60,
  },
  emptyIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  emptyCardText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: "#9CA3AF",
  },
  fab: {
    position: "absolute",
    bottom: 50,
    right: 24,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#5C55FF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    zIndex: 99,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  modalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 360,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 15,
    fontFamily: "Manrope_700Bold",
    color: "#111827",
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalSubHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  modalSubDate: {
    fontSize: 13,
    fontFamily: "Manrope_600SemiBold",
    color: "#4B5563",
  },
  durationBadge: {
    backgroundColor: "#F0EFFF",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  durationBadgeText: {
    fontSize: 10,
    fontFamily: "Manrope_700Bold",
    color: "#5C55FF",
  },
  formGroup: {
    marginBottom: 24,
  },
  formField: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 11,
    fontFamily: "Manrope_700Bold",
    color: "#1F2937",
    marginBottom: 6,
  },
  pickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  pickerButtonText: {
    fontSize: 13,
    fontFamily: "Manrope_500Medium",
    color: "#4B5563",
  },
  modalActionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EF4444",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  deleteButtonText: {
    fontSize: 12,
    fontFamily: "Manrope_700Bold",
    color: "#FFFFFF",
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5C55FF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1.2,
    justifyContent: "center",
    marginLeft: 12,
  },
  saveButtonText: {
    fontSize: 12,
    fontFamily: "Manrope_700Bold",
    color: "#FFFFFF",
  },
  btnIcon: {
    marginRight: 6,
  },
  deleteCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 320,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  deleteConfirmText: {
    fontSize: 14,
    fontFamily: "Manrope_700Bold",
    color: "#111827",
    marginBottom: 24,
    textAlign: "center",
  },
  deleteActionRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  deleteCancelBtn: {
    flex: 1,
    backgroundColor: "#5C55FF",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 10,
  },
  deleteCancelBtnText: {
    fontSize: 12,
    fontFamily: "Manrope_700Bold",
    color: "#FFFFFF",
  },
  deleteConfirmBtn: {
    flex: 1,
    backgroundColor: "#FF2D55",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 10,
  },
  deleteConfirmBtnText: {
    fontSize: 12,
    fontFamily: "Manrope_700Bold",
    color: "#FFFFFF",
  },
  subPickerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  subPickerCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    maxHeight: "60%",
  },
  subPickerTitle: {
    fontSize: 14,
    fontFamily: "Manrope_700Bold",
    color: "#111827",
    marginBottom: 16,
  },
  subPickerItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  subPickerItemText: {
    fontSize: 13,
    fontFamily: "Manrope_500Medium",
    color: "#1F2937",
  },
  subPickerCloseBtn: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  subPickerCloseText: {
    fontSize: 12,
    fontFamily: "Manrope_600SemiBold",
    color: "#4B5563",
  },
});
