import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Colors from '../assets/Colors';
import PlaysScreen from '../Views/PlaysScreen';
import PlaysFilter from '../Views/PlaysFilter';
const PlayStack = createStackNavigator();
const Plays = ({route}) => {
  const option = {
    headerTintColor: 'white',
    // headerBackTitleStyle: {color: Colors.headingColor},
    headerStyle: {
      backgroundColor: Colors.headingColor,
      elevation: 0,
      shadowOpacity: 0,
    },
  };
  return (
    <PlayStack.Navigator mode="modal">
      <PlayStack.Screen
        name={'PlaysScreen'}
        component={PlaysScreen}
        options={option}
        initialParams={{selectedCity: route.params.selectedCity}}
      />
      <PlayStack.Screen
        name={'PlaysFilter'}
        component={PlaysFilter}
        options={{headerShown: false}}
      />
    </PlayStack.Navigator>
  );
};
export default Plays;
