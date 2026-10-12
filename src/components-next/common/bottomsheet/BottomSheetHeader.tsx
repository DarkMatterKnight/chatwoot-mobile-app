import React from 'react';
import Animated from 'react-native-reanimated';

import { tailwind, useIsRetro } from '@/theme';

type BottomSheetHeaderProps = {
  headerText: string;
};

export const BottomSheetHeader = (props: BottomSheetHeaderProps) => {
  const { headerText } = props;
  const isRetro = useIsRetro();
  if (isRetro) {
    return (
      <Animated.View style={tailwind.style('px-4 pt-2 pb-1 border-b border-gray-950')}>
        <Animated.Text
          numberOfLines={1}
          style={tailwind.style('font-vt323 text-[23px] leading-[26px] text-gray-950')}>
          {headerText}
        </Animated.Text>
      </Animated.View>
    );
  }
  return (
    <Animated.View style={tailwind.style('flex-row justify-center items-center')}>
      <Animated.Text
        style={tailwind.style(
          'text-gray-700 text-md font-inter-medium-24 leading-[17px] tracking-[0.32px]',
        )}>
        {headerText}
      </Animated.Text>
    </Animated.View>
  );
};
