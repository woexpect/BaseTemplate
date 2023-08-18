import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HOME } from '../common/routes';
// Navigators
// Screens
import Home from '../screens/MainStack/Home';
// Actions

function MainStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={HOME} component={Home} />
    </Stack.Navigator>
  );
}

export default MainStack;
