import React, { PropsWithChildren, useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import * as SystemUI from 'expo-system-ui';

import { useAppSelector } from '@/hooks';
import { selectTheme } from '@/store/settings/settingsSelectors';

import { ThemeModeContext } from './mode';
import { RETRO, dayColors } from './palettes';
import { setThemeMode, ThemeMode } from './tailwind';

const BACKGROUND: Record<ThemeMode, string> = { day: dayColors.white, night: RETRO.night };

/**
 * Picks Day or Night from the Appearance setting (or the system), points `tailwind` at that
 * palette before anything renders, and remounts the app when it changes so every memoised
 * style is drawn again.
 */
export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const theme = useAppSelector(selectTheme) ?? 'system';
  const systemScheme = useColorScheme();
  const mode: ThemeMode =
    theme === 'dark' || (theme === 'system' && systemScheme === 'dark') ? 'night' : 'day';

  setThemeMode(mode);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(BACKGROUND[mode]);
  }, [mode]);

  return (
    <ThemeModeContext.Provider value={mode}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={mode === 'night' ? 'light-content' : 'dark-content'}
      />
      <React.Fragment key={mode}>{children}</React.Fragment>
    </ThemeModeContext.Provider>
  );
};
