import React, { PropsWithChildren, ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { RETRO } from '@/theme';

import { HAIRLINE, retroText } from './tokens';

type RetroFieldProps = PropsWithChildren<{
  label?: string;
  error?: string;
  /** Show the terminal prompt in front of the input. */
  prompt?: boolean;
  right?: ReactNode;
  style?: StyleProp<ViewStyle>;
}>;

/** A square input frame with a terminal prompt. The TextInput itself is the child. */
export const RetroField = ({
  label,
  error,
  prompt = true,
  right,
  style,
  children,
}: RetroFieldProps) => (
  <View style={[styles.wrap, style]}>
    {label ? <Text style={retroText.small}>{label}</Text> : null}
    <View style={[styles.frame, error ? styles.frameError : null]}>
      {prompt ? <Text style={[retroText.line, styles.prompt]}>&gt;</Text> : null}
      <View style={styles.input}>{children}</View>
      {right}
    </View>
    {error ? <Text style={[retroText.small, styles.error]}>✕ {error}</Text> : null}
  </View>
);

/** Text style for a TextInput inside a RetroField. */
export const retroInputStyle = {
  flex: 1,
  minHeight: 42,
  paddingVertical: 8,
  color: RETRO.ink,
  fontFamily: 'InterTight-400',
  fontSize: 16,
} as const;

const styles = StyleSheet.create({
  wrap: { gap: 6 },
  frame: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 10,
    borderWidth: HAIRLINE,
    borderColor: RETRO.ink,
    backgroundColor: RETRO.body,
  },
  frameError: { borderColor: '#B42B2B', borderStyle: 'dashed' },
  prompt: { color: RETRO.muted },
  input: { flex: 1 },
  error: { color: '#B42B2B' },
});
