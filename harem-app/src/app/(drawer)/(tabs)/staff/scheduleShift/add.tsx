import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
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

const DAYS_OF_WEEK = [
  { label: "Mon", offset: 0 },
  { label: "Tue", offset: 1 },
  { label: "Wed", offset: 2 },
  { label: "Thu", offset: 3 },
  { label: "Fri", offset: 4 },
  { label: "Sat", offset: 5 },
  { label: "Sun", offset: 6 },
];

export default function AddShiftScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [members, setMembers] = useState<StaffMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<StaffMember | null>(null);
  
  // Date range and start date of week
  const [weekStart, setWeekStart] = useState<Date>(new Date(2024, 7, 11)); // Aug 11, 2024
  
  // Form fields
  const [startTime, setStartTime] = useState<string>("10:00");
  const [endTime, setEndTime] = useState<string>("19:00");
  const [isRecurring, setIsRecurring] = useState<boolean>(true); // default as Left image (Recurring)
  const [repeatWeeks, setRepeatWeeks] = useState<string>("2"); // default "2" for Recurring
  const [selectedDays, setSelectedDays] = useState<string[]>(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]); // default for Recurring

  // Picker modals
  const [showMemberPicker, setShowMemberPicker] = useState<boolean>(false);
  const [showTimePicker, setShowTimePicker] = useState<boolean>(false);
  const [timePickerTarget, setTimePickerTarget] = useState<"start" | "end" | null>(null);

  useEffect(() => {
    const storeMembers = staffStore.getMembers();
    setMembers(storeMembers);
    if (storeMembers.length > 0) {
      setSelectedMember(storeMembers[0]);
    }
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

  // Change selection behavior based on once / recurring toggle
  const handleRepetitionChange = (recurring: boolean) => {
    setIsRecurring(recurring);
    if (recurring) {
      setRepeatWeeks("2");
      setSelectedDays(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
    } else {
      setRepeatWeeks("0");
      setSelectedDays(["Mon", "Sat"]); // default for Once
    }
  };

  // Toggle Day Selection
  const toggleDaySelection = (dayLabel: string) => {
    if (selectedDays.includes(dayLabel)) {
      setSelectedDays(selectedDays.filter((d) => d !== dayLabel));
    } else {
      setSelectedDays([...selectedDays, dayLabel]);
    }
  };

  // Confirm / Create Shift
  const handleConfirm = () => {
    if (!selectedMember) {
      Alert.alert("Error", "Please select a staff member.");
      return;
    }

    if (selectedDays.length === 0) {
      Alert.alert("Error", "Please select at least one day of the week.");
      return;
    }

    const durationH = () => {
      const [startH, startM] = startTime.split(":").map(Number);
      const [endH, endM] = endTime.split(":").map(Number);
      let totalMinutes = (endH * 60 + endM) - (startH * 60 + startM);
      if (totalMinutes < 0) totalMinutes += 24 * 60;
      return totalMinutes / 60;
    };

    const hours = durationH();
    const multiplier = isRecurring ? Math.max(1, parseInt(repeatWeeks) || 1) : 1;
    const weeklyTotalStr = `${(hours * selectedDays.length * multiplier).toFixed(0)}h`;

    const weeksCount = isRecurring ? (parseInt(repeatWeeks) || 1) : 1;

    // Create shifts for each selected day & repeat for each week
    for (let w = 0; w < weeksCount; w++) {
      selectedDays.forEach((dayLabel) => {
        const dayOffset = DAYS_OF_WEEK.find((d) => d.label === dayLabel)?.offset || 0;
        const shiftDate = new Date(weekStart);
        shiftDate.setDate(shiftDate.getDate() + dayOffset + (w * 7));

        const year = shiftDate.getFullYear();
        const month = String(shiftDate.getMonth() + 1).padStart(2, "0");
        const dateNum = String(shiftDate.getDate()).padStart(2, "0");
        const dateStr = `${year}-${month}-${dateNum}`;

        shiftsStore.addShift({
          memberName: selectedMember.name,
          memberRole: selectedMember.role,
          avatar: selectedMember.avatar,
          dateStr: dateStr,
          startTime: startTime,
          endTime: endTime,
          weeklyTotal: weeklyTotalStr,
          isRecurring: isRecurring,
          repeatWeeks: weeksCount,
          selectedDays: selectedDays,
        });
      });
    }

    Alert.alert("Success", "Shifts scheduled successfully!", [
      { text: "OK", onPress: () => router.back() }
    ]);
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 15) }]}>
      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Shift</Text>
        <View style={styles.headerRight}>
          {selectedMember && (
            <Avatar name={selectedMember.name} uri={selectedMember.avatar} size={28} />
          )}
        </View>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Staff Selector */}
        <View style={styles.formField}>
          <TouchableOpacity
            style={styles.pickerSelector}
            onPress={() => setShowMemberPicker(true)}
            activeOpacity={0.8}
          >
            <View style={styles.pickerLeft}>
              <Ionicons name="people-outline" size={16} color="#6B7280" style={styles.pickerIcon} />
              <Text style={styles.pickerText}>
                {selectedMember ? selectedMember.name : "Select Staff Member"}
              </Text>
            </View>
            <Ionicons name="chevron-down" size={16} color="#6B7280" />
          </TouchableOpacity>
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

        {/* Start Time */}
        <View style={styles.timeField}>
          <Text style={styles.fieldLabel}>Start Time *</Text>
          <TouchableOpacity
            style={styles.timePickerButton}
            onPress={() => {
              setTimePickerTarget("start");
              setShowTimePicker(true);
            }}
          >
            <Text style={styles.timePickerText}>{startTime}</Text>
            <Ionicons name="chevron-down" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* End Time */}
        <View style={styles.timeField}>
          <Text style={styles.fieldLabel}>End Time *</Text>
          <TouchableOpacity
            style={styles.timePickerButton}
            onPress={() => {
              setTimePickerTarget("end");
              setShowTimePicker(true);
            }}
          >
            <Text style={styles.timePickerText}>{endTime}</Text>
            <Ionicons name="chevron-down" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>

        {/* Repetition details */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Repetition details</Text>
        </View>

        {/* Once / Recurring Row */}
        <View style={styles.checkboxRow}>
          {/* Once Checkbox */}
          <TouchableOpacity
            style={styles.checkboxItem}
            onPress={() => handleRepetitionChange(false)}
            activeOpacity={0.8}
          >
            <View style={[styles.checkboxBox, !isRecurring && styles.checkboxBoxSelected]}>
              {!isRecurring && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
            </View>
            <Text style={styles.checkboxLabel}>Once</Text>
          </TouchableOpacity>

          {/* Recurring Checkbox */}
          <TouchableOpacity
            style={styles.checkboxItem}
            onPress={() => handleRepetitionChange(true)}
            activeOpacity={0.8}
          >
            <View style={[styles.checkboxBox, isRecurring && styles.checkboxBoxSelected]}>
              {isRecurring && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
            </View>
            <Text style={styles.checkboxLabel}>Recurring</Text>
          </TouchableOpacity>
        </View>

        {/* Repeat for X Weeks */}
        <View style={[styles.repeatWeeksRow, !isRecurring && styles.disabledContainer]}>
          <Text style={[styles.repeatWeeksText, !isRecurring && styles.disabledText]}>Repeat for</Text>
          <View style={styles.weeksInputWrapper}>
            <TextInput
              style={[styles.weeksInput, !isRecurring && styles.disabledInput]}
              keyboardType="numeric"
              value={repeatWeeks}
              onChangeText={setRepeatWeeks}
              editable={isRecurring}
              maxLength={2}
            />
          </View>
          <Text style={[styles.repeatWeeksText, !isRecurring && styles.disabledText]}>week/s</Text>
        </View>

        {/* Days of the week */}
        <View style={styles.daysHeaderRow}>
          <Text style={styles.daysTitle}>Days of the week</Text>
        </View>

        <View style={styles.daysRow}>
          {DAYS_OF_WEEK.map((day) => {
            const isSelected = selectedDays.includes(day.label);
            return (
              <TouchableOpacity
                key={day.label}
                style={[styles.dayButton, isSelected && styles.dayButtonSelected]}
                onPress={() => toggleDaySelection(day.label)}
                activeOpacity={0.8}
              >
                <Text style={[styles.dayButtonText, isSelected && styles.dayButtonTextSelected]}>
                  {day.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm} activeOpacity={0.85}>
          <Text style={styles.confirmButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>

      {/* Picker: Members */}
      <BottomSheet
        visible={showMemberPicker}
        onClose={() => setShowMemberPicker(false)}
        title="Select Staff Member"
      >
        <FlatList
          data={members}
          keyExtractor={(item) => item.id}
          style={{ maxHeight: 250 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.pickerItem}
              onPress={() => {
                setSelectedMember(item);
                setShowMemberPicker(false);
              }}
            >
              <Text style={styles.pickerItemText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity style={styles.pickerCloseBtn} onPress={() => setShowMemberPicker(false)}>
          <Text style={styles.pickerCloseText}>Close</Text>
        </TouchableOpacity>
      </BottomSheet>

      {/* Picker: Time Selection */}
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
              style={styles.pickerItem}
              onPress={() => {
                if (timePickerTarget === "start") {
                  setStartTime(item);
                } else {
                  setEndTime(item);
                }
                setShowTimePicker(false);
              }}
            >
              <Text style={styles.pickerItemText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity style={styles.pickerCloseBtn} onPress={() => setShowTimePicker(false)}>
          <Text style={styles.pickerCloseText}>Close</Text>
        </TouchableOpacity>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
  headerRight: {
    width: 40,
    alignItems: "flex-end",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  formField: {
    marginBottom: 12,
  },
  pickerSelector: {
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
  pickerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  pickerIcon: {
    marginRight: 8,
  },
  pickerText: {
    fontSize: 13,
    fontFamily: "Manrope_600SemiBold",
    color: "#1F2937",
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
    marginBottom: 20,
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
  timeField: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 11,
    fontFamily: "Manrope_700Bold",
    color: "#1F2937",
    marginBottom: 6,
  },
  timePickerButton: {
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
  timePickerText: {
    fontSize: 13,
    fontFamily: "Manrope_500Medium",
    color: "#1F2937",
  },
  sectionHeader: {
    marginTop: 8,
    marginBottom: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Manrope_700Bold",
    color: "#1F2937",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 24,
  },
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxBox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    backgroundColor: "#FFFFFF",
  },
  checkboxBoxSelected: {
    backgroundColor: "#5C55FF",
    borderColor: "#5C55FF",
  },
  checkboxLabel: {
    fontSize: 12,
    fontFamily: "Manrope_600SemiBold",
    color: "#4B5563",
  },
  repeatWeeksRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 8,
  },
  repeatWeeksText: {
    fontSize: 12,
    fontFamily: "Manrope_600SemiBold",
    color: "#9CA3AF",
  },
  weeksInputWrapper: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 6,
    width: 44,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  weeksInput: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Manrope_700Bold",
    color: "#1F2937",
  },
  disabledContainer: {
    opacity: 0.5,
  },
  disabledText: {
    color: "#D1D5DB",
  },
  disabledInput: {
    color: "#D1D5DB",
  },
  daysHeaderRow: {
    marginBottom: 12,
  },
  daysTitle: {
    fontSize: 11,
    fontFamily: "Manrope_700Bold",
    color: "#1F2937",
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  dayButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  dayButtonSelected: {
    backgroundColor: "#5C55FF",
    borderColor: "#5C55FF",
  },
  dayButtonText: {
    fontSize: 12,
    fontFamily: "Manrope_600SemiBold",
    color: "#1F2937",
  },
  dayButtonTextSelected: {
    color: "#FFFFFF",
  },
  bottomContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    backgroundColor: "#FFFFFF",
  },
  confirmButton: {
    backgroundColor: "#5C55FF",
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButtonText: {
    fontSize: 14,
    fontFamily: "Manrope_700Bold",
    color: "#FFFFFF",
  },
  pickerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  pickerCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    maxHeight: "60%",
  },
  pickerTitle: {
    fontSize: 14,
    fontFamily: "Manrope_700Bold",
    color: "#111827",
    marginBottom: 16,
  },
  pickerItem: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  pickerItemText: {
    fontSize: 13,
    fontFamily: "Manrope_500Medium",
    color: "#1F2937",
  },
  pickerCloseBtn: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  pickerCloseText: {
    fontSize: 12,
    fontFamily: "Manrope_600SemiBold",
    color: "#4B5563",
  },
});
