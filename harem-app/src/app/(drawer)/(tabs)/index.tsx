import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Header from "@/components/Header";
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
    status: "Confirmed",
    time: "12:00 AM - 12:15 AM",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "3",
    name: "Maria Fernandez",
    service: "Full Balayage & Cut",
    status: "Arrived",
    time: "12:00 AM - 12:15 AM",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "4",
    name: "Maria Fernandez",
    service: "Full Balayage & Cut",
    status: "Started",
    time: "12:00 AM - 12:15 AM",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "5",
    name: "Maria Fernandez",
    service: "Full Balayage & Cut",
    status: "Completed",
    time: "12:00 AM - 12:15 AM",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "6",
    name: "Maria Fernandez",
    service: "Full Balayage & Cut",
    status: "Cancelled",
    time: "12:00 AM - 12:15 AM",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  },
];

const paymentsData = [
  {
    id: "1",
    name: "Isabella V.",
    service: "Full Balayage & Cut",
    status: "Confirmed",
    time: "12:00 AM - 12:15 AM",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
    amount: "€ 180.00",
    email: "isabella.v@email.com",
    phone: "+39 348 1234567",
    paymentMethod: "Visa ending in 2742",
    notes: "Golden balayage. Ruffalo allergy noted. Loose mid...",
  },
  {
    id: "2",
    name: "Isabella V.",
    service: "Full Balayage & Cut",
    status: "Paid to Confirm",
    time: "12:00 AM - 12:15 AM",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
    amount: "€ 180.00",
    email: "isabella.v@email.com",
    phone: "+39 348 1234567",
    paymentMethod: "Visa ending in 2742",
    notes: "Golden balayage. Ruffalo allergy noted. Loose mid...",
  },
  {
    id: "3",
    name: "Isabella V.",
    service: "Full Balayage & Cut",
    status: "Expired",
    time: "12:00 AM - 12:15 AM",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
    amount: "€ 180.00",
    email: "isabella.v@email.com",
    phone: "+39 348 1234567",
    paymentMethod: "Visa ending in 2742",
    notes: "Chocolate brown hair mix, no blow dry, Payment link sent.",
  },
  {
    id: "4",
    name: "Isabella V.",
    service: "Full Balayage & Cut",
    status: "Started",
    time: "12:00 AM - 12:15 AM",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
    amount: "€ 180.00",
    email: "isabella.v@email.com",
    phone: "+39 348 1234567",
    paymentMethod: "Visa ending in 2742",
    notes: "Golden balayage. Ruffalo allergy noted. Loose mid...",
  },
];

interface StepItem {
  number: number;
  status: "To-do" | "Ongoing" | "Completed" | "Cancelled";
  time: string;
  service: string;
  staff: string;
}

interface PaymentStep {
  label: string;
  status: "completed" | "warning" | "error" | "pending";
  date: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const [selectedApptFilter, setSelectedApptFilter] = useState("All");
  const [selectedPayFilter, setSelectedPayFilter] = useState("All");
  
  // Expanded card tracking states
  const [expandedApptId, setExpandedApptId] = useState<string | null>(null);
  const [expandedPayId, setExpandedPayId] = useState<string | null>(null);

