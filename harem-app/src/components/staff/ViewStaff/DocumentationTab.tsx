import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function DocumentationTab() {
  const [subTab, setSubTab] = useState<"documents" | "waivers">("documents");
  
  // Waivers states
  const [fbMarketingConsent, setFbMarketingConsent] = useState(true);
  const [igMarketingConsent, setIgMarketingConsent] = useState(false);

  const documents = [
    { name: "Employment_Contract_Final.pdf", type: "PDF", size: "1.2 MB", date: "Oct 12, 2023", icon: "document-text" },
    { name: "Disciplinary_Letter_Q3.docx", type: "DOCX", size: "450 KB", date: "Sep 28, 2023", icon: "document-text" },
    { name: "NDA_Signed.pdf", type: "PDF", size: "2.1 MB", date: "Jan 15, 2023", icon: "document-text" },
  ];

  return (
    <View style={styles.container}>
      {/* Sub-Tabs Selector */}
      <View style={styles.subTabContainer}>
        <TouchableOpacity
          style={[styles.subTabButton, subTab === "documents" && styles.subTabActive]}
          onPress={() => setSubTab("documents")}
          activeOpacity={0.7}
        >
          <Text style={[styles.subTabText, subTab === "documents" && styles.subTabTextActive]}>
            Documents
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.subTabButton, subTab === "waivers" && styles.subTabActive]}
          onPress={() => setSubTab("waivers")}
          activeOpacity={0.7}
        >
          <Text style={[styles.subTabText, subTab === "waivers" && styles.subTabTextActive]}>
            Waivers
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      {subTab === "documents" ? (
        <View style={styles.contentCard}>
          <Text style={styles.sectionTitle}>ALL DOCUMENTS</Text>

          {documents.map((doc, idx) => (
            <View key={idx} style={styles.documentRow}>
              <View style={styles.docLeft}>
                <View style={styles.docIconWrapper}>
                  <Ionicons name={doc.icon as any} size={18} color="#5C55FF" />
                </View>
                <View style={styles.docInfo}>
                  <Text style={styles.docName} numberOfLines={1}>
                    {doc.name}
                  </Text>
                  <Text style={styles.docMeta}>
                    {doc.type} • {doc.size} • {doc.date}
                  </Text>
                </View>
              </View>

              <View style={styles.docRightActions}>
                <TouchableOpacity style={styles.actionIconBtn} activeOpacity={0.7}>
                  <Ionicons name="eye-outline" size={14} color="#5C55FF" style={{ marginRight: 2 }} />
                  <Text style={styles.actionBtnText}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionIconBtn} activeOpacity={0.7}>
                  <Ionicons name="download-outline" size={14} color="#059669" style={{ marginRight: 2 }} />
                  <Text style={[styles.actionBtnText, { color: "#059669" }]}>Get</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteBtn} activeOpacity={0.7}>
                  <Ionicons name="trash-outline" size={14} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.uploadBtn} activeOpacity={0.8}>
            <Ionicons name="cloud-upload-outline" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.uploadBtnText}>Upload</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.contentCard}>
          <Text style={styles.sectionTitle}>Waiver List</Text>

          {/* Waiver 1: Facebook Marketing */}
          <View style={styles.waiverRow}>
            <View style={styles.waiverLeft}>
              <View style={[styles.waiverIconWrapper, { backgroundColor: "#EFF6FF" }]}>
                <Ionicons name="logo-facebook" size={18} color="#3B5998" />
              </View>
              <Text style={styles.waiverName}>Marketing consent</Text>
            </View>
            <Switch
              value={fbMarketingConsent}
              onValueChange={setFbMarketingConsent}
              trackColor={{ false: "#D1D5DB", true: "#5C55FF" }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Waiver 2: Instagram Marketing */}
          <View style={styles.waiverRow}>
            <View style={styles.waiverLeft}>
              <View style={[styles.waiverIconWrapper, { backgroundColor: "#FDF2F8" }]}>
                <Ionicons name="logo-instagram" size={18} color="#E1306C" />
              </View>
              <Text style={styles.waiverName}>Marketing consent</Text>
            </View>
            <Switch
              value={igMarketingConsent}
              onValueChange={setIgMarketingConsent}
              trackColor={{ false: "#D1D5DB", true: "#5C55FF" }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Waiver 3: Social Media Posting (Pending) */}
          <View style={styles.waiverBlock}>
            <View style={styles.waiverBlockHeader}>
              <View style={styles.waiverLeft}>
                <View style={[styles.waiverIconWrapper, { backgroundColor: "#FEF3C7" }]}>
                  <Ionicons name="document-text" size={18} color="#D97706" />
                </View>
                <Text style={styles.waiverName}>Social media posting</Text>
              </View>
              <View style={styles.pendingBadge}>
                <Text style={styles.pendingBadgeText}>PENDING</Text>
              </View>
            </View>
            <View style={styles.waiverBlockActions}>
              <TouchableOpacity style={styles.signBtn} activeOpacity={0.8}>
                <Text style={styles.signBtnText}>Sign Now</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.resendBtn} activeOpacity={0.7}>
                <Text style={styles.resendBtnText}>Resend</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Waiver 4: Social Media (Signed) */}
          <View style={styles.waiverBlock}>
            <View style={styles.waiverBlockHeader}>
              <View style={styles.waiverLeft}>
                <View style={[styles.waiverIconWrapper, { backgroundColor: "#D1FAE5" }]}>
                  <Ionicons name="people" size={18} color="#059669" />
                </View>
                <Text style={styles.waiverName}>Social Media</Text>
              </View>
              <View style={styles.signedBadge}>
                <Text style={styles.signedBadgeText}>SIGNED</Text>
              </View>
            </View>
            <View style={styles.waiverBlockActions}>
              <TouchableOpacity style={[styles.signBtn, { backgroundColor: "#5C55FF" }]} activeOpacity={0.8}>
                <Text style={styles.signBtnText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.revokeBtn} activeOpacity={0.7}>
                <Text style={styles.revokeBtnText}>Revoke</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.uploadBtn} activeOpacity={0.8}>
            <Ionicons name="cloud-upload-outline" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.uploadBtnText}>Upload</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  subTabContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 4,
    marginBottom: 16,
  },
  subTabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 6,
  },
  subTabActive: {
    backgroundColor: "#1F2937",
  },
  subTabText: {
    fontSize: 13,
    fontFamily: "Manrope_600SemiBold",
    color: "#6B7280",
  },
  subTabTextActive: {
    color: "#FFFFFF",
  },
  contentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Manrope_700Bold",
    color: "#9CA3AF",
    marginBottom: 16,
  },
  documentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  docLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  docIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: "#EEF2F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  docInfo: {
    flex: 1,
  },
  docName: {
    fontSize: 13,
    fontFamily: "Manrope_700Bold",
    color: "#1F2937",
    marginBottom: 2,
  },
  docMeta: {
    fontSize: 10,
    fontFamily: "Manrope_500Medium",
    color: "#9CA3AF",
  },
  docRightActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionIconBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
  },
  actionBtnText: {
    fontSize: 10,
    fontFamily: "Manrope_700Bold",
    color: "#5C55FF",
  },
  deleteBtn: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#FEE2E2",
    backgroundColor: "#FEF2F2",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5C55FF",
    borderRadius: 8,
    height: 40,
    marginTop: 20,
    shadowColor: "#5C55FF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  uploadBtnText: {
    fontSize: 13,
    fontFamily: "Manrope_700Bold",
    color: "#FFFFFF",
  },
  waiverRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  waiverLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  waiverIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  waiverName: {
    fontSize: 13,
    fontFamily: "Manrope_700Bold",
    color: "#1F2937",
  },
  waiverBlock: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  waiverBlockHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  pendingBadge: {
    backgroundColor: "#FEF3C7",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  pendingBadgeText: {
    fontSize: 9,
    fontFamily: "Manrope_700Bold",
    color: "#D97706",
  },
  signedBadge: {
    backgroundColor: "#D1FAE5",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  signedBadgeText: {
    fontSize: 9,
    fontFamily: "Manrope_700Bold",
    color: "#059669",
  },
  waiverBlockActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  signBtn: {
    flex: 1,
    backgroundColor: "#5C55FF",
    borderRadius: 6,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  signBtnText: {
    fontSize: 11,
    fontFamily: "Manrope_700Bold",
    color: "#FFFFFF",
  },
  resendBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#5C55FF",
    borderRadius: 6,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  resendBtnText: {
    fontSize: 11,
    fontFamily: "Manrope_700Bold",
    color: "#5C55FF",
  },
  revokeBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#F97316",
    borderRadius: 6,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  revokeBtnText: {
    fontSize: 11,
    fontFamily: "Manrope_700Bold",
    color: "#F97316",
  },
});
