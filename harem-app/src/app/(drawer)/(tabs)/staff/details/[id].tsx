import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Tab Components
import BasicDataTab from "@/components/staff/ViewStaff/BasicDataTab";
import RemunerationTab from "@/components/staff/ViewStaff/RemunerationTab";
import ActivityTab from "@/components/staff/ViewStaff/ActivityTab";
import CalendarTab from "@/components/staff/ViewStaff/CalendarTab";
import ShiftsTab from "@/components/staff/ViewStaff/ShiftsTab";
import ProductionTab from "@/components/staff/ViewStaff/ProductionTab";
import PermissionsTab from "@/components/staff/ViewStaff/PermissionsTab";
import DocumentationTab from "@/components/staff/ViewStaff/DocumentationTab";
import MediaTab from "@/components/staff/ViewStaff/MediaTab";

const TABS = [
  "Basic Data",
  "Remuneration",
  "Activity in Salon",
  "Calendar",
  "Scheduled Shifts",
  "Production",
  "Permissions",
  "Documentation",
  "Media",
];

export default function StaffDetailsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams();

  const [activeTab, setActiveTab] = useState("Basic Data");

  // Destructure with default fallbacks matching Maria Rodriguez screenshot
  const memberId = (params.id as string) || "1";
  const name = (params.name as string) || "Maria Rodriguez";
  const role = (params.role as string) || "Staff";
  const avatar = (params.avatar as string) || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80";

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 15) }]}>
      {/* Header bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{name}</Text>
        <TouchableOpacity style={styles.actionsBtn} activeOpacity={0.7}>
          <Text style={styles.actionsBtnText}>Actions</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          {/* Wave/Pattern background block */}
          <View style={styles.profileTopBg} />
          
          {/* Avatar Container */}
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: avatar }} style={styles.profileAvatar} />
            <View style={styles.statusIndicator} />
          </View>

          {/* Profile Name & Status */}
          <Text style={styles.profileName}>{name}</Text>
          
          <View style={styles.statusRow}>
            <Text style={styles.locationText}>BOLOGNA, ITALY • </Text>
            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText}>Active</Text>
            </View>
          </View>

          <View style={styles.roleBadge}>
            <Text style={styles.roleBadgeText}>ROLE: {role.toUpperCase()}</Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Summary columns */}
          <View style={styles.summaryRow}>
            <View style={styles.summaryCol}>
              <Text style={styles.summaryLabel}>START DATE</Text>
              <Text style={styles.summaryValue}>May 31, 2022</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryCol}>
              <Text style={styles.summaryLabel}>CONTRACT</Text>
              <Text style={styles.summaryValue}>Permanent</Text>
            </View>
          </View>
        </View>

        {/* Horizontal scrollable Tabs Bar */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabsScroll}
          contentContainerStyle={styles.tabsContent}
        >
          {TABS.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tabButton, isActive && styles.tabButtonActive]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.8}
              >
                <Text style={[styles.tabButtonText, isActive && styles.tabButtonTextActive]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Active Tab Content Area */}
        <View style={styles.tabContentArea}>
          {activeTab === "Basic Data" && (
            <BasicDataTab member={{ id: memberId, name, role, avatar }} />
          )}
          {activeTab === "Remuneration" && <RemunerationTab />}
          {activeTab === "Activity in Salon" && <ActivityTab />}
          {activeTab === "Calendar" && <CalendarTab />}
          {activeTab === "Scheduled Shifts" && <ShiftsTab />}
          {activeTab === "Production" && <ProductionTab />}
          {activeTab === "Permissions" && <PermissionsTab />}
          {activeTab === "Documentation" && <DocumentationTab />}
          {activeTab === "Media" && <MediaTab />}
        </View>
      </ScrollView>
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
    paddingHorizontal: 16,
    height: 54,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: "Manrope_700Bold",
    color: "#111827",
    maxWidth: "60%",
  },
  actionsBtn: {
    backgroundColor: "#EEF2F6",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionsBtnText: {
    fontSize: 12,
    fontFamily: "Manrope_700Bold",
    color: "#5C55FF",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    alignItems: "center",
    paddingBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  profileTopBg: {
    width: "100%",
    height: 60,
    backgroundColor: "#EEF2F6",
  },
  avatarWrapper: {
    marginTop: -35,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    backgroundColor: "#F3F4F6",
  },
  statusIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#10B981",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  profileName: {
    fontSize: 16,
    fontFamily: "Manrope_700Bold",
    color: "#111827",
    marginTop: 10,
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  locationText: {
    fontSize: 10,
    fontFamily: "Manrope_700Bold",
    color: "#9CA3AF",
  },
  activeBadge: {
    backgroundColor: "#D1FAE5",
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  activeBadgeText: {
    fontSize: 8,
    fontFamily: "Manrope_700Bold",
    color: "#059669",
  },
  roleBadge: {
    backgroundColor: "#EEF2F6",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginBottom: 12,
  },
  roleBadgeText: {
    fontSize: 9,
    fontFamily: "Manrope_700Bold",
    color: "#5C55FF",
  },
  divider: {
    width: "90%",
    height: 1,
    backgroundColor: "#F3F4F6",
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  summaryCol: {
    flex: 1,
    alignItems: "center",
  },
  summaryDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "#F3F4F6",
  },
  summaryLabel: {
    fontSize: 8,
    fontFamily: "Manrope_700Bold",
    color: "#9CA3AF",
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 11,
    fontFamily: "Manrope_600SemiBold",
    color: "#4B5563",
  },
  tabsScroll: {
    marginBottom: 16,
  },
  tabsContent: {
    paddingRight: 16,
  },
  tabButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
  },
  tabButtonActive: {
    backgroundColor: "#5C55FF",
    borderColor: "#5C55FF",
  },
  tabButtonText: {
    fontSize: 12,
    fontFamily: "Manrope_600SemiBold",
    color: "#4B5563",
  },
  tabButtonTextActive: {
    color: "#FFFFFF",
  },
  tabContentArea: {
    width: "100%",
  },
});
