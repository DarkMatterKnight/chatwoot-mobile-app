import React, { useEffect, useState } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Defs, Pattern, Rect, Svg } from 'react-native-svg';

import { RETRO } from '@/theme';

import { HAIRLINE } from './tokens';

/** The terminal caret after a line. It blinks; under reduced motion it stays lit. */
export const RetroCaret = ({ style }: { style?: StyleProp<TextStyle> }) => {
  const reduceMotion = useReducedMotion();
  const [lit, setLit] = useState(true);
  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => setLit(value => !value), 530);
    return () => clearInterval(timer);
  }, [reduceMotion]);
  // Colour, not opacity, so it also blinks when nested in a line of text.
  return <Text style={[style, lit ? null : styles.unlit]}>{'▌'}</Text>;
};

/** A turning bar for loading, in the terminal face: | / - \ */
export const RetroSpinner = ({ style }: { style?: StyleProp<TextStyle> }) => {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setFrame(value => (value + 1) % 4), 120);
    return () => clearInterval(timer);
  }, []);
  return (
    <Text accessibilityRole="progressbar" style={[styles.spinner, style]}>
      {'|/-\\'[frame]}
    </Text>
  );
};

const Stripes = () => (
  <Svg width="100%" height="100%">
    <Defs>
      <Pattern id="retro-stripes" width="8" height="10" patternUnits="userSpaceOnUse">
        <Rect width="6" height="10" fill={RETRO.ink} />
      </Pattern>
    </Defs>
    <Rect width="100%" height="100%" fill="url(#retro-stripes)" />
  </Svg>
);

/**
 * A striped meter in a frame. With `progress` it shows that much; without it, it boots: the
 * stripes run across in steps, as midnight.os does while starting. Still under reduced motion.
 */
export const RetroMeter = ({
  progress,
  style,
}: {
  progress?: number;
  style?: StyleProp<ViewStyle>;
}) => {
  const reduceMotion = useReducedMotion();
  const fill = useSharedValue(progress ?? 0);

  useEffect(() => {
    if (progress !== undefined) {
      fill.value = progress;
    } else if (reduceMotion) {
      fill.value = 1;
    } else {
      fill.value = 0;
      fill.value = withRepeat(withTiming(1, { duration: 1600, easing: Easing.steps(12) }), -1);
    }
  }, [progress, reduceMotion, fill]);

  const fillStyle = useAnimatedStyle(() => ({ width: `${Math.round(fill.value * 100)}%` }));

  return (
    <View style={[styles.meter, style]}>
      <Animated.View style={[styles.fill, fillStyle]}>
        <Stripes />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  unlit: { color: 'transparent' },
  spinner: { fontFamily: 'VT323', fontSize: 23, lineHeight: 26, color: RETRO.ink },
  meter: { height: 14, padding: 1, borderWidth: HAIRLINE, borderColor: RETRO.ink },
  fill: { height: '100%', overflow: 'hidden' },
});
