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

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  const screenOptions = (): BottomTabNavigationOptions => {
    return {
      tabBarShowLabel: false,
      headerShown: false,
      tabBarStyle: {
        paddingTop: 15,
        top: 0,
        backgroundColor: '#f7f7f7',
        height: 100,
        borderColor: '#274C67',
      },

      tabBarItemStyle: {
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
          title: 'Population Statistics',
          tabBarIcon: ({ focused }) => (
            <StatisticIcon color={focused ? '#5c62d4' : '#555555'} size={30} />
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
            <FavoriteIcon color={focused ? '#5c62d4' : '#555555'} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
