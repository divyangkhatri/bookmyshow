import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../assets/Colors';
import SportsScreen from '../Views/SportsScreen';
import SportFilter from '../Views/SportFilter';
const PlayStack = createStackNavigator();
const Sports = ({route}) => {
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
        name={'SportsScreen'}
        component={SportsScreen}
        options={option}
        initialParams={{selectedCity: route.params.selectedCity}}
      />
      <PlayStack.Screen
        name={'SportFilter'}
        component={SportFilter}
        options={{headerShown: false}}
      />
    </PlayStack.Navigator>
  );
};
export default Sports;
