import { createContext, useContext } from 'react';

import type { ThemeMode } from './tailwind';

export const ThemeModeContext = createContext<ThemeMode>('day');

export const useThemeMode = () => useContext(ThemeModeContext);

/** Night is the only mode with the retro desktop: windows, title bars and the terminal face. */
export const useIsRetro = () => useThemeMode() === 'night';
