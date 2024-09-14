import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../navigation/AuthStackNavigator';
import {Button, Text, TextInput} from 'react-native-paper';
import Container from '../../components/Container';
import {useTheme} from '@react-navigation/native';
import {InputState} from '../../types';
import {useAppDispatch} from '../../redux/hooks/hook';
import {logIn} from '../../redux/thunk/auth';
import {showMessage} from 'react-native-flash-message';

type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const Login = ({navigation}: LoginScreenProps) => {
  const {colors} = useTheme();
  const [isloading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailInput, setEmailInput] = useState<InputState>({
    value: '',
    error: '',
  });
  const [passwordInput, setPasswordInput] = useState<InputState>({
    value: '',
    error: '',
  });

  const handleLoginSubmit = async () => {
    try {
      if (!emailInput.value || !passwordInput.value) {
        return;
      }
      setIsLoading(true);

      const result = await dispatch(
        logIn({
          email: emailInput.value,
          password: passwordInput.value,
        }),
      );
      const {meta, payload} = result;
      if (meta.requestStatus === 'rejected') {
        showMessage({
          message: `${payload}`,
          type: 'danger',
          duration: 2000,
        });
        return;
      }
      setEmailInput({error: '', value: ''});
      setPasswordInput({error: '', value: ''});

      showMessage({
        message: 'Login success',
        type: 'success',
        duration: 2000,
      });
    } catch (err) {
      console.error('Error:', err);
      showMessage({
        message: 'Request failed, please try again',
        type: 'danger',
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container style={styles.container}>
      <Image
        source={require('../../assets/images/quickcheck.png')}
        style={styles.logo}
      />
      <Text style={styles.title} variant="headlineLarge">
        QuickCheck
      </Text>

      <Text style={styles.subtitle}>Login to News Account</Text>

      <TextInput
        label={'Email'}
        error={emailInput.error ? true : false}
        value={emailInput.value}
        onChangeText={txt =>
          setEmailInput(obj => {
            return {...obj, value: txt, error: ''};
          })
        }
        outlineColor={colors.border}
        activeOutlineColor={colors.primary}
        keyboardType="email-address"
        left={<TextInput.Icon icon={'email'} color={colors.text} />}
        placeholder="johndoe@email.com"
        outlineStyle={styles.textInputOutline}
        mode="outlined"
        style={styles.textInput}
      />
      {emailInput.error && (
        <Text style={styles.textinputerr}>{emailInput.error}</Text>
      )}

      <TextInput
        outlineColor={colors.border}
        error={passwordInput.error ? true : false}
        activeOutlineColor={colors.primary}
        label={'Password'}
        value={passwordInput.value}
        onChangeText={txt =>
          setPasswordInput(obj => {
            return {...obj, value: txt, error: ''};
          })
        }
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
      {passwordInput.error && (
        <Text style={styles.textinputerr}>{passwordInput.error}</Text>
      )}
      <View style={styles.descCtn}>
        <Text variant="bodySmall" style={styles.desc}>
          Don't have an account?
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.desclink} variant="bodySmall">
            SIGN UP
          </Text>
        </TouchableOpacity>
      </View>

      <Button
        onPress={handleLoginSubmit}
        loading={isloading}
        disabled={isloading}
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
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  subtitle: {
    marginTop: 10,
    fontWeight: '400',
    color: '#000',
    fontSize: 20,
    alignSelf: 'flex-start',
  },
  textInput: {
    marginTop: 30,
    height: 52,
    width: '100%',
    backgroundColor: 'transparent',
  },
  textinputerr: {
    color: '#F60D0E',
    marginTop: 10,
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
    borderRadius: 10,
    alignSelf: 'center',
    maxWidth: 500,
    width: '90%',
  },
  btnCtn: {
    padding: 7,
  },
  logo: {
    width: 100,
    height: 85,
  },
});

export default Login;
