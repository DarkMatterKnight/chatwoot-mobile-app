import { StyleSheet } from 'react-native';

import { RETRO, tailwind, useIsRetro } from '@/theme';

/**
 * The frame a bottom sheet is drawn in. Day keeps the rounded sheet; Night makes it a window:
 * square, a 1px ink edge, and the drag handle drawn as an ink title bar with two paper rules.
 */
export const useSheetChrome = () => {
  const isRetro = useIsRetro();
  if (isRetro) return retroSheet;
  return {
    handleIndicatorStyle: tailwind.style('overflow-hidden bg-blackA-A6 w-8 h-1 rounded-[11px]'),
    handleStyle: tailwind.style('p-0 h-4 pt-[5px]'),
    style: tailwind.style('rounded-[26px] overflow-hidden'),
  };
};

const retroSheet = StyleSheet.create({
  handleIndicatorStyle: {
    width: 44,
    height: 5,
    borderRadius: 0,
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: RETRO.body,
  },
  handleStyle: {
    height: 16,
    paddingVertical: 0,
    justifyContent: 'center',
    backgroundColor: RETRO.ink,
  },
  style: { borderWidth: 1, borderColor: RETRO.ink, overflow: 'hidden' },
  backgroundStyle: { borderRadius: 0, backgroundColor: RETRO.body },
});
