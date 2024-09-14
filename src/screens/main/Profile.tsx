import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../../navigation/MainStackNavigator';
import Container from '../../components/Container';
import {Avatar, Button, TextInput} from 'react-native-paper';
import {Alert, StyleSheet} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../redux/hooks/hook';
import {useTheme} from '@react-navigation/native';
import {logUserOut} from '../../redux/slice/UserSlice';

type ProfileScreenProps = NativeStackScreenProps<MainStackParamList, 'Profile'>;

const Profile = ({}: ProfileScreenProps) => {
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    Alert.alert(
      'Log out?',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          onPress: () => {
            dispatch(logUserOut());
          },
        },
      ],
      {cancelable: false},
    );
  };

  const {colors} = useTheme();
  return (
    <Container style={styles.container}>
      <Avatar.Icon
        size={100}
        icon="account"
        color="#B22222"
        style={styles.avatarIconBg}
      />

      <TextInput
        label={'Name'}
        editable={false}
        value={user.name}
        outlineColor={colors.border}
        activeOutlineColor={colors.primary}
        left={<TextInput.Icon icon={'account-circle'} color={colors.text} />}
        placeholder="johndoe@email.com"
        outlineStyle={styles.textInputOutline}
        mode="outlined"
        style={styles.textInput}
      />
      <TextInput
        label={'Email'}
        editable={false}
        value={user.email}
        outlineColor={colors.border}
        activeOutlineColor={colors.primary}
        left={<TextInput.Icon icon={'email'} color={colors.text} />}
        placeholder="johndoe@email.com"
        outlineStyle={styles.textInputOutline}
        mode="outlined"
        style={styles.textInput}
      />

      <Button
        onPress={handleLogout}
        mode="contained"
        elevation={5}
        contentStyle={[styles.btnCtn, {backgroundColor: colors.primary}]}
        style={styles.btn}>
        Log out
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  avatarIconBg: {
    backgroundColor: '#F9B3B3',
    marginTop: '25%',
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 30,
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
export default Profile;
