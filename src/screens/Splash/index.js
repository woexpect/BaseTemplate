import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../common/styles';

// const logoRed = require('../../assets/images/logo-red.png');

const Splash = () => {
  return (
    <View style={[styles.completeScreen, styles.centerAll, styles.bgRed]}>
      <Text>Splash</Text>
    </View>
  );
}

export default Splash;
