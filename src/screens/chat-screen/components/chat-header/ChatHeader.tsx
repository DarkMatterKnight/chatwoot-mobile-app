import React from 'react';
import { ImageSourcePropType, Keyboard, Platform, Pressable, StyleSheet, Text } from 'react-native';
import { BottomSheetModal, useBottomSheetSpringConfigs } from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';

import { Avatar, Icon } from '@/components-next';
import { ChevronLeft, OpenIcon, Overflow, ResolvedIcon, SLAIcon } from '@/svg-icons';
import { BottomSheetBackdrop, BottomSheetWrapper } from '@/components-next';
import { RETRO, tailwind, useIsRetro } from '@/theme';
import i18n from '@/i18n';
import { ChatDropdownMenu, DashboardList } from './DropdownMenu';
import { SLAEvent } from '@/types/common';
import { useRefsContext } from '@/context';
import { SlaEvents } from './SlaEvents';
import { sheetChrome } from '@/components-next/retro';

type ChatHeaderProps = {
  name: string;
  imageSrc: ImageSourcePropType;
  isResolved: boolean;
  isSlaMissed?: boolean;
  hasSla?: boolean;
  slaEvents?: SLAEvent[];
  dashboardsList: DashboardList[];
  statusText?: string;
  onBackPress: () => void;
  onContactDetailsPress: () => void;
  onToggleChatStatus: () => void;
};

export const ChatHeader = ({
  name,
  imageSrc,
  isResolved,
  slaEvents,
  isSlaMissed,
  hasSla,
  statusText,
  dashboardsList,
  onBackPress,
  onContactDetailsPress,
  onToggleChatStatus,
}: ChatHeaderProps) => {
  const { slaEventsSheetRef } = useRefsContext();

  const animationConfigs = useBottomSheetSpringConfigs({
    mass: 1,
    stiffness: 420,
    damping: 30,
  });

  const toggleSlaEventsSheet = () => {
    if (slaEvents?.length) {
      Keyboard.dismiss();
      slaEventsSheetRef.current?.present();
    }
  };

  const isRetro = useIsRetro();

  const slaSheet = (
    <BottomSheetModal
      {...sheetChrome()}
      ref={slaEventsSheetRef}
      backdropComponent={BottomSheetBackdrop}
      enablePanDownToClose
      animationConfigs={animationConfigs}
      snapPoints={['36%']}>
      <BottomSheetWrapper>
        <SlaEvents slaEvents={slaEvents} statusText={statusText ?? ''} />
      </BottomSheetWrapper>
    </BottomSheetModal>
  );

  if (isRetro) {
    // Night: the header is the window's title bar. Back box, the contact's name, then the
    // conversation's state as an inverted label that toggles it.
    return (
      <Animated.View style={retroStyles.bar}>
        <Pressable
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={onBackPress}
          style={retroStyles.box}>
          <Text style={retroStyles.barText}>{'\u25C2'}</Text>
        </Pressable>
        <Pressable
          onPress={onContactDetailsPress}
          accessibilityRole="button"
          style={retroStyles.name}>
          <Text numberOfLines={1} style={retroStyles.barText}>
            {name}
          </Text>
        </Pressable>
        {hasSla && (
          <Pressable hitSlop={8} onPress={toggleSlaEventsSheet}>
            <Text style={[retroStyles.barText, isSlaMissed && retroStyles.missed]}>SLA</Text>
          </Pressable>
        )}
        <Pressable hitSlop={8} accessibilityRole="button" onPress={onToggleChatStatus}>
          <Text style={retroStyles.state}>
            {isResolved
              ? `\u2713 ${i18n.t('CONVERSATION.FILTERS.STATUS.OPTIONS.RESOLVED')}`
              : i18n.t('CONVERSATION.FILTERS.STATUS.OPTIONS.OPEN')}
          </Text>
        </Pressable>
        {dashboardsList.length > 0 && (
          <ChatDropdownMenu dropdownMenuList={dashboardsList}>
            <Text style={retroStyles.barText}>{'\u22EF'}</Text>
          </ChatDropdownMenu>
        )}
        {slaSheet}
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[tailwind.style('border-b-[1px] border-b-blackA-A3')]}>
      <Animated.View style={tailwind.style('flex flex-row justify-between items-center px-4 py-2')}>
        <Animated.View style={tailwind.style('flex-1 flex-row gap-2 items-center justify-center')}>
          <Pressable
            hitSlop={8}
            style={tailwind.style('h-8 w-8 flex  justify-center items-start')}
            onPress={onBackPress}>
            <Icon icon={<ChevronLeft />} size={24} />
          </Pressable>
          <Pressable
            onPress={onContactDetailsPress}
            style={tailwind.style('flex flex-row items-center flex-1')}>
            <Avatar size="xl" src={imageSrc} name={name} />
            <Animated.View style={tailwind.style('pl-2')}>
              <Animated.Text
                numberOfLines={1}
                style={tailwind.style(
                  'text-[17px] font-inter-medium-24 tracking-[0.32px] text-gray-950',
                )}>
                {name}
              </Animated.Text>
            </Animated.View>
          </Pressable>
        </Animated.View>

        <Animated.View
          style={tailwind.style(
            `flex flex-row flex-1 justify-end ${Platform.OS === 'ios' ? 'gap-4' : ''}`,
          )}>
          <Animated.View style={tailwind.style('flex flex-row items-center gap-4')}>
            {hasSla && (
              <Pressable hitSlop={8} onPress={toggleSlaEventsSheet}>
                <Icon icon={<SLAIcon color={isSlaMissed ? '#E13D45' : '#BBBBBB'} />} size={24} />
              </Pressable>
            )}
            <Pressable hitSlop={8} onPress={onToggleChatStatus}>
              <Icon
                icon={
                  isResolved ? (
                    <ResolvedIcon strokeWidth={2} stroke={tailwind.color('bg-green-700')} />
                  ) : (
                    <OpenIcon strokeWidth={2} />
                  )
                }
                size={24}
              />
            </Pressable>
          </Animated.View>
          {dashboardsList.length > 0 && (
            <ChatDropdownMenu dropdownMenuList={dashboardsList}>
              <Icon icon={<Overflow strokeWidth={2} />} size={24} />
            </ChatDropdownMenu>
          )}
        </Animated.View>
      </Animated.View>
      {slaSheet}
    </Animated.View>
  );
};

const retroStyles = StyleSheet.create({
  bar: { flexDirection: 'row', alignItems: 'center', gap: 10, minHeight: 36 },
  box: {
    width: 26,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: RETRO.body,
  },
  name: { flex: 1 },
  barText: { fontFamily: 'VT323', fontSize: 22, lineHeight: 24, color: RETRO.body },
  missed: { color: '#F2A5A8' },
  state: {
    paddingHorizontal: 5,
    backgroundColor: RETRO.body,
    color: RETRO.ink,
    fontFamily: 'VT323',
    fontSize: 20,
    lineHeight: 22,
  },
});
