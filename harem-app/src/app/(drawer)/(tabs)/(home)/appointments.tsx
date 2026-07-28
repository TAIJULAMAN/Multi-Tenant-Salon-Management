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
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DateTimePicker from "@expo/ui/community/datetime-picker";
import Avatar from "@/components/Avatar";

// Static mock data
const appointmentsData = [
  {
    id: "1",
    name: "Maria Fernandez",
    service: "Full Balayage & Cut",
    status: "Booked",
    time: "12:00 AM - 12:15 AM",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "2",
    name: "Maria Fernandez",
    service: "Full Balayage & Cut",
    status: "Booked",
    time: "12:00 AM - 12:15 AM",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "3",
    name: "Maria Fernandez",
    service: "Full Balayage & Cut",
    status: "Confirmed",
    time: "12:00 AM - 12:15 AM",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "4",
    name: "Maria Fernandez",
    service: "Full Balayage & Cut",
    status: "Confirmed",
    time: "12:00 AM - 12:15 AM",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "5",
    name: "Maria Fernandez",
    service: "Full Balayage & Cut",
    status: "Arrived",
    time: "12:00 AM - 12:15 AM",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "6",
    name: "Maria Fernandez",
    service: "Full Balayage & Cut",
    status: "Arrived",
    time: "12:00 AM - 12:15 AM",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "7",
    name: "Maria Fernandez",
    service: "Full Balayage & Cut",
    status: "Started",
    time: "12:00 AM - 12:15 AM",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "8",
    name: "Maria Fernandez",
    service: "Full Balayage & Cut",
    status: "Started",
    time: "12:00 AM - 12:15 AM",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "9",
    name: "Maria Fernandez",
    service: "Full Balayage & Cut",
    status: "Completed",
    time: "12:00 AM - 12:15 AM",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "10",
    name: "Maria Fernandez",
    service: "Full Balayage & Cut",
    status: "Completed",
    time: "12:00 AM - 12:15 AM",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "11",
    name: "Maria Fernandez",
    service: "Full Balayage & Cut",
    status: "Cancelled",
    time: "12:00 AM - 12:15 AM",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  },
];

interface StepItem {
  number: number;
  status: "To-do" | "Ongoing" | "Completed" | "Cancelled";
  time: string;
  service: string;
  staff: string;
}

