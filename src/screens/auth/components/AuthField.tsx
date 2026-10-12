import React, { ReactNode } from 'react';
import { Animated, TextInput, TextInputProps, View } from 'react-native';

import { RetroField, retroInputStyle } from '@/components-next/retro';
import { RETRO, tailwind, useIsRetro } from '@/theme';

type AuthFieldProps = TextInputProps & {
  label?: string;
  error?: string;
  /** A control at the end of the field, e.g. show password. */
  right?: ReactNode;
  /** Day only: the spacing around the field, as each screen had it. */
  containerClasses?: string;
};

export const AuthField = React.forwardRef<TextInput, AuthFieldProps>(
  ({ label, error, right, containerClasses = 'pt-8 mb-8 gap-2', ...inputProps }, ref) => {
    const isRetro = useIsRetro();

    if (isRetro) {
      return (
        <RetroField label={label} error={error} right={right} style={tailwind.style('mb-5')}>
          <TextInput
            ref={ref}
            style={retroInputStyle}
            placeholderTextColor={RETRO.muted}
            selectionColor={RETRO.ink}
            {...inputProps}
          />
        </RetroField>
      );
    }

    return (
      <View style={tailwind.style(containerClasses)}>
        {label ? (
          <Animated.Text style={tailwind.style('font-inter-420-20 text-gray-950')}>
            {label}
          </Animated.Text>
        ) : null}
        <View style={tailwind.style('relative')}>
          <TextInput
            ref={ref}
            style={tailwind.style(
              'text-base font-inter-normal-20 tracking-[0.24px] leading-[20px] android:leading-[18px]',
              'py-2 px-3 rounded-xl text-gray-950 bg-blackA-A4',
              'h-10',
              right ? 'pr-10' : '',
            )}
            placeholderTextColor={tailwind.color('text-gray-900')}
            {...inputProps}
          />
          {right ? <View style={tailwind.style('absolute right-4 top-2.5')}>{right}</View> : null}
        </View>
        {error ? (
          <Animated.Text style={tailwind.style('font-inter-normal-20 text-ruby-900')}>
            {error}
          </Animated.Text>
        ) : null}
      </View>
    );
  },
);

AuthField.displayName = 'AuthField';
