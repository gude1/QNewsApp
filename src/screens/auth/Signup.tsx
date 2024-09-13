import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../navigation/AuthStackNavigator';
import {Button, Text, TextInput} from 'react-native-paper';
import Container from '../../components/Container';
import {useTheme} from '@react-navigation/native';
type SignupScreenProps = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

const Signup = ({navigation}: SignupScreenProps) => {
  const {colors} = useTheme();
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <Container style={styles.container}>
      <Text style={styles.title} variant="headlineLarge">
        QuickCheck
      </Text>

      <Text style={styles.subtitle}>Create News Account</Text>

      <TextInput
        label={'Name'}
        outlineColor={colors.border}
        activeOutlineColor={colors.primary}
        keyboardType="name-phone-pad"
        placeholder="John Doe"
        left={<TextInput.Icon icon={'account-circle'} color={colors.text} />}
        outlineStyle={styles.textInputOutline}
        mode="outlined"
        style={styles.textInput}
      />

      <TextInput
        label={'Email'}
        outlineColor={colors.border}
        activeOutlineColor={colors.primary}
        keyboardType="email-address"
        left={<TextInput.Icon icon={'email'} color={colors.text} />}
        placeholder="johndoe@email.com"
        outlineStyle={styles.textInputOutline}
        mode="outlined"
        style={styles.textInput}
      />

      <TextInput
        outlineColor={colors.border}
        activeOutlineColor={colors.primary}
        label={'Password'}
        left={<TextInput.Icon icon="lock-outline" color={colors.text} />}
        keyboardType="default"
        right={
          <TextInput.Icon
            icon={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
            color={colors.text}
            onPress={() => setPasswordVisible(!passwordVisible)}
          />
        }
        secureTextEntry={!passwordVisible}
        placeholder="********"
        outlineStyle={styles.textInputOutline}
        mode="outlined"
        style={styles.textInput}
      />

      <View style={styles.descCtn}>
        <Text variant="bodySmall" style={styles.desc}>
          Aleady have an account?
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.desclink} variant="bodySmall">
            LOGIN
          </Text>
        </TouchableOpacity>
      </View>

      <Button
        onPress={() => {}}
        mode="contained"
        elevation={5}
        contentStyle={[styles.btnCtn, {backgroundColor: colors.primary}]}
        style={styles.btn}>
        Continue
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  title: {
    color: '#f54d07',
    fontWeight: '600',
    alignSelf: 'flex-start',
  },
  subtitle: {
    marginTop: 10,
    fontWeight: '400',
    fontSize: 20,
    alignSelf: 'flex-start',
  },
  textInput: {
    marginTop: 30,
    height: 52,
    width: '100%',
    backgroundColor: 'transparent',
  },
  textInputOutline: {
    borderRadius: 10,
  },
  descCtn: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  desc: {
    color: '#a3a3a3',
    fontSize: 15,
    marginRight: 5,
  },
  desclink: {
    fontSize: 15,
    fontWeight: '500',
    color: '#007bff',
  },
  btn: {
    marginTop: '25%',
    alignSelf: 'center',
    borderRadius: 10,
    maxWidth: 500,
    width: '90%',
  },
  btnCtn: {
    padding: 7,
  },
});
export default Signup;
