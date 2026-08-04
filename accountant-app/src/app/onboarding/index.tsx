import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const ONBOARDING_DATA = [
  {
    id: "1",
    title: "Effortless Booking",
    description: "Manage appointments and staff schedules with a seamless calendar system",
    image: require("../../../assets/onboarding/1.png"),
  },
  {
    id: "2",
    title: "Smart Inventory",
    description: "Track products in real-time and get automated low-stock alerts",
    image: require("../../../assets/onboarding/2.png"),
  },
  {
    id: "3",
    title: "Integrated Payments",
    description: "Securely accept online payments and manage automated employee payouts",
    image: require("../../../assets/onboarding/3.png"),
  },
  {
    id: "4",
    title: "Insightful Analytics",
    description: "Get detailed financial reports and growth insights to stay profitable",
    image: require("../../../assets/onboarding/4.png"),
  },
  {
    id: "5",
    title: "Your Brand, Your Way",
    description: "Customize the app with your own logo and colors effortlessly",
    image: require("../../../assets/onboarding/5.png"),
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / width);
    setActiveIndex(index);
  };

  const handleNext = () => {
    if (activeIndex < ONBOARDING_DATA.length - 1) {
      const nextIndex = activeIndex + 1;
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      setActiveIndex(nextIndex);
    } else {
      handleFinish();
    }
  };

  const handleSkip = () => {
    handleFinish();
  };

  const handleFinish = () => {
    router.replace("/auth/signin" as any);
  };

  const renderItem = ({ item }: { item: typeof ONBOARDING_DATA[0] }) => {
    return (
      <View style={styles.slide}>
        {/* Rounded Image Card Container */}
        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} resizeMode="cover" />
        </View>

        {/* Content Text Container */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Background Pattern */}
      <Image
        source={require("../../../assets/onboarding/patterns.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Skip Button */}
      <TouchableOpacity
        style={[styles.skipButton, { top: Math.max(insets.top+ 16) }]}
        onPress={handleSkip}
        activeOpacity={0.7}
      >
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>

      {/* Onboarding Carousel List */}
      <FlatList
        ref={flatListRef}
        data={ONBOARDING_DATA}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        keyExtractor={(item) => item.id}
        bounces={false}
      />

      {/* Footer Area */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 24) }]}>
        {/* Pagination Dots */}
        <View style={styles.indicatorContainer}>
          {ONBOARDING_DATA.map((_, index) => {
            const isActive = index === activeIndex;
            return (
              <View
                key={index}
                style={[
                  styles.dot,
                  isActive ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            );
          })}
        </View>

        {/* Next / Get Started Button */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>
            {activeIndex === ONBOARDING_DATA.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    opacity: 0.15, // elegant background opacity for patterns.png
  },
  skipButton: {
    position: "absolute",
    right: 16,
    zIndex: 10,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  skipButtonText: {
    fontSize: 12,
    fontFamily: "System",
    fontWeight: "600",
    color: "#6B7280",
  },
  slide: {
    width: width,
    flex: 1,
    alignItems: "center",
    marginTop: 30
  },
  imageContainer: {
    width: width * 0.95,
    height: height * 0.55,
    marginTop: height * 0.08,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#635BFF",
    textAlign: "center",
    marginBottom: 12,
    fontFamily: "System",
  },
  description: {
    fontSize: 14,
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 22,
    fontFamily: "System",
  },
  footer: {
    paddingHorizontal: 24,
    alignItems: "center",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 32,
    marginBottom: 16,
  },
  dot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  activeDot: {
    width: 20,
    backgroundColor: "#635BFF",
  },
  inactiveDot: {
    width: 6,
    backgroundColor: "#E5E7EB",
  },
  primaryButton: {
    width: "100%",
    backgroundColor: "#635BFF",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#635BFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "System",
  },
});
