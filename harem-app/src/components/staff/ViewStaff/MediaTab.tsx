import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MediaTab() {
  const [activeFilter, setActiveFilter] = useState("All Type");

  const filters = ["All Type", "Photo", "Video", "Albums"];

  const mediaItems = [
    {
      id: "m1",
      title: "salon_vibe_tour.mov",
      meta: "Uploaded by Sarah J. • Oct 21, 2023, 09:45 AM",
      thumbnail: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=300&q=80",
      status: "PUBLISHED",
      isVideo: true,
    },
    {
      id: "m2",
      title: "haircut_editorial_04.jpg",
      meta: "Uploaded by Marcus T. • Oct 23, 2023, 02:15 PM",
      thumbnail: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=300&q=80",
      status: "DRAFT",
      isVideo: false,
    },
    {
      id: "m3",
      title: "balayage_final_v1.mp4",
      meta: "Uploaded by Sarah J. • Oct 24, 2023, 10:30 AM",
      thumbnail: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=300&q=80",
      status: "PUBLISHED",
      isVideo: true,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Media Type Filters */}
      <View style={styles.filterRow}>
        {filters.map((f) => {
          const isActive = f === activeFilter;
          return (
            <TouchableOpacity
              key={f}
              style={[styles.filterBadge, isActive && styles.filterBadgeActive]}
              onPress={() => setActiveFilter(f)}
              activeOpacity={0.7}
            >
              <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                {f}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Date Range Selector */}
      <View style={styles.dateSelectorCard}>
        <View style={styles.dateLeft}>
          <Ionicons name="calendar-outline" size={16} color="#6B7280" style={{ marginRight: 6 }} />
          <Text style={styles.dateLabel}>Date Range:</Text>
          <Text style={styles.dateValue}>Last 7 days</Text>
        </View>
        <Ionicons name="chevron-down" size={16} color="#6B7280" />
      </View>

      {/* Media Cards Grid */}
      <View style={styles.gridContainer}>
        {mediaItems.map((item) => (
          <View key={item.id} style={styles.mediaCard}>
            <View style={styles.thumbnailContainer}>
              <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
              
              {/* Play Icon overlay for videos */}
              {item.isVideo && (
                <View style={styles.playIconOverlay}>
                  <Ionicons name="play-circle" size={32} color="#FFFFFF" />
                </View>
              )}

              {/* Status Badge */}
              <View
                style={[
                  styles.statusBadge,
                  item.status === "PUBLISHED" ? styles.badgePublished : styles.badgeDraft,
                ]}
              >
                <Text style={styles.statusBadgeText}>{item.status}</Text>
              </View>
            </View>

            <View style={styles.cardFooter}>
              <View style={styles.cardFooterLeft}>
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.cardMeta} numberOfLines={1}>
                  {item.meta}
                </Text>
              </View>
              <TouchableOpacity style={styles.optionsBtn} activeOpacity={0.7}>
                <Ionicons name="ellipsis-vertical" size={16} color="#6B7280" />
              </TouchableOpacity>
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
  filterRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  filterBadge: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
  },
  filterBadgeActive: {
    backgroundColor: "#00C49F",
    borderColor: "#00C49F",
  },
  filterText: {
    fontSize: 12,
    fontFamily: "Manrope_600SemiBold",
    color: "#4B5563",
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  dateSelectorCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  dateLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateLabel: {
    fontSize: 12,
    fontFamily: "Manrope_500Medium",
    color: "#6B7280",
    marginRight: 4,
  },
  dateValue: {
    fontSize: 12,
    fontFamily: "Manrope_700Bold",
    color: "#1F2937",
  },
  gridContainer: {
    width: "100%",
    marginBottom: 30,
  },
  mediaCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  thumbnailContainer: {
    position: "relative",
    width: "100%",
    height: 180,
    backgroundColor: "#ECEEF2",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  playIconOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  statusBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  badgePublished: {
    backgroundColor: "#5C55FF",
  },
  badgeDraft: {
    backgroundColor: "#4B5563",
  },
  statusBadgeText: {
    fontSize: 8,
    fontFamily: "Manrope_700Bold",
    color: "#FFFFFF",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
  cardFooterLeft: {
    flex: 1,
    paddingRight: 8,
  },
  cardTitle: {
    fontSize: 13,
    fontFamily: "Manrope_700Bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  cardMeta: {
    fontSize: 10,
    fontFamily: "Manrope_500Medium",
    color: "#9CA3AF",
  },
  optionsBtn: {
    padding: 4,
  },
});
