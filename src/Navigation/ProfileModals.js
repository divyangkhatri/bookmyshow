import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileHomeScreen from '../ProfileView/ProfileHomeScreen';
import OffersScreen from '../ProfileView/OffersScreen';
import LoginScreen from '../ProfileView/LoginScreen';
const ProfileModalStack = createStackNavigator();
const ProfileModals = () => {
  // const option = {
  //   headerTintColor: 'white',
  //   headerStyle: {
  //     backgroundColor: Colors.headingColor,
  //     elevation: 0,
  //     shadowOpacity: 0,
  //   },
  // };
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
