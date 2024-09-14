import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {Hit} from '../types/hackernews';
import {logUserOut} from './UserSlice';

type NewsState = {
  list: Hit[];
};

const initialState: NewsState = {
  list: [],
};

export const NewsListSlice = createSlice({
  name: 'news',
  initialState,
  extraReducers(builder) {
    builder.addCase(logUserOut.type, () => {
      return initialState;
    });
  },
  reducers: {
    setNews: (state: NewsState, action: PayloadAction<Hit[]>) => {
      if (action.payload) {
        state.list = action.payload;
      }
    },
    updateNews: (state: NewsState, action: PayloadAction<Hit[]>) => {
      if (action.payload) {
        state.list = state.list.concat(action.payload);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {setNews, updateNews} = NewsListSlice.actions;

export default NewsListSlice.reducer;
