import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FilterScreen from '../Views/FilterScreen';
import FilterDetailScreen from '../Views/FilterDetailScreen';
const FilterStack = createStackNavigator();
const Filters = ({route}) => {
  return (
    <FilterStack.Navigator>
      <FilterStack.Screen
        name={'FilterScreen'}
        component={FilterScreen}
        options={{headerShown: false}}
        initialParams={route.params}
      />
      <FilterStack.Screen
        name={'FilterDetailScreen'}
        component={FilterDetailScreen}
        options={{headerShown: false}}
      />
    </FilterStack.Navigator>
  );
};
export default Filters;
