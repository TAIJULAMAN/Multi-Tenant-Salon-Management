import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path, Circle } from "react-native-svg";

export default function ActivityTab() {
  return (
    <View style={styles.container}>
      {/* Stats Cards Row */}
      <View style={styles.statsRow}>
        <View style={[styles.statsCard, { backgroundColor: "#5C55FF" }]}>
          <View style={styles.statsHeader}>
            <Text style={[styles.statsLabel, { color: "#E0E0FF" }]}>APPTS COMPLETED</Text>
            <View style={styles.statsIconBox}>
              <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.statsValue}>45</Text>
          <Text style={styles.statsSub}>Last 30 days</Text>
        </View>

        <View style={[styles.statsCard, { backgroundColor: "#00A896", marginRight: 0 }]}>
          <View style={styles.statsHeader}>
            <Text style={[styles.statsLabel, { color: "#D1F2EE" }]}>APPTS BOOK NOW</Text>
            <View style={styles.statsIconBox}>
              <Ionicons name="calendar" size={16} color="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.statsValue}>52</Text>
          <Text style={styles.statsSub}>Last 30 days</Text>
        </View>
      </View>

      {/* Weekly Appointments Chart */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Weekly Appointments</Text>
          <View style={styles.filterBadge}>
            <Text style={styles.filterBadgeText}>This Week</Text>
            <Ionicons name="chevron-down" size={12} color="#6B7280" />
          </View>
        </View>

        {/* SVG Line Chart */}
        <View style={styles.chartContainer}>
          <Svg height="80" width="300" style={styles.svg}>
            {/* Draw curve path */}
            <Path
              d="M 10 50 Q 50 45 90 52 T 170 48 T 250 15 T 290 20"
              fill="none"
              stroke="#00C49F"
              strokeWidth="2.5"
            />
            {/* Draw active points */}
            <Circle cx="10" cy="50" r="4" fill="#00C49F" />
            <Circle cx="90" cy="52" r="4" fill="#00C49F" />
            <Circle cx="250" cy="15" r="4" fill="#00C49F" />
          </Svg>
          <View style={styles.chartDaysRow}>
            {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((d, idx) => (
              <Text key={idx} style={styles.chartDayText}>{d}</Text>
            ))}
          </View>
        </View>
      </View>

      {/* Top 3 Services */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Top 3 Services</Text>
        </View>

        {[1, 2, 3].map((num) => (
          <View key={num} style={styles.topServiceRow}>
            <View style={styles.topServiceLeft}>
              <View style={styles.numberBadge}>
                <Text style={styles.numberBadgeText}>{num}</Text>
              </View>
              <Text style={styles.serviceName}>Cut and Fold</Text>
            </View>
            <Text style={styles.serviceCount}>25</Text>
          </View>
        ))}
      </View>

      {/* Most Loyal Customers */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Most Loyal Customers</Text>
        </View>

        <View style={styles.customerRow}>
          <View style={styles.customerLeft}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" }}
              style={styles.customerAvatar}
            />
            <View>
              <Text style={styles.customerName}>Sofa Biachi</Text>
              <Text style={styles.customerLastVisit}>Last visit: Nov 27, 2024</Text>
            </View>
          </View>
          <View style={styles.customerRight}>
            <Text style={styles.customerAppts}>25 Appts</Text>
            <Text style={styles.customerValue}>€ 1,700</Text>
          </View>
        </View>

        <View style={[styles.customerRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
          <View style={styles.customerLeft}>
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" }}
              style={styles.customerAvatar}
            />
            <View>
              <Text style={styles.customerName}>Guy Hawkins</Text>
              <Text style={styles.customerLastVisit}>Last visit: Oct 04, 2024</Text>
            </View>
          </View>
          <View style={styles.customerRight}>
            <Text style={styles.customerAppts}>24 Appts</Text>
            <Text style={styles.customerValue}>€ 1,500</Text>
          </View>
        </View>
      </View>

      {/* Days Worked Grid */}
      <View style={styles.gridRow}>
        <View style={styles.gridCard}>
          <Text style={styles.gridLabel}>DAYS WORKED</Text>
          <View style={styles.gridItem}>
            <Text style={styles.gridItemLabel}>Matured</Text>
            <Text style={styles.gridItemValue}>22 days</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridItemLabel}>Enjoyed</Text>
            <Text style={[styles.gridItemValue, { color: "#5C55FF" }]}>8 days</Text>
          </View>
        </View>

        <View style={[styles.gridCard, { marginRight: 0 }]}>
          <Text style={styles.gridLabel}>OTHER DATA</Text>
          <View style={styles.gridItem}>
            <Text style={styles.gridItemLabel}>Sick Days</Text>
            <Text style={[styles.gridItemValue, { color: "#EF4444" }]}>2</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridItemLabel}>Evaluation</Text>
            <Text style={styles.gridItemValue}>Mar 14</Text>
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
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statsCard: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  statsLabel: {
    fontSize: 9,
    fontFamily: "Manrope_700Bold",
  },
  statsIconBox: {
    opacity: 0.8,
  },
  statsValue: {
    fontSize: 22,
    fontFamily: "Manrope_700Bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  statsSub: {
    fontSize: 9,
    fontFamily: "Manrope_400Regular",
    color: "#FFFFFF",
    opacity: 0.8,
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
  filterBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  filterBadgeText: {
    fontSize: 11,
    fontFamily: "Manrope_600SemiBold",
    color: "#4B5563",
    marginRight: 4,
  },
  chartContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  svg: {
    alignSelf: "center",
  },
  chartDaysRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 6,
    marginTop: 12,
  },
  chartDayText: {
    fontSize: 8,
    fontFamily: "Manrope_600SemiBold",
    color: "#9CA3AF",
  },
  topServiceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  topServiceLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  numberBadge: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: "#EEF2F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  numberBadgeText: {
    fontSize: 11,
    fontFamily: "Manrope_700Bold",
    color: "#5C55FF",
  },
  serviceName: {
    fontSize: 13,
    fontFamily: "Manrope_600SemiBold",
    color: "#1F2937",
  },
  serviceCount: {
    fontSize: 13,
    fontFamily: "Manrope_700Bold",
    color: "#111827",
  },
  customerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  customerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  customerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    backgroundColor: "#ECEEF2",
  },
  customerName: {
    fontSize: 13,
    fontFamily: "Manrope_700Bold",
    color: "#1F2937",
    marginBottom: 2,
  },
  customerLastVisit: {
    fontSize: 10,
    fontFamily: "Manrope_500Medium",
    color: "#9CA3AF",
  },
  customerRight: {
    alignItems: "flex-end",
  },
  customerAppts: {
    fontSize: 11,
    fontFamily: "Manrope_500Medium",
    color: "#6B7280",
    marginBottom: 2,
  },
  customerValue: {
    fontSize: 13,
    fontFamily: "Manrope_700Bold",
    color: "#10B981",
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  gridCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    padding: 14,
    marginRight: 10,
  },
  gridLabel: {
    fontSize: 9,
    fontFamily: "Manrope_700Bold",
    color: "#9CA3AF",
    marginBottom: 12,
  },
  gridItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  gridItemLabel: {
    fontSize: 12,
    fontFamily: "Manrope_500Medium",
    color: "#6B7280",
  },
  gridItemValue: {
    fontSize: 12,
    fontFamily: "Manrope_700Bold",
    color: "#111827",
  },
});
