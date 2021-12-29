import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  Home,
  DetailPage,
  OrderPage,
  PaymentPage,
  TicketResult,
  ProfilePage,
} from '../screens';

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        component={Home}
        name="Home"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={DetailPage}
        name="DetailPage"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={OrderPage}
        name="OrderPage"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={PaymentPage}
        name="PaymentPage"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={TicketResult}
        name="TicketResult"
        options={{headerShown: false}}
      />
      <Stack.Screen
        component={ProfilePage}
        name="ProfilePage"
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
