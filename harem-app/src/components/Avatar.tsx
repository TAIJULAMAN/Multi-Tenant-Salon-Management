import React from "react";
import { View, Text, StyleSheet, Image, ViewStyle } from "react-native";

interface AvatarProps {
  name: string;
  uri?: string;
  size?: number;
  style?: ViewStyle;
}

export default function Avatar({ name, uri, size = 40, style }: AvatarProps) {
  // Generate initials
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "??";

  // Pick a nice gradient/background color based on name hash
  const getBackgroundColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colors = [
      "#FFB23F", // Golden Yellow/Orange (matches mockup avatar style)
      "#5C55FF", // Brand Violet
      "#00D2C4", // Teal
      "#FF5C93", // Pink/Red
      "#8B5CF6", // Purple
      "#4ECDC4", // Green/Teal
    ];
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  const backgroundColor = getBackgroundColor(name || "");

  return (
    <View
      style={[
        styles.container,
        { width: size, height: size, borderRadius: size / 2 },
        !uri && { backgroundColor },
        style,
      ]}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
        />
      ) : (
        <Text style={[styles.text, { fontSize: size * 0.4, lineHeight: size }]}>
          {initials}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    resizeMode: "cover",
  },
  text: {
    fontFamily: "Manrope_700Bold",
    color: "#FFFFFF",
    textAlign: "center",
    includeFontPadding: false,
    textAlignVertical: "center",
  },
});
