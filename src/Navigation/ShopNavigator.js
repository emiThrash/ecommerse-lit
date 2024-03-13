import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from '../components/Header';
import Home from '../components/Home';
import ProductList from '../components/products/ProductList';
import ProductDetail from '../components/products/ProductDetail';

const Stack = createNativeStackNavigator();

const ShopNavigator = () => {
  return(
    <Stack.Navigator
      initialRouteName = "Home"
      screenOptions={
        { header: ({navigation}) => <Header navigation={navigation} />}
      }
    >
      <Stack.Screen
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="ProductList"
        component={ProductList}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
      />
    </Stack.Navigator>
  );	
}

export default ShopNavigator;