import {createAsyncThunk} from '@reduxjs/toolkit';
import hackernews from '../../config/hackernews';
import {FetchNewsAttributes, FetchNewsResponse} from '../types/hackernews';

export const fetchNews = createAsyncThunk<
  FetchNewsResponse,
  FetchNewsAttributes
>('quickcheck/fetchNews', async (param, thunkApi) => {
  try {
    const result = await hackernews.get(
      `/search?tags=story&attributesToRetrieve=title,url,author,created_at&page=${param.page}&hitsPerPage=${param.hitsPerPage}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    let res = result.data as FetchNewsResponse;

    return thunkApi.fulfillWithValue(res);
  } catch (err) {
    console.error('fetchNews', err);
    return thunkApi.rejectWithValue('');
  }
});
