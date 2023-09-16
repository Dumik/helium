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
        borderTopColor: '#5c62d4',
        paddingTop: 15,
        top: 0,
        height: 100,
      },

      headerStyle: {
        backgroundColor: '#5c62d4',
      },
      headerTitleStyle: {
        color: '#fff',
        fontSize: 20,
      },

      tabBarItemStyle: {
        borderTopColor: '#5c62d4',
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
            <StatisticIcon color={focused ? '#5c62d4' : '#555555'} size={35} />
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
            <FavoriteIcon color={focused ? '#5c62d4' : '#555555'} size={35} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
