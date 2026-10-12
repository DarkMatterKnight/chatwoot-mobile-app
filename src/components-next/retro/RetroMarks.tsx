import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';

import { RETRO } from '@/theme';

type TextChildren = PropsWithChildren<{ style?: StyleProp<TextStyle> }>;

/** An inverted label inside a window: paper on ink. */
export const RetroLabel = ({ children, style }: TextChildren) => (
  <Text numberOfLines={1} style={[styles.label, style]}>
    {children}
  </Text>
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
});
