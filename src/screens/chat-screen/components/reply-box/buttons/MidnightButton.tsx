import React from 'react';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { Pressable, PressableProps, Text } from 'react-native';
import { useScaleAnimation } from '@/utils';
import { tailwind, useIsRetro } from '@/theme';
import i18n from '@/i18n';

type MidnightButtonProps = PressableProps & {
  isActive?: boolean;
};

/** Opens the Midnight menu: hand the conversation back to the AI agent, or take it over. */
export const MidnightButton = ({ isActive = false, ...props }: MidnightButtonProps) => {
  const { animatedStyle, handlers } = useScaleAnimation();
  const isRetro = useIsRetro();

  // Day: ink on tint, ink when open. Night: an inverted tile, paper in an ink frame when open.
  const tile = isRetro
    ? isActive
      ? 'bg-white border border-gray-950'
      : 'bg-gray-950'
    : isActive
      ? 'bg-gray-950'
      : 'bg-gray-100';
  const letter = isRetro
    ? isActive
      ? 'text-gray-950'
      : 'text-white'
    : isActive
      ? 'text-white'
      : 'text-gray-950';

  return (
    <Animated.View
      layout={LinearTransition.springify().damping(20).stiffness(180)}
      style={animatedStyle}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={i18n.t('MIDNIGHT.TITLE')}
        accessibilityState={{ expanded: isActive }}
        {...props}
        style={({ pressed }) => [tailwind.style(pressed ? 'opacity-70' : '')]}
        {...(props.disabled ? {} : handlers)}>
        <Animated.View style={tailwind.style('h-10 w-10 p-1')}>
          <Animated.View
            style={tailwind.style('flex-1 items-center justify-center rounded-[10px]', tile)}>
            <Text
              style={tailwind.style(
                letter,
                isRetro ? 'font-vt323 text-[24px] leading-[26px]' : 'font-inter-580-24 text-base',
              )}>
              M
            </Text>
          </Animated.View>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};
