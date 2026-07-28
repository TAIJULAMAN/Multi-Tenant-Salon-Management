import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Avatar from "@/components/Avatar";

type TabType = "Pending Approval" | "Pending Payment" | "Payment History";

interface SalaryItem {
  id: string;
  name: string;
  avatar: string;
  uploadedBy: string;
  netAmount: number;
  grossSalary: number;
  netSalary: number;
  trfMonthly: number;
  cumulativeTrf: number;
  iban: string;
  month: string;
  date: string;
  status: "Under Review" | "Approved" | "Paid";
}

export default function SalariesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [activeTab, setActiveTab] = useState<TabType>("Pending Approval");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  type RevolutFlowType = "none" | "setup" | "payment";

  const [isRevolutConnected, setIsRevolutConnected] = useState(false);
  const [revolutFlow, setRevolutFlow] = useState<RevolutFlowType>("none");
  const [paymentTarget, setPaymentTarget] = useState<"single" | "batch">("single");
  const [activeItemForPayment, setActiveItemForPayment] = useState<SalaryItem | null>(null);

  const handlePaymentSuccessCallback = () => {
    if (paymentTarget === "single" && activeItemForPayment) {
      setSalaries((prev) =>
        prev.map((s) => (s.id === activeItemForPayment.id ? { ...s, status: "Paid" } : s))
      );
      Alert.alert("Success", `Payment successfully sent to ${activeItemForPayment.name}!`);
    } else {
      // batch
      setSalaries((prev) =>
        prev.map((s) => (s.status === "Approved" ? { ...s, status: "Paid" } : s))
      );
      Alert.alert("Success", "All approved payments processed successfully!");
    }
    setRevolutFlow("none");
    setActiveItemForPayment(null);
  };

  // Initial State Data
  const [salaries, setSalaries] = useState<SalaryItem[]>([
    {
      id: "sal_1",
      name: "Maria Rodriguez",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80",
      uploadedBy: "Mario Rossi",
      netAmount: 3200,
      grossSalary: 3200,
      netSalary: 2600,
      trfMonthly: 600,
      cumulativeTrf: 3800,
      iban: "IT60 X054 ********* 123",
      month: "December 2024",
      date: "Dec 01, 2024",
      status: "Under Review",
    },
    {
      id: "sal_2",
      name: "Leslie Alexander",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
      uploadedBy: "Mario Rossi",
      netAmount: 2800,
      grossSalary: 2800,
      netSalary: 2300,
      trfMonthly: 500,
      cumulativeTrf: 3100,
      iban: "IT60 X054 ********* 456",
      month: "December 2024",
      date: "Dec 01, 2024",
      status: "Under Review",
    },
    {
      id: "sal_3",
      name: "Jane Cooper",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
      uploadedBy: "Mario Rossi",
      netAmount: 3000,
      grossSalary: 3000,
      netSalary: 2450,
      trfMonthly: 550,
      cumulativeTrf: 3400,
      iban: "IT60 X054 ********* 789",
      month: "December 2024",
      date: "Dec 01, 2024",
      status: "Under Review",
    },
    {
      id: "sal_4",
      name: "Eleanor Pena",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
      uploadedBy: "Mario Rossi",
      netAmount: 3500,
      grossSalary: 3500,
      netSalary: 2900,
      trfMonthly: 600,
      cumulativeTrf: 4100,
      iban: "IT60 X054 ********* 321",
      month: "December 2024",
      date: "Dec 01, 2024",
      status: "Under Review",
    },
    {
      id: "sal_5",
      name: "Kristin Watson",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      uploadedBy: "Mario Rossi",
      netAmount: 2900,
      grossSalary: 2900,
      netSalary: 2350,
      trfMonthly: 550,
      cumulativeTrf: 3000,
      iban: "IT60 X054 ********* 654",
      month: "December 2024",
      date: "Dec 01, 2024",
      status: "Under Review",
    },
    // Mock items already approved (Pending Payment)
    {
      id: "sal_6",
      name: "Guy Hawkins",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
      uploadedBy: "Mario Rossi",
      netAmount: 3100,
      grossSalary: 3100,
      netSalary: 2500,
      trfMonthly: 600,
      cumulativeTrf: 3700,
      iban: "IT60 X054 ********* 987",
      month: "December 2024",
      date: "Dec 01, 2024",
      status: "Approved",
    },
    // Mock items already paid (Payment History)
    {
      id: "sal_7",
      name: "Alex Miller",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      uploadedBy: "Mario Rossi",
      netAmount: 3300,
      grossSalary: 3300,
      netSalary: 2700,
      trfMonthly: 600,
      cumulativeTrf: 3900,
      iban: "IT60 X054 ********* 111",
      month: "December 2024",
      date: "Dec 01, 2024",
      status: "Paid",
    },
  ]);

  // Tab Filtering & Counts
  const pendingApproval = salaries.filter((s) => s.status === "Under Review");
  const pendingPayment = salaries.filter((s) => s.status === "Approved");
  const paymentHistory = salaries.filter((s) => s.status === "Paid");

  const getFilteredList = () => {
    let list: SalaryItem[] = [];
    if (activeTab === "Pending Approval") list = pendingApproval;
    else if (activeTab === "Pending Payment") list = pendingPayment;
    else if (activeTab === "Payment History") list = paymentHistory;

    return list.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleCardApprove = (id: string, name: string) => {
    Alert.alert("Approve Payment", `Are you sure you want to approve the salary for ${name}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Approve",
        onPress: () => {
          setSalaries((prev) =>
            prev.map((s) => (s.id === id ? { ...s, status: "Approved" } : s))
          );
          Alert.alert("Success", `Salary for ${name} has been approved.`);
        },
      },
    ]);
  };

  const handleCardReject = (id: string, name: string) => {
    Alert.alert("Reject Payment", `Are you sure you want to reject the salary for ${name}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Reject",
        style: "destructive",
        onPress: () => {
          setSalaries((prev) => prev.filter((s) => s.id !== id));
          Alert.alert("Rejected", `Salary for ${name} has been rejected.`);
        },
      },
    ]);
  };

  const handleCardPay = (id: string, name: string) => {
    const item = salaries.find((s) => s.id === id);
    if (!item) return;
    setPaymentTarget("single");
    setActiveItemForPayment(item);
    if (!isRevolutConnected) {
      router.push({
        pathname: "/staff/revolut/setup",
        params: {
          type: "single",
          id: item.id,
          name: item.name,
          amount: item.netAmount.toString(),
          avatar: item.avatar,
        },
      });
    } else {
      router.push({
        pathname: "/staff/revolut/payment",
        params: {
          type: "single",
          id: item.id,
          name: item.name,
          amount: item.netAmount.toString(),
          avatar: item.avatar,
        },
      });
    }
  };

  const handleCardMarkPaid = (id: string, name: string) => {
    setSalaries((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: "Paid" } : s))
    );
    Alert.alert("Success", `Marked salary for ${name} as Paid.`);
  };

  const handleApproveAll = () => {
    Alert.alert("Approve All", `Are you sure you want to approve all ${pendingApproval.length} pending salaries?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Approve All",
        onPress: () => {
          setSalaries((prev) =>
            prev.map((s) => (s.status === "Under Review" ? { ...s, status: "Approved" } : s))
          );
          Alert.alert("Success", "All pending salaries approved!");
        },
      },
    ]);
  };

  const handleRejectAll = () => {
    Alert.alert("Reject All", "Are you sure you want to reject all pending salaries?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Reject All",
        style: "destructive",
        onPress: () => {
          setSalaries((prev) => prev.filter((s) => s.status !== "Under Review"));
          Alert.alert("Success", "All pending salaries rejected.");
        },
      },
    ]);
  };

  const handlePayAll = () => {
    if (pendingPayment.length === 0) return;
    setPaymentTarget("batch");
    setActiveItemForPayment(null);
    if (!isRevolutConnected) {
      router.push({
        pathname: "/staff/revolut/setup",
        params: {
          type: "batch",
        },
      });
    } else {
      router.push({
        pathname: "/staff/revolut/payment",
        params: {
          type: "batch",
        },
      });
    }
  };

  const handleMarkAllPaid = () => {
    setSalaries((prev) =>
      prev.map((s) => (s.status === "Approved" ? { ...s, status: "Paid" } : s))
    );
    Alert.alert("Success", "All approved items marked as Paid.");
  };

  const handleDownload = () => {
    Alert.alert("Download Report", "Downloading salary report for December 2024 (PDF)...");
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };



  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 15) }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Salaries</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerIconBtn}
            onPress={() => {
              const newStatus = !isRevolutConnected;
              setIsRevolutConnected(newStatus);
              Alert.alert(
                "Revolut API Connection",
                newStatus ? "Revolut API Connected Successfully (Live Mode)." : "Revolut API Disconnected."
              );
            }}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isRevolutConnected ? "link" : "link-outline"}
              size={20}
              color={isRevolutConnected ? "#10B981" : "#9CA3AF"}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn} onPress={handleDownload} activeOpacity={0.7}>
            <Ionicons name="download-outline" size={20} color="#5C55FF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
            <Ionicons name="ellipsis-vertical" size={20} color="#4B5563" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Container */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Ionicons name="search-outline" size={18} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search salaries..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Tabs Menu Container */}
      <View style={styles.tabsWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScrollContent}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === "Pending Approval" && styles.tabButtonActive]}
            onPress={() => {
              setActiveTab("Pending Approval");
              setExpandedId(null);
            }}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabButtonText, activeTab === "Pending Approval" && styles.tabButtonTextActive]}>
              Pending Approval ({pendingApproval.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === "Pending Payment" && styles.tabButtonActive]}
            onPress={() => {
              setActiveTab("Pending Payment");
              setExpandedId(null);
            }}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabButtonText, activeTab === "Pending Payment" && styles.tabButtonTextActive]}>
              Pending Payment ({pendingPayment.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabButton, activeTab === "Payment History" && styles.tabButtonActive]}
            onPress={() => {
              setActiveTab("Payment History");
              setExpandedId(null);
            }}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabButtonText, activeTab === "Payment History" && styles.tabButtonTextActive]}>
              Payment History ({paymentHistory.length})
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Period Header */}
      <View style={styles.periodHeader}>
        <Text style={styles.periodText}>December 2024</Text>
        <Text style={styles.paymentsCountText}>{getFilteredList().length} payments</Text>
      </View>

      {/* Salaries Scroll List */}
      <ScrollView contentContainerStyle={styles.scrollList} showsVerticalScrollIndicator={false}>
        {getFilteredList().map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <View key={item.id} style={styles.card}>
              {/* Card Header Info */}
              <TouchableOpacity
                style={styles.cardHeader}
                onPress={() => toggleExpand(item.id)}
                activeOpacity={0.9}
              >
                <View style={styles.cardHeaderLeft}>
                  <Image source={{ uri: item.avatar }} style={styles.avatarImage} />
                  <View>
                    <Text style={styles.employeeName}>{item.name}</Text>
                    <Text style={styles.uploadedBy}>Uploaded by: {item.uploadedBy}</Text>
                  </View>
                </View>
                <View style={styles.cardHeaderRight}>
                  <View style={styles.roleTag}>
                    <Text style={styles.roleTagText}>Staff</Text>
                  </View>
                  <Ionicons
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={18}
                    color="#9CA3AF"
                    style={{ marginLeft: 8 }}
                  />
                </View>
              </TouchableOpacity>

              {/* Collapsed Info Row */}
              <View style={styles.infoGrid}>
                <View style={styles.infoCol}>
                  <Text style={styles.infoLabel}>Net Amount</Text>
                  <Text style={styles.infoValue}>€ {item.netAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</Text>
                </View>
                <View style={styles.infoCol}>
                  <Text style={styles.infoLabel}>Month</Text>
                  <Text style={styles.infoValue}>{item.month}</Text>
                </View>
              </View>

              <View style={styles.infoGrid}>
                <View style={styles.infoCol}>
                  <Text style={styles.infoLabel}>Date</Text>
                  <View style={styles.dateBadge}>
                    <Text style={styles.dateBadgeText}>{item.date}</Text>
                  </View>
                </View>
                <View style={styles.infoCol}>
                  <Text style={styles.infoLabel}>Status</Text>
                  {item.status === "Under Review" ? (
                    <Text style={styles.statusReviewText}>Under Review</Text>
                  ) : item.status === "Approved" ? (
                    <Text style={styles.statusApprovedText}>Approved</Text>
                  ) : (
                    <View style={styles.statusPaidBadge}>
                      <Text style={styles.statusPaidBadgeText}>Paid</Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Expanded Salary details */}
              {isExpanded && (
                <View style={styles.expandedDetails}>
                  <View style={styles.divider} />
                  <View style={styles.detailRow}>
                    <View style={styles.detailCol}>
                      <Text style={styles.detailLabel}>Gross Salary</Text>
                      <Text style={styles.detailValue}>
                        € {item.grossSalary.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </Text>
                    </View>
                    <View style={styles.detailCol}>
                      <Text style={styles.detailLabel}>Net Salary</Text>
                      <Text style={styles.detailValue}>
                        € {item.netSalary.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.detailRow}>
                    <View style={styles.detailCol}>
                      <Text style={styles.detailLabel}>TRF (Monthly)</Text>
                      <Text style={styles.detailValue}>
                        € {item.trfMonthly.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </Text>
                    </View>
                    <View style={styles.detailCol}>
                      <Text style={styles.detailLabel}>Cumulative TRF</Text>
                      <Text style={styles.detailValue}>
                        € {item.cumulativeTrf.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.detailSingleRow}>
                    <Text style={styles.detailLabel}>IBAN</Text>
                    <Text style={styles.detailValueIBAN}>{item.iban}</Text>
                  </View>

                  {/* View Payslip Dynamic Button */}
                  {item.status === "Under Review" && (
                    <TouchableOpacity style={[styles.payslipBtn, styles.payslipBtnReview]} activeOpacity={0.7}>
                      <Ionicons name="eye-outline" size={16} color="#FFB020" style={{ marginRight: 6 }} />
                      <Text style={styles.payslipBtnTextReview}>View Payslip</Text>
                    </TouchableOpacity>
                  )}

                  {item.status === "Approved" && (
                    <TouchableOpacity style={[styles.payslipBtn, styles.payslipBtnApproved]} activeOpacity={0.7}>
                      <Ionicons name="eye-outline" size={16} color="#10B981" style={{ marginRight: 6 }} />
                      <Text style={styles.payslipBtnTextApproved}>View Payslip</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}

              {/* Action Buttons based on Tab state */}
              {activeTab === "Pending Approval" && (
                <View style={styles.cardActions}>
                  <TouchableOpacity
                    style={styles.btnApprove}
                    onPress={() => handleCardApprove(item.id, item.name)}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                    <Text style={styles.btnApproveText}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnReject}
                    onPress={() => handleCardReject(item.id, item.name)}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="close" size={16} color="#EF4444" style={{ marginRight: 6 }} />
                    <Text style={styles.btnRejectText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              )}

              {activeTab === "Pending Payment" && (
                <View style={styles.cardActions}>
                  <TouchableOpacity
                    style={styles.btnPayNow}
                    onPress={() => handleCardPay(item.id, item.name)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.btnPayNowText}>Pay Now</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnMarkPaid}
                    onPress={() => handleCardMarkPaid(item.id, item.name)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.btnMarkPaidText}>Mark as Paid</Text>
                  </TouchableOpacity>
                </View>
              )}

              {activeTab === "Payment History" && (
                <TouchableOpacity style={styles.historyPayslipBtn} activeOpacity={0.7}>
                  <Ionicons name="eye-outline" size={16} color="#5C55FF" style={{ marginRight: 6 }} />
                  <Text style={styles.historyPayslipBtnText}>View Payslip</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>

      {/* Batch Footer Actions */}
      {activeTab === "Pending Approval" && pendingApproval.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerBtnReject} onPress={handleRejectAll} activeOpacity={0.8}>
            <Text style={styles.footerBtnRejectText}>Reject All ({pendingApproval.length})</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerBtnApprove} onPress={handleApproveAll} activeOpacity={0.8}>
            <Text style={styles.footerBtnApproveText}>Approve All ({pendingApproval.length})</Text>
          </TouchableOpacity>
        </View>
      )}

      {activeTab === "Pending Payment" && pendingPayment.length > 0 && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerBtnReject} onPress={handleMarkAllPaid} activeOpacity={0.8}>
            <Text style={styles.footerBtnRejectText}>Mark All as Paid</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerBtnApprove} onPress={handlePayAll} activeOpacity={0.8}>
            <Text style={styles.footerBtnApproveText}>Pay All Now ({pendingPayment.length})</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Revolut flows are now separate route screens under /staff/revolut */}
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
  headerIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 13,
    color: "#1F2937",
    fontFamily: "Manrope_500Medium",
    padding: 0,
  },
  tabsWrapper: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    height: 48,
  },
  tabsScrollContent: {
    paddingHorizontal: 16,
    alignItems: "center",
    height: "100%",
  },
  tabButton: {
    paddingHorizontal: 16,
    height: 32,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: "#F3F4F6",
  },
  tabButtonActive: {
    backgroundColor: "#5C55FF",
  },
  tabButtonText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#4B5563",
  },
  tabButtonTextActive: {
    color: "#FFFFFF",
  },
  periodHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  periodText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 14,
    color: "#1F2937",
  },
  paymentsCountText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: "#9CA3AF",
  },
  scrollList: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    padding: 16,
    marginBottom: 12,
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  cardHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: "#ECEEF2",
  },
  employeeName: {
    fontFamily: "Manrope_700Bold",
    fontSize: 14,
    color: "#1F2937",
    marginBottom: 2,
  },
  uploadedBy: {
    fontFamily: "Manrope_500Medium",
    fontSize: 10,
    color: "#9CA3AF",
  },
  cardHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  roleTag: {
    backgroundColor: "#E0F2FE",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  roleTagText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 10,
    color: "#0284C7",
  },
  infoGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  infoCol: {
    flex: 1,
  },
  infoLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 10,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  infoValue: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#1F2937",
  },
  dateBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  dateBadgeText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 11,
    color: "#2563EB",
  },
  statusReviewText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#D97706",
  },
  statusApprovedText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#059669",
  },
  statusPaidBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  statusPaidBadgeText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 11,
    color: "#059669",
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: 14,
  },
  expandedDetails: {
    marginTop: 2,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  detailCol: {
    flex: 1,
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
  detailSingleRow: {
    marginBottom: 16,
  },
  detailValueIBAN: {
    fontFamily: "Courier",
    fontSize: 12,
    color: "#374151",
    fontWeight: "bold",
  },
  payslipBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 38,
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 4,
  },
  payslipBtnReview: {
    borderColor: "#FFB020",
    backgroundColor: "#FFFBEB",
  },
  payslipBtnApproved: {
    borderColor: "#10B981",
    backgroundColor: "#ECFDF5",
  },
  payslipBtnTextReview: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#D97706",
  },
  payslipBtnTextApproved: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#059669",
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 14,
  },
  btnApprove: {
    flex: 1.2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5C55FF",
    height: 38,
    borderRadius: 6,
    marginRight: 10,
  },
  btnApproveText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    color: "#FFFFFF",
  },
  btnReject: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF1F2",
    borderWidth: 1,
    borderColor: "#FFE4E6",
    height: 38,
    borderRadius: 6,
  },
  btnRejectText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#EF4444",
  },
  btnPayNow: {
    flex: 1.2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5C55FF",
    height: 38,
    borderRadius: 6,
    marginRight: 10,
  },
  btnPayNowText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    color: "#FFFFFF",
  },
  btnMarkPaid: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    height: 38,
    borderRadius: 6,
  },
  btnMarkPaidText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#4B5563",
  },
  historyPayslipBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF2FF",
    height: 38,
    borderRadius: 6,
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#E0E7FF",
  },
  historyPayslipBtnText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#5C55FF",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerBtnReject: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF1F2",
    height: 42,
    borderRadius: 6,
    marginRight: 12,
  },
  footerBtnRejectText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#EF4444",
  },
  footerBtnApprove: {
    flex: 1.3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5C55FF",
    height: 42,
    borderRadius: 6,
  },
  footerBtnApproveText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    color: "#FFFFFF",
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#F9FAFB",
    zIndex: 999,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 54,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  modalHeaderIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  modalHeaderTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 16,
    color: "#1F2937",
  },
  modalScrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  iconShieldWrapper: {
    alignItems: "center",
    marginVertical: 20,
  },
  iconShieldCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  revolutTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 16,
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 8,
  },
  revolutSubtitle: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  warningBox: {
    flexDirection: "row",
    backgroundColor: "#FFFBEB",
    borderColor: "#FEF3C7",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
  },
  warningTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    color: "#D97706",
    marginBottom: 2,
  },
  warningText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: "#B45309",
    lineHeight: 16,
  },
  needTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#1F2937",
    marginBottom: 12,
    marginTop: 8,
  },
  needItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  needIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  needText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 13,
    color: "#374151",
  },
  modalBtnSolid: {
    backgroundColor: "#5C55FF",
    height: 46,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    shadowColor: "#5C55FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  modalBtnSolidText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#FFFFFF",
  },
  modalBtnOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    height: 46,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  modalBtnOutlineText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 13,
    color: "#4B5563",
  },
  fieldLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 11,
    color: "#4B5563",
    marginBottom: 6,
  },
  modalInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    fontFamily: "Manrope_500Medium",
    fontSize: 13,
    color: "#1F2937",
    marginBottom: 16,
  },
  environmentSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    marginBottom: 20,
  },
  environmentSelectorText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 13,
    color: "#1F2937",
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#EEF2FF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  infoBoxText: {
    flex: 1,
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: "#4B5563",
    lineHeight: 16,
  },
  successIconWrapper: {
    alignItems: "center",
    marginVertical: 24,
  },
  successIconOuterCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  successIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#5C55FF",
    alignItems: "center",
    justifyContent: "center",
  },
  connectionVerifiedBox: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
  },
  verifiedBoxHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  verifiedBoxTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    color: "#1F2937",
  },
  verifiedBoxStatus: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    color: "#5C55FF",
  },
  verifiedProgressBar: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "#5C55FF",
    width: "100%",
    marginBottom: 16,
  },
  checklistRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checklistText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: "#4B5563",
  },
  paymentSummaryBox: {
    backgroundColor: "#5C55FF",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  paymentSummaryLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: "#E0E7FF",
    marginBottom: 6,
  },
  paymentSummaryAmount: {
    fontFamily: "Manrope_800ExtraBold",
    fontSize: 26,
    color: "#FFFFFF",
    marginBottom: 16,
  },
  paymentSummaryDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.2)",
    paddingTop: 12,
  },
  summaryDetailCol: {
    flexDirection: "row",
    alignItems: "center",
  },
  summaryDetailText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 10,
    color: "#FFFFFF",
    marginLeft: 4,
  },
  recipientRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    width: "100%",
  },
  recipientAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  recipientName: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#1F2937",
    marginBottom: 1,
  },
  recipientDept: {
    fontFamily: "Manrope_500Medium",
    fontSize: 10,
    color: "#9CA3AF",
  },
  recipientAmount: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#1F2937",
    marginRight: 8,
  },
  recipientBadge: {
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  recipientBadgeText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 9,
    color: "#059669",
  },
  disclaimerText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: "#9CA3AF",
    lineHeight: 16,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 16,
  },
  txRefText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 10,
    color: "#E0E7FF",
    alignSelf: "flex-end",
    marginBottom: 6,
  },
  payingAmountLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 10,
    color: "#E0E7FF",
  },
  authTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 16,
    color: "#1F2937",
    marginBottom: 8,
    marginTop: 12,
    textAlign: "center",
  },
  authSubtitle: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 18,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  codeBox: {
    width: 44,
    height: 44,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  codeBoxActive: {
    borderColor: "#5C55FF",
    backgroundColor: "#F5F3FF",
  },
  codeText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 18,
    color: "#1F2937",
  },
  hiddenInput: {
    position: "absolute",
    opacity: 0,
    width: 0,
    height: 0,
  },
  resendText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 16,
  },
  processingRingWrapper: {
    alignItems: "center",
    marginVertical: 24,
  },
  processingSpinnerCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: "#5C55FF",
    borderLeftColor: "#E0E7FF",
    alignItems: "center",
    justifyContent: "center",
  },
  processingPercent: {
    fontFamily: "Manrope_700Bold",
    fontSize: 16,
    color: "#1F2937",
  },
  processingNote: {
    flexDirection: "row",
    backgroundColor: "#FFFBEB",
    borderColor: "#FEF3C7",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    marginBottom: 16,
    width: "100%",
  },
  processingNoteTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    color: "#D97706",
    marginBottom: 2,
  },
  processingNoteText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: "#B45309",
    lineHeight: 16,
  },
  resultsSummaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 14,
    marginBottom: 20,
  },
  resultColSuccess: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "#F3F4F6",
    paddingRight: 10,
  },
  resultColFailed: {
    flex: 1,
    paddingLeft: 14,
  },
  resultColLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 10,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  resultColCount: {
    fontFamily: "Manrope_700Bold",
    fontSize: 14,
    color: "#374151",
    marginBottom: 2,
  },
  resultColAmount: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    color: "#9CA3AF",
  },
  txidText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 10,
    color: "#9CA3AF",
  },
  successDotRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  successDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10B981",
    marginRight: 4,
  },
  successDotText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 10,
    color: "#10B981",
  },
  paymentChannelCard: {
    flexDirection: "row",
    backgroundColor: "#EEF2FF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    width: "100%",
  },
  channelTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
    color: "#5C55FF",
    marginBottom: 2,
  },
  channelText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: "#4B5563",
    lineHeight: 16,
  },
});
