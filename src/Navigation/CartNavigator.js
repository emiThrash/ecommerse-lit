import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderAlter from '../components/HeaderAlter';
import Cart from '../components/cart/Cart';

const Stack = createNativeStackNavigator();

const CartNavigator = () => {
  return(
      <Stack.Navigator
        initialRouteName = "Cart"
        screenOptions={
          { header: ({navigation, route}) => <HeaderAlter
            navigation={navigation}
            route={route}
            title={
              route.name === 'Cart' ?
                'Carrito' :
                '¿¿??'
            } />}
        }
      >
        <Stack.Screen
          name="Cart"
          component={Cart}
        />
      </Stack.Navigator>
  );	
}

export default CartNavigator;