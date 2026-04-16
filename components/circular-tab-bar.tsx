// provides button state and navigation
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

// useEffect to animate the buttons and useRef to check pressed state
import { useEffect, useRef } from 'react';

// Pressable to enable button customization, View to display, and StyleSheet for UI design
import { Pressable, View, StyleSheet } from 'react-native';

// useSharedValue to prevent value changes from causing rerenders
// useAnimatedStyle to convert shared values in React Native objects
// withSequence and withTiming to structure animation
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withTiming } from 'react-native-reanimated';

// provides icons, colour palette, and theme
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colours } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

// lookup table to map icons to respective buttons
const ICONS = {
  index: 'house.fill',
  map: 'paperplane.fill',
  search: 'paperplane.fill',
  cart: 'paperplane.fill',
  profile: 'paperplane.fill',
} as const;

// partially transparent circles to emulate max glow
const FULL_GLOWS = [
  { size: 64, opacity: 0.60 },
  { size: 66, opacity: 0.40 },
  { size: 68, opacity: 0.30 },
  { size: 70, opacity: 0.25 },
  { size: 72, opacity: 0.20 },
  { size: 74, opacity: 0.15 },
  { size: 76, opacity: 0.10 },
  { size: 78, opacity: 0.05 },
];

// partially transparent circles to emulate small glow
const SMALL_GLOWS = [
  { size: 66, opacity: 0.20 },
  { size: 68, opacity: 0.15 },
  { size: 70, opacity: 0.10 },
  { size: 72, opacity: 0.05 },
  { size: 74, opacity: 0.03 },
];

// base button type
type TabButtonProps = {
  route: { key: string; name: string };
  isActive: boolean;
  onPress: () => void;
  colours: typeof Colours['light'];
};


function TabButton({ route, isActive, onPress, colours }: TabButtonProps) {
  // flag to save pressed state to know when to switch
  const didNavigate = useRef(false);

  // sizes for button and glow levels
  const scale = useSharedValue(isActive ? 1.1 : 1);
  const glowOpacity = useSharedValue(isActive ? 1 : 0);
  const smallGlowOpacity = useSharedValue(0);

  // triggers animation based on isActive state
  useEffect(() => {
    if (isActive) {
      scale.value = withTiming(1.1, { duration: 50 });
      smallGlowOpacity.value = withTiming(0, { duration: 50 });
      glowOpacity.value = withTiming(1, { duration: 50 });
    } else {
      scale.value = withTiming(1, { duration: 50 });
      glowOpacity.value = withTiming(0, { duration: 50 });
      smallGlowOpacity.value = withTiming(0, { duration: 50 });
    }
  }, [isActive]);

  // convert shared values to animated style objects
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));
  const smallGlowStyle = useAnimatedStyle(() => ({
    opacity: smallGlowOpacity.value,
  }));

  // function to overgrow the button when pressed
  function overgrowButton() {
    // adjust size
    scale.value = withSequence(
      withTiming(1.15, { duration: 100 }),
      withTiming(1.1, { duration: 100 }),
    );
    // add small glow if not currently selected
    if (!isActive) {
      smallGlowOpacity.value = withTiming(1, { duration: 100 });
    }
  }

  // fucntion to handle end of press
  function fingerLift() {
    // always clear small glow on finger lift
    smallGlowOpacity.value = withTiming(0, { duration: 150 });
    // if navigation occured, bail — useEffect handles scale and full glow
    if (didNavigate.current) {
      didNavigate.current = false;
      return;
    }
    scale.value = withTiming(isActive ? 1.1 : 1, { duration: 150 });
  }

  // read icon map
  const iconName = ICONS[route.name as keyof typeof ICONS];

  // return the button object
  return (
    <Pressable
      onPress={() => { didNavigate.current = true; onPress(); }}
      onPressIn={overgrowButton}
      onPressOut={fingerLift}
      style={styles.pressable}
    >
      <Animated.View style={[StyleSheet.absoluteFill, styles.glowWrap, smallGlowStyle]}>
        {SMALL_GLOWS.map(({ size, opacity }) => (
          <View
            key={size}
            style={{ position: 'absolute', width: size, height: size, borderRadius: size / 2, opacity, backgroundColor: colours.tint }}
          />
        ))}
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFill, styles.glowWrap, glowStyle]}>
        {FULL_GLOWS.map(({ size, opacity }) => (
          <View
            key={size}
            style={{ position: 'absolute', width: size, height: size, borderRadius: size / 2, opacity, backgroundColor: colours.tint }}
          />
        ))}
      </Animated.View>
      <Animated.View style={[styles.button, { backgroundColor: colours.toolbar }, animatedStyle]}>
        <IconSymbol
          size={24}
          name={iconName}
          color={isActive ? colours.tabIconSelected : colours.tabIconDefault}
        />
      </Animated.View>
    </Pressable>
  );
}


export function CircularTabBar({ state, navigation }: BottomTabBarProps) {
  // determine theme and colour palette
  const colorScheme = useColorScheme() ?? 'light';
  const colours = Colours[colorScheme];

  // return the tab bar object
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => (
        <TabButton
          key={route.key}
          route={route}
          isActive={state.index === index}
          onPress={() => navigation.navigate(route.name)}
          colours={colours}
        />
      ))}
    </View>
  );
}

// UI structure
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 36,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
