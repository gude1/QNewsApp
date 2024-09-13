import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AuthStackNavigator from './AuthStackNavigator';
import BootSplash from 'react-native-bootsplash';
import * as LightTheme from '../assets/themes/LightTheme.json';

const Navigation = () => {
  return (
    <NavigationContainer
      theme={LightTheme}
      onReady={() => {
        BootSplash.hide({fade: true});
      }}>
      <AuthStackNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
