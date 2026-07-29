import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function RemunerationTab() {
  const chartData = [
    { month: "Jan", height: 35 },
    { month: "Feb", height: 50 },
    { month: "Mar", height: 75 },
    { month: "Apr", height: 40 },
    { month: "May", height: 90 },
    { month: "Jun", height: 60 },
    { month: "Jul", height: 30 },
  ];

  return (
    <View style={styles.container}>
      {/* Metrics Row */}
      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>LAST PAYSLIP</Text>
          <Text style={styles.metricValue}>$4,200.00</Text>
          <View style={styles.changeBadgeGreen}>
            <Ionicons name="trending-up" size={10} color="#10B981" />
            <Text style={styles.changeTextGreen}>+2.5%</Text>
          </View>
        </View>

        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>AVERAGE SALARY</Text>
          <Text style={styles.metricValue}>$5,150.00</Text>
          <View style={styles.changeBadgeGrey}>
            <Text style={styles.changeTextGrey}>0%</Text>
          </View>
        </View>

        <View style={[styles.metricCard, { marginRight: 0 }]}>
          <Text style={styles.metricLabel}>ACCUMULATED TFR</Text>
          <Text style={styles.metricValue}>$12,480.00</Text>
          <View style={styles.changeBadgeRed}>
            <Ionicons name="trending-down" size={10} color="#EF4444" />
            <Text style={styles.changeTextRed}>-1.2%</Text>
          </View>
        </View>
      </View>

      {/* Chart Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Payments per Year</Text>
          <View style={styles.chartLegend}>
            <View style={[styles.legendDot, { backgroundColor: "#5C55FF" }]} />
            <View style={[styles.legendDot, { backgroundColor: "#ECEEF2" }]} />
          </View>
        </View>

        {/* Visual Bar Chart */}
        <View style={styles.chartContainer}>
          {chartData.map((item, idx) => (
            <View key={idx} style={styles.chartColumn}>
              <View style={styles.barTrack}>
                <View style={[styles.barFillBackground, { height: `${100 - item.height}%` }]} />
                <View style={[styles.barFill, { height: `${item.height}%` }]} />
              </View>
              <Text style={styles.chartMonth}>{item.month}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Payslip List */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Payslip List</Text>
          <TouchableOpacity style={styles.viewAllBtn} activeOpacity={0.7}>
            <Text style={styles.viewAllBtnText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Payslip Items */}
        {["March 2024", "February 2024", "January 2024"].map((month, idx) => (
          <View key={idx} style={styles.payslipItem}>
            <View style={styles.payslipLeft}>
              <View style={styles.pdfIconContainer}>
                <Ionicons name="document-text" size={18} color="#5C55FF" />
              </View>
              <View style={styles.payslipInfo}>
                <Text style={styles.payslipTitle}>{month}</Text>
                <Text style={styles.payslipSub}>
                  Net: <Text style={styles.payslipBold}>$4,200.00</Text> • Gross: $5,850.00
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.viewPayslipBtn} activeOpacity={0.7}>
              <Text style={styles.viewPayslipBtnText}>View</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    padding: 10,
    marginRight: 8,
    alignItems: "flex-start",
  },
  metricLabel: {
    fontSize: 8,
    fontFamily: "Manrope_600SemiBold",
    color: "#6B7280",
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 12,
    fontFamily: "Manrope_700Bold",
    color: "#111827",
    marginBottom: 6,
  },
  changeBadgeGreen: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D1FAE5",
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  changeTextGreen: {
    fontSize: 8,
    fontFamily: "Manrope_700Bold",
    color: "#059669",
    marginLeft: 2,
  },
  changeBadgeGrey: {
    backgroundColor: "#F3F4F6",
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  changeTextGrey: {
    fontSize: 8,
    fontFamily: "Manrope_700Bold",
    color: "#6B7280",
  },
  changeBadgeRed: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEE2E2",
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  changeTextRed: {
    fontSize: 8,
    fontFamily: "Manrope_700Bold",
    color: "#DC2626",
    marginLeft: 2,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    paddingBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: "Manrope_700Bold",
    color: "#111827",
  },
  chartLegend: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 6,
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 120,
    paddingTop: 10,
    paddingHorizontal: 8,
  },
  chartColumn: {
    alignItems: "center",
    flex: 1,
  },
  barTrack: {
    width: 24,
    height: 90,
    backgroundColor: "#F3F4F6",
    borderRadius: 6,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  barFill: {
    width: "100%",
    backgroundColor: "#5C55FF",
    borderRadius: 6,
  },
  barFillBackground: {
    width: "100%",
    backgroundColor: "#ECEEF2",
  },
  chartMonth: {
    fontSize: 9,
    fontFamily: "Manrope_500Medium",
    color: "#9CA3AF",
    marginTop: 6,
  },
  viewAllBtn: {
    paddingVertical: 2,
  },
  viewAllBtnText: {
    fontSize: 12,
    fontFamily: "Manrope_600SemiBold",
    color: "#5C55FF",
  },
  payslipItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  payslipLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  pdfIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: "#EEF2F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  payslipInfo: {
    flex: 1,
  },
  payslipTitle: {
    fontSize: 13,
    fontFamily: "Manrope_700Bold",
    color: "#111827",
    marginBottom: 2,
  },
  payslipSub: {
    fontSize: 11,
    fontFamily: "Manrope_400Regular",
    color: "#6B7280",
  },
  payslipBold: {
    fontFamily: "Manrope_700Bold",
    color: "#1F2937",
  },
  viewPayslipBtn: {
    borderWidth: 1,
    borderColor: "#5C55FF",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  viewPayslipBtnText: {
    fontSize: 12,
    fontFamily: "Manrope_600SemiBold",
    color: "#5C55FF",
  },
});
