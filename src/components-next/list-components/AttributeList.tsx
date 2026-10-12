import React, { useMemo } from 'react';
import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';
import Clipboard from '@react-native-clipboard/clipboard';
import * as Sentry from '@sentry/react-native';

import { CaretRight } from '@/svg-icons';
import { tailwind, whenNight } from '@/theme';
import { ListCard } from './ListCard';
import { AttributeListType } from '@/types';
import { Icon } from '@/components-next/common';
import { showToast } from '@/utils/toastUtils';

type AttributeItemProps = {
  listItem: AttributeListType;
  index: number;
  isLastItem: boolean;
};

const AttributeItem = (props: AttributeItemProps) => {
  const { listItem, index, isLastItem } = props;

  const handlePress = () => {
    if (formattedValue) {
      try {
        Clipboard.setString(formattedValue);
        showToast({ message: `${listItem.title} copied to clipboard` });
      } catch (error) {
        Sentry.captureException(error);
      }
    }
  };

  const formattedDate = useMemo(() => {
    return listItem.subtitle ? new Date(listItem.subtitle).toLocaleDateString() : '';
  }, [listItem.subtitle]);

  const formattedValue = useMemo(() => {
    if (listItem.type === 'date') {
      return formattedDate;
    }
    if (listItem.type === 'checkbox') {
      return listItem.subtitle ? 'Yes' : 'No';
    }
    return listItem.subtitle;
  }, [listItem.type, listItem.subtitle, formattedDate]);

  return (
    <Pressable
      onPress={handlePress}
      key={index}
      style={({ pressed }) => [
        tailwind.style(
          pressed ? 'bg-gray-100' : '',
          index === 0 ? 'rounded-t-[13px]' : '',
          isLastItem ? 'rounded-b-[13px]' : '',
        ),
      ]}>
      <Animated.View style={tailwind.style('flex flex-row items-center px-3')}>
        {listItem.icon ? (
          <Animated.View>
            <Icon icon={listItem.icon} size={24} />
          </Animated.View>
        ) : null}
        <Animated.View
          style={tailwind.style(
            'flex-1 flex-row items-center justify-between py-[11px]',
            listItem.icon ? 'ml-3' : '',
            !isLastItem ? 'border-b-[1px] border-b-blackA-A3' : '',
            !isLastItem ? whenNight('border-b-gray-300') : '',
          )}>
          <Animated.View>
            <Animated.Text
              style={tailwind.style(
                'text-base font-inter-420-20 leading-[22px] tracking-[0.16px] text-gray-950',
              )}>
              {listItem.title}
            </Animated.Text>
          </Animated.View>
          <Animated.View style={tailwind.style('flex flex-row items-center max-w-[200px]')}>
            <Animated.Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={tailwind.style(
                'text-base font-inter-normal-20 leading-[22px] tracking-[0.16px] overflow-hidden',
                listItem.subtitleType === 'light' ? 'text-gray-900' : 'text-gray-950',
                listItem.type === 'link' ? 'text-blue-800 underline' : '',
              )}>
              {formattedValue}
            </Animated.Text>
            {listItem.hasChevron ? <Icon icon={<CaretRight />} size={20} /> : null}
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

type AttributeListProps = {
  sectionTitle?: string;
  list: AttributeListType[];
};
export const AttributeList = (props: AttributeListProps) => {
  const { list, sectionTitle } = props;

  return (
    <ListCard sectionTitle={sectionTitle}>
      {list.map(
        (listItem, index) =>
          !listItem.disabled &&
          listItem.subtitle !== undefined &&
          listItem.subtitle !== null && (
            <AttributeItem
              key={index}
              {...{ listItem, index }}
              isLastItem={index === list.length - 1}
            />
          ),
      )}
    </ListCard>
  );
};
