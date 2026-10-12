import React, { PropsWithChildren, ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

import { useTabBarHeight } from '@/utils';

import { RetroDesk } from './RetroDesk';
import { RetroWindow } from './RetroWindow';

type RetroScreenProps = PropsWithChildren<{
  title: ReactNode;
  status?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
  /** Leave room for the taskbar (the three tab screens). */
  aboveTaskbar?: boolean;
  edges?: Edge[];
}>;

/** A Night screen: one window standing on the desk, ending above the taskbar. */
export const RetroScreen = ({
  title,
  status,
  left,
  right,
  aboveTaskbar,
  edges = ['top'],
  children,
}: RetroScreenProps) => {
  const tabBarHeight = useTabBarHeight();
  return (
    <RetroDesk>
      <SafeAreaView
        edges={edges}
        style={[styles.area, { paddingBottom: aboveTaskbar ? tabBarHeight + 8 : 8 }]}>
        <RetroWindow fill flush title={title} status={status} left={left} right={right}>
          {children}
        </RetroWindow>
      </SafeAreaView>
    </RetroDesk>
  );
};

const styles = StyleSheet.create({
  area: { flex: 1, paddingHorizontal: 8, paddingTop: 6 },
});
