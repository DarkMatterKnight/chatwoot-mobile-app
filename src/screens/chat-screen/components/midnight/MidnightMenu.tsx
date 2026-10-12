import React from 'react';
import { View } from 'react-native';
import Animated, { EntryAnimationsValues, withSpring } from 'react-native-reanimated';

import { RetroWindow } from '@/components-next/retro';
import i18n from '@/i18n';
import { tailwind, useIsRetro } from '@/theme';
import { ConversationStatus } from '@/types';

import { MidnightMenuItem } from './MidnightMenuItem';

type MidnightMenuProps = {
  status?: ConversationStatus;
  onHandBack: () => void;
  onTakeOver: () => void;
};

/**
 * Who answers this conversation: Midnight (the AI agent behind the inbox) or the team.
 * Slides up over the reply box from the Midnight button, as the old copilot menu did.
 */
export const MidnightMenu = ({ status, onHandBack, onTakeOver }: MidnightMenuProps) => {
  const isRetro = useIsRetro();

  const items = (
    <>
      <MidnightMenuItem
        label={i18n.t('MIDNIGHT.HAND_BACK')}
        hint={i18n.t('MIDNIGHT.HAND_BACK_HINT')}
        selected={status === 'pending'}
        onPress={onHandBack}
      />
      <MidnightMenuItem
        label={i18n.t('MIDNIGHT.TAKE_OVER')}
        hint={i18n.t('MIDNIGHT.TAKE_OVER_HINT')}
        selected={status === 'open'}
        onPress={onTakeOver}
      />
    </>
  );

  return (
    <View style={tailwind.style('absolute bottom-full left-0 right-0 overflow-hidden')}>
      <Animated.View
        entering={(values: EntryAnimationsValues) => {
          'worklet';
          // Start pushed down by own height (hidden below clip), spring up into view
          return {
            initialValues: {
              transform: [{ translateY: values.targetHeight }],
            },
            animations: {
              transform: [{ translateY: withSpring(0, { damping: 38, stiffness: 240 }) }],
            },
          };
        }}
        style={tailwind.style(
          isRetro ? 'mx-1' : 'bg-white border-t border-t-blackA-A3 mx-1 pt-3 px-3',
        )}>
        {isRetro ? <RetroWindow title="midnight.ai">{items}</RetroWindow> : items}
      </Animated.View>
    </View>
  );
};
