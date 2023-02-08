import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null
}

const userData = {
    email: "1",
    password: "1"
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn: state => state.user = userData,
    signOut: state => state.user = null,
  }
})

export const { signIn, signOut } = userSlice.actions

export default userSlice.reducer