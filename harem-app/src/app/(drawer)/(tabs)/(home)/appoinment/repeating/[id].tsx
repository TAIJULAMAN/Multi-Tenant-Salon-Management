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
import Avatar from "@/components/Avatar";
import DateTimePicker from "@expo/ui/community/datetime-picker";
import { SegmentedControl } from "@/components/ui/SegmentedControl";

type FrequencyType = "Daily" | "Weekly" | "Monthly" | "Yearly";
type EndOptionType = "never" | "after" | "date";

export default function SetRepeatingScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const insets = useSafeAreaInsets();

  // Repeating parameters state
  const [frequency, setFrequency] = useState<FrequencyType>("Weekly");
  const [repeatEvery, setRepeatEvery] = useState("1");
  const [selectedDays, setSelectedDays] = useState<Record<string, boolean>>({
    Mon: true, // Monday selected by default
  });
  const [endOption, setEndOption] = useState<EndOptionType>("after");
  const [endAfterCount, setEndAfterCount] = useState("3");
  const [endSpecificDate, setEndSpecificDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const toggleDay = (day: string) => {
    setSelectedDays((prev) => ({
      ...prev,
      [day]: !prev[day],
    }));
  };

  const handleConfirm = () => {
    Alert.alert("Success", "Repetition details configured successfully!", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  // Helper: compute preview texts based on selection
  const getFrequencyPreview = () => {
    if (frequency === "Daily") {
      return repeatEvery === "1" ? "Every Day" : `Every ${repeatEvery} Days`;
    }
    if (frequency === "Weekly") {
      const activeDays = daysOfWeek.filter((d) => selectedDays[d]);
      if (activeDays.length === 0) return "Select weekdays";
      if (activeDays.length === 7) return "Every Day";
      
      // format day name
      const dayNames = activeDays.map((d) => {
        if (d === "Sun") return "Sunday";
        if (d === "Mon") return "Monday";
        if (d === "Tue") return "Tuesday";
        if (d === "Wed") return "Wednesday";
        if (d === "Thu") return "Thursday";
        if (d === "Fri") return "Friday";
        return "Saturday";
      });

      const repeatText = repeatEvery === "1" ? "Every" : `Every ${repeatEvery} weeks on`;
      return `${repeatText} ${dayNames.join(", ")}`;
    }
    if (frequency === "Monthly") {
      return repeatEvery === "1" ? "Every Month" : `Every ${repeatEvery} Months`;
    }
    return repeatEvery === "1" ? "Every Year" : `Every ${repeatEvery} Years`;
  };

  const getAppointmentsCountPreview = () => {
    if (endOption === "never") return "∞";
    if (endOption === "after") return endAfterCount || "0";
    if (endOption === "date") {
      return endSpecificDate
        ? `Until ${endSpecificDate.toLocaleDateString()}`
        : "Select Date";
    }
    return "∞";
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 15) }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Set as Repeating</Text>
        </View>
        <View style={styles.headerRight}>
          <Avatar
            name="Maria Fernandez"
            uri="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
            size={34}
          />
          <View style={styles.avatarStatusDot} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Preview Card */}
        <View style={styles.previewCard}>
          <Text style={styles.previewTitle}>Preview</Text>
          <View style={styles.previewRow}>
            <View style={styles.previewCol}>
              <Text style={styles.previewLabel}>Frequency</Text>
              <View style={styles.frequencyBadge}>
                <Text style={styles.frequencyBadgeText}>{getFrequencyPreview()}</Text>
              </View>
            </View>
            <View style={styles.previewCol}>
              <Text style={styles.previewLabel}>Number of appointments</Text>
              <Text style={styles.appointmentsCountText}>{getAppointmentsCountPreview()}</Text>
            </View>
          </View>
        </View>

        {/* Frequency Tab Selection */}
        <Text style={styles.sectionLabel}>Frequency</Text>
        <SegmentedControl
          values={["Daily", "Weekly", "Monthly", "Yearly"]}
          selectedIndex={["Daily", "Weekly", "Monthly", "Yearly"].indexOf(frequency)}
          onValueChange={(val) => setFrequency(val as FrequencyType)}
          tintColor="#5C55FF"
          style={styles.segmentedControl}
          appearance="light"
        />

        {/* Repetition details */}
        <Text style={styles.sectionLabel}>Repetition details</Text>
        <View style={styles.repetitionDetailsRow}>
          <Text style={styles.repeatEveryLabel}>Repeat every</Text>
          <TextInput
            style={styles.repeatEveryInput}
            keyboardType="number-pad"
            value={repeatEvery}
            onChangeText={setRepeatEvery}
          />
          <Text style={styles.repeatUnitText}>
            {frequency === "Daily"
              ? "day(s)"
              : frequency === "Weekly"
              ? "week(s)"
              : frequency === "Monthly"
              ? "month(s)"
              : "year(s)"}
          </Text>
        </View>

        {/* Days of the week (Shown only for Weekly) */}
        {frequency === "Weekly" && (
          <View style={styles.daysContainer}>
            <Text style={styles.sectionLabel}>Days of the week</Text>
            <View style={styles.daysRow}>
              {daysOfWeek.map((day) => {
                const isSelected = !!selectedDays[day];
                return (
                  <TouchableOpacity
                    key={day}
                    style={[styles.dayButton, isSelected && styles.dayButtonActive]}
                    onPress={() => toggleDay(day)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.dayButtonText, isSelected && styles.dayButtonTextActive]}>
                      {day}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* End of Repetition */}
        <Text style={styles.sectionLabel}>End of repetition</Text>
        <View style={styles.endRepetitionCard}>
          {/* Radio 1: Never */}
          <TouchableOpacity
            style={styles.radioRow}
            onPress={() => setEndOption("never")}
            activeOpacity={0.7}
          >
            <View style={styles.radioButton}>
              {endOption === "never" && <View style={styles.radioDot} />}
            </View>
            <Text style={styles.radioText}>Never</Text>
          </TouchableOpacity>

          {/* Radio 2: After X times */}
          <View style={styles.radioRow}>
            <TouchableOpacity
              style={styles.radioLeftRow}
              onPress={() => setEndOption("after")}
              activeOpacity={0.7}
            >
              <View style={styles.radioButton}>
                {endOption === "after" && <View style={styles.radioDot} />}
              </View>
              <Text style={styles.radioText}>After</Text>
            </TouchableOpacity>
            <View style={styles.inputInlineWrapper}>
              <TextInput
                style={[
                  styles.inlineInput,
                  endOption !== "after" && styles.inlineInputDisabled,
                ]}
                keyboardType="number-pad"
                editable={endOption === "after"}
                value={endAfterCount}
                onChangeText={setEndAfterCount}
              />
              <Text style={styles.inlineLabelText}>time(s)</Text>
            </View>
          </View>

          {/* Radio 3: Specific Date */}
          <View style={styles.radioRow}>
            <TouchableOpacity
              style={styles.radioLeftRow}
              onPress={() => setEndOption("date")}
              activeOpacity={0.7}
            >
              <View style={styles.radioButton}>
                {endOption === "date" && <View style={styles.radioDot} />}
              </View>
              <Text style={styles.radioText}>In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.inlineDatePickerBtn,
                endOption !== "date" && styles.inlineDatePickerBtnDisabled,
              ]}
              disabled={endOption !== "date"}
              onPress={() => setShowDatePicker(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.datePickerBtnText}>
                {endSpecificDate
                  ? endSpecificDate.toLocaleDateString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    })
                  : "mm/dd/yyyy"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity
          style={styles.btnConfirm}
          onPress={handleConfirm}
          activeOpacity={0.8}
        >
          <Text style={styles.btnConfirmText}>Confirm</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={endSpecificDate || new Date()}
          mode="date"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) {
              setEndSpecificDate(date);
            }
          }}
        />
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
    paddingBottom: 40,
  },
  previewCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    padding: 16,
    marginBottom: 24,
  },
  previewTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 14,
    color: "#1F2937",
    marginBottom: 16,
  },
  previewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  previewCol: {
    flex: 1,
  },
  previewLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: "#9CA3AF",
    marginBottom: 8,
  },
  frequencyBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  frequencyBadgeText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#059669",
  },
  appointmentsCountText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 16,
    color: "#1F2937",
  },
  sectionLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 11,
    color: "#9CA3AF",
    textTransform: "uppercase",
    marginBottom: 10,
    marginLeft: 2,
  },
  segmentedControl: {
    marginBottom: 24,
    height: 40,
  },
  repetitionDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 14,
    height: 50,
    marginBottom: 24,
  },
  repeatEveryLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 13,
    color: "#4B5563",
    marginRight: 10,
  },
  repeatEveryInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    width: 40,
    height: 40,
    textAlign: "center",
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14,
    color: "#1F2937",
    marginRight: 10,
  },
  repeatUnitText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 13,
    color: "#4B5563",
  },
  daysContainer: {
    marginBottom: 24,
  },
  daysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  dayButtonActive: {
    backgroundColor: "#5C55FF",
    borderColor: "#5C55FF",
  },
  dayButtonText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: "#4B5563",
  },
  dayButtonTextActive: {
    color: "#FFFFFF",
    fontFamily: "Manrope_700Bold",
  },
  endRepetitionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 30,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  radioLeftRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  radioButton: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#5C55FF",
  },
  radioText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 14,
    color: "#374151",
  },
  inputInlineWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  inlineInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    width: 40,
    height: 40,
    paddingVertical: 0,
    textAlign: "center",
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14,
    color: "#1F2937",
    marginRight: 8,
  },
  inlineInputDisabled: {
    backgroundColor: "#F3F4F6",
    borderColor: "#E5E7EB",
    color: "#9CA3AF",
  },
  inlineLabelText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 13,
    color: "#4B5563",
  },
  inlineDatePickerBtn: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 36,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  inlineDatePickerBtnDisabled: {
    backgroundColor: "#F3F4F6",
    borderColor: "#E5E7EB",
  },
  datePickerBtnText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 13,
    color: "#374151",
  },
  btnConfirm: {
    backgroundColor: "#5C55FF",
    height: 46,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#5C55FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  btnConfirmText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 14,
    color: "#FFFFFF",
  },
});
