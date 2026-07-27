import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";
import Avatar from "@/components/Avatar";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Mock Data
const paymentsList = [
  {
    id: "1",
    txnId: "ID#5487",
    client: "Maria Rodriguez",
    amount: "€270.00",
    date: "5 Aug 2025",
    time: "12:30",
    status: "FULLY PAID",
    staff: "Cameron Williamson",
    method: "CASH",
    receipt: "NOT ISSUED",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "2",
    txnId: "ID#5487",
    client: "Maria Rodriguez",
    amount: "€270.00",
    date: "5 Aug 2025",
    time: "12:30",
    status: "HALF PAID",
    staff: "Cameron Williamson",
    method: "CARD",
    receipt: "NOT ISSUED",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "3",
    txnId: "ID#5487",
    client: "Maria Rodriguez",
    amount: "€270.00",
    date: "5 Aug 2025",
    time: "12:30",
    status: "NOT PAID",
    staff: "Cameron Williamson",
    method: "ONLINE P.",
    receipt: "NOT ISSUED",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80",
  },
];

const receiptsList = [
  {
    id: "r1",
    txnId: "ID#5487",
    client: "Maria Rodriguez",
    amount: "€270.00",
    date: "5 Aug 2025",
    time: "12:30",
    status: "FULLY PAID",
    method: "CASH",
    receipt: "NOT ISSUED",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "r2",
    txnId: "ID#5487",
    client: "Maria Rodriguez",
    amount: "€270.00",
    date: "5 Aug 2025",
    time: "12:30",
    status: "FULLY PAID",
    method: "ONLINE P.",
    receipt: "HALF ISSUED",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "r3",
    txnId: "ID#5487",
    client: "Maria Rodriguez",
    amount: "€270.00",
    date: "5 Aug 2025",
    time: "12:30",
    status: "NOT PAID",
    method: "CASH",
    receipt: "NOT ISSUED",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80",
  },
];

const giftCardsList = [
  {
    id: "g1",
    cardId: "ID#5487",
    name: "Platinum Welcome",
    amount: "€200.00",
    usageLimit: "1",
    eligibleServices: "ALL",
    issueDate: "5 Aug 2025",
    expirationDate: "5 Aug 2025",
    usageStatus: "NOT USED",
    expirationStatus: "ACTIVE",
  },
  {
    id: "g2",
    cardId: "ID#5487",
    name: "Platinum Welcome",
    amount: "€200.00",
  },
  {
    id: "g3",
    cardId: "ID#5487",
    name: "Platinum Welcome",
    amount: "€200.00",
  },
  {
    id: "g4",
    cardId: "ID#5487",
    name: "Summer Glow",
    amount: "€100.00",
  },
  {
    id: "g5",
    cardId: "ID#5487",
    name: "Summer Glow",
    amount: "€100.00",
  },
  {
    id: "g6",
    cardId: "ID#5487",
    name: "Summer Glow",
    amount: "€100.00",
    usageLimit: "1",
    eligibleServices: "ALL",
    issueDate: "5 Aug 2025",
    expirationDate: "5 Aug 2025",
    usageStatus: "NOT USED",
    expirationStatus: "EXPIRED",
  },
];

const salariesList = [
  {
    id: "s1",
    name: "Maria Rodriguez",
    role: "Staff",
    netAmount: "€ 3,200.00",
    month: "December 2024",
    date: "Dec 01, 2024",
    status: "Paid",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: "s2",
    name: "Maria Rodriguez",
    role: "Staff",
    netAmount: "€ 3,200.00",
    month: "December 2024",
    date: "Dec 01, 2024",
    status: "Paid",
    grossSalary: "€ 3,200.00",
    netSalary: "€ 2,600.00",
    trfMonthly: "€ 600.00",
    cumulativeTrf: "€ 3,800.00",
    iban: "IT60 X054 ******** 123",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80",
  },
];

