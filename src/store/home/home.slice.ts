import { createAsyncThunk, createSlice, Slice } from '@reduxjs/toolkit';
import { url } from '../../api/api';

export interface HomeState {
  reddit: RedditUser[];
}

export interface RedditPayload {
  payload: {
    reddit;
  };
}

export interface RedditUser {
  data: {
    subreddit: string;
    subreddit_subscribers: number;
    subreddit_type: string;
    title: string;
    id: number;
  };
  kind: string;
}

export const getRedditSlice = createAsyncThunk('GET_NEWS', async () => {
  const response = await fetch(url);
  const data = await response.json();
  const reddit = await data.data.children;
  const payload = {
    reddit,
  };
  return payload;
});

export const homeSlice: Slice<HomeState> = createSlice({
  name: 'HOME',
  initialState: {
    reddit: [] as RedditUser[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getRedditSlice.fulfilled,
      (state, action: RedditPayload) => {
        state.reddit = [...action.payload.reddit];
        return state;
      }
    );
  },
});
export default homeSlice.reducer;
