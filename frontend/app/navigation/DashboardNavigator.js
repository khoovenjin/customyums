import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../screens/dashboard/Dashboard';
import Recipe from '../screens/dashboard/Recipe';
import Dietary from '../screens/dietary/Dietary';
import defaultStyles from '../config/styles';

const Stack = createStackNavigator();

function DashboardNavigator() {
  return (
    <Stack.Navigator
      screenOptions={ defaultStyles.screenOptions }
    >
      <Stack.Screen
        name="Dashboard"
        component={ Dashboard }
      />
      <Stack.Screen
        name="Recipe"
        component={ Recipe }
      />
      <Stack.Screen
        name="Dietary"
        component={ Dietary }
      />
    </Stack.Navigator>
  );
}

export default DashboardNavigator;