import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Constants from 'expo-constants';
import { TabParamList } from '../types';
import ChooseGroup from "../screens/ChooseGroup";

export default function ClassicNavigator() {
  return (<TabNavigator/>);
}

const TabStack = createStackNavigator<TabParamList>();

function TabNavigator() {
  return (
    <TabStack.Navigator>
      <TabStack.Screen
        name="TabScreen"
        component={ChooseGroup}
        options={{ headerTitle: Constants.manifest.name }}
      />
    </TabStack.Navigator>
  );
}

