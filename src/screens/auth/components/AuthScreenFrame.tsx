import React, { PropsWithChildren, ReactNode } from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, Edge } from 'react-native-safe-area-context';

import { RetroDesk, RetroWindow, retroText } from '@/components-next/retro';
import { MidnightLogo } from '@/svg-icons';
import { RETRO, tailwind, useIsRetro } from '@/theme';

type AuthScreenFrameProps = PropsWithChildren<{
  title: string;
  description?: string;
  /** Day only: the mark above the title. */
  icon?: ReactNode;
  /** Night only: the window's title bar and status line. */
  windowTitle: string;
  status?: string;
  /** Links under the form (change URL, change language). */
  footer?: ReactNode;
  edges?: Edge[];
  /** Day only: the scroll container's padding, as each screen had it. */
  contentClasses?: string;
  centerTitle?: boolean;
}>;

/**
 * The frame every sign-in screen shares. Day is the layout the app always had; Night puts the
 * form in a lit window on the desk, the Midnight mark above it.
 */
export const AuthScreenFrame = ({
  title,
  description,
  icon,
  windowTitle,
  status,
  footer,
  edges,
  contentClasses = 'px-6 pt-16',
  centerTitle,
  children,
}: AuthScreenFrameProps) => {
  const isRetro = useIsRetro();

  if (isRetro) {
    return (
      <RetroDesk tag="midnight.os" marks>
        <SafeAreaView edges={edges} style={styles.fill}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scroll}>
            <View style={styles.mark}>
              <View style={styles.logo}>
                <MidnightLogo body={RETRO.deskInk} eyes={RETRO.night} />
              </View>
              <Text style={retroText.desk}>Midnight</Text>
            </View>
            <RetroWindow title={windowTitle} status={status}>
              <Text style={styles.title} accessibilityRole="header">
                {title}
              </Text>
              {description ? <Text style={styles.description}>{description}</Text> : null}
              <View style={styles.form}>{children}</View>
            </RetroWindow>
            {footer ? <View style={styles.footer}>{footer}</View> : null}
          </ScrollView>
        </SafeAreaView>
      </RetroDesk>
    );
  }

  return (
    <SafeAreaView edges={edges} style={tailwind.style('flex-1 bg-white')}>
      <View style={tailwind.style('flex-1 bg-white')}>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={tailwind.style(contentClasses)}>
          {icon}
          <View style={tailwind.style('pt-6 gap-4')}>
            <Animated.Text
              style={tailwind.style(
                'text-2xl text-gray-950 font-inter-semibold-20',
                centerTitle && 'text-center',
              )}>
              {title}
            </Animated.Text>
            {description ? (
              <Animated.Text
                style={tailwind.style(
                  'font-inter-normal-20 leading-[18px] tracking-[0.32px] text-gray-900',
                )}>
                {description}
              </Animated.Text>
            ) : null}
          </View>
          {children}
          {footer}
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  fill: { flex: 1 },
  scroll: { paddingHorizontal: 16, paddingTop: 48, paddingBottom: 56, gap: 20 },
  mark: { alignItems: 'center', gap: 8 },
  logo: { width: 64, height: 64 },
  title: {
    fontFamily: 'InterTight-500',
    fontSize: 24,
    lineHeight: 26,
    letterSpacing: -0.6,
    color: RETRO.ink,
  },
  description: {
    marginTop: 6,
    fontFamily: 'InterTight-400',
    fontSize: 15,
    lineHeight: 20,
    color: RETRO.muted,
  },
  form: { marginTop: 4 },
  footer: { alignItems: 'center', gap: 10 },
});
