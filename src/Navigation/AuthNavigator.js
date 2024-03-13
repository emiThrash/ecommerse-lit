import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderAlter from '../components/HeaderAlter';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return(
      <Stack.Navigator
        initialRouteName = "Login"
        screenOptions={
          { header: ({navigation, route}) => <HeaderAlter
            navigation={navigation}
            route={route}
            title={
              route.name === 'Login' ?
                'Inicio de sesión' :
                route.name === 'Signup' ?
                'Registro' :
                '¿¿??'
            } />}
        }
      >
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
        />
      </Stack.Navigator>
  );	
}

export default AuthNavigator;