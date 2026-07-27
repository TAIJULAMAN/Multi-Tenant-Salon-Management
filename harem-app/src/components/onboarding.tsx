import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Effortless Booking',
    description: 'Manage appointments and staff schedules with a seamless calendar system',
  },
  {
    id: '2',
    title: 'Smart Inventory',
    description: 'Track products in real-time and get automated low-stock alerts',
  },
  {
    id: '3',
    title: 'Integrated Payments',
    description: 'Securely accept online payments and manage automated employee payouts',
  },
  {
    id: '4',
    title: 'Insightful Analytics',
    description: 'Get detailed financial reports and growth insights to stay profitable',
  }
];

export function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const currentSlide = SLIDES[currentIndex];

  return (
    <ImageBackground 
      source={require('../../assets/onboarding/Onboarding.png')} 
      style={styles.container}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onComplete} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.slide}>
          <View style={{ flex: 1 }} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{currentSlide.title}</Text>
            <Text style={styles.description}>{currentSlide.description}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.pagination}>
            {SLIDES.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  currentIndex === index && styles.activeDot,
                ]}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 10,
    height: 50,
    zIndex: 10,
  },
  skipButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  skipText: {
    color: '#5C55FF',
    fontWeight: '600',
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 13,
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
    paddingHorizontal: 32,
  },
  textContainer: {
    alignItems: 'center',
    height: 110,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'Manrope_700Bold',
    color: '#5C55FF',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    fontFamily: 'Manrope_400Regular',
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '400',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 4,
  },
  activeDot: {
    width: 22,
    backgroundColor: '#5C55FF',
  },
  nextButton: {
    backgroundColor: '#5C55FF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Manrope_600SemiBold',
  },
});

