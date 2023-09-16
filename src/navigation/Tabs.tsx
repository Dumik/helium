import React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import { Screens } from './types';
import PopulationStatisticsScreen from '../screens/PopulationStatisticsScreen/PopulationStatisticsScreen';
import StatisticIcon from '../legos/icons/StatisticIcon';
import FavoriteIcon from '../legos/icons/FavoriteIcon';
import { FavoriteScreen } from '../screens/FavoriteScreen/FavoriteScreen';
import { theme } from '../utils/theme';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  const screenOptions = (): BottomTabNavigationOptions => {
    return {
      tabBarShowLabel: false,
      headerShown: false,
      tabBarStyle: {
        borderTopColor: theme.colors.primary,
        paddingTop: 15,
        top: 0,
        height: 100,
      },

      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
      headerTitleStyle: {
        color: theme.colors.white,
        fontSize: 20,
      },

      tabBarItemStyle: {
        borderTopColor: theme.colors.primary,
        borderRadius: 10,
      },
    };
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name={Screens.StatisticsPopulations}
        component={PopulationStatisticsScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: true,
          title: 'Population statistics',
          tabBarIcon: ({ focused }) => (
            <StatisticIcon
              color={focused ? theme.colors.primary : theme.colors.gray}
              size={35}
            />
          ),
        }}
      />
      <Tab.Screen
        name={Screens.FavoriteCountryPopulations}
        component={FavoriteScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: true,
          title: 'Favorite Statistics',
          tabBarIcon: ({ focused }) => (
            <FavoriteIcon
              color={focused ? theme.colors.primary : theme.colors.gray}
              size={35}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
