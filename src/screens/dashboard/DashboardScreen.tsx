import React, { useRef } from 'react';
import { Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated from 'react-native-reanimated';
import { WebView } from 'react-native-webview';
import snakecaseKeys from 'snakecase-keys';

import { StackActions, useNavigation, useRoute } from '@react-navigation/native';

import { Icon } from '@/components-next';
import { CloseIcon } from '@/svg-icons';
import { tailwind, useIsRetro } from '@/theme';
import { RetroDesk, RetroWindow, retroText } from '@/components-next/retro';
import { Conversation } from '@/types';
import { User } from '@/types/User';

const DashboardScreen = () => {
  const isRetro = useIsRetro();
  const route = useRoute();
  const navigation = useNavigation();
  const webviewRef = useRef<WebView>(null);

  const { conversation, currentUser, title, url } = route.params as {
    conversation: Conversation;
    currentUser: User;
    title: string;
    url: string;
  };

  const handleBackPress = () => {
    navigation.dispatch(StackActions.pop());
  };

  const contact = conversation?.meta?.sender;

  // The mobile app consistently uses snake case, while the dashboard still has mixed usage of snake case.
  // To maintain compatibility for dashboard users, we temporarily convert the data to snake case at this point.
  // TODO: Once we complete the migration to camel case, we can remove this conversion.
  const data = snakecaseKeys(
    {
      conversation,
      contact,
      currentAgent: {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
      },
    },
    { deep: true },
  );

  const INJECTED_JAVASCRIPT = `window.postMessage(JSON.stringify({"event":"appContext","data":${JSON.stringify(
    data,
  )}}));`;

  const webview = (
    <WebView
      ref={webviewRef}
      originWhitelist={['*']}
      source={{ uri: url }}
      startInLoadingState={true}
      javaScriptEnabled={true}
      onLoadEnd={() => {
        webviewRef.current?.injectJavaScript(INJECTED_JAVASCRIPT);
      }}
      onMessage={event => {
        if (event?.nativeEvent?.data === 'chatwoot-dashboard-app:fetch-info') {
          webviewRef.current?.injectJavaScript(INJECTED_JAVASCRIPT);
        }
      }}
    />
  );

  if (isRetro) {
    // Night: the dashboard app runs inside a window, a close box in its title bar.
    return (
      <RetroDesk>
        <SafeAreaView edges={['top', 'bottom']} style={tailwind.style('flex-1 px-1.5 pt-1')}>
          <RetroWindow
            fill
            flush
            title={title}
            left={
              <Pressable hitSlop={16} onPress={handleBackPress} accessibilityRole="button">
                <Text style={retroText.bar}>{'\u2715'}</Text>
              </Pressable>
            }>
            {webview}
          </RetroWindow>
        </SafeAreaView>
      </RetroDesk>
    );
  }

  return (
    <Animated.View style={tailwind.style('flex-1')}>
      <Animated.View
        style={tailwind.style(
          'flex flex-row items-center justify-between px-4 border-b-[1px] border-b-blackA-A3 py-[12px] bg-white',
        )}>
        <Pressable hitSlop={16} onPress={handleBackPress}>
          <Animated.View>
            <Icon icon={<CloseIcon />} size={24} />
          </Animated.View>
        </Pressable>
        <Animated.View>
          <Animated.Text
            style={tailwind.style(
              'text-[17px] font-inter-medium-24 tracking-[0.32px] text-gray-950',
            )}>
            {title}
          </Animated.Text>
        </Animated.View>
        <Pressable style={tailwind.style('opacity-0')}>
          <Animated.View>
            <Icon icon={<CloseIcon />} size={24} />
          </Animated.View>
        </Pressable>
      </Animated.View>
      {webview}
    </Animated.View>
  );
};

export default DashboardScreen;
