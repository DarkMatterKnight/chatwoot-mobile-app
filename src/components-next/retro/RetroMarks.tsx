import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

import { RETRO } from '@/theme';

import { HAIRLINE } from './tokens';

type TextChildren = PropsWithChildren<{ style?: StyleProp<TextStyle> }>;

/** An inverted label inside a window: paper on ink. */
export const RetroLabel = ({ children, style }: TextChildren) => (
  <Text numberOfLines={1} style={[styles.label, style]}>
    {children}
  </Text>
);

/** A "+ chip": ink at a tenth, the terminal face, a plus in front. */
export const RetroChip = ({ children, style }: TextChildren) => (
  <Text numberOfLines={1} style={[styles.chip, style]}>
    + {children}
  </Text>
);

/** A 9px square: filled when on (unread, online), an outline when off. */
export const RetroDot = ({
  on,
  color = RETRO.ink,
  style,
}: {
  on?: boolean;
  color?: string;
  style?: StyleProp<ViewStyle>;
}) => (
  <View style={[styles.dot, { borderColor: color }, on && { backgroundColor: color }, style]} />
);

const styles = StyleSheet.create({
  label: {
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
    backgroundColor: RETRO.ink,
    color: RETRO.body,
    fontFamily: 'VT323',
    fontSize: 19,
    lineHeight: 21,
  },
  chip: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    backgroundColor: 'rgba(18, 18, 18, 0.1)',
    color: RETRO.ink,
    fontFamily: 'VT323',
    fontSize: 19,
    lineHeight: 22,
  },
  dot: { width: 9, height: 9, borderWidth: HAIRLINE },
});
