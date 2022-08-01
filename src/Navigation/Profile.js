import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {DeviceEventEmitter, InteractionManager} from 'react-native';
const Stack = createStackNavigator();
import Colors from '../assets/Colors';
import Events from './Events';
import AccountScreen from '../ProfileView/AccountScreen';
import ProfileModals from './ProfileModals';

const Profile = ({route, navigation}) => {
  useEffect(() => {
    const showHideTabBar = (flag) => {
      InteractionManager.runAfterInteractions(() => {
        navigation.setOptions({tabBarVisible: flag});
      });
    };
    DeviceEventEmitter.addListener('showHideTabBar', showHideTabBar);
    return () =>
      DeviceEventEmitter.removeListener('showHideTabBar', showHideTabBar);
  }, []);

  const option = {
    headerBackTitle: null,
    headerTintColor: 'white',
    headerBackTitleStyle: {color: Colors.headingColor},
    headerStyle: {
      backgroundColor: Colors.headingColor,
      elevation: 0,
      shadowOpacity: 0,
    },
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'ProfileModals'}
        component={ProfileModals}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'AccountScreen'}
        component={AccountScreen}
        options={option}
      />
      <Stack.Screen
        name={'Events'}
        component={Events}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
};

export default Profile;
