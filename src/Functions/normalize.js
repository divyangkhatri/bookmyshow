import {Dimensions, PixelRatio, Platform} from 'react-native';
import {Header} from '@react-navigation/stack';
const {width, height} = Dimensions.get('window');

const scale = width / 320;

export const normalize = (size) => {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

