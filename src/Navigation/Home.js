import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import HomeScreen from '../Views/HomeScreen';
import MonumentScreen from '../Views/MonumentScreen';
import MoviesScreen from '../Views/MoviesScreen';
import Plays from './Plays';
import Colors from '../assets/Colors';
import MapViewScreen from '../Views/MapViewScreen';
import DetailsMapScreen from '../Views/DetailsMapScreen';
import Events from './Events';
import UpComingMoviesDetailScreen from '../Views/UpComingMoviesDetailScreen';
import Sports from './Sports';
import Activities from './Activities';

const Home = () => {
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
        name={'HomeScreen'}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'MoviesScreen'}
        component={MoviesScreen}
        options={option}
      />
      <Stack.Screen
        name={'UpComingMoviesDetailScreen'}
        component={UpComingMoviesDetailScreen}
        options={option}
      />
      <Stack.Screen
        name={'Events'}
        component={Events}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name={'Plays'}
        component={Plays}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name={'Sports'}
        component={Sports}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name={'Activities'}
        component={Activities}
        options={{headerShown: false, gestureEnabled: false}}
      />

      <Stack.Screen name={'MonumentScreen'} component={MonumentScreen} />
      <Stack.Screen
        name={'MapViewScreen'}
        component={MapViewScreen}
        options={option}
      />
      <Stack.Screen
        name={'DetailsMapScreen'}
        component={DetailsMapScreen}
        options={option}
      />
    </Stack.Navigator>
  );
};

export default Home;
