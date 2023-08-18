import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../common/styles';

const SystemError = () => {
  return (
    <View style={[styles.completeScreen, styles.centerAll]}>
      <Text>Found an error, sorry.</Text>
    </View>
  );
}

export default SystemError;
