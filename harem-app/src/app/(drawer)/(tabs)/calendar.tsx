import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";
import Avatar from "@/components/Avatar";

const screenWidth = Dimensions.get("window").width;

const staffList = [
  {
    id: "st1",
    name: "Cameron Williamson",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
    color: "#5C55FF",
    bgColor: "#F0EFFF",
  },
  {
    id: "st2",
    name: "Wade Warren",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
    color: "#0D9488",
    bgColor: "#E6FBF9",
  },
  {
    id: "st3",
    name: "Courtney Henry",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    color: "#16A34A",
    bgColor: "#F0FDF4",
  },
  {
    id: "st4",
    name: "Robert Fox",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    color: "#D97706",
    bgColor: "#FFFBEB",
  },
];

const scheduleData = {
  st1: [
    { time: "08:00", duration: "45 Min", price: "EUR 170", title: "Haircut", top: 0, height: 90 },
    { time: "09:30", duration: "45 Min", price: "EUR 170", title: "Haircut", top: 135, height: 90 },
    { time: "11:30", duration: "45 Min", price: "EUR 170", title: "Haircut", top: 315, height: 90 },
  ],
  st2: [
    { time: "09:00", duration: "45 Min", price: "EUR 170", title: "Anti-Aging Firming Facial", top: 90, height: 135 },
    { time: "11:00", duration: "45 Min", price: "EUR 170", title: "Anti-Aging Firming Facial", top: 270, height: 135 },
    { time: "13:00", duration: "45 Min", price: "EUR 170", title: "Signature Glow Facial", top: 450, height: 90 },
  ],
  st3: [
    { time: "08:30", duration: "45 Min", price: "EUR 170", title: "Anti-Aging Firming Facial", top: 45, height: 135 },
    { time: "10:00", duration: "45 Min", price: "EUR 170", title: "Anti-Aging Firming Facial", top: 180, height: 135 },
    { time: "12:00", duration: "45 Min", price: "EUR 170", title: "Anti-Aging Firming Facial", top: 360, height: 135 },
  ],
  st4: [],
};

const hours = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

const days = [
  { dayName: "Mon", date: "10" },
  { dayName: "Tue", date: "11" },
  { dayName: "Wed", date: "12" },
  { dayName: "THU", date: "13", active: true },
  { dayName: "Fri", date: "14" },
  { dayName: "Sat", date: "15" },
  { dayName: "Sun", date: "16" },
];

