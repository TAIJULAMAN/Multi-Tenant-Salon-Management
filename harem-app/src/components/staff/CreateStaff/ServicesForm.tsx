import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TextInput from "../../ui/TextInput";
import Checkbox from "../../ui/Checkbox";

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  iconName: any;
}

export const AVAILABLE_SERVICES: ServiceCategory[] = [
  { id: "s1", name: "Hair Styling", description: "Cuts, Blowouts, Updos", iconName: "cut-outline" },
  { id: "s2", name: "Coloring & Highlights", description: "Balayage, Foils, Touch-ups", iconName: "brush-outline" },
  { id: "s3", name: "Manicure & Pedicure", description: "Gel, Acrylic, Spa treatments", iconName: "hand-left-outline" },
  { id: "s4", name: "Facial Treatments", description: "Deep clean, Anti-aging, Hydration", iconName: "sparkles-outline" },
  { id: "s5", name: "Massage Therapy", description: "Swedish, Deep tissue, Aromatherapy", iconName: "leaf-outline" },
  { id: "s6", name: "Makeup Artistry", description: "Bridal, Evening, Editorial", iconName: "color-palette-outline" },
];

interface ServicesFormProps {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export default function ServicesForm({ selectedIds, onChange }: ServicesFormProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = AVAILABLE_SERVICES.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleService = (id: string) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((item) => item !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  const isAllSelected =
    filteredServices.length > 0 &&
    filteredServices.every((s) => selectedIds.includes(s.id));

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      // Unselect all in the filtered list
      const filteredIds = filteredServices.map((s) => s.id);
      onChange(selectedIds.filter((id) => !filteredIds.includes(id)));
    } else {
      // Select all in the filtered list
      const filteredIds = filteredServices.map((s) => s.id);
      const uniqueIds = Array.from(new Set([...selectedIds, ...filteredIds]));
      onChange(uniqueIds);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assign Services</Text>
      <Text style={styles.description}>
        Select the service categories this employee is qualified to perform. You can update these at any time in settings.
      </Text>

      <TextInput
        placeholder="Search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        leftIcon={<Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />}
      />

      <TouchableOpacity
        style={styles.selectAllRow}
        activeOpacity={0.7}
        onPress={handleToggleSelectAll}
      >
        <Text style={styles.selectAllText}>Select All</Text>
        <Checkbox checked={isAllSelected} onPress={handleToggleSelectAll} />
      </TouchableOpacity>

      <View style={styles.listContainer}>
        {filteredServices.map((item) => {
          const isSelected = selectedIds.includes(item.id);
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.serviceItem}
              activeOpacity={0.8}
              onPress={() => handleToggleService(item.id)}
            >
              <View style={styles.serviceLeft}>
                <View
                  style={[
                    styles.iconContainer,
                    isSelected ? styles.iconContainerSelected : styles.iconContainerUnselected,
                  ]}
                >
                  <Ionicons
                    name={item.iconName as any}
                    size={22}
                    color={isSelected ? "#4F46E5" : "#9CA3AF"}
                  />
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{item.name}</Text>
                  <Text style={styles.serviceDesc}>{item.description}</Text>
                </View>
              </View>
              <Checkbox
                checked={isSelected}
                onPress={() => handleToggleService(item.id)}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontFamily: "Manrope_700Bold",
    color: "#111827",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: "Manrope_400Regular",
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 20,
  },
  searchIcon: {
    marginLeft: 8,
    marginRight: 4,
  },
  selectAllRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    marginBottom: 12,
  },
  selectAllText: {
    fontSize: 14,
    fontFamily: "Manrope_600SemiBold",
    color: "#4B5563",
  },
  listContainer: {
    marginTop: 8,
  },
  serviceItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 2,
    elevation: 1,
  },
  serviceLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
  },
  iconContainerSelected: {
    backgroundColor: "#EEF2F6",
    borderColor: "#4F46E5",
  },
  iconContainerUnselected: {
    backgroundColor: "#F9FAFB",
    borderColor: "#E5E7EB",
  },
  serviceInfo: {
    marginLeft: 12,
    flex: 1,
  },
  serviceName: {
    fontSize: 15,
    fontFamily: "Manrope_700Bold",
    color: "#111827",
  },
  serviceDesc: {
    fontSize: 13,
    fontFamily: "Manrope_400Regular",
    color: "#6B7280",
    marginTop: 2,
  },
});
