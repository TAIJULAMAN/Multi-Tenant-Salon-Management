import React from "react";
import { BottomSheet as ExpoBottomSheet, BottomSheetView } from "@expo/ui/community/bottom-sheet";
import { StyleSheet, Text, View } from "react-native";

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function BottomSheetWrapper({ visible, onClose, title, children }: BottomSheetProps) {
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
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 20,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D1D5DB",
    marginBottom: 16,
  },
  sheetTitle: {
    fontFamily: "Manrope_700Bold",
    fontSize: 13,
    color: "#111827",
    marginBottom: 14,
  },
});
