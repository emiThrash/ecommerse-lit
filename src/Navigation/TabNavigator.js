import React, {useEffect, useState} from 'react';
import { StyleSheet, Image, View, useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../globals/styles/Colors';
import ShopNavigator from './ShopNavigator';
import CartNavigator from './CartNavigator';
import OrderNavigator from './OrderNavigator';
import MyProfileNavigator from './MyProfileNavigator';
import iconShop from '../../assets/icon-shop.png';
import iconCart from '../../assets/icon-cart.png';
import iconList from '../../assets/icon-list.png';
import iconUser from '../../assets/icon-user.png';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { height, width } = useWindowDimensions();
  const [ isLandscape, setIsLandscape ] = useState(false);

  useEffect(()=>{
    if(width > height){
      setIsLandscape(true);
    }else{
      setIsLandscape(false);
    }
  }, [height, width]);

  return(
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: isLandscape ? stylesTabNavigator.tabBarLandscape : stylesTabNavigator.tabBar
      }}
    >
      <Tab.Screen
        name='ShopTab'
        component={ShopNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={focused ? stylesTabNavigator.buttonFocused : stylesTabNavigator.button}>
                <Image source={iconShop} style={isLandscape ? stylesTabNavigator.iconLandscape : stylesTabNavigator.icon} />
              </View>
            );
          }
        }} />
      <Tab.Screen
        name='CartTab'
        component={CartNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={focused ? stylesTabNavigator.buttonFocused : stylesTabNavigator.button}>
                <Image source={iconCart} style={isLandscape ? stylesTabNavigator.iconLandscape : stylesTabNavigator.icon} />
              </View>
            );
          }
        }} />
      <Tab.Screen
        name='OrderTab'
        component={OrderNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={focused ? stylesTabNavigator.buttonFocused : stylesTabNavigator.button}>
                <Image source={iconList} style={isLandscape ? stylesTabNavigator.iconLandscape : stylesTabNavigator.icon} />
              </View>
            );
          }
        }} />
      <Tab.Screen
        name='MyProfileTab'
        component={MyProfileNavigator}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={focused ? stylesTabNavigator.buttonFocused : stylesTabNavigator.button}>
                <Image source={iconUser} style={isLandscape ? stylesTabNavigator.iconLandscape : stylesTabNavigator.icon} />
              </View>
            );
          }
        }} />
    </Tab.Navigator>
  );
}

const stylesTabNavigator = StyleSheet.create({
  tabBar: {
    flex: 0,
    backgroundColor: Colors.coralMain,
    shadowColor: 'black',
    elevation: 4,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 5,
    height: 60
  },
  tabBarLandscape: {
    flex: 0,
    backgroundColor: Colors.greenMain,
    shadowColor: 'black',
    elevation: 4,
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    borderRadius: 5,
    height: 40
  },
  buttonFocused: {
    padding: 5,
    backgroundColor: Colors.greenAlter,
    borderRadius: 10
  },
  button: {
    padding: 5,
    backgroundColor: 'transparent',
  },
  icon: {
    width: 26,
    height: 26
  },
  iconLandscape: {
    width: 20,
    height: 20
  },
});

export default TabNavigator;