export default function FinanceScreen() {
  const [activeCategory, setActiveCategory] = useState("Payments");
  const [expandedGiftCard, setExpandedGiftCard] = useState<string | null>("g1");
  const [expandedSalary, setExpandedSalary] = useState<string | null>("s2");

  const categories = ["Payments", "Receipts", "Gift Cards", "Salaries"];

  const toggleGiftCard = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedGiftCard(expandedGiftCard === id ? null : id);
  };

  const toggleSalary = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedSalary(expandedSalary === id ? null : id);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "FULLY PAID":
      case "Paid":
      case "ACTIVE":
        return { bg: "#EBFDF5", text: "#10B981", border: "#A7F3D0" };
      case "HALF PAID":
      case "HALF ISSUED":
      case "NOT USED":
        return { bg: "#FFFBEB", text: "#F59E0B", border: "#FDE68A" };
      case "NOT PAID":
      case "NOT ISSUED":
      case "EXPIRED":
        return { bg: "#FEF2F2", text: "#EF4444", border: "#FCA5A5" };
      case "CARD":
        return { bg: "#E0F2FE", text: "#0284C7", border: "#BAE6FD" };
      case "CASH":
        return { bg: "#EBFDF5", text: "#10B981", border: "#A7F3D0" };
      case "ONLINE P.":
        return { bg: "#FFFBEB", text: "#F59E0B", border: "#FDE68A" };
      default:
        return { bg: "#F3F4F6", text: "#4B5563", border: "#E5E7EB" };
    }
  };

  return (
    <View style={styles.container}>
      <Header />

      {/* Categories Bar */}
      <View style={styles.categoriesBarContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesBar}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryTab, isActive && styles.categoryTabActive]}
                onPress={() => {
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                  setActiveCategory(cat);
                }}
                activeOpacity={0.7}
              >
                <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Render Payments View */}
        {activeCategory === "Payments" && (
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <View style={[styles.iconContainer, { backgroundColor: "#EEF2FF" }]}>
                  <Ionicons name="card-outline" size={18} color="#5C55FF" />
                </View>
                <Text style={styles.sectionTitle}>Payments</Text>
              </View>
            </View>

            <View style={styles.listContainer}>
              {paymentsList.map((item) => {
                const statusStyle = getStatusStyle(item.status);
                const methodStyle = getStatusStyle(item.method);
                const receiptStyle = getStatusStyle(item.receipt);

                return (
                  <View key={item.id} style={styles.financeCard}>
                    <View style={styles.financeCardHeader}>
                      <View style={styles.financeUser}>
                        <Avatar name={item.client} uri={item.avatar} size={36} />
                        <View style={styles.financeUserInfo}>
                          <Text style={styles.txnIdText}>{item.txnId}</Text>
                          <Text style={styles.clientNameText}>{item.client}</Text>
                        </View>
                      </View>
                      <View style={styles.amountContainer}>
                        <Text style={styles.amountLabel}>AMOUNT</Text>
                        <Text style={styles.amountValue}>{item.amount}</Text>
                      </View>
                    </View>

                    <Text style={styles.dateText}>
                      Date : <Text style={styles.boldText}>{item.date}</Text> | Time :{" "}
                      <Text style={styles.boldText}>{item.time}</Text>
                    </Text>

                    <View style={styles.financeDivider} />

                    <View style={styles.financeGrid}>
                      <View style={styles.gridCell}>
                        <Text style={styles.cellLabel}>STATUS</Text>
                        <View style={[styles.inlineBadge, { backgroundColor: statusStyle.bg }]}>
                          <Text style={[styles.inlineBadgeText, { color: statusStyle.text }]}>
                            {item.status}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.gridCell}>
                        <Text style={styles.cellLabel}>STAFF</Text>
                        <Text style={styles.staffNameText} numberOfLines={1}>
                          {item.staff}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.financeGrid}>
                      <View style={styles.gridCell}>
                        <Text style={styles.cellLabel}>METHOD</Text>
                        <View style={[styles.inlineBadge, { backgroundColor: methodStyle.bg }]}>
                          <Text style={[styles.inlineBadgeText, { color: methodStyle.text }]}>
                            {item.method}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.gridCell}>
                        <Text style={styles.cellLabel}>RECEIPT</Text>
                        <View style={[styles.inlineBadge, { backgroundColor: receiptStyle.bg }]}>
                          <Text style={[styles.inlineBadgeText, { color: receiptStyle.text }]}>
                            {item.receipt}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <TouchableOpacity style={styles.cardArrow}>
                      <Ionicons name="chevron-forward" size={18} color="#5C55FF" />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>

            <TouchableOpacity style={styles.seeAllLink}>
              <Text style={styles.seeAllLinkText}>See All Payments</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Render Receipts View */}
        {activeCategory === "Receipts" && (
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <View style={[styles.iconContainer, { backgroundColor: "#EEF2FF" }]}>
                  <Ionicons name="receipt-outline" size={18} color="#5C55FF" />
                </View>
                <Text style={styles.sectionTitle}>Receipts</Text>
              </View>
            </View>

            {/* Dropdown Filters Mock */}
            <View style={styles.dropdownsRow}>
              <TouchableOpacity style={styles.dropdownBtn}>
                <Text style={styles.dropdownText}>Status</Text>
                <Ionicons name="chevron-down" size={14} color="#9CA3AF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownBtn}>
                <Text style={styles.dropdownText}>Method</Text>
                <Ionicons name="chevron-down" size={14} color="#9CA3AF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownBtn}>
                <Text style={styles.dropdownText}>Receipt</Text>
                <Ionicons name="chevron-down" size={14} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            <View style={styles.listContainer}>
              {receiptsList.map((item) => {
                const statusStyle = getStatusStyle(item.status);
                const methodStyle = getStatusStyle(item.method);
                const receiptStyle = getStatusStyle(item.receipt);

                return (
                  <View key={item.id} style={styles.financeCard}>
                    <View style={styles.financeCardHeader}>
                      <View style={styles.financeUser}>
                        <Avatar name={item.client} uri={item.avatar} size={36} />
                        <View style={styles.financeUserInfo}>
                          <Text style={styles.txnIdText}>{item.txnId}</Text>
                          <Text style={styles.clientNameText}>{item.client}</Text>
                        </View>
                      </View>
                      <View style={styles.amountContainer}>
                        <Text style={styles.amountLabel}>AMOUNT</Text>
                        <Text style={styles.amountValue}>{item.amount}</Text>
                      </View>
                    </View>

                    <Text style={styles.dateText}>
                      Date : <Text style={styles.boldText}>{item.date}</Text> | Time :{" "}
                      <Text style={styles.boldText}>{item.time}</Text>
                    </Text>

                    <View style={styles.financeDivider} />

                    <View style={styles.financeGrid}>
                      <View style={styles.gridCell}>
                        <Text style={styles.cellLabel}>STATUS</Text>
                        <View style={[styles.inlineBadge, { backgroundColor: statusStyle.bg }]}>
                          <Text style={[styles.inlineBadgeText, { color: statusStyle.text }]}>
                            {item.status}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.gridCell}>
                        <Text style={styles.cellLabel}>METHOD</Text>
                        <View style={[styles.inlineBadge, { backgroundColor: methodStyle.bg }]}>
                          <Text style={[styles.inlineBadgeText, { color: methodStyle.text }]}>
                            {item.method}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.financeGrid}>
                      <View style={[styles.gridCell,{ flex: 1 }]} >
                        <Text style={styles.cellLabel}>RECEIPT</Text>
                        <View style={[styles.inlineBadge, { backgroundColor: receiptStyle.bg }]}>
                          <Text style={[styles.inlineBadgeText, { color: receiptStyle.text }]}>
                            {item.receipt}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <TouchableOpacity style={styles.cardArrow}>
                      <Ionicons name="chevron-forward" size={18} color="#5C55FF" />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>

            <TouchableOpacity style={styles.seeAllLink}>
              <Text style={styles.seeAllLinkText}>See All Receipts</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Render Gift Cards View */}
        {activeCategory === "Gift Cards" && (
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <View style={[styles.iconContainer, { backgroundColor: "#EEF2FF" }]}>
                  <Ionicons name="gift-outline" size={18} color="#5C55FF" />
                </View>
                <Text style={styles.sectionTitle}>Gifts Cards</Text>
              </View>
            </View>

            <View style={styles.listContainer}>
              {giftCardsList.map((item) => {
                const isExpanded = expandedGiftCard === item.id;
                const showDetails = isExpanded && item.usageLimit; // only expand items that have details in mock data

                return (
                  <View key={item.id} style={styles.collapsibleCard}>
                    <TouchableOpacity
                      style={styles.collapsibleHeader}
                      onPress={() => item.usageLimit && toggleGiftCard(item.id)}
                      activeOpacity={item.usageLimit ? 0.7 : 1}
                    >
                      <View>
                        <Text style={styles.txnIdText}>{item.cardId}</Text>
                        <Text style={styles.giftCardName}>{item.name}</Text>
                      </View>
                      <View style={styles.collapsibleHeaderRight}>
                        <View style={styles.giftCardAmountCol}>
                          <Text style={styles.amountLabel}>AMOUNT</Text>
                          <Text style={styles.giftCardAmount}>{item.amount}</Text>
                        </View>
                        {item.usageLimit && (
                          <Ionicons
                            name={isExpanded ? "chevron-up" : "chevron-down"}
                            size={18}
                            color="#5C55FF"
                            style={{ marginLeft: 12 }}
                          />
                        )}
                      </View>
                    </TouchableOpacity>

                    {showDetails && (
                      <View style={styles.collapsibleDetails}>
                        <View style={styles.financeDivider} />
                        <View style={styles.detailsRow}>
                          <View style={styles.detailsCol}>
                            <Text style={styles.detailsLabel}>USAGE LIMIT</Text>
                            <View style={[styles.detailsBadge, { backgroundColor: "#F0EFFF" }]}>
                              <Text style={[styles.detailsBadgeText, { color: "#5C55FF" }]}>
                                {item.usageLimit}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.detailsCol}>
                            <Text style={styles.detailsLabel}>ELIGIBLE SERVICES</Text>
                            <View style={[styles.detailsBadge, { backgroundColor: "#E0F2FE" }]}>
                              <Text style={[styles.detailsBadgeText, { color: "#0284C7" }]}>
                                {item.eligibleServices}
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View style={styles.detailsRow}>
                          <View style={styles.detailsCol}>
                            <Text style={styles.detailsLabel}>ISSUE DATE</Text>
                            <Text style={styles.detailsDateText}>{item.issueDate}</Text>
                          </View>
                          <View style={styles.detailsCol}>
                            <Text style={styles.detailsLabel}>EXPIRATION DATE</Text>
                            <Text style={styles.detailsDateText}>{item.expirationDate}</Text>
                          </View>
                        </View>

                        <View style={styles.detailsRow}>
                          <View style={styles.detailsCol}>
                            <Text style={styles.detailsLabel}>USAGE STATUS</Text>
                            <View style={[styles.detailsBadge, { backgroundColor: "#FFFBEB" }]}>
                              <Text style={[styles.detailsBadgeText, { color: "#F59E0B" }]}>
                                {item.usageStatus}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.detailsCol}>
                            <Text style={styles.detailsLabel}>EXPIRATION STATUS</Text>
                            <View
                              style={[
                                styles.statusBorderBadge,
                                item.expirationStatus === "ACTIVE"
                                  ? styles.statusActiveBorder
                                  : styles.statusExpiredBorder,
                              ]}
                            >
                              <Text
                                style={[
                                  styles.statusBorderBadgeText,
                                  item.expirationStatus === "ACTIVE"
                                    ? styles.statusActiveText
                                    : styles.statusExpiredText,
                                ]}
                              >
                                {item.expirationStatus}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>

            <TouchableOpacity style={styles.seeAllLink}>
              <Text style={styles.seeAllLinkText}>See All Gift Cards</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Render Salaries View */}
        {activeCategory === "Salaries" && (
          <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <View style={[styles.iconContainer, { backgroundColor: "#EEF2FF" }]}>
                  <Ionicons name="wallet-outline" size={18} color="#5C55FF" />
                </View>
                <Text style={styles.sectionTitle}>Salaries</Text>
              </View>
            </View>

            <View style={styles.listContainer}>
              {salariesList.map((item) => {
                const isExpanded = expandedSalary === item.id;
                const statusStyle = getStatusStyle(item.status);

                return (
                  <View key={item.id} style={styles.collapsibleCard}>
                    <TouchableOpacity
                      style={styles.collapsibleHeader}
                      onPress={() => item.grossSalary && toggleSalary(item.id)}
                      activeOpacity={item.grossSalary ? 0.7 : 1}
                    >
                      <View style={styles.financeUser}>
                        <Avatar name={item.name} uri={item.avatar} size={36} />
                        <View style={styles.financeUserInfo}>
                          <Text style={styles.clientNameText}>{item.name}</Text>
                          <Text style={styles.salaryRoleBadge}>{item.role}</Text>
                        </View>
                      </View>

                      <View style={styles.collapsibleHeaderRight}>
                        <View style={styles.giftCardAmountCol}>
                          <Text style={styles.amountLabel}>NET AMOUNT</Text>
                          <Text style={styles.giftCardAmount}>{item.netAmount}</Text>
                        </View>
                        {item.grossSalary && (
                          <Ionicons
                            name={isExpanded ? "chevron-up" : "chevron-down"}
                            size={18}
                            color="#5C55FF"
                            style={{ marginLeft: 12 }}
                          />
                        )}
                      </View>
                    </TouchableOpacity>

                    {/* Expandable salary details */}
                    {isExpanded && item.grossSalary && (
                      <View style={styles.collapsibleDetails}>
                        <View style={styles.financeDivider} />

                        <View style={styles.detailsRow}>
                          <View style={styles.detailsCol}>
                            <Text style={styles.detailsLabel}>Month</Text>
                            <Text style={styles.salaryValueBold}>{item.month}</Text>
                          </View>
                          <View style={styles.detailsCol}>
                            <Text style={styles.detailsLabel}>Date</Text>
                            <View style={styles.salaryDateTag}>
                              <Text style={styles.salaryDateTagText}>{item.date}</Text>
                            </View>
                          </View>
                        </View>

                        <View style={styles.detailsRow}>
                          <View style={styles.detailsCol}>
                            <Text style={styles.detailsLabel}>Status</Text>
                            <View style={[styles.inlineBadge, { backgroundColor: statusStyle.bg }]}>
                              <Text style={[styles.inlineBadgeText, { color: statusStyle.text }]}>
                                {item.status}
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View style={styles.financeDivider} />

                        {/* Financial grid matching screenshot */}
                        <View style={styles.detailsGrid}>
                          <View style={styles.gridRow}>
                            <View style={styles.gridCol}>
                              <Text style={styles.cellLabel}>Gross Salary</Text>
                              <Text style={styles.gridValueBold}>{item.grossSalary}</Text>
                            </View>
                            <View style={styles.gridCol}>
                              <Text style={styles.cellLabel}>Net Salary</Text>
                              <Text style={styles.gridValueBold}>{item.netSalary}</Text>
                            </View>
                          </View>

                          <View style={styles.gridRow}>
                            <View style={styles.gridCol}>
                              <Text style={styles.cellLabel}>TRF (Monthly)</Text>
                              <Text style={styles.gridValueBold}>{item.trfMonthly}</Text>
                            </View>
                            <View style={styles.gridCol}>
                              <Text style={styles.cellLabel}>Cumulative TRF</Text>
                              <Text style={styles.gridValueBold}>{item.cumulativeTrf}</Text>
                            </View>
                          </View>
                        </View>

                        <View style={styles.ibanSection}>
                          <Text style={styles.cellLabel}>IBAN</Text>
                          <Text style={styles.ibanValue}>{item.iban}</Text>
                        </View>

                        <TouchableOpacity style={styles.viewPayslipBtn} activeOpacity={0.8}>
                          <Ionicons name="eye-outline" size={16} color="#5C55FF" style={{ marginRight: 6 }} />
                          <Text style={styles.viewPayslipBtnText}>View Payslip</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>

            <TouchableOpacity style={styles.seeAllLink}>
              <Text style={styles.seeAllLinkText}>See All Salaries</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  categoriesBarContainer: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  categoriesBar: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    marginRight: 10,
  },
  categoryTabActive: {
    backgroundColor: "#5C55FF",
  },
  categoryText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 13,
    color: "#6B7280",
  },
  categoryTextActive: {
    color: "#FFFFFF",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionCard: {
    marginHorizontal: 20,
    marginTop: 20,
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
  listContainer: {
    marginBottom: 12,
  },
  financeCard: {
    borderWidth: 1,
    borderColor: "#F3F4F6",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
    position: "relative",
  },
  financeCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  financeUser: {
    flexDirection: "row",
    alignItems: "center",
  },
  financeUserInfo: {
    marginLeft: 10,
  },
  txnIdText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 10,
    color: "#3B82F6",
  },
  clientNameText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 14,
    color: "#1F2937",
  },
  amountContainer: {
    alignItems: "flex-end",
  },
  amountLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 8,
    color: "#9CA3AF",
    marginBottom: 2,
  },
  amountValue: {
    fontFamily: "Manrope_700Bold",
    fontSize: 15,
    color: "#1F2937",
  },
  dateText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 10,
    color: "#9CA3AF",
    marginBottom: 10,
  },
  boldText: {
    fontFamily: "Manrope_700Bold",
    color: "#4B5563",
  },
  financeDivider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: 10,
  },
  financeGrid: {
    flexDirection: "row",
    marginBottom: 10,
  },
  gridCell: {
    flex: 1,
  },
  cellLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 9,
    color: "#9CA3AF",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  inlineBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  inlineBadgeText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
  },
  staffNameText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#1F2937",
  },
  cardArrow: {
    position: "absolute",
    right: 14,
    bottom: 24,
    padding: 6,
  },
  dropdownsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  dropdownBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 6,
  },
  dropdownText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: "#4B5563",
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
  // Collapsible cards (Gift Cards & Salaries)
  collapsibleCard: {
    borderWidth: 1,
    borderColor: "#F3F4F6",
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  collapsibleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
  },
  collapsibleHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  giftCardName: {
    fontFamily: "Manrope_700Bold",
    fontSize: 14,
    color: "#1F2937",
    marginTop: 2,
  },
  giftCardAmountCol: {
    alignItems: "flex-end",
  },
  giftCardAmount: {
    fontFamily: "Manrope_700Bold",
    fontSize: 14,
    color: "#1F2937",
  },
  collapsibleDetails: {
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  detailsCol: {
    flex: 1,
  },
  detailsLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 8,
    color: "#9CA3AF",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  detailsBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  detailsBadgeText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
  },
  detailsDateText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 11,
    color: "#5C55FF",
  },
  statusBorderBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  statusActiveBorder: {
    borderColor: "#10B981",
    backgroundColor: "transparent",
  },
  statusExpiredBorder: {
    borderColor: "#EF4444",
    backgroundColor: "transparent",
  },
  statusBorderBadgeText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
  },
  statusActiveText: {
    color: "#10B981",
  },
  statusExpiredText: {
    color: "#EF4444",
  },
  salaryRoleBadge: {
    fontFamily: "Manrope_500Medium",
    fontSize: 10,
    color: "#00D2C4",
    backgroundColor: "#E6FAF8",
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginTop: 2,
  },
  salaryValueBold: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#1F2937",
  },
  salaryDateTag: {
    alignSelf: "flex-start",
    backgroundColor: "#EFF6FF",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  salaryDateTagText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 10,
    color: "#3B82F6",
  },
  detailsGrid: {
    marginTop: 4,
  },
  gridRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  gridCol: {
    flex: 1,
  },
  gridValueBold: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#1F2937",
  },
  ibanSection: {
    marginTop: 4,
    marginBottom: 14,
  },
  ibanValue: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#1F2937",
  },
  viewPayslipBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0EFFF",
    borderRadius: 8,
    paddingVertical: 10,
    width: "100%",
  },
  viewPayslipBtnText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#5C55FF",
  },
});
