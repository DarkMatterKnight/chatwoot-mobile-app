import React from 'react';
import { Pressable, PressableProps, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';

import { RETRO } from '@/theme';
import { useHaptic } from '@/utils';

import { HAIRLINE, retroText } from './tokens';

// Colour is kept for what must mean something: this one deletes or signs out.
const DESTRUCTIVE = '#B42B2B';

type RetroButtonProps = Omit<PressableProps, 'style'> & {
  text: string;
  /** Ink fill (primary) or a paper box with an ink frame (secondary). */
  variant?: 'primary' | 'secondary';
  isDestructive?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** A square window button. It presses in: ink turns to paper, as on an early desktop. */
export const RetroButton = ({
  text,
  variant = 'primary',
  isDestructive,
  disabled,
  style,
  onPress,
  ...props
}: RetroButtonProps) => {
  const hapticSelection = useHaptic();
  const inverted = variant === 'primary';
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={event => {
        hapticSelection?.();
        onPress?.(event);
      }}
      style={({ pressed }) => [
        styles.button,
        (inverted ? !pressed : pressed) && styles.ink,
        disabled && styles.disabled,
        style,
      ]}
      {...props}>
      {({ pressed }) => {
        const onInk = inverted ? !pressed : pressed;
        return (
          <Text
            numberOfLines={1}
            style={[
              retroText.line,
              { color: onInk ? RETRO.body : isDestructive ? DESTRUCTIVE : RETRO.ink },
            ]}>
            {isDestructive ? `✕ ${text}` : text}
          </Text>
        );
      }}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    minHeight: 44,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: HAIRLINE,
    borderColor: RETRO.ink,
    backgroundColor: RETRO.body,
  },
  ink: { backgroundColor: RETRO.ink },
  disabled: { opacity: 0.45 },
});
