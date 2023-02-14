import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null
}

const endpoint = 'http://localhost:3001/';

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: async (state, action) => {
      const result = await axios(endpoint + 'users');
      state.user = result.data.find(u => u.email === action.payload.email && u.password === action.payload.password)
      console.log(state.user);
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
  }
})

export const { signIn, signOut, changeEmail, changeAvatar, changeName, changeDescription } = userSlice.actions

export default userSlice.reducer