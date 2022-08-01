import React, {useEffect, useLayoutEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DeviceEventEmitter} from 'react-native';
import ProfileHomeScreen from '../ProfileView/ProfileHomeScreen';
import OffersScreen from '../ProfileView/OffersScreen';
import LoginScreen from '../ProfileView/LoginScreen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
const ProfileModalStack = createStackNavigator();

const ProfileModals = ({route, navigation}) => {
  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? '';
    if (routeName === '' || routeName === 'ProfileHomeScreen') {
      DeviceEventEmitter.emit('showHideTabBar', true);
    } else {
      DeviceEventEmitter.emit('showHideTabBar', false);
    }
  }, [route, navigation]);

  return (
    <ProfileModalStack.Navigator mode="modal">
      <ProfileModalStack.Screen
        name={'ProfileHomeScreen'}
        component={ProfileHomeScreen}
        options={{headerShown: false}}
      />
      <ProfileModalStack.Screen
        name={'OffersScreen'}
        component={OffersScreen}
        options={{headerShown: false}}
      />
      <ProfileModalStack.Screen
        name={'LoginScreen'}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
    </ProfileModalStack.Navigator>
  );
};
export default ProfileModals;
