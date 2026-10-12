import { StyleSheet } from 'react-native';

import { RETRO } from '@/theme';

/**
 * midnight.os type, from 4ys.org/midnight: VT323 for everything in a window's chrome, JetBrains
 * Mono for labels and strings. VT323 has a small x-height (the site sets font-size-adjust 0.5),
 * so its sizes here run about a third larger than the CSS values they come from.
 */
export const retroText = StyleSheet.create({
  bar: { fontFamily: 'VT323', fontSize: 20, lineHeight: 24, color: RETRO.body },
  line: { fontFamily: 'VT323', fontSize: 23, lineHeight: 26, color: RETRO.ink },
  small: { fontFamily: 'VT323', fontSize: 20, lineHeight: 23, color: RETRO.ink },
  meta: { fontFamily: 'JetBrainsMono-400', fontSize: 11, lineHeight: 15, color: RETRO.muted },
  label: { fontFamily: 'JetBrainsMono-700', fontSize: 11, lineHeight: 15, color: RETRO.muted },
  desk: { fontFamily: 'VT323', fontSize: 20, lineHeight: 23, color: RETRO.deskInk },
  deskMeta: {
    fontFamily: 'JetBrainsMono-400',
    fontSize: 11,
    lineHeight: 15,
    color: RETRO.deskMuted,
  },
});

/** One border width, as on the site. */
export const HAIRLINE = 1;
