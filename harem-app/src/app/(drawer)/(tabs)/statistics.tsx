import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";
import Avatar from "@/components/Avatar";

const topStylists = [
  { name: "Cameron Williamson", bookings: 82, rating: "5.0", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" },
  { name: "Leslie Alexander", bookings: 76, rating: "4.9", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=100&q=80" },
  { name: "Robert Fox", bookings: 68, rating: "4.9", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" },
];

const topClients = [
  { name: "Maria Rodriguez", visits: 24, spent: "€1,240", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" },
  { name: "Courtney Henry", visits: 18, spent: "€980", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" },
  { name: "Albert Flores", visits: 15, spent: "€850", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" },
];

const topProducts = [
  { name: "L'Oréal Professional Shampoo", sold: 145, revenue: "€4,350", percentage: 40, color: "#5C55FF" },
  { name: "Olaplex No. 4 Bond Maintenance", sold: 110, revenue: "€3,850", percentage: 32, color: "#0D9488" },
  { name: "Moroccanoil Treatment Oil", sold: 68, revenue: "€2,720", percentage: 18, color: "#FFB020" },
  { name: "Kérastase Nutritive Mask", sold: 35, revenue: "€1,575", percentage: 10, color: "#FF5C93" },
];

export default function StatisticsScreen() {
  const [activeTab, setActiveTab] = useState<"Overview" | "Clients" | "Revenue" | "Inventory">("Overview");

  const renderRevenueValue = (val: string) => {
    const parts = val.split(".");
    if (parts.length === 2) {
      return (
        <Text style={styles.largeValueText}>
          {parts[0]}
          <Text style={styles.smallDecimalsText}>.{parts[1]}</Text>
        </Text>
      );
    }
    return <Text style={styles.largeValueText}>{val}</Text>;
  };

  return (
    <View style={styles.container}>
      <Header />

      {/* Sub-Tabs Selector */}
      <View style={styles.subTabContainer}>
        {(["Overview", "Clients", "Revenue", "Inventory"] as const).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.subTabButton, isActive && styles.subTabButtonActive]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.8}
            >
              <Text style={[styles.subTabText, isActive && styles.subTabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Screen Title & Date Picker Row */}
      <View style={styles.titleRow}>
        <Text style={styles.screenTitle}>{activeTab}</Text>
        <TouchableOpacity style={styles.datePickerBtn} activeOpacity={0.7}>
          <Ionicons name="calendar-outline" size={14} color="#5C55FF" style={{ marginRight: 6 }} />
          <Text style={styles.datePickerText}>This Month</Text>
          <Ionicons name="chevron-down" size={12} color="#9CA3AF" style={{ marginLeft: 4 }} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {activeTab === "Overview" && (
          <View style={styles.tabContent}>
            {/* Total Revenue Card */}
            <View style={styles.totalRevenueCard}>
              <View style={styles.cardHeaderRow}>
                <View style={styles.headerLeftContainer}>
                  <View style={styles.iconCirclePurple}>
                    <Ionicons name="wallet-outline" size={16} color="#5C55FF" />
                  </View>
                  <Text style={styles.revenueLabel}>Total Revenue</Text>
                </View>
                <View style={styles.trendBadgeTeal}>
                  <Ionicons name="trending-up" size={12} color="#0D9488" style={{ marginRight: 2 }} />
                  <Text style={styles.trendBadgeTextTeal}>12.4%</Text>
                </View>
              </View>
              <View style={styles.valueRow}>
                {renderRevenueValue("$142,500.00")}
              </View>
            </View>

            {/* KPI Grid (Receipts & Avg Ticket) */}
            <View style={styles.kpiRow}>
              {/* Receipts Card */}
              <View style={styles.halfKpiCard}>
                <Text style={styles.kpiLabel}>Receipts</Text>
                <View style={styles.kpiValueContainer}>
                  <Text style={styles.kpiValueMain}>580</Text>
                  <View style={styles.receiptsTrend}>
                    <Ionicons name="trending-down" size={12} color="#EF4444" style={{ marginRight: 2 }} />
                    <Text style={styles.receiptsTrendText}>2.1%</Text>
                  </View>
                </View>
              </View>

              {/* Avg Ticket Card */}
              <View style={styles.halfKpiCard}>
                <Text style={styles.kpiLabel}>Avg Ticket</Text>
                <View style={styles.kpiValueContainer}>
                  <Text style={styles.kpiValueMain}>
                    $245<Text style={styles.kpiValueDecimals}>.50</Text>
                  </Text>
                </View>
              </View>
            </View>

            {/* Revenue Trend Card */}
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>Revenue Trend</Text>
                <TouchableOpacity style={styles.moreButton}>
                  <Ionicons name="ellipsis-horizontal" size={18} color="#9CA3AF" />
                </TouchableOpacity>
              </View>

              <View style={styles.barChartContainer}>
                {[
                  { label: "Jun", val: 40 },
                  { label: "Jul", val: 55 },
                  { label: "Aug", val: 42 },
                  { label: "Sep", val: 70 },
                  { label: "Oct", val: 95 },
                  { label: "Nov", val: 120 },
                ].map((bar, idx) => {
                  const maxVal = 130;
                  const barHeightPercent = (bar.val / maxVal) * 100;
                  const isLast = idx === 5;
                  return (
                    <View key={idx} style={styles.chartCol}>
                      <View style={styles.barTrack}>
                        <View
                          style={[
                            styles.barFill,
                            {
                              height: `${barHeightPercent}%`,
                              backgroundColor: isLast ? "#5C55FF" : "#D2CFFF",
                            },
                          ]}
                        />
                      </View>
                      <Text style={[styles.barLabel, isLast && styles.barLabelActive]}>
                        {bar.label}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Client Base Section Header */}
            <Text style={styles.subsectionTitle}>Client Base</Text>

            <View style={styles.clientBaseGrid}>
              {/* New Clients Card */}
              <View style={styles.clientBaseCard}>
                <View style={styles.clientIconContainerCyan}>
                  <Ionicons name="person-add" size={16} color="#0D9488" />
                </View>
                <Text style={styles.clientCardLabel}>New</Text>
                <Text style={styles.clientCardValue}>124</Text>
              </View>

              {/* Inactive Clients Card */}
              <View style={styles.clientBaseCard}>
                <View style={styles.clientIconContainerPink}>
                  <Ionicons name="person-remove" size={16} color="#EF4444" />
                </View>
                <Text style={styles.clientCardLabel}>Inactive</Text>
                <Text style={styles.clientCardValue}>42</Text>
              </View>
            </View>

            {/* Client Share Progress Card */}
            <View style={styles.progressCard}>
              <View style={styles.segmentedProgressBar}>
                <View style={[styles.progressSegment, { width: "65%", backgroundColor: "#5C55FF" }]} />
                <View style={[styles.progressSegment, { width: "25%", backgroundColor: "#0D9488" }]} />
                <View style={[styles.progressSegment, { width: "5%", backgroundColor: "#FF5C93" }]} />
                <View style={[styles.progressSegment, { width: "5%", backgroundColor: "#E5E7EB" }]} />
              </View>
              <View style={styles.legendRow}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: "#5C55FF" }]} />
                  <Text style={styles.legendText}>Returning (65%)</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: "#0D9488" }]} />
                  <Text style={styles.legendText}>New (25%)</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {activeTab === "Clients" && (
          <View style={styles.tabContent}>
            {/* KPI Cards Row */}
            <View style={styles.kpiRow}>
              <View style={styles.halfKpiCard}>
                <Text style={styles.kpiLabel}>Total Clients</Text>
                <View style={styles.kpiValueContainer}>
                  <Text style={styles.kpiValueMain}>1,840</Text>
                  <View style={styles.trendBadgeTealMini}>
                    <Ionicons name="trending-up" size={10} color="#0D9488" />
                    <Text style={styles.trendBadgeTextTealMini}>+4.8%</Text>
                  </View>
                </View>
              </View>

              <View style={styles.halfKpiCard}>
                <Text style={styles.kpiLabel}>Active Clients</Text>
                <View style={styles.kpiValueContainer}>
                  <Text style={styles.kpiValueMain}>1,240</Text>
                  <View style={styles.trendBadgeTealMini}>
                    <Ionicons name="trending-up" size={10} color="#0D9488" />
                    <Text style={styles.trendBadgeTextTealMini}>+12.4%</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Retention Rate & Acquisition */}
            <View style={styles.totalRevenueCard}>
              <View style={styles.cardHeaderRow}>
                <View style={styles.headerLeftContainer}>
                  <View style={styles.iconCirclePurple}>
                    <Ionicons name="people-outline" size={16} color="#5C55FF" />
                  </View>
                  <Text style={styles.revenueLabel}>Retention Rate</Text>
                </View>
                <View style={styles.trendBadgeTeal}>
                  <Ionicons name="trending-up" size={12} color="#0D9488" style={{ marginRight: 2 }} />
                  <Text style={styles.trendBadgeTextTeal}>1.2%</Text>
                </View>
              </View>
              <View style={styles.valueRow}>
                <Text style={styles.largeValueText}>
                  78.5<Text style={styles.smallDecimalsText}>%</Text>
                </Text>
              </View>
            </View>

            {/* Top Stylists Section */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Stylist Performance</Text>
              <Text style={styles.sectionSubtitle}>Ranked by rating and client bookings</Text>
              <View style={styles.stylistList}>
                {topStylists.map((stylist, idx) => (
                  <View key={idx} style={styles.stylistItem}>
                    <View style={styles.stylistLeft}>
                      <Avatar name={stylist.name} uri={stylist.avatar} size={36} />
                      <Text style={styles.stylistName}>{stylist.name}</Text>
                    </View>
                    <View style={styles.stylistRight}>
                      <View style={styles.stylistBookingsBadge}>
                        <Text style={styles.stylistBookingsText}>{stylist.bookings} jobs</Text>
                      </View>
                      <View style={styles.ratingBadge}>
                        <Ionicons name="star" size={12} color="#FFB020" style={{ marginRight: 2 }} />
                        <Text style={styles.ratingText}>{stylist.rating}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Top Clients Section */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Top Clients</Text>
              <Text style={styles.sectionSubtitle}>Most visits and spending this month</Text>
              <View style={styles.stylistList}>
                {topClients.map((client, idx) => (
                  <View key={idx} style={styles.stylistItem}>
                    <View style={styles.stylistLeft}>
                      <Avatar name={client.name} uri={client.avatar} size={36} />
                      <Text style={styles.stylistName}>{client.name}</Text>
                    </View>
                    <View style={styles.stylistRight}>
                      <View style={styles.stylistBookingsBadge}>
                        <Text style={styles.stylistBookingsText}>{client.visits} visits</Text>
                      </View>
                      <View style={styles.ratingBadge}>
                        <Text style={styles.ratingText}>{client.spent}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {activeTab === "Revenue" && (
          <View style={styles.tabContent}>
            {/* KPI Cards Row */}
            <View style={styles.kpiRow}>
              <View style={styles.halfKpiCard}>
                <Text style={styles.kpiLabel}>Tips</Text>
                <View style={styles.kpiValueContainer}>
                  <Text style={styles.kpiValueMain}>
                    $12,450<Text style={styles.kpiValueDecimals}>.00</Text>
                  </Text>
                  <View style={styles.trendBadgeTealMini}>
                    <Ionicons name="trending-up" size={10} color="#0D9488" />
                    <Text style={styles.trendBadgeTextTealMini}>+8.2%</Text>
                  </View>
                </View>
              </View>

              <View style={styles.halfKpiCard}>
                <Text style={styles.kpiLabel}>Product Sales</Text>
                <View style={styles.kpiValueContainer}>
                  <Text style={styles.kpiValueMain}>
                    $18,230<Text style={styles.kpiValueDecimals}>.00</Text>
                  </Text>
                  <View style={styles.trendBadgeTealMini}>
                    <Ionicons name="trending-up" size={10} color="#0D9488" />
                    <Text style={styles.trendBadgeTextTealMini}>+15.6%</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Total Revenue Summary */}
            <View style={styles.totalRevenueCard}>
              <View style={styles.cardHeaderRow}>
                <View style={styles.headerLeftContainer}>
                  <View style={styles.iconCirclePurple}>
                    <Ionicons name="wallet-outline" size={16} color="#5C55FF" />
                  </View>
                  <Text style={styles.revenueLabel}>Gross Sales</Text>
                </View>
                <View style={styles.trendBadgeTeal}>
                  <Ionicons name="trending-up" size={12} color="#0D9488" style={{ marginRight: 2 }} />
                  <Text style={styles.trendBadgeTextTeal}>12.4%</Text>
                </View>
              </View>
              <View style={styles.valueRow}>
                {renderRevenueValue("$142,500.00")}
              </View>
            </View>

            {/* Payment Method Share Progress Card */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Payment Share</Text>
              <Text style={styles.sectionSubtitle}>Distribution by transaction method</Text>

              <View style={styles.segmentedProgressBar}>
                <View style={[styles.progressSegment, { width: "55%", backgroundColor: "#5C55FF" }]} />
                <View style={[styles.progressSegment, { width: "25%", backgroundColor: "#0D9488" }]} />
                <View style={[styles.progressSegment, { width: "15%", backgroundColor: "#FFB020" }]} />
                <View style={[styles.progressSegment, { width: "5%", backgroundColor: "#FF5C93" }]} />
              </View>
              <View style={styles.legendRowGrid}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: "#5C55FF" }]} />
                  <Text style={styles.legendText}>Card (55%)</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: "#0D9488" }]} />
                  <Text style={styles.legendText}>Cash (25%)</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: "#FFB020" }]} />
                  <Text style={styles.legendText}>Online (15%)</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: "#FF5C93" }]} />
                  <Text style={styles.legendText}>Gift Card (5%)</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {activeTab === "Inventory" && (
          <View style={styles.tabContent}>
            {/* KPI Cards Row */}
            <View style={styles.kpiRow}>
              <View style={styles.halfKpiCard}>
                <Text style={styles.kpiLabel}>Items Sold</Text>
                <View style={styles.kpiValueContainer}>
                  <Text style={styles.kpiValueMain}>340</Text>
                  <View style={styles.trendBadgeTealMini}>
                    <Ionicons name="trending-up" size={10} color="#0D9488" />
                    <Text style={styles.trendBadgeTextTealMini}>+15%</Text>
                  </View>
                </View>
              </View>

              <View style={styles.halfKpiCard}>
                <Text style={styles.kpiLabel}>Low Stock Alerts</Text>
                <View style={styles.kpiValueContainer}>
                  <Text style={[styles.kpiValueMain, { color: "#EF4444" }]}>8</Text>
                  <View style={styles.trendBadgeRedMini}>
                    <Text style={styles.trendBadgeTextRedMini}>Critical</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Total Stock Value Card */}
            <View style={styles.totalRevenueCard}>
              <View style={styles.cardHeaderRow}>
                <View style={styles.headerLeftContainer}>
                  <View style={styles.iconCirclePurple}>
                    <Ionicons name="cube-outline" size={16} color="#5C55FF" />
                  </View>
                  <Text style={styles.revenueLabel}>Total Stock Value</Text>
                </View>
              </View>
              <View style={styles.valueRow}>
                {renderRevenueValue("$24,500.00")}
              </View>
            </View>

            {/* Top Products Section */}
            <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Top Selling Products</Text>
              <Text style={styles.sectionSubtitle}>By items sold and share of sales revenue</Text>

              <View style={styles.servicesList}>
                {topProducts.map((product, idx) => (
                  <View key={idx} style={styles.serviceItem}>
                    <View style={styles.serviceItemHeader}>
                      <Text style={styles.serviceName}>{product.name}</Text>
                      <Text style={styles.serviceRevenue}>{product.revenue}</Text>
                    </View>
                    <View style={styles.serviceItemStats}>
                      <Text style={styles.serviceBookings}>{product.sold} items sold</Text>
                      <Text style={styles.servicePercentage}>{product.percentage}% share</Text>
                    </View>
                    <View style={styles.progressBarBackground}>
                      <View
                        style={[
                          styles.progressBarFill,
                          { width: `${product.percentage}%`, backgroundColor: product.color },
                        ]}
                      />
                    </View>
                  </View>
                ))}
              </View>
            </View>
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
  subTabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  subTabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 3,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.01,
    shadowRadius: 2,
    elevation: 1,
  },
  subTabButtonActive: {
    backgroundColor: "#5C55FF",
    borderColor: "#5C55FF",
  },
  subTabText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#6B7280",
  },
  subTabTextActive: {
    color: "#FFFFFF",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  screenTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 24,
    color: "#1F2937",
  },
  datePickerBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  datePickerText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#4B5563",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  tabContent: {
    width: "100%",
  },
  totalRevenueCard: {
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconCirclePurple: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  revenueLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 13,
    color: "#4B5563",
  },
  trendBadgeTeal: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6F4F2",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  trendBadgeTextTeal: {
    fontFamily: "Manrope_700Bold",
    fontSize: 11,
    color: "#0D9488",
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  largeValueText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 32,
    color: "#1F2937",
  },
  smallDecimalsText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 18,
    color: "#9CA3AF",
  },
  kpiRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 15,
  },
  halfKpiCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  kpiLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 8,
  },
  kpiValueContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  kpiValueMain: {
    fontFamily: "Manrope_700Bold",
    fontSize: 22,
    color: "#1F2937",
  },
  kpiValueDecimals: {
    fontFamily: "Manrope_500Medium",
    fontSize: 14,
    color: "#9CA3AF",
  },
  receiptsTrend: {
    flexDirection: "row",
    alignItems: "center",
  },
  receiptsTrendText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 11,
    color: "#EF4444",
  },
  sectionCard: {
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 14,
    color: "#1F2937",
  },
  sectionSubtitle: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: "#9CA3AF",
    marginBottom: 16,
  },
  moreButton: {
    padding: 4,
  },
  barChartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 120,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  chartCol: {
    alignItems: "center",
    width: "12%",
  },
  barTrack: {
    height: 90,
    width: 12,
    backgroundColor: "#F3F4F6",
    borderRadius: 6,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  barFill: {
    width: "100%",
    borderRadius: 6,
  },
  barLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 8,
  },
  barLabelActive: {
    color: "#5C55FF",
    fontFamily: "Manrope_700Bold",
  },
  subsectionTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 16,
    color: "#1F2937",
    marginHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  clientBaseGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 12,
  },
  clientBaseCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  clientIconContainerCyan: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#E6F4F2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  clientIconContainerPink: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFEBEB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  clientCardLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  clientCardValue: {
    fontFamily: "Manrope_700Bold",
    fontSize: 22,
    color: "#1F2937",
  },
  progressCard: {
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  segmentedProgressBar: {
    flexDirection: "row",
    height: 10,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#F3F4F6",
    marginBottom: 15,
  },
  progressSegment: {
    height: "100%",
  },
  legendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  legendRowGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: "#4B5563",
  },
  trendBadgeTealMini: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6F4F2",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  trendBadgeTextTealMini: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
    color: "#0D9488",
    marginLeft: 2,
  },
  trendBadgeRedMini: {
    backgroundColor: "#FFEBEB",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  trendBadgeTextRedMini: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
    color: "#EF4444",
  },
  stylistList: {
    marginTop: 5,
  },
  stylistItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  stylistLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  stylistName: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 13,
    color: "#1F2937",
    marginLeft: 10,
  },
  stylistRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  stylistBookingsBadge: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  stylistBookingsText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 10,
    color: "#5C55FF",
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFBEB",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    color: "#D97706",
  },
  servicesList: {
    marginTop: 5,
  },
  serviceItem: {
    marginBottom: 14,
  },
  serviceItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  serviceName: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 13,
    color: "#1F2937",
  },
  serviceRevenue: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#1F2937",
  },
  serviceItemStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  serviceBookings: {
    fontFamily: "Manrope_500Medium",
    fontSize: 10,
    color: "#9CA3AF",
  },
  servicePercentage: {
    fontFamily: "Manrope_500Medium",
    fontSize: 10,
    color: "#9CA3AF",
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: "#F3F4F6",
    borderRadius: 3,
    width: "100%",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
  },
});
