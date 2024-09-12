import {SafeAreaView, Text} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../navigation/AuthStackNavigator';

type SignupScreenProps = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const Signup = ({}: SignupScreenProps) => {
  return (
    <SafeAreaView>
      <Text>Signup</Text>
    </SafeAreaView>
  );
};

export default Signup;
