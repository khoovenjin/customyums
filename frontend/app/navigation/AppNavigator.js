import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppAnimatedTabBar from '../components/navigation/AppAnimatedTabBar';
import DashboardNavigator from './DashboardNavigator';
import PantryNavigator from './PantryNavigator';
import DietaryNavigator from './DietaryNavigator';
import Account from '../screens/account/Account';
import defaultStyles from '../config/styles';

const Tab = createBottomTabNavigator();

function AppNavigator({
  size = 36
}) {
  return (
    <Tab.Navigator
      screenOptions={ defaultStyles.screenOptions }
      tabBar={ props => <AppAnimatedTabBar { ...props } />}
    >
      <Tab.Screen
        name="HomeStack"
        component={ DashboardNavigator }
        options={{
          tabBarIcon: ({ color }) =>
          <MaterialCommunityIcons
            name="home"
            color={ color }
            size={ size }
          />
        }}
      />
      <Tab.Screen
        name="PantryStack"
        component={ PantryNavigator }
        options={{
          tabBarIcon: ({ color }) =>
          <MaterialCommunityIcons
            name="silverware-variant"
            color={ color }
            size={ size }
          />
        }}
      />
      <Tab.Screen
        name="DietaryStack"
        component={ DietaryNavigator }
        options={{
          tabBarIcon: ({ color }) =>
          <MaterialCommunityIcons
            name="food"
            color={ color }
            size={ size }
          />
        }}
      />
      <Tab.Screen
        name="Account"
        component={ Account }
        options={{
          tabBarIcon: ({ color }) =>
          <MaterialCommunityIcons
            name="account"
            color={ color }
            size={ size }
          />
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;