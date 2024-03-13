import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderAlter from '../components/HeaderAlter';
import Order from '../components/orders/Order';
import OrderDetail from '../components/orders/OrderDetail';

const Stack = createNativeStackNavigator();

const OrderNavigator = () => {
  return(
      <Stack.Navigator
        initialRouteName = "Order"
        screenOptions={
          { header: ({navigation, route}) => <HeaderAlter
            navigation={navigation}
            route={route}
            title={
              route.name === 'Order' ?
                'Órdenes' :
              route.name === 'OrderDetail' ?
                'Detalle de órden' :
                '¿¿??'
            } />}
        }
      >
        <Stack.Screen
          name="Order"
          component={Order}
        />
        <Stack.Screen
          name="OrderDetail"
          component={OrderDetail}
        />
      </Stack.Navigator>
  );
}

export default OrderNavigator;