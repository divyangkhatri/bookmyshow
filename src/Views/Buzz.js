import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';

const Buzz = () => {
  const {safeAreaView, mainView} = styles;
  return (
    <SafeAreaView style={safeAreaView}>
      <View style={mainView} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  mainView: {
    flex: 1,
  },
});
export default Buzz;
