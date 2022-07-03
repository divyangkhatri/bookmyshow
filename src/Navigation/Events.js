import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import EventsScreen from '../Views/EventsScreen';
import Filters from './Filters';
import Colors from '../assets/Colors';
const EventStack = createStackNavigator();
const Events = ({route}) => {
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
    <EventStack.Navigator mode="modal">
      <EventStack.Screen
        name={'EventsScreen'}
        component={EventsScreen}
        options={option}
        initialParams={{selectedCity: route.params.selectedCity}}
      />
      <EventStack.Screen
        name={'Filters'}
        component={Filters}
        options={{headerShown: false}}
      />
    </EventStack.Navigator>
  );
};
export default Events;
