import React from 'react';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
  useRoute,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native';

const Tab = createBottomTabNavigator();

import Home from './Home';
import Buzz from '../Views/Buzz';
import Profile from '../Navigation/Profile';
import Store from './Store';
import Colors from '../assets/Colors';
export default function Routing() {
  const {iconSize} = styles;
  return (
    <NavigationContainer>
      <SafeAreaView style={{backgroundColor: Colors.headingColor}} />
      <StatusBar backgroundColor={'#2E3145'} barStyle={'light-content'} />
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{activeTintColor: '#3379F6'}}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={({route}) => ({
            tabBarLabel: 'Home',
            tabBarIcon: ({focused}) => {
              let imgName = focused
                ? require('../assets/images/icon/TabBarImages/Home_Selected.png')
                : require('../assets/images/icon/TabBarImages/Home.png');
              return <Image source={imgName} style={iconSize} />;
            },
            tabBarVisible: ((route) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? '';
              if (routeName === 'HomeScreen' || routeName === '') {
                return true;
              }
              return false;
            })(route),
          })}
        />
        <Tab.Screen
          name="Store"
          component={Store}
          options={(navigation) => ({
            unmountOnBlur: true,
            tabBarVisible: false,
            tabBarLabel: 'Store',
            tabBarIcon: ({focused}) => {
              let imgName = focused
                ? require('../assets/images/icon/TabBarImages/Store_Selected.png')
                : require('../assets/images/icon/TabBarImages/Store.png');
              return <Image source={imgName} style={iconSize} />;
            },
          })}
        />
        <Tab.Screen
          name="Buzz"
          component={Buzz}
          options={{
            tabBarLabel: 'Buzz',
            tabBarIcon: ({focused}) => {
              let imgName = focused
                ? require('../assets/images/icon/TabBarImages/Buzz_Selected.png')
                : require('../assets/images/icon/TabBarImages/Buzz.png');
              return <Image source={imgName} style={iconSize} />;
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={({route}) => ({
            tabBarLabel: 'Profile',
            tabBarIcon: ({focused}) => {
              let imgName = focused
                ? require('../assets/images/icon/TabBarImages/Profile_Selected.png')
                : require('../assets/images/icon/TabBarImages/Profile.png');
              return <Image source={imgName} style={iconSize} />;
            },
            tabBarVisible: ((route) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? '';
              if (routeName === 'ProfileModals' || routeName === '') {
                return true;
              }
              return false;
            })(route),
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  iconSize: {
    height: 28,
    width: 28,
  },
});
