import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import axios from 'axios';

// const initialState = [
//   { 
//     id: '1', 
//     title: "Learning Redux Toolkit", 
//     content: "I've heard good things.",
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       wow: 0,
//       heart: 0,
//       rocket: 0,
//       tea: 0
//     }
//   },
//   { 
//     id: '2', 
//     title: 'Slices...', 
//     content: 'The more I say slice, the more I want pizza.',
//     date: sub(new Date(), { minutes: 5 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       wow: 0,
//       heart: 0,
//       rocket: 0,
//       tea: 0
//     }
//   }
// ];

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
  posts: [],
  status: 'idle', //'idle' | 'loading' | 'suceeded' | 'failed'
  error: null
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL);
    return response.data;
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload);
      },
      prepare(title, content, userId) { // organizes the data
        return {
          payload: {
            id: nanoid(), // random ID
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              tea: 0
            }
          }
        }
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find(post => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    }
  },
  extraReducers(builder) {
    
  }
});

export const selectAllPosts = (state) => state.posts.posts;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;