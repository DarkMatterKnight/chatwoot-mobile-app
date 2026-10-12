/* eslint-disable @typescript-eslint/no-require-imports */
import { dayColors, nightColors } from './palettes';

const defaultTheme = require('tailwindcss/defaultTheme');

// Light theme colors
const radixUILightColors = require('./colors/light');
// Dark theme colors
const radixUIDarkColors = require('./colors/dark');

// Black with alpha variations
const blackA = require('./colors/blackA');
// White with alpha variations
const whiteA = require('./colors/whiteA');

const chatwootAppColors = {
  ...blackA,
  ...whiteA,
  ...radixUILightColors,
  ...radixUIDarkColors,
};

// Shared by both modes so the retro chrome can name its faces in either.
const sharedFontFamily = {
  vt323: ['VT323'],
  'tight-400': ['InterTight-400'],
  'tight-500': ['InterTight-500'],
  'tight-700': ['InterTight-700'],
  'jbmono-400': ['JetBrainsMono-400'],
  'jbmono-700': ['JetBrainsMono-700'],
};

const createConfig = (colors: Record<string, unknown>, fontFamily: Record<string, string[]>) => ({
  theme: {
    ...defaultTheme,
    extend: {
      colors: { ...chatwootAppColors, ...colors },
      fontSize: {
        xs: '12px',
        cxs: '13px',
        md: '15px',
      },
      fontFamily: { ...fontFamily, ...sharedFontFamily },
    },
  },
  plugins: [],
});

// We are using individual static Inter font files (e.g., Inter-400-20.ttf) to load different font weights and styles
// Please refer to the following links for more information:
// https://medium.com/timeless/adding-custom-variable-fonts-in-react-native-47e0d062bcfc
// https://medium.com/timeless/adding-custom-variable-fonts-in-react-native-part-ii-d11a979a38f3
// - Normal/Regular: "inter-normal-20" (400)
// - Slightly heavier than Regular: "inter-420-20" (400)
// - Medium: "inter-medium-24" (500)
// - Between Medium and Semi-bold: "inter-580-24" (600)
// - Semi-bold: "inter-semibold-24" (600)
// -  Last numbers (20, 24 etc) are optical sizes.
export const dayConfig = createConfig(dayColors, {
  'inter-normal-20': ['Inter-400-20'],
  'inter-420-20': ['Inter-420-20'],
  'inter-medium-24': ['Inter-500-24'],
  'inter-580-24': ['Inter-580-24'],
  'inter-semibold-20': ['Inter-600-20'],
});

// Night reads in Inter Tight, midnight's grotesk, at 400/500/700 only.
export const nightConfig = createConfig(nightColors, {
  'inter-normal-20': ['InterTight-400'],
  'inter-420-20': ['InterTight-400'],
  'inter-medium-24': ['InterTight-500'],
  'inter-580-24': ['InterTight-700'],
  'inter-semibold-20': ['InterTight-700'],
});
