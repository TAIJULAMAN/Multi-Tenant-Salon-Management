import React from "react";
import { BottomSheet as ExpoBottomSheet, BottomSheetView } from "@expo/ui/community/bottom-sheet";
import { StyleSheet, Text, View } from "react-native";

interface CustomBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function CustomBottomSheet({
  visible,
  onClose,
  title,
  children,
}: CustomBottomSheetProps) {
  return (
    <ExpoBottomSheet
      index={visible ? 0 : -1}
      onClose={onClose}
      enablePanDownToClose
      enableDynamicSizing
      backgroundStyle={styles.sheetBackground}
    >
      <BottomSheetView style={styles.sheetContainer}>
        {title && <Text style={styles.sheetTitle}>{title}</Text>}
        {children}
      </BottomSheetView>
    </ExpoBottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: "#FFFFFF",
  },
  sheetContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
  },
  sheetTitle: {
    fontFamily: "System",
    fontWeight: "700",
    fontSize: 15,
    color: "#111827",
    marginBottom: 16,
  },
});
