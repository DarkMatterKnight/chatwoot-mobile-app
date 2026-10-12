import React from 'react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';

import { retroText } from '@/components-next/retro';
import { RETRO, tailwind, useIsRetro } from '@/theme';

type AuthLinkProps = {
  text: string;
  onPress: () => void;
  /** Day only: the link's own spacing and type, as each screen had it. */
  pressableClasses?: string;
  textClasses?: string;
  /** Night: a link inside the window (ink) rather than on the desk. */
  inWindow?: boolean;
};

/** A text link. Night underlines it in the terminal face, the one interactive signal there. */
export const AuthLink = ({
  text,
  onPress,
  pressableClasses = 'flex-row justify-center items-center mt-4',
  textClasses = 'text-sm text-gray-900',
  inWindow,
}: AuthLinkProps) => {
  const isRetro = useIsRetro();

  if (isRetro) {
    return (
      <Pressable accessibilityRole="link" onPress={onPress} hitSlop={8}>
        <Text
          style={[
            inWindow ? retroText.small : retroText.desk,
            styles.link,
            inWindow && styles.ink,
          ]}>
          {text}
        </Text>
      </Pressable>
    );
  }

  return (
    <Pressable style={tailwind.style(pressableClasses)} onPress={onPress}>
      <Animated.Text style={tailwind.style(textClasses)}>{text}</Animated.Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  link: { textDecorationLine: 'underline' },
  ink: { color: RETRO.ink },
});
