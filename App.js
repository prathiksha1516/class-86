import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './screens/WelcomeScreen'

import { AppTabNavigator } from './components/AppTabNavigator'
import {AppDrawerNavigaor} from './components/AppDrawerNavigaor'

export default function App() {
  return (
   <AppContainer/>
  );
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen: WelcomeScreen},
  Drawer :{screen:AppDrawerNavigaor}
})

const AppContainer =  createAppContainer(switchNavigator);
