import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ShiftsTab() {
  const [selectedDate, setSelectedDate] = useState(5); // Default: Thu 5

  const dates = [
    { dayName: "Mon", dateNum: 2 },
    { dayName: "Tue", dateNum: 3 },
    { dayName: "Wed", dateNum: 4 },
    { dayName: "Thu", dateNum: 5 },
    { dayName: "Fri", dateNum: 6 },
    { dayName: "Sat", dateNum: 7 },
    { dayName: "Sun", dateNum: 8 },
  ];

  const appointments = [
    { time: "08:00", title: "Haircut", duration: "45 Min", price: "EUR 170", stylist: "Maria Rodriguez" },
    { time: "09:30", title: "Haircut", duration: "45 Min", price: "EUR 170", stylist: "Maria Rodriguez" },
    { time: "11:00", title: "Haircut", duration: "45 Min", price: "EUR 170", stylist: "Maria Rodriguez" },
    { time: "14:00", title: "Haircut", duration: "45 Min", price: "EUR 170", stylist: "Maria Rodriguez" },
  ];

  const upcomingShifts = [
    { day: "Today, Oct 5", hours: "08:00 - 17:00", duration: "9.0h", label: "Morning Shift" },
    { day: "Friday, Oct 6", hours: "08:00 - 17:00", duration: "9.0h", label: "Morning Start" },
    { day: "Monday, Oct 9", hours: "08:00 - 17:00", duration: "9.0h", label: "Evening Shift" },
  ];

  return (
    <View style={styles.container}>
      {/* Calendar Navigation */}
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={18} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.monthText}>October 2023</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Ionicons name="chevron-forward" size={18} color="#111827" />
        </TouchableOpacity>
      </View>

      {/* Date Selectors */}
      <View style={styles.datePickerRow}>
        {dates.map((d) => {
          const isSelected = d.dateNum === selectedDate;
          return (
            <TouchableOpacity
              key={d.dateNum}
              style={[styles.dateCol, isSelected && styles.dateColSelected]}
              onPress={() => setSelectedDate(d.dateNum)}
              activeOpacity={0.8}
            >
              <Text style={[styles.dayName, isSelected && styles.textSelected]}>
                {d.dayName}
              </Text>
              <Text style={[styles.dateNum, isSelected && styles.textSelected]}>
                {d.dateNum}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Timetable Slots */}
      <View style={styles.timetable}>
        {appointments.map((appt, idx) => (
          <View key={idx} style={styles.timeSlot}>
            <Text style={styles.timeText}>{appt.time}</Text>
            <View style={styles.appointmentCard}>
              <View style={styles.appointmentLeft}>
                <Text style={styles.appointmentTitle}>{appt.title}</Text>
                <Text style={styles.appointmentDetail}>
                  {appt.duration} - {appt.price}
                </Text>
              </View>
              <Text style={styles.stylistText}>{appt.stylist}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Upcoming Shifts Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Upcoming Shifts</Text>
        {upcomingShifts.map((shift, idx) => (
          <View key={idx} style={styles.shiftRow}>
            <View style={styles.shiftLeft}>
              <View style={styles.clockIconContainer}>
                <Ionicons name="time-outline" size={16} color="#5C55FF" />
              </View>
              <View>
                <Text style={styles.shiftDay}>{shift.day}</Text>
                <Text style={styles.shiftHours}>{shift.hours}</Text>
              </View>
            </View>
            <View style={styles.shiftRight}>
              <Text style={styles.shiftDuration}>{shift.duration}</Text>
              <Text style={styles.shiftLabel}>{shift.label}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Summary Cards */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>TOTAL HOURS</Text>
          <Text style={styles.summaryValue}>156.5</Text>
          <Text style={styles.summarySub}>+12% vs last mo</Text>
        </View>

        <View style={[styles.summaryCard, { marginRight: 0 }]}>
          <Text style={styles.summaryLabel}>EFFICIENCY</Text>
          <Text style={styles.summaryValue}>94%</Text>
          <Text style={[styles.summarySub, { color: "#10B981" }]}>Top Tier</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  monthText: {
    fontSize: 13,
    fontFamily: "Manrope_700Bold",
    color: "#111827",
  },
  datePickerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  dateCol: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    paddingVertical: 10,
    marginHorizontal: 3,
  },
  dateColSelected: {
    backgroundColor: "#5C55FF",
    borderColor: "#5C55FF",
  },
  dayName: {
    fontSize: 10,
    fontFamily: "Manrope_500Medium",
    color: "#6B7280",
    marginBottom: 4,
  },
  dateNum: {
    fontSize: 14,
    fontFamily: "Manrope_700Bold",
    color: "#1F2937",
  },
  textSelected: {
    color: "#FFFFFF",
  },
  timetable: {
    width: "100%",
    marginBottom: 16,
  },
  timeSlot: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  timeText: {
    width: 44,
    fontSize: 11,
    fontFamily: "Manrope_700Bold",
    color: "#9CA3AF",
  },
  appointmentCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#EEF2F6",
    borderLeftWidth: 3,
    borderLeftColor: "#5C55FF",
    borderRadius: 8,
    padding: 12,
  },
  appointmentLeft: {
    flex: 1,
  },
  appointmentTitle: {
    fontSize: 12,
    fontFamily: "Manrope_700Bold",
    color: "#1F2937",
    marginBottom: 2,
  },
  appointmentDetail: {
    fontSize: 10,
    fontFamily: "Manrope_500Medium",
    color: "#6B7280",
  },
  stylistText: {
    fontSize: 10,
    fontFamily: "Manrope_600SemiBold",
    color: "#4B5563",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Manrope_700Bold",
    color: "#111827",
    marginBottom: 16,
  },
  shiftRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  shiftLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  clockIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#EEF2F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  shiftDay: {
    fontSize: 13,
    fontFamily: "Manrope_700Bold",
    color: "#1F2937",
    marginBottom: 2,
  },
  shiftHours: {
    fontSize: 11,
    fontFamily: "Manrope_500Medium",
    color: "#9CA3AF",
  },
  shiftRight: {
    alignItems: "flex-end",
  },
  shiftDuration: {
    fontSize: 13,
    fontFamily: "Manrope_700Bold",
    color: "#111827",
    marginBottom: 2,
  },
  shiftLabel: {
    fontSize: 10,
    fontFamily: "Manrope_500Medium",
    color: "#6B7280",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    padding: 14,
    marginRight: 10,
  },
  summaryLabel: {
    fontSize: 9,
    fontFamily: "Manrope_700Bold",
    color: "#9CA3AF",
    marginBottom: 6,
  },
  summaryValue: {
    fontSize: 16,
    fontFamily: "Manrope_700Bold",
    color: "#111827",
    marginBottom: 4,
  },
  summarySub: {
    fontSize: 10,
    fontFamily: "Manrope_500Medium",
    color: "#5C55FF",
  },
});
