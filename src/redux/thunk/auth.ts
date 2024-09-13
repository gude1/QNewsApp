import {createAsyncThunk} from '@reduxjs/toolkit';
import {LoginAttributes, LoginResponse, SignupAttributes} from '../types/auth';
import {
  checkIfEmailExists,
  fetchUserByEmailAndPassword,
  insertUser,
} from '../../config/sqlite';
import {setUser} from '../slice/UserSlice';

export const signUp = createAsyncThunk<string, SignupAttributes>(
  'quickcheck/signUp',
  async (param, thunkApi) => {
    try {
      const emailexists = await checkIfEmailExists(param.email);
      if (emailexists) {
        return thunkApi.rejectWithValue('Email is taken');
      }
      const result = await insertUser(param.email, param.name, param.password);
      if (!result) {
        return thunkApi.rejectWithValue('Invalid email or password');
      }
      return thunkApi.fulfillWithValue('Sign up success');
    } catch (err) {
      console.error('signup err', err);
      return thunkApi.rejectWithValue('Request failed please try again');
    }
  },
);

export const logIn = createAsyncThunk<LoginResponse, LoginAttributes>(
  'quickcheck/logIn',
  async (param, thunkApi) => {
    try {
      const result = await fetchUserByEmailAndPassword(
        param.email,
        param.password,
      );

      if (result) {
        thunkApi.dispatch(
          setUser({
            name: result.name,
            email: result.email,
          }),
        );
        return thunkApi.fulfillWithValue(result);
      }
      return thunkApi.rejectWithValue('Invalid username or password');
    } catch (err) {
      console.error('signup err', err);
      return thunkApi.rejectWithValue('Request failed please try again');
    }
  },
);
