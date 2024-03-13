import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HeaderAlter from '../components/HeaderAlter';
import MyProfile from '../components/myProfile/MyProfile';
import ImageSelector from '../components/myProfile/ImageSelector';
import AddressList from '../components/myProfile/AddressList';
import LocationSelector from '../components/myProfile/LocationSelector';

const Stack = createNativeStackNavigator();

const MyProfileNavigator = () => {
  return(
      <Stack.Navigator
        initialRouteName = "MyProfile"
        screenOptions={
          { header: ({navigation, route}) => <HeaderAlter
            navigation={navigation}
            route={route}
            title={
              route.name === 'MyProfile' ?
                'Mi perfil' :
              route.name === 'ImageSelector' ?
                'Foto de perfil' :
              route.name === 'AddressList' ?
                'Ubicaciones' :
              route.name === 'LocationSelector' ?
                'Ubicación' :
                '¿¿??'
            } />}
        }
      >
        <Stack.Screen
          name="MyProfile"
          component={MyProfile}
        />
        <Stack.Screen
          name="ImageSelector"
          component={ImageSelector}
        />
        <Stack.Screen
          name="AddressList"
          component={AddressList}
        />
        <Stack.Screen
          name="LocationSelector"
          component={LocationSelector}
        />
      </Stack.Navigator>
  );	
}

export default MyProfileNavigator;