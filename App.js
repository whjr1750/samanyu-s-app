import * as React from 'react';
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import Login from './screens/login';
import DashboardScreen from './screens/dashboard';
import LoadingScreen from './screens/loading';

import firebase from 'firebase';
import { firebaseConfig } from './config';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app()
}

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen: LoadingScreen,
  Login: Login,
  DashboardScreen: DashboardScreen
});

const AppNavigator = createAppContainer(AppSwitchNavigator);

export default function App() {
  return (
    <AppNavigator />
  )
}
