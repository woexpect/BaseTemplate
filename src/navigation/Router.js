import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect, useState } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
// Navigation Components
import Splash from '../screens/Splash';
// Navigation Stacks
import MainStack from './MainStack';
// import ComponentsDemo from '../screens/ComponentsDemo';
import AuthStack from './AuthStack';
import ErrorStack from './ErrorStack';
// Helpers
import AnimatedSwitchStack from './helpers/AnimatedSwitchStack';
import { navigationRef } from './helpers/navigationHelper.js';
import { appStateEvents } from '../common/types';

import useConnection from '../common/hooks/useConnection';

let tempUser;

const Navigation = React.memo(function Navigation() {
  let logOutListener;
  const [user, setUser] = useState(tempUser);
  const { loading, loaded, error } = useSelector((state) => state.session);
  const [appWasLoading, setAppWasLoading] = useState(false);

  useEffect(() => {
    // Comment: Adds a listener to catch when the user logout of the app
    // so that the status of the app can be updated through the
    // checkLoggedInStatus method.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    logOutListener = DeviceEventEmitter.addListener(
      appStateEvents.LOG_OUT,
      () => {
        checkLoggedInStatus();
      },
    );
    return () => {
      logOutListener.remove();
    };
  }, []);

  useEffect(() => {
    setAppWasLoading(loading);
    if (appWasLoading && !loading && loaded) {
      if (!error) {
        checkLoggedInStatus();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const checkLoggedInStatus = async () => {
    setUser(await AsyncStorage.getItem('accessToken'));
  };

  return (
    <AnimatedSwitchStack
      switchValue={!user}
      trueValueProps={{
        name: 'mainApp',
        component: AuthStack,
      }}
      falseValueProps={{
        name: 'authStack',
        component: MainStack,
      }}
    />
  );
});

const MainNavigation = React.memo(function MainNavigation() {
  const connected = useConnection();

  return (
    <AnimatedSwitchStack
      switchValue={connected}
      trueValueProps={{
        name: 'navigation',
        component: Navigation,
      }}
      falseValueProps={{
        name: 'errorNavigation',
        component: ErrorStack,
      }}
    />
  );
});

const Router = React.memo(function Router() {
  const [loading, setLoading] = useState(true);
  const connected = useConnection();

  const onReady = useCallback(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    checkLoggedInStatus();
  }, []);

  const checkLoggedInStatus = async () => {
    tempUser = await AsyncStorage.getItem('accessToken');
    setLoading(false);
  };

  return (
    <NavigationContainer onReady={onReady} ref={navigationRef}>
      <AnimatedSwitchStack
        switchValue={loading || connected === null}
        trueValueProps={{
          name: 'splash',
          component: Splash,
        }}
        falseValueProps={{
          name: 'mainNavigation',
          component: MainNavigation,
        }}
      />
    </NavigationContainer>
  );
});

export default Router;