export default function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState("February 2026");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [selectedDay, setSelectedDay] = useState("13");

  const columnWidth = 140;
  const hourHeight = 90; // height representing 1 hour

  return (
    <View style={styles.container}>
      <Header />

      {/* Calendar Controls Sub-Header */}
      <View style={styles.controlsRow}>
        <View style={styles.monthSelector}>
          <TouchableOpacity style={styles.arrowBtn}>
            <Ionicons name="chevron-back" size={18} color="#4B5563" />
          </TouchableOpacity>
          <Text style={styles.monthText}>{currentDate}</Text>
          <TouchableOpacity style={styles.arrowBtn}>
            <Ionicons name="chevron-forward" size={18} color="#4B5563" />
          </TouchableOpacity>
        </View>

        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleBtn, viewMode === "grid" && styles.toggleBtnActive]}
            onPress={() => setViewMode("grid")}
          >
            <Ionicons name="grid" size={18} color={viewMode === "grid" ? "#FFFFFF" : "#9CA3AF"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, viewMode === "list" && styles.toggleBtnActive]}
            onPress={() => setViewMode("list")}
          >
            <Ionicons name="list" size={18} color={viewMode === "list" ? "#FFFFFF" : "#9CA3AF"} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Date Slider */}
      <View style={styles.dateSliderContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dateSlider}>
          {days.map((item) => {
            const isActive = selectedDay === item.date;
            return (
              <TouchableOpacity
                key={item.date}
                style={[styles.dateCard, isActive && styles.dateCardActive]}
                onPress={() => setSelectedDay(item.date)}
                activeOpacity={0.7}
              >
                <Text style={[styles.dayNameText, isActive && styles.dayNameTextActive]}>
                  {item.dayName}
                </Text>
                <Text style={[styles.dateNumberText, isActive && styles.dateNumberTextActive]}>
                  {item.date}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {viewMode === "grid" ? (
        <ScrollView style={styles.gridVerticalScroll} showsVerticalScrollIndicator={false}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.gridHorizontalScroll}>
            <View style={styles.gridContainer}>
              {/* Grid Header (Staff List) */}
              <View style={styles.gridHeader}>
                {/* Empty corner cell */}
                <View style={styles.timeColumnHeader}>
                  <Text style={styles.staffsLabel}>Staffs</Text>
                </View>
                {/* Staff heads */}
                {staffList.map((staff) => (
                  <View key={staff.id} style={[styles.staffHeaderCell, { width: columnWidth }]}>
                    <Avatar name={staff.name} uri={staff.avatar} size={36} />
                    <Text style={styles.staffNameText} numberOfLines={1}>
                      {staff.name.split(" ")[0]}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Grid Body */}
              <View style={styles.gridBody}>
                {/* Time Axis Column */}
                <View style={styles.timeAxisColumn}>
                  {hours.map((hour, idx) => (
                    <View key={hour} style={[styles.timeAxisCell, { height: hourHeight }]}>
                      <Text style={styles.timeLabel}>{hour}</Text>
                    </View>
                  ))}
                </View>

                {/* Vertical Separators & Blocks Container */}
                <View style={styles.columnsWrapper}>
                  {/* Grid Lines Background */}
                  {hours.map((hour, idx) => (
                    <View
                      key={`line-${hour}`}
                      style={[
                        styles.gridHorizontalLine,
                        { top: idx * hourHeight, height: hourHeight },
                      ]}
                    />
                  ))}

                  {/* Staff Schedule Columns */}
                  {staffList.map((staff, staffIdx) => {
                    const appointments = scheduleData[staff.id as keyof typeof scheduleData] || [];
                    return (
                      <View
                        key={`col-${staff.id}`}
                        style={[
                          styles.staffColumn,
                          {
                            width: columnWidth,
                            left: staffIdx * columnWidth,
                          },
                        ]}
                      >
                        {/* Vertical line for column border */}
                        <View style={styles.columnBorder} />

                        {/* Appointments in this column */}
                        {appointments.map((appt, apptIdx) => (
                          <TouchableOpacity
                            key={`appt-${apptIdx}`}
                            activeOpacity={0.8}
                            style={[
                              styles.apptBlock,
                              {
                                top: appt.top,
                                height: appt.height,
                                backgroundColor: staff.bgColor,
                                borderLeftColor: staff.color,
                              },
                            ]}
                          >
                            <Text style={[styles.apptTitle, { color: staff.color }]} numberOfLines={2}>
                              {appt.title}
                            </Text>
                            <Text style={styles.apptDetails} numberOfLines={1}>
                              {appt.duration} - {appt.price}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          </ScrollView>
        </ScrollView>
      ) : (
        <ScrollView style={styles.listView} contentContainerStyle={styles.listContent}>
          <Text style={styles.listPlaceholder}>Agenda / List View for Thursday, 13 February</Text>
          {staffList.map((staff) => {
            const appointments = scheduleData[staff.id as keyof typeof scheduleData] || [];
            if (appointments.length === 0) return null;
            return (
              <View key={`list-staff-${staff.id}`} style={styles.listStaffSection}>
                <View style={styles.listStaffHeader}>
                  <Avatar name={staff.name} uri={staff.avatar} size={30} />
                  <Text style={styles.listStaffName}>{staff.name}</Text>
                </View>
                {appointments.map((appt, idx) => (
                  <View key={idx} style={styles.listApptItem}>
                    <Text style={styles.listApptTime}>{appt.time}</Text>
                    <View style={[styles.listApptCard, { backgroundColor: staff.bgColor, borderLeftColor: staff.color }]}>
                      <Text style={[styles.listApptTitle, { color: staff.color }]}>{appt.title}</Text>
                      <Text style={styles.listApptSub}>{appt.duration} • {appt.price}</Text>
                    </View>
                  </View>
                ))}
              </View>
            );
          })}
        </ScrollView>
      )}

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  controlsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  monthSelector: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrowBtn: {
    padding: 6,
  },
  monthText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 16,
    color: "#1F2937",
    marginHorizontal: 12,
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 2,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  toggleBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  toggleBtnActive: {
    backgroundColor: "#5C55FF",
  },
  dateSliderContainer: {
    paddingLeft: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  dateSlider: {
    paddingRight: 20,
  },
  dateCard: {
    width: 50,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  dateCardActive: {
    backgroundColor: "#5C55FF",
    borderColor: "#5C55FF",
  },
  dayNameText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 10,
    color: "#9CA3AF",
    marginBottom: 4,
    textTransform: "uppercase",
  },
  dayNameTextActive: {
    color: "#E0E7FF",
  },
  dateNumberText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 15,
    color: "#1F2937",
  },
  dateNumberTextActive: {
    color: "#FFFFFF",
  },
  gridVerticalScroll: {
    flex: 1,
  },
  gridHorizontalScroll: {
    flexDirection: "column",
  },
  gridContainer: {
    flexDirection: "column",
  },
  gridHeader: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  timeColumnHeader: {
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  staffsLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 11,
    color: "#5C55FF",
  },
  staffHeaderCell: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  staffNameText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#4B5563",
    marginLeft: 6,
  },
  gridBody: {
    flexDirection: "row",
    position: "relative",
  },
  timeAxisColumn: {
    width: 60,
    backgroundColor: "#F9FAFB",
  },
  timeAxisCell: {
    alignItems: "center",
    paddingTop: 8,
  },
  timeLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: "#9CA3AF",
  },
  columnsWrapper: {
    flex: 1,
    position: "relative",
  },
  gridHorizontalLine: {
    position: "absolute",
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  staffColumn: {
    position: "absolute",
    top: 0,
    bottom: 0,
    height: 990, // 11 hours * 90 height
  },
  columnBorder: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: "#E5E7EB",
  },
  apptBlock: {
    position: "absolute",
    left: 8,
    right: 8,
    borderRadius: 8,
    borderLeftWidth: 4,
    padding: 8,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  apptTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 11,
    lineHeight: 14,
    marginBottom: 2,
  },
  apptDetails: {
    fontFamily: "Manrope_500Medium",
    fontSize: 9,
    color: "#6B7280",
  },
  listView: {
    flex: 1,
  },
  listContent: {
    padding: 20,
  },
  listPlaceholder: {
    fontFamily: "Manrope_600SemiBold",
    color: "#9CA3AF",
    marginBottom: 16,
    fontSize: 12,
  },
  listStaffSection: {
    marginBottom: 20,
  },
  listStaffHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  listStaffName: {
    fontFamily: "Manrope_700Bold",
    fontSize: 14,
    color: "#1F2937",
    marginLeft: 8,
  },
  listApptItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  listApptTime: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#9CA3AF",
    width: 50,
  },
  listApptCard: {
    flex: 1,
    borderRadius: 8,
    borderLeftWidth: 4,
    padding: 10,
  },
  listApptTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 12,
  },
  listApptSub: {
    fontFamily: "Manrope_500Medium",
    fontSize: 10,
    color: "#4B5563",
    marginTop: 2,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#5C55FF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#5C55FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
});
