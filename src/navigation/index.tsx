import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AuthStackNavigator from './AuthStackNavigator';
import FlashMessage from 'react-native-flash-message';
import BootSplash from 'react-native-bootsplash';
import * as LightTheme from '../assets/themes/LightTheme.json';
import {useAppSelector} from '../redux/hooks/hook';
import MainStackNavigator from './MainStackNavigator';

const Navigation = () => {
  const user = useAppSelector(state => state.user);

  const returnNavigator = () => {
    if (user.email && user.email) {
      return <MainStackNavigator />;
    }

    return <AuthStackNavigator />;
  };

  return (
    <NavigationContainer
      theme={LightTheme}
      onReady={() => {
        BootSplash.hide({fade: true});
      }}>
      {returnNavigator()}
      <FlashMessage statusBarHeight={45} />
    </NavigationContainer>
  );
};

export default Navigation;