  const apptFilters = ["All", "Booked", "Confirmed", "Arrived", "Started", "Completed", "Cancelled"];
  const payFilters = ["All", "Paid to Confirm", "Expired", "Confirmed", "Started"];

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "Booked":
        return { bg: "#F0EFFF", text: "#5C55FF" }; // purple
      case "Confirmed":
        return { bg: "#EBFDF5", text: "#10B981" }; // green
      case "Arrived":
      case "Paid to Confirm":
        return { bg: "#FFFBEB", text: "#F59E0B" }; // amber
      case "Expired":
        return { bg: "#FEF2F2", text: "#EF4444" }; // red
      case "Started":
        return { bg: "#E0F2FE", text: "#0284C7" }; // light blue
      case "Completed":
        return { bg: "#EBFDF5", text: "#10B981" }; // green
      case "Cancelled":
        return { bg: "#FEF2F2", text: "#EF4444" }; // red
      default:
        return { bg: "#F3F4F6", text: "#4B5563" };
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
      case "Expired":
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
      default: // Booked, Confirmed, Arrived, Paid to Confirm
        return [
          { number: 1, status: "To-do", time: "12:00-12:05", service: "Shampoo", staff: "Angelica" },
          { number: 2, status: "To-do", time: "12:00-12:05", service: "Shampoo", staff: "Angelica" },
          { number: 3, status: "To-do", time: "12:00-12:05", service: "Shampoo", staff: "Angelica" },
        ];
    }
  };

  const getPaymentSteps = (status: string): PaymentStep[] => {
    switch (status) {
      case "Confirmed":
        return [
          { label: "Started", status: "completed", date: "24 Feb" },
          { label: "Paid", status: "completed", date: "24 Feb" },
          { label: "Confirmed", status: "completed", date: "24 Feb" },
        ];
      case "Paid to Confirm":
        return [
          { label: "Started", status: "completed", date: "24 Feb" },
          { label: "Paid", status: "completed", date: "24 Feb" },
          { label: "Confirm", status: "warning", date: "Pending" },
        ];
      case "Expired":
        return [
          { label: "Started", status: "completed", date: "24 Feb" },
          { label: "Expired", status: "error", date: "24 Feb" },
          { label: "Confirm", status: "pending", date: "Pending" },
        ];
      case "Started":
      default:
        return [
          { label: "Started", status: "completed", date: "24 Feb" },
          { label: "Paid", status: "pending", date: "Pending" },
          { label: "Confirm", status: "pending", date: "Pending" },
        ];
    }
  };

  const renderSummaryCard = (
    title: string,
    value: string,
    isPrimary: boolean = false
  ) => {
    return (
      <View style={[styles.summaryCard, isPrimary && styles.summaryCardPrimary]}>
        <View>
          <Text style={[styles.summaryTitle, isPrimary && styles.summaryTitlePrimary]}>
            {title}
          </Text>
          <Text style={[styles.summaryValue, isPrimary && styles.summaryValuePrimary]}>
            {value}
          </Text>
        </View>
        <TouchableOpacity style={styles.seeAllSummary} onPress={() => router.push("/home/payments")}>
          <Text style={[styles.seeAllSummaryText, isPrimary && styles.seeAllSummaryTextPrimary]}>
            See All
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const toggleApptExpand = (id: string) => {
    setExpandedApptId((prev) => (prev === id ? null : id));
  };

  const togglePayExpand = (id: string) => {
    setExpandedPayId((prev) => (prev === id ? null : id));
  };

  const renderExpandedContent = (status: string) => {
    const steps = getStepData(status);

    return (
      <View style={styles.expandedWrapper}>
        <Text style={styles.expandedTitle}>Booking Order</Text>

        {/* Steps Timeline Container */}
        <View style={styles.timelineContainer}>
          {/* Connecting Line */}
          <View style={styles.timelineLine} />

          {/* Steps Row */}
          <View style={styles.stepsRow}>
            {steps.map((step, idx) => {
              const isCompleted = step.status === "Completed";
              const isCancelled = step.status === "Cancelled";
              const isOngoing = step.status === "Ongoing";
              
              // If it's a To-do, but subsequent to step 1, show it in neutral grey
              const isInactiveTodo = step.status === "To-do" && idx > 0;

              // Badge style colors
              let badgeBg = "#FFFBEB"; // default yellow Todo
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
                  {/* Circle */}
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

                  {/* Badge */}
                  <View style={[styles.stepBadge, { backgroundColor: badgeBg }]}>
                    <Text style={[styles.stepBadgeText, { color: badgeText }]}>
                      {step.status}
                    </Text>
                  </View>

                  {/* Text Details */}
                  <Text style={styles.stepTime}>{step.time}</Text>
                  <Text style={styles.stepService}>{step.service}</Text>
                  <Text style={styles.stepStaff}>{step.staff}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Action Buttons Row */}
        <View style={styles.expandedButtonsRow}>
          <TouchableOpacity style={styles.btnOutline} activeOpacity={0.7}>
            <Ionicons name="print-outline" size={16} color="#5C55FF" style={{ marginRight: 6 }} />
            <Text style={styles.btnOutlineText}>Print Receipt</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnSolid} activeOpacity={0.7}>
            <Ionicons name="list-outline" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.btnSolidText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderPayExpandedContent = (item: any) => {
    const steps = getPaymentSteps(item.status);

    return (
      <View style={styles.expandedWrapper}>
        <Text style={styles.expandedTitle}>Booking Order</Text>

        {/* Steps Timeline Container */}
        <View style={styles.timelineContainer}>
          {/* Connecting Line */}
          <View style={styles.timelineLine} />

          {/* Steps Row */}
          <View style={styles.stepsRow}>
            {steps.map((step, idx) => {
              const isCompleted = step.status === "completed";
              const isWarning = step.status === "warning";
              const isError = step.status === "error";

              let badgeBg = "#F3F4F6";
              let badgeText = "#6B7280";
              let circleBg = "#E5E7EB";

              if (isCompleted) {
                badgeBg = "#EBFDF5";
                badgeText = "#10B981";
                circleBg = "#10B981";
              } else if (isWarning) {
                badgeBg = "#FFFBEB";
                badgeText = "#F59E0B";
                circleBg = "#F59E0B";
              } else if (isError) {
                badgeBg = "#FEF2F2";
                badgeText = "#EF4444";
                circleBg = "#EF4444";
              }

              return (
                <View key={idx} style={styles.stepItemCol}>
                  {/* Circle */}
                  <View style={[styles.stepCircle, { backgroundColor: circleBg, borderWidth: 0 }]}>
                    {isCompleted && (
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    )}
                    {isWarning && (
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    )}
                    {isError && (
                      <Ionicons name="close" size={16} color="#FFFFFF" />
                    )}
                  </View>

                  {/* Badge */}
                  <View style={[styles.stepBadge, { backgroundColor: badgeBg }]}>
                    <Text style={[styles.stepBadgeText, { color: badgeText }]}>
                      {step.label}
                    </Text>
                  </View>

                  {/* Date */}
                  <Text style={styles.stepTime}>{step.date}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Details Grid */}
        <View style={styles.detailsGrid}>
          <View style={styles.detailsGridRow}>
            <View style={styles.detailCol}>
              <Text style={styles.detailLabel}>NAME</Text>
              <Text style={styles.detailValue}>{item.name}</Text>
            </View>
            <View style={styles.detailCol}>
              <Text style={styles.detailLabel}>AMOUNT</Text>
              <Text style={styles.detailValue}>{item.amount}</Text>
            </View>
          </View>

          <View style={styles.detailsGridRow}>
            <View style={styles.detailCol}>
              <Text style={styles.detailLabel}>EMAIL</Text>
              <Text style={styles.detailValue} numberOfLines={1}>{item.email}</Text>
            </View>
            <View style={styles.detailCol}>
              <Text style={styles.detailLabel}>PHONE</Text>
              <Text style={styles.detailValue}>{item.phone}</Text>
            </View>
          </View>

          <View style={styles.detailRowFull}>
            <Text style={styles.detailLabel}>PAYMENT METHOD</Text>
            <View style={styles.paymentMethodRow}>
              <View style={styles.visaBadge}>
                <Text style={styles.visaBadgeText}>Visa</Text>
              </View>
              <Text style={styles.paymentMethodText}>ending in 2742</Text>
            </View>
          </View>

          <View style={styles.detailRowFull}>
            <Text style={styles.detailLabel}>NOTES</Text>
            <View style={styles.notesContainer}>
              <Text style={styles.notesText}>{item.notes}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const getFilterColors = (filterName: string) => {
    const name = filterName.split(" ")[0].toLowerCase();
    switch (name) {
      case "booked":
        return { bg: "#5C55FF", text: "#FFFFFF" }; // purple
      case "confirmed":
        return { bg: "#0EA5E9", text: "#FFFFFF" }; // cyan/teal
      case "arrived":
        return { bg: "#D97706", text: "#FFFFFF" }; // amber/gold
      case "started":
        return { bg: "#009688", text: "#FFFFFF" }; // teal
      case "completed":
        return { bg: "#10B981", text: "#FFFFFF" }; // green
      case "cancelled":
      case "expired":
        return { bg: "#EF4444", text: "#FFFFFF" }; // red
      case "paid": // Paid to Confirm
        return { bg: "#F59E0B", text: "#FFFFFF" }; // amber
      default:
        return { bg: "#5C55FF", text: "#FFFFFF" }; // default purple (e.g. "All")
    }
  };

  const filteredAppointments = appointmentsData.filter((appt) => {
    if (selectedApptFilter === "All") return true;
    return appt.status === selectedApptFilter;
  });

  const filteredPayments = paymentsData.filter((pay) => {
    if (selectedPayFilter === "All") return true;
    return pay.status === selectedPayFilter;
  });

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>Daily Summary</Text>
        </View>

        {/* Summary Horizontal List */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.summaryScroll}
        >
          {renderSummaryCard("Total received", "$0.00", true)}
          {renderSummaryCard("Receipts issued", "0")}
          {renderSummaryCard("Last receipt", "$0.00")}
        </ScrollView>

        {/* Appointments Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <View style={[styles.iconContainer, { backgroundColor: "#EEF2FF" }]}>
                <Ionicons name="calendar-outline" size={18} color="#5C55FF" />
              </View>
              <Text style={styles.sectionTitle}>Appointments</Text>
            </View>
            <Text style={styles.sectionTime}>Today</Text>
          </View>

          {/* Filters */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            {apptFilters.map((filter) => {
              const isActive = selectedApptFilter === filter;
              const filterColors = getFilterColors(filter);
              return (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterChip,
                    isActive && { backgroundColor: filterColors.bg, borderColor: filterColors.bg }
                  ]}
                  onPress={() => setSelectedApptFilter(filter)}
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

          {/* Appointments List */}
          <View style={styles.listContainer}>
            {filteredAppointments.map((item) => {
              const badge = getStatusBadgeStyle(item.status);
              const isExpanded = expandedApptId === item.id;
              return (
                <View key={item.id} style={styles.cardItem}>
                  <TouchableOpacity
                    style={styles.cardHeaderPressable}
                    onPress={() => toggleApptExpand(item.id)}
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

                  {isExpanded && renderExpandedContent(item.status)}
                </View>
              );
            })}
          </View>

          <TouchableOpacity 
            style={styles.seeAllLink} 
            activeOpacity={0.7}
            onPress={() => router.push("/home/appointments")}
          >
            <Text style={styles.seeAllLinkText}>See All Appointments</Text>
          </TouchableOpacity>
        </View>

        {/* Payments Section */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <View style={[styles.iconContainer, { backgroundColor: "#F3F4F6" }]}>
                <Ionicons name="card-outline" size={18} color="#4B5563" />
              </View>
              <Text style={styles.sectionTitle}>Payments</Text>
            </View>
            <Text style={styles.sectionTime}>Today</Text>
          </View>

          {/* Filters */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            {payFilters.map((filter) => {
              const isActive = selectedPayFilter === filter;
              const filterColors = getFilterColors(filter);
              return (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterChip,
                    isActive && { backgroundColor: filterColors.bg, borderColor: filterColors.bg }
                  ]}
                  onPress={() => setSelectedPayFilter(filter)}
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

          {/* Payments List */}
          <View style={styles.listContainer}>
            {filteredPayments.map((item) => {
              const badge = getStatusBadgeStyle(item.status);
              const isExpanded = expandedPayId === item.id;
              return (
                <View key={item.id} style={styles.cardItem}>
                  <TouchableOpacity
                    style={styles.cardHeaderPressable}
                    onPress={() => togglePayExpand(item.id)}
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

                  {isExpanded && renderPayExpandedContent(item)}
                </View>
              );
            })}
          </View>

          <TouchableOpacity 
            style={styles.seeAllLink} 
            activeOpacity={0.7}
            onPress={() => router.push("/home/payments")}
          >
            <Text style={styles.seeAllLinkText}>See All Payments</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  titleContainer: {
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  mainTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 20,
    color: "#1F2937",
  },
  summaryScroll: {
    paddingLeft: 20,
    paddingRight: 10,
    marginBottom: 20,
  },
  summaryCard: {
    width: 140,
    height: 110,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    padding: 12,
    marginRight: 12,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  summaryCardPrimary: {
    backgroundColor: "#5C55FF",
    borderColor: "#5C55FF",
  },
  summaryTitle: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },
  summaryTitlePrimary: {
    color: "#E0E7FF",
  },
  summaryValue: {
    fontFamily: "Manrope_700Bold",
    fontSize: 18,
    color: "#1F2937",
  },
  summaryValuePrimary: {
    color: "#FFFFFF",
  },
  seeAllSummary: {
    alignSelf: "flex-end",
  },
  seeAllSummaryText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 10,
    color: "#5C55FF",
  },
  seeAllSummaryTextPrimary: {
    color: "#FFFFFF",
  },
  sectionCard: {
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  sectionTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 16,
    color: "#1F2937",
  },
  sectionTime: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: "#9CA3AF",
  },
  filterScroll: {
    paddingBottom: 12,
    marginBottom: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: "#5C55FF",
    borderColor: "#5C55FF",
  },
  filterText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#6B7280",
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  listContainer: {
    marginBottom: 12,
  },
  cardItem: {
    flexDirection: "column",
    alignItems: "stretch",
    paddingVertical: 12,
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
    padding: 8,
  },
  seeAllLink: {
    alignItems: "center",
    paddingTop: 8,
  },
  seeAllLinkText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#5C55FF",
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
  // Payment Details Grid styles
  detailsGrid: {
    width: "100%",
    marginTop: 12,
  },
  detailsGridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  detailCol: {
    width: "48%",
  },
  detailLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 10,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  detailValue: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 13,
    color: "#1F2937",
  },
  detailRowFull: {
    width: "100%",
    marginBottom: 12,
  },
  paymentMethodRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  visaBadge: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 6,
  },
  visaBadgeText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    color: "#5C55FF",
  },
  paymentMethodText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 13,
    color: "#1F2937",
  },
  notesContainer: {
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 8,
    marginTop: 4,
    width: "100%",
  },
  notesText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: "#4B5563",
    lineHeight: 18,
  },
});
