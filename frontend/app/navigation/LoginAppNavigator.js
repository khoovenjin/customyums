import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import Register from '../screens/Register';
import defaultStyles from '../config/styles';

const Stack = createStackNavigator();

function LoginAppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={ defaultStyles.screenOptions }
    >
      <Stack.Screen
        name="Login"
        component={ Login }/>
      <Stack.Screen
        name="Register"
        component={ Register }
      />
    </Stack.Navigator>
  );
}

export default LoginAppNavigator;