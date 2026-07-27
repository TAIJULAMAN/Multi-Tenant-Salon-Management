import { Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming, withDelay, runOnJS } from 'react-native-reanimated';

const DURATION = 800;
const HOLD_DURATION = 1000;
const PROGRESS_DURATION = 1500;

export function AnimatedSplashOverlay() {
  const [visible, setVisible] = useState(true);

  const logoTranslateX = useSharedValue(0);
  const logoScale = useSharedValue(1);
  const textOpacity = useSharedValue(1);

  const progressOpacity = useSharedValue(0);
  const progressWidth = useSharedValue(0);

  const screenOpacity = useSharedValue(1);

  useEffect(() => {
    SplashScreen.hideAsync().then(() => {
      // 1. Move logo left and scale down, fade text
      logoTranslateX.value = withDelay(HOLD_DURATION, withTiming(-100, { duration: DURATION, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }));
      logoScale.value = withDelay(HOLD_DURATION, withTiming(0.3, { duration: DURATION, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }));
      textOpacity.value = withDelay(HOLD_DURATION, withTiming(0, { duration: DURATION, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }));

      // 2. Fade in progress bar
      progressOpacity.value = withDelay(HOLD_DURATION + DURATION / 2, withTiming(1, { duration: DURATION / 2 }));

      // 3. Fill progress bar
      progressWidth.value = withDelay(HOLD_DURATION + DURATION, withTiming(100, { duration: PROGRESS_DURATION, easing: Easing.inOut(Easing.ease) }));

      // 4. Fade out screen and hide
      screenOpacity.value = withDelay(HOLD_DURATION + DURATION + PROGRESS_DURATION + 300, withTiming(0, { duration: DURATION }, (finished) => {
        if (finished) {
          runOnJS(setVisible)(false);
        }
      }));
    });
  }, []);


  const logoStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: logoTranslateX.value },
        { scale: logoScale.value }
      ]
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
      transform: [
        { translateY: 20 }
      ]
    };
  });

  const progressContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: progressOpacity.value,
      transform: [
        { translateX: 40 }
      ]
    };
  });

  const progressFillStyle = useAnimatedStyle(() => {
    return {
      width: `${progressWidth.value}%`
    };
  });

  const progressDotStyle = useAnimatedStyle(() => {
    return {
      left: `${progressWidth.value}%`
    };
  });

  const screenStyle = useAnimatedStyle(() => {
    return {
      opacity: screenOpacity.value,
    };
  });

  if (!visible) return null;

  return (
    <Animated.View style={[styles.splashOverlay, screenStyle]}>
      <Animated.View style={[styles.logoContainer, logoStyle]}>
        <Image source={require('../../assets/logo/logo3.svg')} style={{ width: 140, height: 140 }} resizeMode="contain" />
        <Animated.View style={textStyle}>
          <Text style={styles.logoText}>Your logo</Text>
        </Animated.View>
      </Animated.View>

      <Animated.View style={[styles.progressContainerWrapper, progressContainerStyle]}>
        <View style={styles.progressBarBackground}>
          <Animated.View style={[styles.progressBarFill, progressFillStyle]} />
          <Animated.View style={[styles.progressDot, progressDotStyle]} />
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  splashOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#5C55FF',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  logoText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '500',
  },
  progressContainerWrapper: {
    position: 'absolute',
    width: 150,
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 2,
    position: 'absolute',
    left: 0,
  },
  progressDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00F0FF',
    position: 'absolute',
    transform: [{ translateX: -3 }],
  }
});
