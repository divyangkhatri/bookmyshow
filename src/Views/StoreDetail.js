import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
const StoreDetail = ({navigation}) => {
  const {safeAreaView, mainView} = styles;
  if (!useIsFocused()) {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 220);
  }
  return (
    <SafeAreaView style={safeAreaView}>
      <View style={mainView}>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
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
export default StoreDetail;
