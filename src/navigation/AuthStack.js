import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SIGN_IN } from '../common/routes';
// Screens
import Login from '../screens/AuthStack/Login';

const Stack = createNativeStackNavigator();

function LoginStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SIGN_IN} component={Login} />
    </Stack.Navigator>
  );
}

export default LoginStack;
