import {configureStore} from '@reduxjs/toolkit';
import UserSlice from '../slice/UserSlice';
import {setupListeners} from '@reduxjs/toolkit/query';
import NewsListSlice from '../slice/NewsListSlice';

export const store = configureStore({
  reducer: {
    user: UserSlice,
    news: NewsListSlice,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
