import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import NewsList from '../screens/main/NewsList';
import Profile from '../screens/main/Profile';

export type MainStackParamList = {
  News: undefined;
  Profile: undefined;
};

const MainStack = createNativeStackNavigator<MainStackParamList>();

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        orientation: 'portrait',
      }}>
      <MainStack.Screen name="News" component={NewsList} />
      <MainStack.Screen name="Profile" component={Profile} />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
