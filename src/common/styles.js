import { Dimensions, Platform } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const { width, height } = Dimensions.get('window');

const isIosDevice = Platform.OS === 'ios';

export default ScaledSheet.create({
  // Layout Styles
  completeScreen: {
    flex: 1,
  },
  centerAll: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Background Colors
  bgMain: {
    backgroundColor: '#FFFFFF',
  },
  bgRed: {
    backgroundColor: '#FF0000',
  },
  // Tint Colors
  // Text Colors
  // Border Colors
});
