import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Constants from 'expo-constants';
import { TabParamList } from '../types';
import ChooseGroup from "../screens/ChooseGroup";
import Start from "../screens/Start";
import ListSubjects from "../screens/ListSubjects";
import Settings from '../screens/Settings';
import SettingsSubgroups from "../screens/SettingsSubgroups";
import Subject from "../screens/Subject";
import Login from "../screens/Login";
import WelcomeScreen from "../screens/WelcomeScreen";

export default function ClassicNavigator() {
  return (<TabNavigator/>);
}

const TabStack = createStackNavigator<TabParamList>();

function TabNavigator() {
  return (
    <TabStack.Navigator screenOptions={{
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        height: 100,
      },
    }}>
      <TabStack.Screen
        name="Start"
        component={Start}
        options={{
          headerTitle: Constants.manifest.name,
          gestureEnabled: false,
        }}
      />
      <TabStack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{
          headerTitle: Constants.manifest.name,
          gestureEnabled: false,
        }}
      />
      <TabStack.Screen
        name="TabScreen"
        component={ChooseGroup}
        options={{
          headerTitle: Constants.manifest.name,
          gestureEnabled: false,
        }}
      />
      <TabStack.Screen
        name="ListSubjects"
        component={ListSubjects}
        options={{
          headerTitle: Constants.manifest.name,
          gestureEnabled: false,
        }}
      />
      <TabStack.Screen
        name="Settings"
        component={Settings}
        options={{ headerTitle: "Settings" }}
      />
      <TabStack.Screen
        name="Subject"
        component={Subject}
        options={{ headerTitle: "Subject" }}
      />
      <TabStack.Screen
        name="Login"
        component={Login}
        options={{ headerTitle: "Login" }}
      />
      <TabStack.Screen
        name="SettingsSubgroups"
        component={SettingsSubgroups}
        options={{ headerTitle: "SettingsSubgroups" }}
      />
    </TabStack.Navigator>
  );
}

