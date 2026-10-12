import React, { PropsWithChildren } from 'react';
import { Platform, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import { RetroWindow } from '@/components-next/retro';
import { tailwind, useIsRetro } from '@/theme';

/**
 * The card a settings or attribute list sits in. Day: a titled rounded card. Night: a small
 * window, the section title in its title bar.
 */
export const ListCard = ({
  sectionTitle,
  nightTitle,
  children,
}: PropsWithChildren<{
  sectionTitle?: string;
  /** A title for Night's title bar where Day shows none. */
  nightTitle?: string;
}>) => {
  const isRetro = useIsRetro();

  if (isRetro) {
    return (
      <RetroWindow flush title={nightTitle ?? sectionTitle ?? ''} style={tailwind.style('mx-3')}>
        {children}
      </RetroWindow>
    );
  }

  return (
    <Animated.View>
      {sectionTitle ? (
        <Animated.View style={tailwind.style('pl-4 pb-3')}>
          <Animated.Text
            style={tailwind.style(
              'text-sm font-inter-medium-24 leading-[16px] tracking-[0.32px] text-gray-700',
            )}>
            {sectionTitle}
          </Animated.Text>
        </Animated.View>
      ) : null}
      <Animated.View style={[tailwind.style('rounded-[13px] mx-4 bg-white'), styles.listShadow]}>
        {children}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  listShadow:
    Platform.select({
      ios: {
        shadowColor: '#00000040',
        shadowOffset: { width: 0, height: 0.15 },
        shadowRadius: 2,
        shadowOpacity: 0.35,
        elevation: 2,
      },
      android: {
        elevation: 4,
        backgroundColor: 'white',
      },
    }) || {}, // Add fallback empty object
});
