import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../assets/Colors';

import ActivitiesScreen from '../Views/ActivitiesScreen';
import ActivitiesFilter from '../Views/ActivitiesFilter';
const PlayStack = createStackNavigator();
const Activities = ({route}) => {
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
        name={'ActivitiesScreen'}
        component={ActivitiesScreen}
        options={option}
        initialParams={{selectedCity: route.params.selectedCity}}
      />
      <PlayStack.Screen
        name={'ActivitiesFilter'}
        component={ActivitiesFilter}
        options={{headerShown: false}}
      />
    </PlayStack.Navigator>
  );
};
export default Activities;
