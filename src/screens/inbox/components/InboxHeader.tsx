import React from 'react';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
import { BottomSheetModal, useBottomSheetSpringConfigs } from '@gorhom/bottom-sheet';

import { BottomSheetBackdrop, BottomSheetWrapper } from '@/components-next';

import { Icon } from '@/components-next/common/icon';
import { DoubleCheckIcon, InboxFilterIcon } from '@/svg-icons';
import { tailwind, useIsRetro, whenNight } from '@/theme';
import { InboxFilters } from './InboxFilters';
import i18n from '@/i18n';
import { useRefsContext } from '@/context';
import { sheetChrome } from '@/components-next/retro';

type InboxHeaderProps = {
  markAllAsRead: () => void;
};

export const InboxHeader = (props: InboxHeaderProps) => {
  const isRetro = useIsRetro();
  const { markAllAsRead } = props;
  const { inboxFiltersSheetRef } = useRefsContext();
  const handleToggleState = () => {
    inboxFiltersSheetRef.current?.present();
  };

  const animationConfigs = useBottomSheetSpringConfigs({
    mass: 1,
    stiffness: 420,
    damping: 30,
  });

  return (
    <Animated.View
      style={[tailwind.style('border-b-[1px] border-b-blackA-A3', whenNight('border-b-gray-950'))]}>
      <Animated.View
        style={[
          tailwind.style(
            'flex flex-row justify-between items-center px-4 pt-2 pb-[12px]',
            whenNight('px-3 py-2'),
          ),
        ]}>
        <Animated.View style={tailwind.style('flex-1')}>
          <Pressable hitSlop={16} onPress={markAllAsRead}>
            <Icon icon={<DoubleCheckIcon />} size={24} />
          </Pressable>
        </Animated.View>
        <Animated.View style={tailwind.style('flex-1')}>
          <Animated.Text
            style={tailwind.style(
              'text-[17px] text-center leading-[17px] tracking-[0.32px] font-inter-medium-24 text-gray-950',
            )}>
            {/* Night: the window's title bar already names the screen. */}
            {isRetro ? '' : i18n.t('NOTIFICATION.INBOX')}
          </Animated.Text>
        </Animated.View>
        <Animated.View style={tailwind.style('flex-1 items-end')}>
          <Pressable onPress={handleToggleState} hitSlop={16}>
            <Icon icon={<InboxFilterIcon />} size={24} />
          </Pressable>
        </Animated.View>
      </Animated.View>
      <BottomSheetModal
        {...sheetChrome()}
        ref={inboxFiltersSheetRef}
        backdropComponent={BottomSheetBackdrop}
        animationConfigs={animationConfigs}
        enablePanDownToClose
        snapPoints={[160]}>
        <BottomSheetWrapper>
          <InboxFilters />
        </BottomSheetWrapper>
      </BottomSheetModal>
    </Animated.View>
  );
};
