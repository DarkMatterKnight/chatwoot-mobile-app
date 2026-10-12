import React from 'react';
import { Circle, Path, Svg } from 'react-native-svg';

import { IconProps } from '../../types';

export const AppearanceIcon = ({ stroke = '#858585' }: IconProps): JSX.Element => {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="8.25" stroke={stroke} strokeWidth="1.5" />
      <Path d="M12 3.75a8.25 8.25 0 0 1 0 16.5V3.75Z" fill={stroke} />
    </Svg>
  );
};
