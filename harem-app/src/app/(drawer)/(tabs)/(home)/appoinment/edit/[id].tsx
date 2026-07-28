import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Avatar from "@/components/Avatar";
import DateTimePicker from "@expo/ui/community/datetime-picker";

interface BookedService {
  id: string;
  name: string;
  price: string;
  duration?: string;
  date?: string;
  time?: string;
  employee?: string;
  employeeInitials?: string;
}

export default function EditAppointmentScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Extracting the appointment ID from the path parameter
  const insets = useSafeAreaInsets();

  // Screen layout state: "edit" or "add-services"
  const [screenMode, setScreenMode] = useState<"edit" | "add-services">("edit");

  // Date and Time picker states
  const [apptDate, setApptDate] = useState<Date>(new Date(2025, 8, 2, 11, 0)); // Sep 02, 2025 11:00 AM
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Lead Stylist states
  const [leadStylist, setLeadStylist] = useState("Maria Rodriguez");
  const [isStylistModalVisible, setIsStylistModalVisible] = useState(false);
  const stylists = ["Maria Rodriguez", "Angelica Bell", "Sophia Loren", "Jessica Alba"];

  // Booked Services list state
  const [bookedServices, setBookedServices] = useState<BookedService[]>([
    { id: "1", name: "Haircut", price: "€ 170" },
    { id: "2", name: "Hair coloring", price: "€ 170" },
    {
      id: "3",
      name: "Beard trim",
      price: "€ 170",
      duration: "15 min",
      date: "02/08/2025",
      time: "11:00 - 11:15 AM",
      employee: "Maria Rodriguez",
      employeeInitials: "MR",
    },
    { id: "4", name: "Shampoo", price: "€ 170" },
  ]);

  const [expandedServices, setExpandedServices] = useState<Record<string, boolean>>({
    "3": true, // expanded by default
  });

  // Add Services search / selection states
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  // Available services for adding
  const availableServices = [
    { id: "1", name: "Haircut", price: "€ 170" },
    { id: "5", name: "Highlights Only", price: "€ 170" },
    { id: "6", name: "Single Process Color", price: "€ 170" },
    { id: "7", name: "Root Touch Up", price: "€ 170" },
    { id: "8", name: "Blow Dry & Style", price: "€ 170" },
  ];

  const [tempCheckedIds, setTempCheckedIds] = useState<Record<string, boolean>>({
    "1": true, // Haircut checked by default in Mockup 3
  });

  const toggleServiceExpand = (serviceId: string) => {
    setExpandedServices((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }));
  };

  const handleToggleCheckbox = (serviceId: string) => {
    setTempCheckedIds((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }));
  };

  // Add selected services to booked services
  const handleSaveAddedServices = () => {
    const updatedServices = [...bookedServices];
    
    availableServices.forEach((item) => {
      const isChecked = tempCheckedIds[item.id];
      const alreadyBooked = bookedServices.some((s) => s.id === item.id);
      
      if (isChecked && !alreadyBooked) {
        updatedServices.push({
          id: item.id,
          name: item.name,
          price: item.price,
        });
      } else if (!isChecked && alreadyBooked) {
        // remove if unchecked
        const index = updatedServices.findIndex((s) => s.id === item.id);
        if (index > -1) {
          updatedServices.splice(index, 1);
        }
      }
    });

    setBookedServices(updatedServices);
    setScreenMode("edit");
    setIsSearchFocused(false);
  };

  const handleCancelAppointment = () => {
    router.push(`/appoinment/cancel/${id}`);
  };

  const handleSaveAppointment = () => {
    Alert.alert("Success", "Appointment updated successfully!", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  // Formatted date string for date-time selector
  const formattedApptDateTime = apptDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
  }) + ` • ${apptDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} - ${new Date(apptDate.getTime() + 15 * 60000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;

  if (screenMode === "add-services") {
    // RENDER: Add Services Panel (Mockup 2 & 3)
    return (
      <View style={[styles.container, { paddingTop: Math.max(insets.top, 15) }]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => {
                setScreenMode("edit");
                setIsSearchFocused(false);
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={20} color="#1F2937" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add Services</Text>
          </View>
        </View>

        <View style={styles.searchWrapper}>
          {/* Search bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={18} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={() => setIsSearchFocused(true)}
            />
          </View>
        </View>

        {isSearchFocused ? (
          // Search Dropdown Overlay list (Mockup 3)
          <ScrollView contentContainerStyle={styles.searchOverlayScroll} showsVerticalScrollIndicator={false}>
            <View style={styles.searchOverlayCard}>
              {availableServices
                .filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((service) => {
                  const isChecked = !!tempCheckedIds[service.id];
                  return (
                    <TouchableOpacity
                      key={service.id}
                      style={[styles.searchOverlayRow, isChecked && styles.searchOverlayRowChecked]}
                      onPress={() => handleToggleCheckbox(service.id)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.searchOverlayLeft}>
                        <View style={[styles.checkbox, isChecked && styles.checkboxActive]}>
                          {isChecked && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
                        </View>
                        <Text style={styles.searchOverlayName}>{service.name}</Text>
                      </View>
                      <Text style={styles.searchOverlayPrice}>{service.price}</Text>
                    </TouchableOpacity>
                  );
                })}
            </View>
          </ScrollView>
        ) : (
          // Current Booked Services List (Mockup 2)
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionLabel}>BOOKED SERVICES</Text>
            <View style={styles.card}>
              <View style={styles.servicesList}>
                {bookedServices.map((item) => {
                  const isExpanded = !!expandedServices[item.id];
                  return (
                    <View key={item.id} style={styles.serviceItemWrapper}>
                      <TouchableOpacity
                        style={styles.serviceItemHeader}
                        onPress={() => toggleServiceExpand(item.id)}
                        activeOpacity={0.7}
                      >
                        <View style={styles.serviceItemLeft}>
                          <View style={styles.serviceNumBadge}>
                            <Text style={styles.serviceNumText}>{item.id}</Text>
                          </View>
                          <Text style={styles.serviceNameText}>{item.name}</Text>
                        </View>
                        <View style={styles.serviceItemRight}>
                          <Text style={styles.servicePriceDot}>•</Text>
                          <Text style={styles.servicePriceText}>{item.price}</Text>
                          <Ionicons
                            name={isExpanded ? "chevron-up" : "chevron-down"}
                            size={18}
                            color="#9CA3AF"
                            style={{ marginLeft: 8 }}
                          />
                        </View>
                      </TouchableOpacity>

                      {isExpanded && item.duration && (
                        <View style={styles.serviceExpandedContent}>
                          <View style={styles.expandedMetaRow}>
                            <View style={styles.durationBadge}>
                              <Ionicons name="time" size={14} color="#5C55FF" style={{ marginRight: 4 }} />
                              <Text style={styles.durationText}>{item.duration}</Text>
                            </View>
                            <TouchableOpacity style={styles.editServiceBtn} activeOpacity={0.7}>
                              <Ionicons name="create-outline" size={16} color="#5C55FF" />
                            </TouchableOpacity>
                          </View>

                          <View style={styles.dateTimeContainer}>
                            <View style={styles.dateTimeCol}>
                              <Text style={styles.dateTimeLabel}>DATE</Text>
                              <Text style={styles.dateTimeValue}>{item.date}</Text>
                            </View>
                            <View style={styles.dateTimeDividerLine} />
                            <View style={styles.dateTimeCol}>
                              <Text style={styles.dateTimeLabel}>TIME</Text>
                              <Text style={styles.dateTimeValue}>{item.time}</Text>
                            </View>
                          </View>

                          <Text style={styles.employeeLabel}>Employee</Text>
                          <TouchableOpacity style={styles.employeeDropdown} activeOpacity={0.7}>
                            <View style={styles.employeeLeft}>
                              <View style={styles.employeeInitialsBadge}>
                                <Text style={styles.employeeInitialsText}>{item.employeeInitials}</Text>
                              </View>
                              <Text style={styles.employeeNameText}>{item.employee}</Text>
                            </View>
                            <Ionicons name="chevron-down" size={14} color="#4B5563" />
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            </View>
          </ScrollView>
        )}

        {/* Footer actions for Add Services screen */}
        <View style={styles.footerActions}>
          <TouchableOpacity
            style={styles.btnOutlineAction}
            onPress={() => {
              setScreenMode("edit");
              setIsSearchFocused(false);
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.btnOutlineActionText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSolidAction}
            onPress={handleSaveAddedServices}
            activeOpacity={0.7}
          >
            <Text style={styles.btnSolidActionText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // RENDER: Edit Appointment (Mockup 1)
  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 15) }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={20} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Appointment</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <View style={styles.userCard}>
          <Avatar
            name="Maria Fernandez"
            uri="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
            size={44}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Maria Fernandez</Text>
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={12} color="#5C55FF" style={{ marginRight: 4 }} />
              <Text style={styles.verifiedText}>Verified Customer</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.viewProfileBtn} activeOpacity={0.7}>
            <Text style={styles.viewProfileText}>View profile</Text>
          </TouchableOpacity>
        </View>

        {/* Date and Time */}
        <Text style={styles.sectionLabel}>DATE & TIME</Text>
        <TouchableOpacity
          style={styles.dateTimeSelectorBtn}
          onPress={() => setShowDatePicker(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.dateTimeSelectorText}>{formattedApptDateTime}</Text>
          <Ionicons name="calendar-outline" size={18} color="#4B5563" />
        </TouchableOpacity>

        {/* Lead Stylist */}
        <Text style={styles.sectionLabel}>LEAD STYLIST</Text>
        <TouchableOpacity
          style={styles.stylistSelectorBtn}
          onPress={() => setIsStylistModalVisible(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.stylistSelectorText}>{leadStylist}</Text>
          <Ionicons name="chevron-down" size={16} color="#4B5563" />
        </TouchableOpacity>

        {/* Booked Services */}
        <View style={styles.bookedServicesHeaderRow}>
          <Text style={styles.sectionLabel}>BOOKED SERVICES</Text>
          <TouchableOpacity
            style={styles.btnAddServiceSolid}
            onPress={() => setScreenMode("add-services")}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={14} color="#FFFFFF" style={{ marginRight: 2 }} />
            <Text style={styles.btnAddServiceSolidText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Services List Card */}
        <View style={styles.card}>
          <View style={styles.servicesList}>
            {bookedServices.map((item) => {
              const isExpanded = !!expandedServices[item.id];
              return (
                <View key={item.id} style={styles.serviceItemWrapper}>
                  <TouchableOpacity
                    style={styles.serviceItemHeader}
                    onPress={() => toggleServiceExpand(item.id)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.serviceItemLeft}>
                      <View style={styles.serviceNumBadge}>
                        <Text style={styles.serviceNumText}>{item.id}</Text>
                      </View>
                      <Text style={styles.serviceNameText}>{item.name}</Text>
                    </View>
                    <View style={styles.serviceItemRight}>
                      <Text style={styles.servicePriceDot}>•</Text>
                      <Text style={styles.servicePriceText}>{item.price}</Text>
                      <Ionicons
                        name={isExpanded ? "chevron-up" : "chevron-down"}
                        size={18}
                        color="#9CA3AF"
                        style={{ marginLeft: 8 }}
                      />
                    </View>
                  </TouchableOpacity>

                  {isExpanded && item.duration && (
                    <View style={styles.serviceExpandedContent}>
                      {/* Duration & edit */}
                      <View style={styles.expandedMetaRow}>
                        <View style={styles.durationBadge}>
                          <Ionicons name="time" size={14} color="#5C55FF" style={{ marginRight: 4 }} />
                          <Text style={styles.durationText}>{item.duration}</Text>
                        </View>
                        <TouchableOpacity style={styles.editServiceBtn} activeOpacity={0.7}>
                          <Ionicons name="create-outline" size={16} color="#5C55FF" />
                        </TouchableOpacity>
                      </View>

                      {/* Date & time details */}
                      <View style={styles.dateTimeContainer}>
                        <View style={styles.dateTimeCol}>
                          <Text style={styles.dateTimeLabel}>DATE</Text>
                          <Text style={styles.dateTimeValue}>{item.date}</Text>
                        </View>
                        <View style={styles.dateTimeDividerLine} />
                        <View style={styles.dateTimeCol}>
                          <Text style={styles.dateTimeLabel}>TIME</Text>
                          <Text style={styles.dateTimeValue}>{item.time}</Text>
                        </View>
                      </View>

                      {/* Employee Dropdown Selector */}
                      <Text style={styles.employeeLabel}>Employee</Text>
                      <TouchableOpacity style={styles.employeeDropdown} activeOpacity={0.7}>
                        <View style={styles.employeeLeft}>
                          <View style={styles.employeeInitialsBadge}>
                            <Text style={styles.employeeInitialsText}>{item.employeeInitials}</Text>
                          </View>
                          <Text style={styles.employeeNameText}>{item.employee}</Text>
                        </View>
                        <Ionicons name="chevron-down" size={14} color="#4B5563" />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* Footer Actions */}
        <View style={styles.footerActions}>
          <TouchableOpacity
            style={styles.btnOutlineAction}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Text style={styles.btnOutlineActionText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSolidAction}
            onPress={handleSaveAppointment}
            activeOpacity={0.7}
          >
            <Text style={styles.btnSolidActionText}>Save Changes</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.btnCancelApptLink}
          onPress={handleCancelAppointment}
          activeOpacity={0.7}
        >
          <Text style={styles.btnCancelApptLinkText}>Cancel Appointment</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Date Time Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={apptDate}
          mode="datetime"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) {
              setApptDate(date);
            }
          }}
        />
      )}

      {/* Stylist Selector Dropdown Modal */}
      <Modal
        visible={isStylistModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsStylistModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsStylistModalVisible(false)}
        >
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <Text style={styles.modalTitle}>Select Stylist</Text>
            <ScrollView style={styles.modalScroll}>
              {stylists.map((name) => {
                const isSelected = name === leadStylist;
                return (
                  <TouchableOpacity
                    key={name}
                    style={[styles.modalItem, isSelected && styles.modalItemActive]}
                    onPress={() => {
                      setLeadStylist(name);
                      setIsStylistModalVisible(false);
                    }}
                  >
                    <Text style={[styles.modalItemText, isSelected && styles.modalItemTextActive]}>
                      {name}
                    </Text>
                    {isSelected && <Ionicons name="checkmark" size={18} color="#5C55FF" />}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
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
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  userCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14,
    color: "#1F2937",
    marginBottom: 2,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
  },
  verifiedText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: "#5C55FF",
  },
  viewProfileBtn: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewProfileText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 11,
    color: "#5C55FF",
  },
  sectionLabel: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 11,
    color: "#9CA3AF",
    textTransform: "uppercase",
    marginBottom: 8,
    marginLeft: 2,
  },
  dateTimeSelectorBtn: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  dateTimeSelectorText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 13,
    color: "#1F2937",
  },
  stylistSelectorBtn: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  stylistSelectorText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 13,
    color: "#1F2937",
  },
  bookedServicesHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  btnAddServiceSolid: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5C55FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  btnAddServiceSolidText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 11,
    color: "#FFFFFF",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingBottom: 4,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  servicesList: {
    marginTop: 4,
  },
  serviceItemWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    paddingVertical: 12,
  },
  serviceItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  serviceNumBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#E0E7FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  serviceNumText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 10,
    color: "#5C55FF",
  },
  serviceNameText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 13,
    color: "#1F2937",
  },
  serviceItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  servicePriceDot: {
    fontSize: 12,
    color: "#5C55FF",
    marginRight: 6,
  },
  servicePriceText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#5C55FF",
  },
  // Expanded service details
  serviceExpandedContent: {
    marginTop: 12,
    paddingLeft: 30,
  },
  expandedMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  durationBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  durationText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 11,
    color: "#5C55FF",
  },
  editServiceBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  dateTimeContainer: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  dateTimeCol: {
    flex: 1,
  },
  dateTimeLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 9,
    color: "#9CA3AF",
    marginBottom: 4,
  },
  dateTimeValue: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 11,
    color: "#1F2937",
  },
  dateTimeDividerLine: {
    width: 1,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 12,
  },
  employeeLabel: {
    fontFamily: "Manrope_500Medium",
    fontSize: 11,
    color: "#9CA3AF",
    marginBottom: 6,
  },
  employeeDropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#FFFFFF",
  },
  employeeLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  employeeInitialsBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#5C55FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  employeeInitialsText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 9,
    color: "#FFFFFF",
  },
  employeeNameText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#1F2937",
  },
  // Add Services view layout
  searchWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Manrope_400Regular",
    fontSize: 14,
    color: "#1F2937",
  },
  searchOverlayScroll: {
    padding: 16,
  },
  searchOverlayCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  searchOverlayRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  searchOverlayRowChecked: {
    borderBottomColor: "#EEF2FF",
  },
  searchOverlayLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkboxActive: {
    borderColor: "#5C55FF",
    backgroundColor: "#5C55FF",
  },
  searchOverlayName: {
    fontFamily: "Manrope_500Medium",
    fontSize: 13,
    color: "#374151",
  },
  searchOverlayPrice: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#5C55FF",
  },
  // Action Buttons Footer row
  footerActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F9FAFB",
  },
  btnOutlineAction: {
    width: "48%",
    height: 40,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  btnOutlineActionText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#374151",
  },
  btnSolidAction: {
    width: "48%",
    height: 40,
    backgroundColor: "#5C55FF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  btnSolidActionText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#FFFFFF",
  },
  btnCancelApptLink: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#EF4444",
    borderRadius: 8,
    height: 42,
    marginHorizontal: 16,
  },
  btnCancelApptLinkText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#EF4444",
  },
  // Modal layout
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    maxHeight: "50%",
  },
  modalTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 16,
    color: "#1F2937",
    marginBottom: 16,
    textAlign: "center",
  },
  modalScroll: {
    marginBottom: 10,
  },
  modalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  modalItemActive: {
    borderBottomColor: "#EEF2FF",
  },
  modalItemText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 14,
    color: "#4B5563",
  },
  modalItemTextActive: {
    fontFamily: "Manrope_700Bold",
    fontSize: 14,
    color: "#5C55FF",
  },
});
