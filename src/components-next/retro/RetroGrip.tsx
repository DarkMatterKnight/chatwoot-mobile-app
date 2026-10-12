import React from 'react';
import { Line, Svg } from 'react-native-svg';

import { RETRO } from '@/theme';

/** The resize grip in a status bar's corner: diagonal hatching, 13px. */
export const RetroGrip = ({ color = RETRO.ink }: { color?: string }) => (
  <Svg width={13} height={13} viewBox="0 0 13 13">
    {[4, 8, 12, 16, 20].map(offset => (
      <Line key={offset} x1={offset} y1={0} x2={0} y2={offset} stroke={color} strokeWidth={1} />
    ))}
  </Svg>
);
