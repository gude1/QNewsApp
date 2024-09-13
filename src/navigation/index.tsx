import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AuthStackNavigator from './AuthStackNavigator';
import FlashMessage from 'react-native-flash-message';
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
      <FlashMessage statusBarHeight={45} />
    </NavigationContainer>
  );
};

export default Navigation;
