import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface BasicDataTabProps {
  member: {
    id: string;
    name: string;
    role: string;
    avatar: string;
  };
}

export default function BasicDataTab({ member }: BasicDataTabProps) {
  const [hairStylingEnabled, setHairStylingEnabled] = useState(true);
  const [coloringEnabled, setColoringEnabled] = useState(false);

  return (
    <View style={styles.container}>
      {/* Personal Data Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Personal Data</Text>
          <TouchableOpacity style={styles.editBtn} activeOpacity={0.7}>
            <Text style={styles.editBtnText}>Edit</Text>
            <Ionicons name="create-outline" size={14} color="#5C55FF" />
          </TouchableOpacity>
        </View>
        <View style={styles.grid}>
          <View style={styles.gridCol}>
            <Text style={styles.label}>Date of Birth</Text>
            <Text style={styles.value}>Nov 7, 1992</Text>
          </View>
          <View style={styles.gridCol}>
            <Text style={styles.label}>Age</Text>
            <Text style={styles.value}>33 years old</Text>
          </View>
          <View style={styles.gridCol}>
            <Text style={styles.label}>Gender</Text>
            <Text style={styles.value}>Female</Text>
          </View>
          <View style={styles.gridCol}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value} numberOfLines={1}>anna@bellavista.com</Text>
          </View>
          <View style={styles.gridColFull}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>Independence Street 567</Text>
          </View>
          <View style={styles.gridCol}>
            <Text style={styles.label}>City</Text>
            <Text style={styles.value}>Bologna</Text>
          </View>
          <View style={styles.gridCol}>
            <Text style={styles.label}>Province</Text>
            <Text style={styles.value}>Bologna (BO)</Text>
          </View>
          <View style={styles.gridCol}>
            <Text style={styles.label}>CAP</Text>
            <Text style={styles.value}>40126</Text>
          </View>
          <View style={styles.gridCol}>
            <Text style={styles.label}>Emergency Contact Name</Text>
            <Text style={styles.value}>Marco Rossi</Text>
          </View>
          <View style={styles.gridCol}>
            <Text style={styles.label}>Emergency Contact Telephone</Text>
            <Text style={styles.value}>+39 335 345 678</Text>
          </View>
        </View>
      </View>

      {/* Contract Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Contract</Text>
          <View style={styles.headerRightActions}>
            <TouchableOpacity style={styles.downloadBtn} activeOpacity={0.7}>
              <Ionicons name="download-outline" size={16} color="#5C55FF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.editBtn} activeOpacity={0.7}>
              <Text style={styles.editBtnText}>Edit</Text>
              <Ionicons name="create-outline" size={14} color="#5C55FF" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.grid}>
          <View style={styles.gridCol}>
            <Text style={styles.label}>End Date</Text>
            <Text style={styles.value}>Indeterminate</Text>
          </View>
          <View style={styles.gridCol}>
            <Text style={styles.label}>Tax ID</Text>
            <Text style={styles.value}>RSSANN92S...</Text>
          </View>
          <View style={styles.gridCol}>
            <Text style={styles.label}>Role</Text>
            <Text style={styles.value}>{member.role || "Staff"}</Text>
          </View>
          <View style={styles.gridCol}>
            <Text style={styles.label}>Remuneration</Text>
            <Text style={styles.value}>Fixed (€ 2,200)</Text>
          </View>
          <View style={styles.gridColFull}>
            <Text style={styles.label}>IBAN</Text>
            <Text style={styles.value}>IT60 X064 **** **** 123</Text>
          </View>
        </View>
      </View>

      {/* Services Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Services</Text>
          <TouchableOpacity style={styles.addBtn} activeOpacity={0.7}>
            <Ionicons name="add" size={14} color="#5C55FF" style={{ marginRight: 2 }} />
            <Text style={styles.addBtnText}>Add</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.serviceRow}>
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceName}>Hair Styling</Text>
            <Text style={styles.serviceDetail}>15 min • € 170</Text>
          </View>
          <Switch
            value={hairStylingEnabled}
            onValueChange={setHairStylingEnabled}
            trackColor={{ false: "#D1D5DB", true: "#5C55FF" }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.serviceRow}>
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceName}>Coloring & Highlights</Text>
            <Text style={styles.serviceDetail}>30 min • € 120</Text>
          </View>
          <Switch
            value={coloringEnabled}
            onValueChange={setColoringEnabled}
            trackColor={{ false: "#D1D5DB", true: "#5C55FF" }}
            thumbColor="#FFFFFF"
          />
        </View>

        <TouchableOpacity style={styles.seeAllLink} activeOpacity={0.7}>
          <Text style={styles.seeAllLinkText}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Additional Data Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Additional Data</Text>
          <TouchableOpacity style={styles.editBtn} activeOpacity={0.7}>
            <Text style={styles.editBtnText}>Edit</Text>
            <Ionicons name="create-outline" size={14} color="#5C55FF" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.fieldSection}>
          <Text style={styles.label}>Certifications</Text>
          <View style={styles.badgeRow}>
            <View style={styles.badgeBlue}>
              <Text style={styles.badgeBlueText}>PROFESSIONAL HAIRDRESSER</Text>
            </View>
            <View style={styles.badgeBlue}>
              <Text style={styles.badgeBlueText}>BUSINESS MANAGEMENT</Text>
            </View>
          </View>
        </View>

        <View style={styles.fieldSection}>
          <Text style={styles.label}>Completed Courses</Text>
          <Text style={styles.courseValue}>Leadership Management</Text>
          <Text style={styles.courseValue}>Customer Service Excellence</Text>
        </View>

        <View style={styles.fieldSection}>
          <Text style={styles.label}>Languages</Text>
          <View style={styles.langRow}>
            <Text style={styles.langLabel}>Italian</Text>
            <Text style={styles.langValueNative}>Native</Text>
          </View>
          <View style={styles.langRow}>
            <Text style={styles.langLabel}>English</Text>
            <Text style={styles.langValueAdv}>Advanced</Text>
          </View>
        </View>

        <View style={styles.fieldSection}>
          <Text style={styles.label}>Direct Manager</Text>
          <Text style={styles.value}>Maria Rodriguez</Text>
        </View>
      </View>

      {/* Social & Access Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Social & Access</Text>
          <TouchableOpacity style={styles.permitsBtn} activeOpacity={0.7}>
            <Text style={styles.permitsBtnText}>Permits</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.socialRow}>
          <View style={styles.socialLeft}>
            <View style={styles.socialIconContainer}>
              <Ionicons name="logo-facebook" size={16} color="#3B5998" />
            </View>
            <Text style={styles.socialName}>Facebook</Text>
          </View>
          <View style={styles.badgeYellow}>
            <Text style={styles.badgeYellowText}>Not Connected</Text>
          </View>
        </View>

        <View style={styles.socialRow}>
          <View style={styles.socialLeft}>
            <View style={styles.socialIconContainer}>
              <Ionicons name="logo-instagram" size={16} color="#E1306C" />
            </View>
            <Text style={styles.socialName}>Instagram</Text>
          </View>
          <View style={styles.badgeGreen}>
            <Text style={styles.badgeGreenText}>Connected</Text>
          </View>
        </View>

        <View style={[styles.socialRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
          <Text style={styles.socialLabel}>Last Access</Text>
          <Text style={styles.socialValue}>1h ago</Text>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
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
    fontSize: 15,
    fontFamily: "Manrope_700Bold",
    color: "#111827",
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  editBtnText: {
    fontSize: 12,
    fontFamily: "Manrope_600SemiBold",
    color: "#5C55FF",
    marginRight: 4,
  },
  headerRightActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  downloadBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  addBtnText: {
    fontSize: 12,
    fontFamily: "Manrope_600SemiBold",
    color: "#5C55FF",
  },
  permitsBtn: {
    borderWidth: 1,
    borderColor: "#5C55FF",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  permitsBtnText: {
    fontSize: 12,
    fontFamily: "Manrope_600SemiBold",
    color: "#5C55FF",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -8,
  },
  gridCol: {
    width: "50%",
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  gridColFull: {
    width: "100%",
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 11,
    fontFamily: "Manrope_500Medium",
    color: "#9CA3AF",
    marginBottom: 4,
  },
  value: {
    fontSize: 13,
    fontFamily: "Manrope_600SemiBold",
    color: "#1F2937",
  },
  serviceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 13,
    fontFamily: "Manrope_700Bold",
    color: "#111827",
    marginBottom: 2,
  },
  serviceDetail: {
    fontSize: 11,
    fontFamily: "Manrope_500Medium",
    color: "#6B7280",
  },
  seeAllLink: {
    alignItems: "center",
    paddingTop: 12,
  },
  seeAllLinkText: {
    fontSize: 13,
    fontFamily: "Manrope_600SemiBold",
    color: "#5C55FF",
  },
  fieldSection: {
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },
  badgeBlue: {
    backgroundColor: "#EFF6FF",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  badgeBlueText: {
    fontSize: 9,
    fontFamily: "Manrope_700Bold",
    color: "#2563EB",
  },
  courseValue: {
    fontSize: 13,
    fontFamily: "Manrope_600SemiBold",
    color: "#1F2937",
    marginBottom: 4,
  },
  langRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  langLabel: {
    fontSize: 13,
    fontFamily: "Manrope_600SemiBold",
    color: "#374151",
  },
  langValueNative: {
    fontSize: 12,
    fontFamily: "Manrope_700Bold",
    color: "#2563EB",
  },
  langValueAdv: {
    fontSize: 12,
    fontFamily: "Manrope_700Bold",
    color: "#10B981",
  },
  socialRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  socialLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  socialIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  socialName: {
    fontSize: 13,
    fontFamily: "Manrope_600SemiBold",
    color: "#374151",
  },
  badgeYellow: {
    backgroundColor: "#FEF3C7",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeYellowText: {
    fontSize: 10,
    fontFamily: "Manrope_700Bold",
    color: "#D97706",
  },
  badgeGreen: {
    backgroundColor: "#D1FAE5",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeGreenText: {
    fontSize: 10,
    fontFamily: "Manrope_700Bold",
    color: "#059669",
  },
  socialLabel: {
    fontSize: 13,
    fontFamily: "Manrope_600SemiBold",
    color: "#374151",
  },
  socialValue: {
    fontSize: 13,
    fontFamily: "Manrope_700Bold",
    color: "#111827",
  },
});
