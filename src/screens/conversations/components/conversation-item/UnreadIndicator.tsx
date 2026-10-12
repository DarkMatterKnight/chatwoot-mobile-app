import React from 'react';
import { Text } from 'react-native';

import { tailwind, useIsRetro } from '@/theme';
import { RetroLabel } from '@/components-next/retro';
import { NativeView } from '@/components-next/native-components';

type UnreadIndicatorProps = {
  count: number;
};

export const UnreadIndicator = (props: UnreadIndicatorProps) => {
  const { count } = props;
  const isRetro = useIsRetro();
  if (isRetro) return <RetroLabel>{count > 9 ? '9+' : count}</RetroLabel>;
  return (
    <NativeView
      style={tailwind.style('h-5 w-5 flex justify-center items-center rounded-full bg-blue-700')}>
      <Text
        style={tailwind.style(
          'text-xs font-inter-semibold-20 leading-[15px] text-center text-white',
        )}>
        {count > 9 ? '9+' : count}
      </Text>
    </NativeView>
  );
};
