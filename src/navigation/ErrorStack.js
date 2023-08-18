import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SystemError from '../screens/SystemError';

import { SYSTEM_ERROR } from '../common/routes';

const Stack = createNativeStackNavigator();

function ErrorStack() {
  return (
    <Stack.Navigator
      initialRouteName={SYSTEM_ERROR}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SYSTEM_ERROR} component={SystemError} />
    </Stack.Navigator>
  );
}

export default ErrorStack;
