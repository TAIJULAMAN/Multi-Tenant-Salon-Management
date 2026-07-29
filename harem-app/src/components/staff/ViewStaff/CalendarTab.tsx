import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CalendarTab() {
  const [selectedDate, setSelectedDate] = useState(13); // Default selected: Thu 13

  const dates = [
    { dayName: "Mon", dateNum: 10 },
    { dayName: "Tue", dateNum: 11 },
    { dayName: "Wed", dateNum: 12 },
    { dayName: "Thu", dateNum: 13 },
    { dayName: "Fri", dateNum: 14 },
    { dayName: "Sat", dateNum: 15 },
    { dayName: "Sun", dateNum: 16 },
  ];

  const appointments = [
    { time: "08:00", title: "Haircut", duration: "45 min", price: "EUR 170", client: "Cameron Williamson" },
    { time: "09:30", title: "Haircut", duration: "45 min", price: "EUR 170", client: "Cameron Williamson" },
    { time: "11:00", title: "Haircut", duration: "45 min", price: "EUR 170", client: "Cameron Williamson" },
    { time: "14:00", title: "Haircut", duration: "45 min", price: "EUR 170", client: "Cameron Williamson" },
    { time: "17:00", title: "Haircut", duration: "45 min", price: "EUR 170", client: "Cameron Williamson" },
    { time: "18:00", title: "Haircut", duration: "45 min", price: "EUR 170", client: "Cameron Williamson" },
  ];

  return (
    <View style={styles.container}>
      {/* Calendar Header */}
      <View style={styles.header}>
        <TouchableOpacity activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={18} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.monthText}>February 2026</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Ionicons name="chevron-forward" size={18} color="#111827" />
        </TouchableOpacity>
      </View>

      {/* Date Picker Row */}
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

      {/* Timetable List */}
      <View style={styles.timetable}>
        {appointments.map((appt, idx) => (
          <View key={idx} style={styles.timeSlot}>
            <Text style={styles.timeText}>{appt.time}</Text>
            <View style={styles.appointmentCard}>
              <View style={styles.appointmentLeft}>
                <Text style={styles.appointmentTitle}>{appt.title}</Text>
                <Text style={styles.appointmentDetail}>
                  {appt.duration} • {appt.price}
                </Text>
              </View>
              <Text style={styles.clientText}>{appt.client}</Text>
            </View>
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
  clientText: {
    fontSize: 10,
    fontFamily: "Manrope_600SemiBold",
    color: "#5C55FF",
  },
});
