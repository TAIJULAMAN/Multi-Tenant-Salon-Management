import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path, Circle } from "react-native-svg";

export default function ProductionTab() {
  const barData = [
    { day: "Day 1", height: 40 },
    { day: "", height: 55 },
    { day: "", height: 30 },
    { day: "", height: 70 },
    { day: "Day 15", height: 80 },
    { day: "", height: 60 },
    { day: "", height: 45 },
    { day: "", height: 85 },
    { day: "Day 30", height: 75 },
  ];

  const stats = [
    { label: "Completed Appointments", value: "142" },
    { label: "Revenue per Appt.", value: "$318.00" },
    { label: "Working Days", value: "22" },
  ];

  return (
    <View style={styles.container}>
      {/* 30 Days Card */}
      <View style={styles.card}>
        <View style={styles.productionHeader}>
          <View>
            <Text style={styles.productionLabel}>PRODUCTION LAST 30 DAYS</Text>
            <Text style={styles.productionValue}>$45,280.00</Text>
            <View style={styles.changeBadge}>
              <Ionicons name="trending-up" size={12} color="#10B981" />
              <Text style={styles.changeText}>+12.5% <Text style={{ fontWeight: "normal", color: "#6B7280" }}>vs last month</Text></Text>
            </View>
          </View>
          <View style={styles.thresholdBadge}>
            <Text style={styles.thresholdBadgeText}>ABOVE THRESHOLD</Text>
          </View>
        </View>
      </View>

      {/* Daily Production Chart */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Daily Production (Monthly)</Text>
          <Text style={styles.headerDate}>October 2023</Text>
        </View>

        {/* Visual Bar Chart */}
        <View style={styles.barChartContainer}>
          {barData.map((item, idx) => (
            <View key={idx} style={styles.chartCol}>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { height: `${item.height}%`, backgroundColor: item.day ? "#5C55FF" : "#D1D5DB" }]} />
              </View>
              {item.day ? <Text style={styles.chartDayText}>{item.day}</Text> : <View style={{ height: 12 }} />}
            </View>
          ))}
        </View>
      </View>

      {/* Monthly Turnover / Threshold Row */}
      <View style={styles.metricsRow}>
        <View style={styles.metricCard}>
          <Text style={styles.metricLabel}>MONTHLY TURNOVER</Text>
          <Text style={styles.metricValue}>$52.4k</Text>
        </View>

        <View style={[styles.metricCard, { marginRight: 0 }]}>
          <Text style={styles.metricLabel}>TARGET THRESHOLD</Text>
          <Text style={styles.metricValue}>$40.0k</Text>
        </View>
      </View>

      {/* Performance Accuracy Progress Bar */}
      <View style={styles.card}>
        <Text style={styles.metricLabel}>PERFORMANCE ACCURACY</Text>
        <Text style={styles.accuracyValue}>94.2%</Text>
        <View style={styles.progressBarTrack}>
          <View style={[styles.progressBarFill, { width: "94.2%" }]} />
        </View>
      </View>

      {/* Production Trends (Yearly) */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Production Trends (Yearly)</Text>
        </View>
        <View style={styles.trendChartContainer}>
          <Svg height="60" width="300" style={styles.svg}>
            <Path
              d="M 10 40 Q 60 25 110 32 T 210 45 T 290 10"
              fill="none"
              stroke="#5C55FF"
              strokeWidth="2.5"
            />
            <Circle cx="290" cy="10" r="4" fill="#5C55FF" />
          </Svg>
          <View style={styles.trendMonthsRow}>
            {["JAN", "APR", "JUL", "OCT", "DEC"].map((m, idx) => (
              <Text key={idx} style={styles.trendMonthText}>{m}</Text>
            ))}
          </View>
        </View>
      </View>

      {/* Operation Statistics */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Operation Statistics</Text>
        </View>

        {stats.map((item, idx) => (
          <View key={idx} style={styles.statRow}>
            <Text style={styles.statLabel}>{item.label}</Text>
            <Text style={styles.statValue}>{item.value}</Text>
          </View>
        ))}

        <View style={[styles.statRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
          <Text style={styles.statLabel}>Performance Status</Text>
          <View style={styles.statusContainer}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Optimal</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  productionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  productionLabel: {
    fontSize: 9,
    fontFamily: "Manrope_700Bold",
    color: "#9CA3AF",
    marginBottom: 6,
  },
  productionValue: {
    fontSize: 22,
    fontFamily: "Manrope_700Bold",
    color: "#111827",
    marginBottom: 8,
  },
  changeBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  changeText: {
    fontSize: 10,
    fontFamily: "Manrope_700Bold",
    color: "#10B981",
    marginLeft: 2,
  },
  thresholdBadge: {
    backgroundColor: "#D1FAE5",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  thresholdBadgeText: {
    fontSize: 8,
    fontFamily: "Manrope_700Bold",
    color: "#059669",
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
  headerDate: {
    fontSize: 11,
    fontFamily: "Manrope_500Medium",
    color: "#6B7280",
  },
  barChartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 100,
    paddingTop: 10,
  },
  chartCol: {
    alignItems: "center",
    flex: 1,
  },
  barTrack: {
    width: 14,
    height: 70,
    backgroundColor: "#EEF2F6",
    borderRadius: 3,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  barFill: {
    width: "100%",
    borderRadius: 3,
  },
  chartDayText: {
    fontSize: 8,
    fontFamily: "Manrope_600SemiBold",
    color: "#9CA3AF",
    marginTop: 4,
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    padding: 14,
    marginRight: 10,
  },
  metricLabel: {
    fontSize: 9,
    fontFamily: "Manrope_700Bold",
    color: "#9CA3AF",
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 16,
    fontFamily: "Manrope_700Bold",
    color: "#111827",
  },
  accuracyValue: {
    fontSize: 18,
    fontFamily: "Manrope_700Bold",
    color: "#111827",
    marginBottom: 8,
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#5C55FF",
    borderRadius: 3,
  },
  trendChartContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  svg: {
    alignSelf: "center",
  },
  trendMonthsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 8,
    marginTop: 8,
  },
  trendMonthText: {
    fontSize: 8,
    fontFamily: "Manrope_600SemiBold",
    color: "#9CA3AF",
  },
  statRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  statLabel: {
    fontSize: 13,
    fontFamily: "Manrope_500Medium",
    color: "#6B7280",
  },
  statValue: {
    fontSize: 13,
    fontFamily: "Manrope_700Bold",
    color: "#111827",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10B981",
    marginRight: 6,
  },
  statusText: {
    fontSize: 13,
    fontFamily: "Manrope_700Bold",
    color: "#10B981",
  },
});
