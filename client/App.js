import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';

import LoginScreen from './screens/login';
import SignupScreen from './screens/signup';
import HomeScreen from './screens/home';

import firebase from 'firebase';

const RootStack = createStackNavigator(
  {
    Login: LoginScreen,
    Signup: SignupScreen,
    Home : HomeScreen,
  },
  {
    initialRouteName: 'Login'
  }
)

const AppContainer = createAppContainer(RootStack);

class App extends React.Component {

  componentWillMount(){
    var firebaseConfig = {
          apiKey: "AIzaSyCeqMrr-ol6h3vhpHuRCtoax-7Feb4ipcA",
          authDomain: "reactnative-5ae71.firebaseapp.com",
          databaseURL: "https://reactnative-5ae71.firebaseio.com",
          projectId: "reactnative-5ae71",
          storageBucket: "reactnative-5ae71.appspot.com",
          messagingSenderId: "591855203691",
          appId: "1:591855203691:web:d35c8b6d35581828"
    };
    firebase.initializeApp(firebaseConfig);
  }

  render(){
    return (
      <AppContainer/>
    );
  }
}

export default App;

/*
export default function App(){
  return (
    <AppContainer/>
  )
}
*/
