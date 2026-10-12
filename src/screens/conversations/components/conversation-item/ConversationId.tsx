import React from 'react';
import { Text } from 'react-native';

import { tailwind, useIsRetro } from '@/theme';
import { NativeView } from '@/components-next/native-components';

type ConversationIdProps = {
  id: number;
};

export const ConversationId = (props: ConversationIdProps) => {
  const { id } = props;
  const isRetro = useIsRetro();
  const textStyle = tailwind.style(
    isRetro
      ? 'text-[11px] font-jbmono-400 text-gray-800'
      : 'text-sm font-inter-420-20 text-gray-700',
  );
  return (
    <NativeView style={tailwind.style('flex flex-row items-center gap-0.5')}>
      <Text style={textStyle}>#</Text>
      <Text style={textStyle}>{id}</Text>
    </NativeView>
  );
};

ConversationId.displayName = 'ConversationId';
