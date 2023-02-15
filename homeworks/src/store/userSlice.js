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

export const changeData = createAsyncThunk(
  "users/changeData",
      async (data) => {
        try {
          const response = await axios.put(endpoint + 'users/' + data.id, data)
          const result = await axios(endpoint + 'posts');
          result.data.forEach(async p => {
            if(p.user.id === data.id) {
              await axios.put(endpoint + 'posts/' + p.user.id, {...p, user: data});
            }
          });
          return response.data
        } catch (err) {
          console.log(err);
        }
  })

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = state.users.find(u => u.email === action.payload.email && u.password === action.payload.password);
    },
    signOut: state => {state.user = null}
  },
  extraReducers: {
    [getUsers.fulfilled]: (state, { payload }) => {
      state.users = payload
    },
    [changeData.fulfilled]: (state, { payload }) => {
       state.users = state.users.map(u => {
        if(u.id === payload.id) {
          return payload;
        } else {
          return u;
        }
       })
       state.user = state.users.find(u => u.id === state.user.id);
      }}
})

export const { signIn, signOut, changeAvatar, changeName, changeDescription } = userSlice.actions

export default userSlice.reducer