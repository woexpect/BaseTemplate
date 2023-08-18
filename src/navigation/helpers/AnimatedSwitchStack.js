/* eslint-disable react/forbid-prop-types */
import React from 'react';
import {
  createNativeStackNavigator,
  TransitionIOSSpec,
} from '@react-navigation/native-stack';
import PropTypes from 'prop-types';

const RootStack = createNativeStackNavigator();

export const SpotifyTransition = {
  transitionSpec: {
    open: TransitionIOSSpec,
    close: TransitionIOSSpec,
  },
  cardStyleInterpolator: ({ current, next }) => {
    return {
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
      },
      cardStyle: {
        opacity: next
          ? next.progress.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [1, 1, 0],
            })
          : current.progress.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0, 0, 1],
            }),
        transform: [
          {
            rotateY: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '180deg'],
                })
              : current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['180deg', '0deg'],
                }),
          },
        ],
      },
    };
  },
};

const AnimatedSwitchStack = React.memo(function AnimatedSwitchStack({
  switchValue,
  trueValueProps,
  falseValueProps,
}) {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerMode: 'none',
        cardOverlayEnabled: true,
        headerShown: false,
        gestureEnabled: true,
        ...SpotifyTransition,
      }}>
      {switchValue ? (
        <RootStack.Screen {...trueValueProps} />
      ) : (
        <RootStack.Screen {...falseValueProps} />
      )}
    </RootStack.Navigator>
  );
});

AnimatedSwitchStack.propTypes = {
  switchValue: PropTypes.bool,
  trueValueProps: PropTypes.shape({
    name: PropTypes.string.isRequired,
    component: PropTypes.any,
  }).isRequired,
  falseValueProps: PropTypes.shape({
    name: PropTypes.string.isRequired,
    component: PropTypes.any,
  }).isRequired,
};

AnimatedSwitchStack.defaultProps = {
  switchValue: true,
};

export default AnimatedSwitchStack;
