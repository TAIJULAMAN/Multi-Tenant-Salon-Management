import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { usePathname, useRouter } from "expo-router";

interface DrawerItem {
  label: string;
  icon: keyof typeof Ionicons.prototype.props.name;
  route: string;
  isPlaceholder?: boolean;
}

const mainItems: DrawerItem[] = [
  { label: "Dashboard", icon: "grid-outline", route: "/" },
  { label: "Appointments", icon: "calendar-outline", route: "/calendar" },
  { label: "Clients", icon: "people-outline", route: "/staff" },
  { label: "Salaries", icon: "card-outline", route: "/salaries", isPlaceholder: true },
  { label: "Services", icon: "cut-outline", route: "/services", isPlaceholder: true },
  { label: "Inventory", icon: "cube-outline", route: "/statistics" },
  { label: "Financial", icon: "bar-chart-outline", route: "/finance" },
  { label: "Social Media", icon: "globe-outline", route: "/social-media", isPlaceholder: true },
  { label: "Worked Shifts", icon: "time-outline", route: "/worked-shifts", isPlaceholder: true },
];

const otherItems: DrawerItem[] = [
  { label: "Files", icon: "folder-outline", route: "/files", isPlaceholder: true },
  { label: "Roles", icon: "shield-checkmark-outline", route: "/roles", isPlaceholder: true },
  { label: "Support", icon: "help-circle-outline", route: "/support", isPlaceholder: true },
  { label: "Settings", icon: "settings-outline", route: "/settings", isPlaceholder: true },
];

export default function CustomDrawerContent(props: any) {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const router = useRouter();
  const { navigation } = props;

  const isActive = (item: DrawerItem) => {
    if (item.isPlaceholder) return false;
    if (item.route === "/") {
      return pathname === "/" || pathname === "/index";
    }
    return pathname.startsWith(item.route);
  };

  const handlePress = (item: DrawerItem) => {
    if (item.isPlaceholder) {
      navigation.closeDrawer();
      Alert.alert("Coming Soon", `${item.label} module is under development.`);
    } else {
      router.push(item.route as any);
      navigation.closeDrawer();
    }
  };

  const renderItem = (item: DrawerItem) => {
    const active = isActive(item);
    return (
      <TouchableOpacity
        key={item.label}
        style={[styles.itemContainer, active && styles.itemContainerActive]}
        onPress={() => handlePress(item)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={item.icon as any}
          size={20}
          color={active ? "#FFFFFF" : "#4B5563"}
          style={styles.itemIcon}
        />
        <Text style={[styles.itemText, active && styles.itemTextActive]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 20), paddingBottom: Math.max(insets.bottom, 20) }]}>
      {/* Brand Header */}
      <View style={styles.headerRow}>
        <View style={styles.brandContainer}>
          <Ionicons name="cloudy-outline" size={24} color="#5C55FF" style={styles.brandIcon} />
          <Text style={styles.brandText}>GlamPro</Text>
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.closeDrawer()}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={20} color="#4B5563" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Main Section */}
        <Text style={styles.sectionHeader}>Main</Text>
        <View style={styles.sectionContainer}>
          {mainItems.map(renderItem)}
        </View>

        {/* Others Section */}
        <Text style={styles.sectionHeader}>Others</Text>
        <View style={styles.sectionContainer}>
          {otherItems.map(renderItem)}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  brandContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  brandIcon: {
    marginRight: 8,
  },
  brandText: {
    fontFamily: "Manrope_700Bold",
    fontSize: 20,
    color: "#5C55FF",
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 20,
  },
  sectionHeader: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 12,
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 4,
    marginTop: 10,
  },
  sectionContainer: {
    marginBottom: 15,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 4,
  },
  itemContainerActive: {
    backgroundColor: "#5C55FF",
  },
  itemIcon: {
    marginRight: 12,
    width: 20,
    textAlign: "center",
  },
  itemText: {
    fontFamily: "Manrope_500Medium",
    fontSize: 14,
    color: "#374151",
  },
  itemTextActive: {
    color: "#FFFFFF",
    fontFamily: "Manrope_700Bold",
  },
});
