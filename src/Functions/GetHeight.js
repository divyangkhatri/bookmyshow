 import React from 'react';
import {useHeaderHeight} from '@react-navigation/stack';
 import 'react-native';
import {Platform} from 'react-native';
import SafeAreaInset from 'react-native-static-safe-area-insets';
import {Dimensions} from 'react-native';
const {height} = Dimensions.get('window');

const GetHeight = (percentage, isNavigation) => {
  const header = 44
  const tempPer = percentage / 100;
  if (Platform.OS === 'ios') {
    if (isNavigation) {
      return (
        (height -
          -SafeAreaInset.safeAreaInsetsTop -
          header -
          SafeAreaInset.safeAreaInsetsBottom) *
        tempPer
      );
    } else {
      return (
        (height -
          SafeAreaInset.safeAreaInsetsTop -
          SafeAreaInset.safeAreaInsetsBottom) *
        tempPer
      );
    }
  } else {
    if (isNavigation) {
      return (height - header) * tempPer;
    } else {
      return height * tempPer;
    }
  }
};

export default GetHeight;
