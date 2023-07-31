import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Pantry from '../screens/pantry/Pantry';
import AddPantry from '../screens/pantry/AddPantry';
import defaultStyles from '../config/styles';

const Stack = createStackNavigator();

function PantryNavigator() {
  return (
    <Stack.Navigator
      screenOptions={ defaultStyles.screenOptions }
    >
      <Stack.Screen
        name="Pantry"
        component={ Pantry }
      />
      <Stack.Screen
        name="AddPantry"
        component={ AddPantry }
      />
    </Stack.Navigator>
  );
}

export default PantryNavigator;