import React, { PropsWithChildren, ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { RETRO } from '@/theme';

import { RetroGrip } from './RetroGrip';
import { HAIRLINE, retroText } from './tokens';

type RetroWindowProps = PropsWithChildren<{
  title: ReactNode;
  /** Status bar text along the bottom, with a resize grip. Restates what the window shows. */
  status?: ReactNode;
  /** Title bar slots, e.g. a back box on the left and actions on the right. */
  left?: ReactNode;
  right?: ReactNode;
  /** Body with no padding, for lists and pictures that run to the frame. */
  flush?: boolean;
  /** Stretch to fill the space it is given (a screen's main window). */
  fill?: boolean;
  style?: StyleProp<ViewStyle>;
  bodyStyle?: StyleProp<ViewStyle>;
}>;

/**
 * A lit window, after midnight.os: an ink title bar in the terminal face, then a body framed
 * twice (the outer edge and a line three pixels in), and an optional status bar.
 */
export const RetroWindow = ({
  title,
  status,
  left,
  right,
  flush,
  fill,
  style,
  bodyStyle,
  children,
}: RetroWindowProps) => (
  <View style={[styles.window, fill && styles.fill, style]}>
    <View style={styles.bar}>
      {left}
      {typeof title === 'string' ? (
        <Text numberOfLines={1} style={[retroText.bar, styles.title]} accessibilityRole="header">
          {title}
        </Text>
      ) : (
        <View style={styles.title}>{title}</View>
      )}
      {right}
    </View>
    <View
      style={[
        styles.body,
        flush ? null : styles.padded,
        status ? styles.joined : null,
        fill && styles.fill,
        bodyStyle,
      ]}>
      {children}
    </View>
    {status ? (
      <View style={styles.status} accessibilityElementsHidden importantForAccessibility="no">
        <Text numberOfLines={1} style={[retroText.small, styles.statusText]}>
          {status}
        </Text>
        <RetroGrip />
      </View>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  window: {
    backgroundColor: RETRO.frame,
    borderWidth: HAIRLINE,
    borderColor: RETRO.ink,
  },
  fill: { flex: 1 },
  bar: {
    minHeight: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 6,
    backgroundColor: RETRO.ink,
  },
  title: { flex: 1 },
  body: {
    margin: 3,
    borderWidth: HAIRLINE,
    borderColor: RETRO.ink,
    backgroundColor: RETRO.body,
    overflow: 'hidden',
  },
  padded: { paddingTop: 10, paddingHorizontal: 12, paddingBottom: 12 },
  joined: { marginBottom: 0 },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    minHeight: 24,
    marginHorizontal: 3,
    marginBottom: 3,
    paddingStart: 8,
    paddingEnd: 2,
    borderWidth: HAIRLINE,
    borderTopWidth: 0,
    borderColor: RETRO.ink,
  },
  statusText: { flexShrink: 1 },
});
