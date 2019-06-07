import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';

import LoginScreen from './screens/login';
import SignupScreen from './screens/signup';
import HomeScreen from './screens/home';


const RootStack = createStackNavigator(
  {
    Login: LoginScreen,
    Signup: SignupScreen,
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Login'
  }
)

const AppContainer = createAppContainer(RootStack);

export default function App(){
  return (
    <AppContainer/>
  )
}
