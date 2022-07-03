import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import HomeScreen from '../Views/HomeScreen';
import StoreDetail from '../Views/StoreDetail';
const Store = ({route, navigation}) => {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name={'HomeScreen'}
        component={HomeScreen}
        initialParams={{mode: true}}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'StoreDetail'}
        component={StoreDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Store;
