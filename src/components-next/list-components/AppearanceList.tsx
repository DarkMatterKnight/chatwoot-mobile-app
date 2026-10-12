import React from 'react';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';

import { TickIcon } from '@/svg-icons';
import { tailwind } from '@/theme';
import { useHaptic } from '@/utils';
import { Icon } from '@/components-next/common';
import i18n from '@/i18n';
import { Theme } from '@/types/common/Theme';

const appearances: Theme[] = ['system', 'light', 'dark'];

export const appearanceLabel = (theme: Theme) =>
  i18n.t(`SETTINGS.APPEARANCE_${theme.toUpperCase()}`);

export const AppearanceList = ({
  currentTheme,
  onChangeTheme,
}: {
  currentTheme: Theme;
  onChangeTheme: (theme: Theme) => void;
}) => {
  const hapticSelection = useHaptic();

  return (
    <Animated.View style={tailwind.style('pt-1 pb-4 pl-2')}>
      {appearances.map((theme, index) => (
        <Pressable
          key={theme}
          onPress={() => {
            hapticSelection?.();
            onChangeTheme(theme);
          }}>
          <Animated.View
            style={tailwind.style(
              'flex-1 ml-3 flex-row justify-between py-[11px] pr-3',
              index < appearances.length - 1 && 'border-b-[1px] border-blackA-A3',
            )}>
            <Animated.Text
              style={tailwind.style(
                'text-base text-gray-950 font-inter-420-20 leading-[21px] tracking-[0.16px]',
              )}>
              {appearanceLabel(theme)}
            </Animated.Text>
            {currentTheme === theme && <Icon icon={<TickIcon />} size={20} />}
          </Animated.View>
        </Pressable>
      ))}
    </Animated.View>
  );
};