export default function AppointmentsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Date picker states
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("Today");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const apptFilters = ["All", "Booked", "Confirmed", "Arrived", "Started", "Completed", "Cancelled"];

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "Booked":
        return { bg: "#F0EFFF", text: "#5C55FF" };
      case "Confirmed":
        return { bg: "#EBFDF5", text: "#10B981" };
      case "Arrived":
        return { bg: "#FFFBEB", text: "#F59E0B" };
      case "Expired":
        return { bg: "#FEF2F2", text: "#EF4444" };
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

  const getFilterColors = (filterName: string) => {
    const name = filterName.toLowerCase();
    switch (name) {
      case "booked":
        return { bg: "#5C55FF", text: "#FFFFFF" };
      case "confirmed":
        return { bg: "#0EA5E9", text: "#FFFFFF" };
      case "arrived":
        return { bg: "#D97706", text: "#FFFFFF" };
      case "started":
        return { bg: "#009688", text: "#FFFFFF" };
      case "completed":
        return { bg: "#10B981", text: "#FFFFFF" };
      case "cancelled":
        return { bg: "#EF4444", text: "#FFFFFF" };
      default:
        return { bg: "#5C55FF", text: "#FFFFFF" };
    }
  };

  const getStepData = (apptStatus: string): StepItem[] => {
    switch (apptStatus) {
      case "Completed":
        return [
          { number: 1, status: "Completed", time: "12:00-12:05", service: "Shampoo", staff: "Angelica" },
          { number: 2, status: "Completed", time: "12:00-12:05", service: "Shampoo", staff: "Angelica" },
          { number: 3, status: "Completed", time: "12:00-12:05", service: "Shampoo", staff: "Angelica" },
        ];
      case "Cancelled":
        return [
          { number: 1, status: "Cancelled", time: "12:00-12:05", service: "Shampoo", staff: "Angelica" },
          { number: 2, status: "Cancelled", time: "12:00-12:05", service: "Shampoo", staff: "Angelica" },
          { number: 3, status: "Cancelled", time: "12:00-12:05", service: "Shampoo", staff: "Angelica" },
        ];
      case "Started":
        return [
          { number: 1, status: "Ongoing", time: "12:00-12:05", service: "Shampoo", staff: "Angelica" },
          { number: 2, status: "To-do", time: "12:00-12:05", service: "Shampoo", staff: "Angelica" },
          { number: 3, status: "To-do", time: "12:00-12:05", service: "Shampoo", staff: "Angelica" },
        ];
      default:
        return [
          { number: 1, status: "To-do", time: "12:00-12:05", service: "Shampoo", staff: "Angelica" },
          { number: 2, status: "To-do", time: "12:00-12:05", service: "Shampoo", staff: "Angelica" },
          { number: 3, status: "To-do", time: "12:00-12:05", service: "Shampoo", staff: "Angelica" },
        ];
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const renderExpandedContent = (item: any) => {
    const steps = getStepData(item.status);

    return (
      <View style={styles.expandedWrapper}>
        <Text style={styles.expandedTitle}>Booking Order</Text>
        <View style={styles.timelineContainer}>
          <View style={styles.timelineLine} />
          <View style={styles.stepsRow}>
            {steps.map((step, idx) => {
              const isCompleted = step.status === "Completed";
              const isCancelled = step.status === "Cancelled";
              const isOngoing = step.status === "Ongoing";
              const isInactiveTodo = step.status === "To-do" && idx > 0;

              let badgeBg = "#FFFBEB";
              let badgeText = "#D97706";
              let circleBg = "#FEF3C7";
              let circleTextColor = "#D97706";

              if (isCompleted) {
                badgeBg = "#EBFDF5";
                badgeText = "#10B981";
                circleBg = "#EBFDF5";
              } else if (isCancelled) {
                badgeBg = "#FEF2F2";
                badgeText = "#EF4444";
                circleBg = "#FEF2F2";
              } else if (isOngoing) {
                badgeBg = "#E0F2FE";
                badgeText = "#0284C7";
                circleBg = "#E0F2FE";
                circleTextColor = "#0284C7";
              } else if (isInactiveTodo) {
                badgeBg = "#F3F4F6";
                badgeText = "#6B7280";
                circleBg = "#E5E7EB";
                circleTextColor = "#6B7280";
              }

              return (
                <View key={idx} style={styles.stepItemCol}>
                  <View style={[styles.stepCircle, { backgroundColor: circleBg }]}>
                    {isCompleted ? (
                      <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                    ) : isCancelled ? (
                      <Ionicons name="close-circle" size={20} color="#EF4444" />
                    ) : (
                      <Text style={[styles.stepCircleText, { color: circleTextColor }]}>
                        {step.number}
                      </Text>
                    )}
                  </View>
                  <View style={[styles.stepBadge, { backgroundColor: badgeBg }]}>
                    <Text style={[styles.stepBadgeText, { color: badgeText }]}>
                      {step.status}
                    </Text>
                  </View>
                  <Text style={styles.stepTime}>{step.time}</Text>
                  <Text style={styles.stepService}>{step.service}</Text>
                  <Text style={styles.stepStaff}>{step.staff}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.expandedButtonsRow}>
          <TouchableOpacity style={styles.btnOutline} activeOpacity={0.7}>
            <Ionicons name="print-outline" size={16} color="#5C55FF" style={{ marginRight: 6 }} />
            <Text style={styles.btnOutlineText}>Print Receipt</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSolid}
            activeOpacity={0.7}
            onPress={() => router.push(`/appoinment/${item.id}`)}
          >
            <Ionicons name="list-outline" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.btnSolidText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const filteredAppointments = appointmentsData.filter((appt) => {
    // Search query filter
    const matchesSearch = appt.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          appt.service.toLowerCase().includes(searchQuery.toLowerCase());
    // Tab filter
    const matchesTab = selectedFilter === "All" || appt.status === selectedFilter;
    return matchesSearch && matchesTab;
  });

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 15) }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={20} color="#1F2937" style={{ marginRight: 2 }} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Appointments</Text>
        </View>
        <TouchableOpacity
          style={styles.dateSelector}
          onPress={() => setIsDatePickerVisible(true)}
        >
          <Ionicons name="calendar-outline" size={14} color="#4B5563" style={{ marginRight: 4 }} />
          <Text style={styles.dateSelectorText}>
            {selectedPeriod === "Today" ? "Feb 27" : selectedPeriod}
          </Text>
          <Ionicons name="chevron-down" size={12} color="#4B5563" style={{ marginLeft: 2 }} />
        </TouchableOpacity>
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={18} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filters */}
      <View style={styles.filtersWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {apptFilters.map((filter) => {
            const isActive = selectedFilter === filter;
            const filterColors = getFilterColors(filter);
            return (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterChip,
                  isActive && { backgroundColor: filterColors.bg, borderColor: filterColors.bg }
                ]}
                onPress={() => setSelectedFilter(filter)}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.filterText,
                  isActive && { color: filterColors.text }
                ]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Date Divider */}
      <View style={styles.dateDivider}>
        <Text style={styles.dateDividerText}>Feb 27, 2026</Text>
      </View>

      {/* Appointments List */}
      <ScrollView contentContainerStyle={styles.listScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.listContainer}>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((item, idx) => {
              const badge = getStatusBadgeStyle(item.status);
              const isExpanded = expandedId === `${item.id}-${idx}`;
              return (
                <View key={`${item.id}-${idx}`} style={styles.cardItem}>
                  <TouchableOpacity
                    style={styles.cardHeaderPressable}
                    onPress={() => toggleExpand(`${item.id}-${idx}`)}
                    activeOpacity={0.7}
                  >
                    <Avatar name={item.name} uri={item.avatar} size={48} />
                    <View style={styles.cardContent}>
                      <View style={styles.cardHeaderRow}>
                        <Text style={styles.cardName}>{item.name}</Text>
                        <View style={[styles.badge, { backgroundColor: badge.bg }]}>
                          <Text style={[styles.badgeText, { color: badge.text }]}>
                            {item.status}
                          </Text>
                        </View>
                      </View>
                      <Text style={styles.cardService}>{item.service}</Text>
                      <Text style={styles.cardTime}>{item.time}</Text>
                    </View>
                    <View style={styles.chevronButton}>
                      <Ionicons
                        name={isExpanded ? "chevron-up" : "chevron-down"}
                        size={18}
                        color="#9CA3AF"
                      />
                    </View>
                  </TouchableOpacity>

                  {isExpanded && renderExpandedContent(item)}
                </View>
              );
            })
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No appointments found</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Period Selector Modal */}
      <Modal
        visible={isDatePickerVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsDatePickerVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsDatePickerVisible(false)}
        >
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <Text style={styles.modalSectionTitle}>Select Period</Text>
            <View style={styles.periodGrid}>
              {["Today", "This Week", "This Month", "Last Month"].map((period) => {
                const isActive = selectedPeriod === period;
                return (
                  <TouchableOpacity
                    key={period}
                    style={[styles.periodBtn, isActive && styles.periodBtnActive]}
                    onPress={() => setSelectedPeriod(period)}
                  >
                    <Text style={[styles.periodBtnText, isActive && styles.periodBtnTextActive]}>
                      {period}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={[styles.modalSectionTitle, { marginTop: 20 }]}>Custom Range</Text>
            <View style={styles.customRangeRow}>
              <TouchableOpacity
                style={styles.rangeInputContainer}
                onPress={() => setShowStartPicker(true)}
                activeOpacity={0.7}
              >
                <Text style={[styles.rangeInput, !startDate && { color: "#9CA3AF" }]}>
                  {startDate ? startDate.toLocaleDateString("en-GB") : "dd/mm/yyyy"}
                </Text>
                <Ionicons name="calendar-outline" size={16} color="#5C55FF" style={styles.rangeIcon} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.rangeInputContainer}
                onPress={() => setShowEndPicker(true)}
                activeOpacity={0.7}
              >
                <Text style={[styles.rangeInput, !endDate && { color: "#9CA3AF" }]}>
                  {endDate ? endDate.toLocaleDateString("en-GB") : "dd/mm/yyyy"}
                </Text>
                <Ionicons name="calendar-outline" size={16} color="#5C55FF" style={styles.rangeIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.modalActionsRow}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => {
                  setStartDate(null);
                  setEndDate(null);
                  setSelectedPeriod("Today");
                  setIsDatePickerVisible(false);
                }}
              >
                <Text style={styles.modalCancelBtnText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalApplyBtn}
                onPress={() => {
                  if (startDate || endDate) {
                    const startLabel = startDate ? startDate.toLocaleDateString("en-US", { day: "numeric", month: "short" }) : "";
                    const endLabel = endDate ? endDate.toLocaleDateString("en-US", { day: "numeric", month: "short" }) : "";
                    setSelectedPeriod(startLabel && endLabel ? `${startLabel} - ${endLabel}` : `${startLabel}${endLabel}`);
                  }
                  setIsDatePickerVisible(false);
                }}
              >
                <Text style={styles.modalApplyBtnText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {showStartPicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          onChange={(event, date) => {
            setShowStartPicker(false);
            if (date) {
              setStartDate(date);
            }
          }}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          onChange={(event, date) => {
            setShowEndPicker(false);
            if (date) {
              setEndDate(date);
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
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 50,
  },
  headerLeftContainer: {
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
    fontSize: 18,
    color: "#1F2937",
  },
  dateSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  dateSelectorText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#4B5563",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    marginHorizontal: 20,
    marginVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    color: "#1F2937",
  },
  filtersWrapper: {
    paddingLeft: 20,
    marginBottom: 8,
  },
  filterScroll: {
    paddingRight: 20,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginRight: 8,
  },
  filterText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#6B7280",
  },
  dateDivider: {
    backgroundColor: "#F9FAFB",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  dateDividerText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: "#6B7280",
  },
  listScroll: {
    flexGrow: 1,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  cardItem: {
    flexDirection: "column",
    alignItems: "stretch",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  cardHeaderPressable: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  cardName: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14,
    color: "#1F2937",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 9,
  },
  cardService: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: "#5C55FF",
    marginBottom: 2,
  },
  cardTime: {
    fontFamily: "Manrope_400Regular",
    fontSize: 10,
    color: "#9CA3AF",
  },
  chevronButton: {
    padding: 6,
  },
  // Expanded card styling
  expandedWrapper: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    alignItems: "center",
    width: "100%",
  },
  expandedTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 14,
    color: "#1F2937",
    marginBottom: 16,
  },
  timelineContainer: {
    position: "relative",
    width: "100%",
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  timelineLine: {
    position: "absolute",
    top: 16,
    left: "15%",
    right: "15%",
    height: 1,
    backgroundColor: "#E5E7EB",
    zIndex: 1,
  },
  stepsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    zIndex: 2,
  },
  stepItemCol: {
    alignItems: "center",
    width: "30%",
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "transparent",
  },
  stepCircleText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
  },
  stepBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 6,
  },
  stepBadgeText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 9,
  },
  stepTime: {
    fontFamily: "Manrope_400Regular",
    fontSize: 9,
    color: "#9CA3AF",
    marginBottom: 2,
  },
  stepService: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    color: "#1F2937",
    marginBottom: 2,
  },
  stepStaff: {
    fontFamily: "Manrope_400Regular",
    fontSize: 10,
    color: "#9CA3AF",
  },
  expandedButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 8,
  },
  btnOutline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#5C55FF",
    backgroundColor: "#FFFFFF",
  },
  btnOutlineText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#5C55FF",
  },
  btnSolid: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
    height: 40,
    borderRadius: 8,
    backgroundColor: "#5C55FF",
  },
  btnSolidText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#FFFFFF",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 14,
    color: "#9CA3AF",
  },
  // Modal Popover styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  modalSectionTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 15,
    color: "#1F2937",
    marginBottom: 12,
  },
  periodGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  periodBtn: {
    width: "48%",
    height: 38,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  periodBtnActive: {
    borderColor: "#5C55FF",
    backgroundColor: "#FFFFFF",
  },
  periodBtnText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#4B5563",
  },
  periodBtnTextActive: {
    color: "#5C55FF",
  },
  customRangeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rangeInputContainer: {
    width: "48%",
    height: 38,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  rangeInput: {
    flex: 1,
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: "#1F2937",
  },
  rangeIcon: {
    marginLeft: 4,
  },
  modalActionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalCancelBtn: {
    width: "48%",
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#5C55FF",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  modalCancelBtnText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#5C55FF",
  },
  modalApplyBtn: {
    width: "48%",
    height: 40,
    borderRadius: 8,
    backgroundColor: "#5C55FF",
    alignItems: "center",
    justifyContent: "center",
  },
  modalApplyBtnText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#FFFFFF",
  },
});
