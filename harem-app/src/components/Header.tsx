import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import Avatar from "./Avatar";

interface HeaderProps {
  centerComponent?: React.ReactNode;
}

export default function Header({ centerComponent }: HeaderProps) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();

  return (
    <View style={[styles.headerContainer, { paddingTop: Math.max(insets.top+ 10) }]}>
      <TouchableOpacity
        style={styles.iconButton}
        activeOpacity={0.7}
        onPress={() => navigation.openDrawer()}
      >
        <Ionicons name="menu" size={24} color="#1F2937" />
      </TouchableOpacity>

      <View style={styles.centerContainer}>
        {centerComponent}
      </View>

      <View style={styles.rightContainer}>
        <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
          <Ionicons name="search-outline" size={22} color="#4B5563" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.iconButton, styles.bellButton]} activeOpacity={0.7}>
          <Ionicons name="notifications" size={22} color="#FFB020" />
          <View style={styles.badge} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.avatarButton} activeOpacity={0.7}>
          <Avatar name="A" uri="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" size={34} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: "#F9FAFB", // Light grey background matching screenshot body
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    marginRight: 8,
  },
  bellButton: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF5C93",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  avatarButton: {
    marginLeft: 4,
  },
});
