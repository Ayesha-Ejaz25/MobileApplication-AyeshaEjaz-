import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Categories from '../screens/Categories';
import Summer from '../screens/Summer';
import Winter from '../screens/Winter';
import Perfumes from '../screens/Perfumes';
import Sale from '../screens/Sale';
import ProductDetail from '../screens/ProductDetail';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Summer" component={Summer} />
      <Stack.Screen name="Winter" component={Winter} />
      <Stack.Screen name="Perfumes" component={Perfumes} />
      <Stack.Screen name="Sale" component={Sale} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
}
