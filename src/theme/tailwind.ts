import { create } from 'twrnc';
import type { ClassInput, Style } from 'twrnc';

import { dayConfig, nightConfig } from './tailwind.config';

export type ThemeMode = 'day' | 'night';

const instances = {
  day: create(dayConfig),
  night: create(nightConfig),
};

let activeMode: ThemeMode = 'day';

// Night windows have square corners, arbitrary radii (rounded-[26px]) included.
const RADIUS_KEYS = [
  'borderRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderTopStartRadius',
  'borderTopEndRadius',
  'borderBottomStartRadius',
  'borderBottomEndRadius',
];
const squared = new WeakMap<Style, Style>();

const squareCorners = (style: Style): Style => {
  if (!RADIUS_KEYS.some(key => key in style)) return style;
  let square = squared.get(style);
  if (!square) {
    square = { ...style };
    RADIUS_KEYS.forEach(key => delete square![key]);
    squared.set(style, square);
  }
  return square;
};

/**
 * Called by ThemeProvider before the app renders. Every `tailwind.style` and `tailwind.color`
 * call resolves against the active mode's palette, so the call sites never change.
 */
export const setThemeMode = (mode: ThemeMode) => {
  activeMode = mode;
};

export const getThemeMode = () => activeMode;

export const tailwind = {
  style: (...inputs: ClassInput[]): Style => {
    const style = instances[activeMode].style(...inputs);
    return activeMode === 'night' ? squareCorners(style) : style;
  },
  color: (color: string) => instances[activeMode].color(color),
};

/**
 * Classes that apply by night only, for adding Night's touches to an existing style without
 * touching Day's: `tailwind.style('rounded-2xl bg-gray-100', whenNight('border border-gray-950'))`.
 */
export const whenNight = (classes: string) => (activeMode === 'night' ? classes : '');
