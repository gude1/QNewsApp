import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AuthStackNavigator from './AuthStackNavigator';
import BootSplash from 'react-native-bootsplash';

const Navigation = () => {
  return (
    <NavigationContainer
      onReady={() => {
        BootSplash.hide({fade: true});
      }}>
      <AuthStackNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
