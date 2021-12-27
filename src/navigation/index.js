import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import SplashScreen from '../screens/SplashScreen';
import AppScreen from './app';
import AuthScreen from './auth';

const Stack = createNativeStackNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          component={SplashScreen}
          name="SplashScreen"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={AuthScreen}
          name="AuthScreen"
          options={{headerShown: false}}
        />
        <Stack.Screen
          component={AppScreen}
          name="AppScreen"
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
