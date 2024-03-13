import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { useGetProfileImageQuery } from '../services/shopService';
import { setProfilePicture } from '../features/auth/authSlice';
import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';

const MainNavigator = () => {
  const { user, localId } = useSelector(state => state.authReducer.value);
  const { data, error, isLoading } = useGetProfileImageQuery(localId);
  const dispatch = useDispatch();

useEffect(() => {
  if (data) {
    dispatch(setProfilePicture(data.image));
  }
}, [data]);

  return(
  <NavigationContainer>
    { user ? <TabNavigator /> : <AuthNavigator />}
  </NavigationContainer>
  );
};

export default MainNavigator;