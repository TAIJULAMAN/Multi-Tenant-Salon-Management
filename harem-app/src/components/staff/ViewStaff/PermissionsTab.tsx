import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ExpoUISwitch from "@/components/ui/Switch";

export default function PermissionsTab() {
  const [permissions, setPermissions] = useState({
    // Tenant & Users
    profile: true,
    subscription: true,
    roles: true,
    audit: true,
    // Calendar & Bookings
    teamCalendars: true,
    allCalendars: true,
    createAppts: true,
    editOwnAppts: true,
    editOtherAppts: true,
    approveBookings: true,
    overrideConflicts: true,
    blockTime: true,
    manageShifts: true,
    configureDurations: true,
    exportCalendar: true,
    viewClientNotes: true,
    // Finance & Reporting
    processPayments: true,
    accessSalesData: false,
  });

  const togglePermission = (key: keyof typeof permissions) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <View style={styles.container}>
      {/* Role Card */}
      <View style={styles.roleCard}>
        <Text style={styles.roleLabel}>TENANT & USERS</Text>
        <View style={styles.roleRow}>
          <View>
            <Text style={styles.roleTitle}>Role</Text>
            <Text style={styles.roleSub}>Only Owner can change the role</Text>
          </View>
          <Text style={styles.roleValue}>Staff</Text>
        </View>
      </View>

      {/* Tenant & Users Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Tenant & Users</Text>

        <View style={styles.permissionRow}>
          <View style={styles.permissionInfo}>
            <Text style={styles.permissionName}>Manage salon profile</Text>
            <Text style={styles.permissionDesc}>Branding name header and business info</Text>
          </View>
          <ExpoUISwitch
            value={permissions.profile}
            onValueChange={() => togglePermission("profile")}
          />
        </View>

        <View style={styles.permissionRow}>
          <View style={styles.permissionInfo}>
            <Text style={styles.permissionName}>Manage subscription & feature toggles</Text>
            <Text style={styles.permissionDesc}>Allow subscription & feature toggles</Text>
          </View>
          <ExpoUISwitch
            value={permissions.subscription}
            onValueChange={() => togglePermission("subscription")}
          />
        </View>

        <View style={styles.permissionRow}>
          <View style={styles.permissionInfo}>
            <Text style={styles.permissionName}>Manage roles & member invites</Text>
            <Text style={styles.permissionDesc}>Add/remove users, set permissions</Text>
          </View>
          <ExpoUISwitch
            value={permissions.roles}
            onValueChange={() => togglePermission("roles")}
          />
        </View>

        <View style={[styles.permissionRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
          <View style={styles.permissionInfo}>
            <Text style={styles.permissionName}>View audit log / user operation history</Text>
          </View>
          <ExpoUISwitch
            value={permissions.audit}
            onValueChange={() => togglePermission("audit")}
          />
        </View>
      </View>

      {/* Calendar & Bookings Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Calendar & Bookings</Text>

        <View style={styles.permissionRow}>
          <View style={styles.permissionInfo}>
            <Text style={styles.permissionName}>View team calendars (same salon)</Text>
          </View>
          <ExpoUISwitch
            value={permissions.teamCalendars}
            onValueChange={() => togglePermission("teamCalendars")}
          />
        </View>

        <View style={styles.permissionRow}>
          <View style={styles.permissionInfo}>
            <Text style={styles.permissionName}>View all salon calendars (incl. private slots)</Text>
          </View>
          <ExpoUISwitch
            value={permissions.allCalendars}
            onValueChange={() => togglePermission("allCalendars")}
          />
        </View>

        <View style={styles.permissionRow}>
          <View style={styles.permissionInfo}>
            <Text style={styles.permissionName}>Create appointments</Text>
          </View>
          <ExpoUISwitch
            value={permissions.createAppts}
            onValueChange={() => togglePermission("createAppts")}
          />
        </View>

        <View style={styles.permissionRow}>
          <View style={styles.permissionInfo}>
            <Text style={styles.permissionName}>Edit appointments (own)</Text>
          </View>
          <ExpoUISwitch
            value={permissions.editOwnAppts}
            onValueChange={() => togglePermission("editOwnAppts")}
          />
        </View>

        <View style={styles.permissionRow}>
          <View style={styles.permissionInfo}>
            <Text style={styles.permissionName}>Edit appointments (others)</Text>
          </View>
          <ExpoUISwitch
            value={permissions.editOtherAppts}
            onValueChange={() => togglePermission("editOtherAppts")}
          />
        </View>

        <View style={styles.permissionRow}>
          <View style={styles.permissionInfo}>
            <Text style={styles.permissionName}>Approve/reject client self-bookings</Text>
          </View>
          <ExpoUISwitch
            value={permissions.approveBookings}
            onValueChange={() => togglePermission("approveBookings")}
          />
        </View>

        <View style={styles.permissionRow}>
          <View style={styles.permissionInfo}>
            <Text style={styles.permissionName}>Override conflicts/overbook</Text>
          </View>
          <ExpoUISwitch
            value={permissions.overrideConflicts}
            onValueChange={() => togglePermission("overrideConflicts")}
          />
        </View>

        <View style={styles.permissionRow}>
          <View style={styles.permissionInfo}>
            <Text style={styles.permissionName}>Block time / set breaks</Text>
          </View>
          <ExpoUISwitch
            value={permissions.blockTime}
            onValueChange={() => togglePermission("blockTime")}
          />
        </View>

        <View style={styles.permissionRow}>
          <View style={styles.permissionInfo}>
            <Text style={styles.permissionName}>Manage shift scheduling & rotations</Text>
            <Text style={styles.permissionDesc}>recurring, Saturday rotation rules</Text>
          </View>
          <ExpoUISwitch
            value={permissions.manageShifts}
            onValueChange={() => togglePermission("manageShifts")}
          />
        </View>

        <View style={styles.permissionRow}>
          <View style={styles.permissionInfo}>
            <Text style={styles.permissionName}>Configure service durations & availability logic</Text>
          </View>
          <ExpoUISwitch
            value={permissions.configureDurations}
            onValueChange={() => togglePermission("configureDurations")}
          />
        </View>

        <View style={styles.permissionRow}>
          <View style={styles.permissionInfo}>
            <Text style={styles.permissionName}>Export calendar / sync</Text>
          </View>
          <ExpoUISwitch
            value={permissions.exportCalendar}
            onValueChange={() => togglePermission("exportCalendar")}
          />
        </View>

        <View style={[styles.permissionRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
          <View style={styles.permissionInfo}>
            <Text style={styles.permissionName}>View client notes from calendar</Text>
          </View>
          <ExpoUISwitch
            value={permissions.viewClientNotes}
            onValueChange={() => togglePermission("viewClientNotes")}
          />
        </View>
      </View>

      {/* Finance & Reporting Section */}
      <View style={[styles.card, { marginBottom: 30 }]}>
        <Text style={styles.sectionTitle}>Finance & Reporting</Text>

        <View style={styles.permissionRow}>
          <View style={styles.permissionInfo}>
            <Text style={styles.permissionName}>Process Payments</Text>
            <Text style={styles.permissionDesc}>Ability to checkout clients and handle cash</Text>
          </View>
          <ExpoUISwitch
            value={permissions.processPayments}
            onValueChange={() => togglePermission("processPayments")}
          />
        </View>

        <View style={[styles.permissionRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
          <View style={styles.permissionInfo}>
            <Text style={styles.permissionName}>Access Sales Data</Text>
            <Text style={styles.permissionDesc}>View daily revenue and financial reports</Text>
          </View>
          <ExpoUISwitch
            value={permissions.accessSalesData}
            onValueChange={() => togglePermission("accessSalesData")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  roleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  roleLabel: {
    fontSize: 9,
    fontFamily: "Manrope_700Bold",
    color: "#9CA3AF",
    marginBottom: 12,
  },
  roleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  roleTitle: {
    fontSize: 14,
    fontFamily: "Manrope_700Bold",
    color: "#1F2937",
    marginBottom: 2,
  },
  roleSub: {
    fontSize: 10,
    fontFamily: "Manrope_500Medium",
    color: "#9CA3AF",
  },
  roleValue: {
    fontSize: 14,
    fontFamily: "Manrope_700Bold",
    color: "#5C55FF",
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
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    paddingBottom: 10,
  },
  permissionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  permissionInfo: {
    flex: 1,
    paddingRight: 10,
  },
  permissionName: {
    fontSize: 13,
    fontFamily: "Manrope_600SemiBold",
    color: "#374151",
    marginBottom: 2,
  },
  permissionDesc: {
    fontSize: 10,
    fontFamily: "Manrope_500Medium",
    color: "#9CA3AF",
  },
});
