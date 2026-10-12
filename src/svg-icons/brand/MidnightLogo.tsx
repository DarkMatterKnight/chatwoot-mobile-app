import React from 'react';
import { Circle, Path, Svg } from 'react-native-svg';

type MidnightLogoProps = {
  /** The circle. Ink on paper by day; paper on the night desk, where ink would vanish. */
  body: string;
  eyes: string;
};

// The bloub mark: a circle with two eyes, from the supplied SVG.
export const MidnightLogo = ({ body, eyes }: MidnightLogoProps): JSX.Element => {
  return (
    <Svg width="100%" height="100%" viewBox="-100.21 -99.76 200.18 200.18">
      <Circle cx="-0.12" cy="0.33" r="100.09" fill={body} />
      <Path
        d="M-10 -12A10 10 0 0 1 0 -22L0 -22A10 10 0 0 1 10 -12L10 12A10 10 0 0 1 0 22L0 22A10 10 0 0 1 -10 12Z"
        transform="matrix(0.79,-0.18,0.13,0.98,-60.04,-3.37)"
        fill={eyes}
      />
      <Path
        d="M-14 0A8.5 8.5 0 0 1 -5.5 -8.5L5.5 -8.5A8.5 8.5 0 0 1 14 0L14 0A8.5 8.5 0 0 1 5.5 8.5L-5.5 8.5A8.5 8.5 0 0 1 -14 0Z"
        transform="matrix(0.93,0.36,-0.36,0.93,-7.29,4.18)"
        fill={eyes}
      />
    </Svg>
  );
};
