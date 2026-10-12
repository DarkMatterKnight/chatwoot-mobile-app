import React from 'react';
import { Pressable, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { tailwind, whenNight } from '@/theme';
import { useScaleAnimation, useHaptic } from '@/utils';

type MidnightMenuItemProps = {
  label: string;
  hint: string;
  /** The conversation is already in this state. */
  selected: boolean;
  onPress: () => void;
};

export const MidnightMenuItem = ({ label, hint, selected, onPress }: MidnightMenuItemProps) => {
  const { animatedStyle, handlers } = useScaleAnimation();
  const hapticSelection = useHaptic();

  const handlePress = () => {
    hapticSelection?.();
    onPress();
  };

  return (
    <Animated.View style={[tailwind.style('mb-3'), animatedStyle]}>
      <Pressable
        onPress={handlePress}
        accessibilityRole="button"
        accessibilityState={{ selected }}
        {...handlers}>
        <Animated.View style={tailwind.style('flex-row items-center justify-start gap-3')}>
          <Animated.View
            style={tailwind.style(
              'h-4 w-4 rounded-full border border-gray-950',
              selected ? 'bg-gray-950' : '',
            )}
          />
          <Animated.View style={tailwind.style('flex-1')}>
            <Text
              style={tailwind.style(
                'text-base font-inter-medium-24 leading-[20px] tracking-[0.24px] text-gray-950',
                whenNight('font-vt323 text-[22px] leading-[24px] tracking-normal'),
              )}>
              {label}
            </Text>
            <Text
              style={tailwind.style(
                'text-sm font-inter-normal-20 leading-[18px] tracking-[0.24px] text-gray-800',
              )}>
              {hint}
            </Text>
          </Animated.View>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};
