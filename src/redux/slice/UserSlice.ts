import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export type UserState = {
  email: string;
  name: string;
};

const initialState: UserState = {
  email: '',
  name: '',
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<UserState>) => {
      return {...state, ...action.payload};
    },
    logUserOut: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUser, logUserOut} = UserSlice.actions;

export default UserSlice.reducer;
