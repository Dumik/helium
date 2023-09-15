import React from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Tabs } from './Tabs';
import { RootStackParamList, Screens } from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const navigationRef = createNavigationContainerRef();

export const Root = () => {
  const navigationReadyCallback = () => {
    return true;
  };

  return (
    <NavigationContainer ref={navigationRef} onReady={navigationReadyCallback}>
      <RootStack.Navigator initialRouteName={Screens.Tabs}>
        <RootStack.Group>
          <RootStack.Screen
            component={Tabs}
            name={Screens.Tabs}
            options={{ headerShown: false }}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
