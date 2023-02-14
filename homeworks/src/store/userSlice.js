import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null
}

const endpoint = 'http://localhost:3001/';

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async () => {
    const res = await fetch(endpoint + 'users').then(
    (data) => data.json()
  )
  return res
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = state.users.find(u => u.email === action.payload.email && u.password === action.payload.password);
    },
    signOut: state => {state.user = null},
    changeEmail: (state, action) => {
        state.user = {
          ...state.user,
          email: action.payload
        }
    },
    changeAvatar: (state, action) => {
        state.user = {
          ...state.user,
          avatar: action.payload
        }
    },
    changeName: (state, action) => {
        state.user = {
          ...state.user,
          name: action.payload
        }
    },
    changeDescription: (state, action) => {
        state.user = {
          ...state.user,
          description: action.payload
        }
    }
  },
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.loading = true
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.loading = false
      state.users = payload
    },
    [getUsers.rejected]: (state) => {
      state.loading = false
    },
  },
})

export const { signIn, signOut, changeEmail, changeAvatar, changeName, changeDescription } = userSlice.actions

export default userSlice.reducer