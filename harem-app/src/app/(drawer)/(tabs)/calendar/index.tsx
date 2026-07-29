import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  Alert,
  Platform,
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

const initialAppointmentsData = [
  {
    id: "appt1",
    staffId: "st1",
    clientName: "Maria Rodriguez",
    clientAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    time: "08:00",
    endTime: "08:45",
    duration: "45 Min",
    price: "EUR 170",
    title: "Haircut",
    top: 0,
    height: 90,
    status: "Canceled",
    notes: "Client requested a trim and light layers. Prefers no heat styling. Allergic to certain dyes-check profile before rescheduling.",
  },
  {
    id: "appt2",
    staffId: "st1",
    clientName: "Maria Rodriguez",
    clientAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    time: "09:30",
    endTime: "10:15",
    duration: "45 Min",
    price: "EUR 170",
    title: "Haircut",
    top: 135,
    height: 90,
    status: "Confirmed",
    notes: "Regular customer. Needs extra styling.",
  },
  {
    id: "appt3",
    staffId: "st1",
    clientName: "Maria Rodriguez",
    clientAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    time: "11:30",
    endTime: "12:15",
    duration: "45 Min",
    price: "EUR 170",
    title: "Haircut",
    top: 315,
    height: 90,
    status: "Pending",
    notes: "Wants to discuss new hair coloring option.",
  },
  {
    id: "appt4",
    staffId: "st2",
    clientName: "Jane Doe",
    clientAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
    time: "09:00",
    endTime: "10:15",
    duration: "45 Min",
    price: "EUR 170",
    title: "Anti-Aging Firming Facial",
    top: 90,
    height: 135,
    status: "Confirmed",
    notes: "Prefers organic facial products.",
  },
  {
    id: "appt5",
    staffId: "st2",
    clientName: "Eleanor Pena",
    clientAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
    time: "11:00",
    endTime: "12:15",
    duration: "45 Min",
    price: "EUR 170",
    title: "Anti-Aging Firming Facial",
    top: 270,
    height: 135,
    status: "Confirmed",
    notes: "Sensitive skin.",
  },
  {
    id: "appt6",
    staffId: "st2",
    clientName: "Kathryn Murphy",
    clientAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    time: "13:00",
    endTime: "13:45",
    duration: "45 Min",
    price: "EUR 170",
    title: "Signature Glow Facial",
    top: 450,
    height: 90,
    status: "Confirmed",
    notes: "",
  },
  {
    id: "appt7",
    staffId: "st3",
    clientName: "Theresa Webb",
    clientAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80",
    time: "08:30",
    endTime: "09:45",
    duration: "45 Min",
    price: "EUR 170",
    title: "Anti-Aging Firming Facial",
    top: 45,
    height: 135,
    status: "Canceled",
    notes: "Cancelled via phone call.",
  },
  {
    id: "appt8",
    staffId: "st3",
    clientName: "Arlene McCoy",
    clientAvatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=100&q=80",
    time: "10:00",
    endTime: "11:15",
    duration: "45 Min",
    price: "EUR 170",
    title: "Anti-Aging Firming Facial",
    top: 180,
    height: 135,
    status: "Confirmed",
    notes: "",
  },
  {
    id: "appt9",
    staffId: "st3",
    clientName: "Bessie Cooper",
    clientAvatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=100&q=80",
    time: "12:00",
    endTime: "13:15",
    duration: "45 Min",
    price: "EUR 170",
    title: "Anti-Aging Firming Facial",
    top: 360,
    height: 135,
    status: "Confirmed",
    notes: "",
  },
];

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
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  const [appointments, setAppointments] = useState(initialAppointmentsData);
  const [selectedAppt, setSelectedAppt] = useState<typeof initialAppointmentsData[0] | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const columnWidth = 140;
  const hourHeight = 90; // height representing 1 hour

  const scheduleData = useMemo(() => {
    return staffList.reduce((acc, staff) => {
      acc[staff.id] = appointments.filter((appt) => appt.staffId === staff.id);
      return acc;
    }, {} as Record<string, typeof appointments>);
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    return appointments
      .filter((appt) => selectedStaffId === null || appt.staffId === selectedStaffId)
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [appointments, selectedStaffId]);

  const handleDelete = () => {
    if (!selectedAppt) return;
    if (Platform.OS === "web") {
      const confirmDelete = window.confirm("Are you sure you want to delete this appointment?");
      if (confirmDelete) {
        setAppointments((prev) => prev.filter((a) => a.id !== selectedAppt.id));
        setSelectedAppt(null);
        setMenuVisible(false);
      }
    } else {
      Alert.alert(
        "Delete Appointment",
        "Are you sure you want to delete this appointment?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => {
              setAppointments((prev) => prev.filter((a) => a.id !== selectedAppt.id));
              setSelectedAppt(null);
              setMenuVisible(false);
            },
          },
        ]
      );
    }
  };

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
                  {hours.map((hour) => (
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
                    const staffAppts = scheduleData[staff.id] || [];
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
                        {staffAppts.map((appt, apptIdx) => (
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
                            onPress={() => {
                              setSelectedAppt(appt);
                              setMenuVisible(false);
                            }}
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
        <View style={{ flex: 1 }}>
          {/* Staff Filter Slider */}
          <View style={styles.staffFilterWrapper}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.staffFilterContent}
            >
              <TouchableOpacity
                style={[
                  styles.staffFilterPill,
                  selectedStaffId === null && styles.staffFilterPillActive,
                ]}
                onPress={() => setSelectedStaffId(null)}
              >
                <Text
                  style={[
                    styles.staffFilterText,
                    selectedStaffId === null && styles.staffFilterTextActive,
                    { marginLeft: 0 },
                  ]}
                >
                  All
                </Text>
              </TouchableOpacity>
              {staffList.map((staff) => {
                const isActive = selectedStaffId === staff.id;
                return (
                  <TouchableOpacity
                    key={staff.id}
                    style={[
                      styles.staffFilterPill,
                      isActive && styles.staffFilterPillActive,
                    ]}
                    onPress={() => setSelectedStaffId(staff.id)}
                  >
                    <Avatar name={staff.name} uri={staff.avatar} size={20} />
                    <Text
                      style={[
                        styles.staffFilterText,
                        isActive && styles.staffFilterTextActive,
                      ]}
                    >
                      {staff.name.split(" ")[0]}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* List View Scroll */}
          <ScrollView style={styles.listView} contentContainerStyle={styles.listContent}>
            {filteredAppointments.length === 0 ? (
              <View style={styles.noApptsContainer}>
                <Text style={styles.noApptsText}>No appointments scheduled</Text>
              </View>
            ) : (
              filteredAppointments.map((appt) => {
                const staff = staffList.find((s) => s.id === appt.staffId) || staffList[0];
                return (
                  <View key={appt.id} style={styles.listApptRow}>
                    <Text style={styles.listApptTime}>{appt.time}</Text>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.listApptCard}
                      onPress={() => {
                        setSelectedAppt(appt);
                        setMenuVisible(false);
                      }}
                    >
                      <View style={styles.listApptCardInner}>
                        <Avatar name={appt.clientName} uri={appt.clientAvatar} size={40} />
                        <View style={styles.listApptDetails}>
                          <Text style={styles.listClientName} numberOfLines={1}>
                            {appt.clientName}
                          </Text>
                          <Text style={[styles.listApptTitle, { color: "#5C55FF" }]} numberOfLines={1}>
                            {appt.title}
                          </Text>
                          <Text style={styles.listStaffName} numberOfLines={1}>
                            {staff.name}
                          </Text>
                        </View>
                        <View style={styles.listApptRight}>
                          <Text style={styles.listApptMeta}>
                            {appt.duration} - {appt.price}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })
            )}
          </ScrollView>
        </View>
      )}

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Bottom Sheet Details Modal */}
      <Modal
        visible={selectedAppt !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setSelectedAppt(null);
          setMenuVisible(false);
        }}
      >
        <TouchableOpacity
          style={styles.bottomSheetBackdrop}
          activeOpacity={1}
          onPress={() => {
            setSelectedAppt(null);
            setMenuVisible(false);
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.bottomSheetContainer}
            onPress={() => {}}
          >
            <View style={styles.dragHandle} />
            {selectedAppt && (
              <>
                <View style={styles.sheetHeader}>
                  <View style={styles.sheetHeaderLeft}>
                    <Avatar name={selectedAppt.clientName} uri={selectedAppt.clientAvatar} size={48} />
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
                      <Text style={styles.sheetClientName} numberOfLines={1}>
                        {selectedAppt.clientName}
                      </Text>
                      <View
                        style={[
                          styles.statusBadge,
                          {
                            backgroundColor:
                              selectedAppt.status === "Canceled"
                                ? "#FEE2E2"
                                : selectedAppt.status === "Confirmed"
                                ? "#D1FAE5"
                                : "#FEF3C7",
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusBadgeText,
                            {
                              color:
                                selectedAppt.status === "Canceled"
                                  ? "#EF4444"
                                  : selectedAppt.status === "Confirmed"
                                  ? "#10B981"
                                  : "#D97706",
                            },
                          ]}
                        >
                          {selectedAppt.status}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity style={styles.moreBtn} onPress={() => setMenuVisible(!menuVisible)}>
                    <Ionicons name="ellipsis-vertical" size={20} color="#6B7280" />
                  </TouchableOpacity>

                  {menuVisible && (
                    <View style={styles.menuDropdown}>
                      <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => {
                          setMenuVisible(false);
                          Alert.alert("Details", `Client: ${selectedAppt.clientName}\nService: ${selectedAppt.title}`);
                        }}
                      >
                        <Ionicons name="eye-outline" size={16} color="#4B5563" />
                        <Text style={styles.menuItemText}>View Details</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.menuItem}
                        onPress={() => {
                          setMenuVisible(false);
                          Alert.alert("Edit", "Edit feature coming soon!");
                        }}
                      >
                        <Ionicons name="create-outline" size={16} color="#4B5563" />
                        <Text style={styles.menuItemText}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.menuItem, { borderTopWidth: 1, borderTopColor: "#F3F4F6" }]}
                        onPress={handleDelete}
                      >
                        <Ionicons name="trash-outline" size={16} color="#EF4444" />
                        <Text style={[styles.menuItemText, styles.menuItemDeleteText]}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                <View style={styles.sheetBody}>
                  {/* Date */}
                  <View style={styles.detailCol}>
                    <Text style={styles.detailLabel}>Date</Text>
                    <Text style={styles.detailValue}>{`${selectedDay.padStart(2, "0")}/02/2026`}</Text>
                  </View>

                  {/* Time */}
                  <View style={styles.detailCol}>
                    <Text style={styles.detailLabel}>Time</Text>
                    <Text style={styles.detailValue}>{selectedAppt.time} - {selectedAppt.endTime}</Text>
                  </View>

                  {/* Service */}
                  <View style={styles.detailCol}>
                    <Text style={styles.detailLabel}>Service</Text>
                    <Text style={styles.detailValue}>{selectedAppt.title}</Text>
                  </View>

                  {/* Price & Duration */}
                  <View style={styles.detailRow}>
                    <View style={styles.detailCol}>
                      <Text style={styles.detailLabel}>Price</Text>
                      <Text style={styles.detailValue}>€ {selectedAppt.price.replace("EUR ", "")}</Text>
                    </View>
                    <View style={styles.detailCol}>
                      <Text style={styles.detailLabel}>Duration</Text>
                      <Text style={styles.detailValue}>{selectedAppt.duration.toLowerCase()}</Text>
                    </View>
                  </View>

                  {/* Employee */}
                  <View style={styles.detailCol}>
                    <Text style={styles.detailLabel}>Employee</Text>
                    {(() => {
                      const staff = staffList.find((s) => s.id === selectedAppt.staffId) || staffList[0];
                      return (
                        <View style={styles.employeeRow}>
                          <Avatar name={staff.name} uri={staff.avatar} size={28} />
                          <Text style={styles.employeeName}>{staff.name}</Text>
                        </View>
                      );
                    })()}
                  </View>

                  {/* Notes */}
                  {selectedAppt.notes ? (
                    <View style={styles.notesBox}>
                      <Text style={[styles.detailLabel, { color: "#5C55FF" }]}>Notes</Text>
                      <Text style={styles.notesText}>{selectedAppt.notes}</Text>
                    </View>
                  ) : null}
                </View>
              </>
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
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
    paddingTop: 10,
  },
  staffFilterWrapper: {
    backgroundColor: "#F9FAFB",
    paddingVertical: 10,
    paddingLeft: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  staffFilterContent: {
    paddingRight: 20,
  },
  staffFilterPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  staffFilterPillActive: {
    backgroundColor: "#5C55FF",
    borderColor: "#5C55FF",
  },
  staffFilterText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#4B5563",
    marginLeft: 6,
  },
  staffFilterTextActive: {
    color: "#FFFFFF",
  },
  listApptRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  listApptTime: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14,
    color: "#9CA3AF",
    width: 60,
  },
  listApptCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  listApptCardInner: {
    flexDirection: "row",
    alignItems: "center",
  },
  listApptDetails: {
    flex: 1,
    marginLeft: 12,
  },
  listClientName: {
    fontFamily: "Manrope_700Bold",
    fontSize: 14,
    color: "#1F2937",
  },
  listApptTitle: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    marginTop: 2,
  },
  listStaffName: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 2,
  },
  listApptRight: {
    alignItems: "flex-end",
  },
  listApptMeta: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: "#9CA3AF",
  },
  noApptsContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  noApptsText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14,
    color: "#9CA3AF",
  },
  bottomSheetBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  bottomSheetContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 40,
    maxHeight: "85%",
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E5E7EB",
    alignSelf: "center",
    marginBottom: 20,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
    position: "relative",
  },
  sheetHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  sheetClientName: {
    fontFamily: "Manrope_700Bold",
    fontSize: 18,
    color: "#1F2937",
    marginLeft: 12,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
  },
  moreBtn: {
    padding: 8,
  },
  menuDropdown: {
    position: "absolute",
    right: 0,
    top: 45,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 6,
    width: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    zIndex: 999,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  menuItemText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14,
    color: "#374151",
    marginLeft: 10,
  },
  menuItemDeleteText: {
    color: "#EF4444",
  },
  sheetBody: {
    gap: 20,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailCol: {
    flex: 1,
  },
  detailLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 10,
    color: "#9CA3AF",
    textTransform: "uppercase",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  detailValue: {
    fontFamily: "Manrope_700Bold",
    fontSize: 15,
    color: "#1F2937",
  },
  employeeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  employeeName: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14,
    color: "#1F2937",
    marginLeft: 8,
  },
  notesBox: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  notesText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 13,
    color: "#4B5563",
    lineHeight: 18,
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
