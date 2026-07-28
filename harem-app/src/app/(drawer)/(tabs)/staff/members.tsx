import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Avatar from "@/components/Avatar";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  isSuspended?: boolean;
}

export default function StaffMembersScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Mock staff data
  const [members, setMembers] = useState<StaffMember[]>([
    {
      id: "1",
      name: "Leslie Alexander",
      role: "Senior Stylist",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "2",
      name: "Jane Cooper",
      role: "Senior Stylist",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "3",
      name: "Cameron Williamson",
      role: "Junior Stylist",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "4",
      name: "Eleanor Pena",
      role: "Senior Stylist",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "5",
      name: "Guy Hawkins",
      role: "Junior Stylist",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "6",
      name: "Kristin Watson",
      role: "Senior Stylist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "7",
      name: "Courtney Henry",
      role: "Junior Stylist",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80",
    },
    {
      id: "8",
      name: "Albert Flores",
      role: "Senior Stylist",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80",
    },
  ]);

  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOptionPress = (action: string, member: StaffMember) => {
    setActiveMenuId(null);
    if (action === "details") {
      Alert.alert(
        "Staff Member Details",
        `Name: ${member.name}\nRole: ${member.role}\nStatus: ${
          member.isSuspended ? "Suspended" : "Active"
        }`
      );
    } else if (action === "calendar") {
      Alert.alert("Calendar", `Opening schedule calendar for ${member.name}`);
    } else if (action === "password") {
      Alert.alert("Reset Password", `Are you sure you want to send a password reset link to ${member.name}?`, [
        { text: "Cancel", style: "cancel" },
        { text: "Reset", onPress: () => Alert.alert("Success", "Password reset link sent successfully!") },
      ]);
    } else if (action === "suspend") {
      const isSuspending = !member.isSuspended;
      Alert.alert(
        isSuspending ? "Suspend Member" : "Activate Member",
        `Are you sure you want to ${isSuspending ? "suspend" : "activate"} ${member.name}?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: isSuspending ? "Suspend" : "Activate",
            style: isSuspending ? "destructive" : "default",
            onPress: () => {
              setMembers((prev) =>
                prev.map((m) =>
                  m.id === member.id ? { ...m, isSuspended: isSuspending } : m
                )
              );
              Alert.alert(
                "Success",
                `${member.name} has been ${isSuspending ? "suspended" : "activated"}.`
              );
            },
          },
        ]
      );
    }
  };

  const handleAddMember = () => {
    Alert.alert("Add Member", "Enter staff member details below:", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Add Stylist",
        onPress: () => {
          const newMember: StaffMember = {
            id: String(members.length + 1),
            name: "New Stylist",
            role: "Junior Stylist",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
          };
          setMembers((prev) => [...prev, newMember]);
          Alert.alert("Success", "New staff member added successfully!");
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 15) }]}>
      {/* Tap outside backdrop to close dropdown */}
      {activeMenuId && (
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => setActiveMenuId(null)}
        />
      )}

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Staff Members</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconBtn} activeOpacity={0.7}>
            <Ionicons name="notifications" size={20} color="#FFB020" />
            <View style={styles.badge} />
          </TouchableOpacity>
          <Avatar
            name="Maria Fernandez"
            uri="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
            size={34}
          />
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <Ionicons name="search-outline" size={18} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search staff members..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery("")} activeOpacity={0.7}>
              <Ionicons name="close-circle" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {/* Members List */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {filteredMembers.map((member) => (
          <View
            key={member.id}
            style={[
              styles.memberCard,
              member.isSuspended && styles.memberCardSuspended,
              { zIndex: activeMenuId === member.id ? 100 : 1 },
            ]}
          >
            <View style={styles.memberInfo}>
              <Image source={{ uri: member.avatar }} style={styles.avatarImage} />
              <View style={styles.textContainer}>
                <Text style={[styles.memberName, member.isSuspended && styles.textSuspended]}>
                  {member.name}
                </Text>
                <Text style={styles.memberRole}>
                  {member.isSuspended ? "Suspended" : member.role}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.optionsBtn}
              onPress={() => setActiveMenuId(activeMenuId === member.id ? null : member.id)}
              activeOpacity={0.7}
            >
              <Ionicons name="ellipsis-vertical" size={18} color="#9CA3AF" />
            </TouchableOpacity>

            {/* Dropdown overlay */}
            {activeMenuId === member.id && (
              <View style={styles.dropdownMenu}>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleOptionPress("details", member)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="eye-outline" size={16} color="#4B5563" style={styles.dropdownIcon} />
                  <Text style={styles.dropdownText}>View Details</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleOptionPress("calendar", member)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="calendar-outline" size={16} color="#4B5563" style={styles.dropdownIcon} />
                  <Text style={styles.dropdownText}>View Calendar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => handleOptionPress("password", member)}
                  activeOpacity={0.7}
                >
                  <Ionicons name="key-outline" size={16} color="#4B5563" style={styles.dropdownIcon} />
                  <Text style={styles.dropdownText}>Reset Password</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.dropdownItem, styles.dropdownItemDelete]}
                  onPress={() => handleOptionPress("suspend", member)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={member.isSuspended ? "checkmark-circle-outline" : "person-remove-outline"}
                    size={16}
                    color={member.isSuspended ? "#10B981" : "#F43F5E"}
                    style={styles.dropdownIcon}
                  />
                  <Text
                    style={[
                      styles.dropdownTextDelete,
                      member.isSuspended && { color: "#10B981" },
                    ]}
                  >
                    {member.isSuspended ? "Activate" : "Suspend"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Floating Action Button (FAB) */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddMember}
        activeOpacity={0.85}
      >
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 90,
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
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBtn: {
    position: "relative",
    marginRight: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 13,
    color: "#1F2937",
    fontFamily: "Manrope_500Medium",
    padding: 0,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  memberCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    position: "relative",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
  },
  memberCardSuspended: {
    backgroundColor: "#FFF1F2",
    borderColor: "#FFE4E6",
  },
  memberInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    backgroundColor: "#ECEEF2",
  },
  textContainer: {
    justifyContent: "center",
  },
  memberName: {
    fontFamily: "Manrope_700Bold",
    fontSize: 14,
    color: "#1F2937",
    marginBottom: 2,
  },
  textSuspended: {
    color: "#9CA3AF",
    textDecorationLine: "line-through",
  },
  memberRole: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 11,
    color: "#5C55FF",
  },
  optionsBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownMenu: {
    position: "absolute",
    right: 14,
    top: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    width: 140,
    paddingVertical: 4,
    zIndex: 200,
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  dropdownIcon: {
    marginRight: 8,
  },
  dropdownText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 12,
    color: "#1F2937",
  },
  dropdownItemDelete: {
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  dropdownTextDelete: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#F43F5E",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#5C55FF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#5C55FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
});
