import React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {Screens} from './types';
import PopulationStatisticsScreen from '../screens/PopulationStatisticsScreen';
import StatisticIcon from '../legos/icons/StatisticIcon';
import FavoriteIcon from '../legos/icons/FavoriteIcon';

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
          title: 'Statistics',
          tabBarIcon: ({focused}) => (
            <StatisticIcon color={focused ? '#5c62d4' : '#555555'} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name={Screens.FavoriteCountryPopulations}
        component={PopulationStatisticsScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: true,
          title: 'Statistics',
          tabBarIcon: ({focused}) => (
            <FavoriteIcon color={focused ? '#5c62d4' : '#555555'} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
