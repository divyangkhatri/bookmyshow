import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import Colors from '../assets/Colors';
import Events from './Events';
import AccountScreen from '../ProfileView/AccountScreen';
import ProfileModals from './ProfileModals';

const Profile = ({route, navigation}) => {
  React.useLayoutEffect(() => {
    if (
      (route && route.state && route.state.index > 0) ||
      (route &&
        route.state &&
        route.state.routes &&
        route.state.routes[0] &&
        route.state.routes[0].state &&
        route.state.routes[0].state.index > 0)
    ) {
      navigation.setOptions({tabBarVisible: false});
    } else {
      navigation.setOptions({tabBarVisible: true});
    }
  }, [navigation, route]);
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
