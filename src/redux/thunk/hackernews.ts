import {createAsyncThunk} from '@reduxjs/toolkit';
import hackernews from '../../config/hackernews';
import {FetchNewsAttributes} from '../types/hackernews';
import {setNews, updateNews} from '../slice/NewsListSlice';

export const fetchNews = createAsyncThunk<string, FetchNewsAttributes>(
  'quickcheck/fetchNews',
  async (param, thunkApi) => {
    try {
      const result = await hackernews.get(
        `/search?tags=story&attributesToRetrieve=title,url,author,created_at&page=${
          param.page || 1
        }&hitsPerPage=${param.hitsPerPage || 10}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (param.reset) {
        thunkApi.dispatch(setNews(result.data.hits));
      } else {
        thunkApi.dispatch(updateNews(result.data.hits));
      }

      return thunkApi.fulfillWithValue('News retrieved!');
    } catch (err) {
      console.error('fetchNews', err);
      return thunkApi.rejectWithValue('Failed to fetch news, please try again');
    }
  },
);
