import React from 'react';
import { Text, View } from 'react-native';
// Custom components
// User tools
import styles from '../../../common/styles';

const Home = () => {
  return (
    <View style={[styles.completeScreen, styles.centerAll]}>
      <Text>Home</Text>
    </View>
  );
}

export default React.memo(Home);
