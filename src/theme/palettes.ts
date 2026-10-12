/**
 * Day and Night repaint the scales the app is built from (white, black, gray, slate, blue and
 * the alpha scales), so every existing class picks up the mode without being touched.
 *
 * Day is the 4Ys site: ink on paper, no accent colour. Blue, Chatwoot's accent, becomes ink.
 * Night is midnight.os: lit windows (paper bodies, ink text, 1-bit greys) standing on a night
 * desk. The desk itself is not a scale: it is drawn only by the retro chrome (see RETRO).
 * Every other hue (ruby, green, amber...) is left alone: it means error, success or a note.
 */

const alphas = (rgb: string) => ({
  A1: `rgba(${rgb}, 0.012)`,
  A2: `rgba(${rgb}, 0.024)`,
  A3: `rgba(${rgb}, 0.055)`,
  A4: `rgba(${rgb}, 0.078)`,
  A5: `rgba(${rgb}, 0.106)`,
  A6: `rgba(${rgb}, 0.133)`,
  A7: `rgba(${rgb}, 0.169)`,
  A8: `rgba(${rgb}, 0.267)`,
  A9: `rgba(${rgb}, 0.447)`,
  A10: `rgba(${rgb}, 0.498)`,
  A11: `rgba(${rgb}, 0.608)`,
  A12: `rgba(${rgb}, 0.875)`,
});

const dayGray = {
  50: '#F3F1EA',
  100: '#EFEDE6', // tint
  200: '#E5E3DC', // edge
  300: '#D6D3CA', // rule
  400: '#C9C6BC',
  500: '#B5B2A8',
  600: '#9A978E',
  700: '#76746E',
  800: '#666666', // ink-muted
  900: '#454440',
  950: '#111111', // ink
};

export const dayColors = {
  white: '#F8F7F2', // paper
  black: '#111111',
  gray: dayGray,
  slate: dayGray,
  blue: {
    50: '#F3F1EA',
    100: '#EFEDE6',
    200: '#E5E3DC',
    300: '#D6D3CA',
    400: '#B5B2A8',
    500: '#8C8A84',
    600: '#5E5D59',
    700: '#2E2D2A', // ink-mark
    800: '#111111',
    900: '#111111',
    950: '#0B0B0A',
  },
  blackA: alphas('17, 17, 17'),
  whiteA: { ...alphas('248, 247, 242'), A1: 'rgba(248, 247, 242, 0)' },
};

const nightGray = {
  50: '#F1EFE9',
  100: '#EBE8E0', // window frame
  200: '#DEDBD2',
  300: '#B8B8B8', // edge
  400: '#A3A3A3',
  500: '#999999', // rule
  600: '#7A7A7A',
  700: '#5C5C5C',
  800: '#525252', // muted ink
  900: '#383838',
  950: '#121212', // window ink
};

export const nightColors = {
  white: '#F8F7F2', // window body
  black: '#121212',
  gray: nightGray,
  slate: nightGray,
  blue: {
    50: '#F1EFE9',
    100: '#EBE8E0',
    200: '#DEDBD2',
    300: '#B8B8B8',
    400: '#999999',
    500: '#7A7A7A',
    600: '#525252',
    700: '#2B2B2B',
    800: '#121212',
    900: '#121212',
    950: '#0B0B0B',
  },
  blackA: alphas('18, 18, 18'),
  whiteA: { ...alphas('248, 247, 242'), A1: 'rgba(248, 247, 242, 0)' },
};

/** The night desk and the window chrome, from 4ys.org/midnight. */
export const RETRO = {
  night: '#0B0C0F',
  field: '#0D0E12',
  deskInk: '#F5F4EF',
  deskMuted: '#B6B2AA',
  deskRule: '#464852',
  dot: 'rgba(248, 247, 242, 0.17)',
  frame: '#EBE8E0',
  body: '#F8F7F2',
  ink: '#121212',
  muted: '#525252',
} as const;
