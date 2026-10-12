import Snackbar from 'react-native-snackbar';
import { RETRO, getThemeMode } from '@/theme';

interface ToastParams {
  message: string;
}

export const showToast = ({ message }: ToastParams): void => {
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_SHORT,
    ...(getThemeMode() === 'night'
      ? { backgroundColor: RETRO.body, textColor: RETRO.ink }
      : { backgroundColor: '#111111', textColor: '#F8F7F2' }),
  });
};
