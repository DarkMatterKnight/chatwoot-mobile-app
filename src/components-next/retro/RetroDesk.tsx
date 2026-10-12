import React, { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Circle, Defs, Pattern, Rect, Svg } from 'react-native-svg';

import { RETRO } from '@/theme';

import { retroText } from './tokens';

type RetroDeskProps = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
  /** The small paper tag in the top corner of a dotted field ("midnight.os"). */
  tag?: string;
  /** TypeSafe's corner marks along the bottom edge. */
  marks?: boolean;
}>;

/** The night desk: a 5px dot grid on near-black. Decoration only; nothing reads it. */
export const RetroDesk = ({ children, style, tag, marks }: RetroDeskProps) => (
  <View style={[styles.desk, style]}>
    <Svg style={StyleSheet.absoluteFill} pointerEvents="none">
      <Defs>
        <Pattern id="retro-dots" width="5" height="5" patternUnits="userSpaceOnUse">
          <Circle cx="2.5" cy="2.5" r="0.8" fill={RETRO.dot} />
        </Pattern>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#retro-dots)" />
    </Svg>
    {children}
    {tag ? (
      <Text style={styles.tag} accessible={false}>
        {tag}
      </Text>
    ) : null}
    {marks ? (
      <>
        <Text style={[retroText.deskMeta, styles.mark, styles.markStart]} accessible={false}>
          ∴ ✕
        </Text>
        <Text style={[retroText.deskMeta, styles.mark, styles.markEnd]} accessible={false}>
          ✕ ∵
        </Text>
      </>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  desk: { flex: 1, backgroundColor: RETRO.night },
  tag: {
    position: 'absolute',
    top: 0,
    start: 0,
    paddingHorizontal: 6,
    backgroundColor: RETRO.deskInk,
    color: RETRO.night,
    fontFamily: 'VT323',
    fontSize: 20,
    lineHeight: 22,
  },
  mark: { position: 'absolute', bottom: 12, opacity: 0.6 },
  markStart: { start: 12 },
  markEnd: { end: 12 },
});
