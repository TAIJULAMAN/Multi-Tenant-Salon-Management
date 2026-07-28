import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DateTimePicker from "@expo/ui/community/datetime-picker";
import Avatar from "@/components/Avatar";

// Static mock data
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

interface PaymentStep {
  label: string;
  status: "completed" | "warning" | "error" | "pending";
  date: string;
}

type ReceiptModalState = "options" | "loading-print" | "loading-email" | "error-printer" | "success-printer" | "success-email";

export default function PaymentsScreen() {
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

  // Receipt interactive modal states
  const [isReceiptModalVisible, setIsReceiptModalVisible] = useState(false);
  const [receiptModalState, setReceiptModalState] = useState<ReceiptModalState>("options");
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<"print" | "email">("print");
  const [selectedItemName, setSelectedItemName] = useState("");
  const [selectedItemEmail, setSelectedItemEmail] = useState("");

  const payFilters = ["All", "Paid to Confirm", "Expired", "Confirmed", "Started"];

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "Booked":
        return { bg: "#F0EFFF", text: "#5C55FF" };
      case "Confirmed":
        return { bg: "#EBFDF5", text: "#10B981" };
      case "Arrived":
      case "Paid to Confirm":
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
    const name = filterName.split(" ")[0].toLowerCase();
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
      case "expired":
        return { bg: "#EF4444", text: "#FFFFFF" };
      case "paid":
        return { bg: "#F59E0B", text: "#FFFFFF" };
      default:
        return { bg: "#5C55FF", text: "#FFFFFF" };
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

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // Triggers the delivery popover
  const triggerReceiptFlow = (name: string, email: string) => {
    setSelectedItemName(name);
    setSelectedItemEmail(email);
    setReceiptModalState("options");
    setIsReceiptModalVisible(true);
  };

  const handleApplyReceipt = () => {
    if (selectedDeliveryMethod === "print") {
      setReceiptModalState("loading-print");
      setTimeout(() => {
        // First print attempt fails (printer offline) to match the screenshots
        setReceiptModalState("error-printer");
      }, 1500);
    } else {
      setReceiptModalState("loading-email");
      setTimeout(() => {
        setReceiptModalState("success-email");
      }, 1500);
    }
  };

  const handleRetryPrint = () => {
    setReceiptModalState("loading-print");
    setTimeout(() => {
      // Second print attempt succeeds
      setReceiptModalState("success-printer");
    }, 1500);
  };

  const renderPayExpandedContent = (item: any) => {
    const steps = getPaymentSteps(item.status);
    const isConfirmed = item.status === "Confirmed";

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

        {/* Action Buttons Row - Status Specific */}
        {isConfirmed ? (
          <View style={styles.expandedButtonsRow}>
            <TouchableOpacity
              style={styles.btnOutline}
              activeOpacity={0.7}
              onPress={() => triggerReceiptFlow(item.name, item.email)}
            >
              <Ionicons name="download-outline" size={16} color="#5C55FF" style={{ marginRight: 6 }} />
              <Text style={styles.btnOutlineText}>Download Receipt</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSolid} activeOpacity={0.7}>
              <Ionicons name="list-outline" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={styles.btnSolidText}>View Details</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.expandedButtonsRow}>
            <TouchableOpacity style={styles.btnOutlineRed} activeOpacity={0.7}>
              <Ionicons name="trash-outline" size={16} color="#EF4444" style={{ marginRight: 6 }} />
              <Text style={styles.btnOutlineRedText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSolid} activeOpacity={0.7}>
              <Ionicons name="paper-plane-outline" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={styles.btnSolidText}>Resend</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const filteredPayments = paymentsData.filter((pay) => {
    const matchesSearch = pay.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pay.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedFilter === "All" || pay.status === selectedFilter;
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
          <Text style={styles.headerTitle}>Payments</Text>
        </View>
        <View style={styles.headerRightActions}>
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
          <TouchableOpacity style={styles.sortButton}>
            <Ionicons name="swap-vertical-outline" size={16} color="#4B5563" />
          </TouchableOpacity>
        </View>
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
          {payFilters.map((filter) => {
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

      {/* Payments List */}
      <ScrollView contentContainerStyle={styles.listScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.listContainer}>
          {filteredPayments.length > 0 ? (
            filteredPayments.map((item, idx) => {
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
                        <View style={styles.nameAmountRow}>
                          <Text style={styles.cardName}>{item.name}</Text>
                          <Text style={styles.paymentAmount}>{item.amount}</Text>
                        </View>
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
            })
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No payments found</Text>
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

      {/* Send/Print Receipt Modal Flow */}
      <Modal
        visible={isReceiptModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsReceiptModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsReceiptModalVisible(false)}
        >
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            {/* Popover Options State */}
            {receiptModalState === "options" && (
              <View>
                <Text style={styles.modalSectionTitle}>Send Receipt</Text>
                <Text style={styles.modalSubTitle}>How would you like to deliver it?</Text>

                {/* Print Option */}
                <TouchableOpacity
                  style={[
                    styles.deliveryOptionRow,
                    selectedDeliveryMethod === "print" && styles.deliveryOptionRowActive,
                  ]}
                  onPress={() => setSelectedDeliveryMethod("print")}
                >
                  <View style={styles.deliveryOptionLeft}>
                    <Ionicons
                      name="print-outline"
                      size={20}
                      color={selectedDeliveryMethod === "print" ? "#5C55FF" : "#4B5563"}
                      style={{ marginRight: 12 }}
                    />
                    <View>
                      <Text
                        style={[
                          styles.deliveryOptionTitle,
                          selectedDeliveryMethod === "print" && styles.deliveryOptionTitleActive,
                        ]}
                      >
                        Print Receipt
                      </Text>
                      <Text style={styles.deliveryOptionSub}>Connect and print immediately</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.radioCircle,
                      selectedDeliveryMethod === "print" && styles.radioCircleActive,
                    ]}
                  >
                    {selectedDeliveryMethod === "print" && <View style={styles.radioDot} />}
                  </View>
                </TouchableOpacity>

                {/* Email Option */}
                <TouchableOpacity
                  style={[
                    styles.deliveryOptionRow,
                    selectedDeliveryMethod === "email" && styles.deliveryOptionRowActive,
                  ]}
                  onPress={() => setSelectedDeliveryMethod("email")}
                >
                  <View style={styles.deliveryOptionLeft}>
                    <Ionicons
                      name="mail-outline"
                      size={20}
                      color={selectedDeliveryMethod === "email" ? "#5C55FF" : "#4B5563"}
                      style={{ marginRight: 12 }}
                    />
                    <View>
                      <Text
                        style={[
                          styles.deliveryOptionTitle,
                          selectedDeliveryMethod === "email" && styles.deliveryOptionTitleActive,
                        ]}
                      >
                        Send via Email
                      </Text>
                      <Text style={styles.deliveryOptionSub}>{selectedItemEmail}</Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.radioCircle,
                      selectedDeliveryMethod === "email" && styles.radioCircleActive,
                    ]}
                  >
                    {selectedDeliveryMethod === "email" && <View style={styles.radioDot} />}
                  </View>
                </TouchableOpacity>

                <View style={styles.modalActionsRow}>
                  <TouchableOpacity
                    style={styles.modalCancelBtn}
                    onPress={() => setIsReceiptModalVisible(false)}
                  >
                    <Text style={styles.modalCancelBtnText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalApplyBtn} onPress={handleApplyReceipt}>
                    <Text style={styles.modalApplyBtnText}>
                      {selectedDeliveryMethod === "print" ? "Print Receipt" : "Send Receipt"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Loading Print State */}
            {receiptModalState === "loading-print" && (
              <View style={styles.flowStatusContainer}>
                <View style={styles.circularLoaderWrapper}>
                  <ActivityIndicator size="large" color="#5C55FF" />
                  <Ionicons
                    name="print-outline"
                    size={24}
                    color="#5C55FF"
                    style={styles.absoluteLoaderIcon}
                  />
                </View>
                <Text style={styles.flowStatusTitle}>Printing receipt...</Text>
                <Text style={styles.flowStatusSub}>Communicating with printer</Text>
              </View>
            )}

            {/* Loading Email State */}
            {receiptModalState === "loading-email" && (
              <View style={styles.flowStatusContainer}>
                <View style={styles.circularLoaderWrapper}>
                  <ActivityIndicator size="large" color="#5C55FF" />
                  <Ionicons
                    name="mail-outline"
                    size={24}
                    color="#5C55FF"
                    style={styles.absoluteLoaderIcon}
                  />
                </View>
                <Text style={styles.flowStatusTitle}>Sending receipt...</Text>
                <Text style={styles.flowStatusSub}>Delivering to {selectedItemEmail}</Text>
              </View>
            )}

            {/* Error Printer State */}
            {receiptModalState === "error-printer" && (
              <View style={styles.flowStatusContainer}>
                <View style={[styles.flowStatusCircle, { backgroundColor: "#FEF2F2" }]}>
                  <Ionicons name="close" size={28} color="#EF4444" />
                </View>
                <Text style={styles.flowStatusTitle}>No printer detected</Text>
                <Text style={styles.flowStatusSub}>Make sure your printer is on and connected</Text>
                <View style={[styles.modalActionsRow, { width: "100%", marginTop: 24 }]}>
                  <TouchableOpacity
                    style={styles.modalCancelBtn}
                    onPress={() => setIsReceiptModalVisible(false)}
                  >
                    <Text style={styles.modalCancelBtnText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.modalApplyBtn} onPress={handleRetryPrint}>
                    <Text style={styles.modalApplyBtnText}>Try again</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Success Printer State */}
            {receiptModalState === "success-printer" && (
              <View style={styles.flowStatusContainer}>
                <View style={[styles.flowStatusCircle, { backgroundColor: "#EBFDF5" }]}>
                  <Ionicons name="checkmark" size={28} color="#10B981" />
                </View>
                <Text style={styles.flowStatusTitle}>Receipt printed!</Text>
                <Text style={styles.flowStatusSub}>Your receipt was sent to the printer</Text>
                <TouchableOpacity
                  style={[styles.modalApplyBtn, { width: "100%", marginTop: 24 }]}
                  onPress={() => setIsReceiptModalVisible(false)}
                >
                  <Text style={styles.modalApplyBtnText}>Done</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Success Email State */}
            {receiptModalState === "success-email" && (
              <View style={styles.flowStatusContainer}>
                <View style={[styles.flowStatusCircle, { backgroundColor: "#EBFDF5" }]}>
                  <Ionicons name="checkmark" size={28} color="#10B981" />
                </View>
                <Text style={styles.flowStatusTitle}>Receipt sent!</Text>
                <Text style={styles.flowStatusSub}>The email was sent to {selectedItemEmail}</Text>
                <TouchableOpacity
                  style={[styles.modalApplyBtn, { width: "100%", marginTop: 24 }]}
                  onPress={() => setIsReceiptModalVisible(false)}
                >
                  <Text style={styles.modalApplyBtnText}>Done</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
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
  headerRightActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  dateSelectorText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#4B5563",
  },
  sortButton: {
    width: 32,
    height: 32,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
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
  nameAmountRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardName: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14,
    color: "#1F2937",
    marginRight: 10,
  },
  paymentAmount: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
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
  expandedButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 12,
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
  btnOutlineRed: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EF4444",
    backgroundColor: "#FFFFFF",
  },
  btnOutlineRedText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#EF4444",
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
  modalSubTitle: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 16,
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
  // Delivery option row styles
  deliveryOptionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 10,
    backgroundColor: "#F9FAFB",
  },
  deliveryOptionRowActive: {
    borderColor: "#5C55FF",
    backgroundColor: "#FFFFFF",
  },
  deliveryOptionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  deliveryOptionTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#4B5563",
  },
  deliveryOptionTitleActive: {
    color: "#5C55FF",
  },
  deliveryOptionSub: {
    fontFamily: "Manrope_400Regular",
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 2,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  radioCircleActive: {
    borderColor: "#5C55FF",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#5C55FF",
  },
  // Flow status loaders/states
  flowStatusContainer: {
    alignItems: "center",
    paddingVertical: 10,
  },
  circularLoaderWrapper: {
    position: "relative",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  absoluteLoaderIcon: {
    position: "absolute",
  },
  flowStatusTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 16,
    color: "#1F2937",
    marginBottom: 6,
    textAlign: "center",
  },
  flowStatusSub: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },
  flowStatusCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
});
