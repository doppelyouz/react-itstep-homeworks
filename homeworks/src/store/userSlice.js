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
    signIn: (state, action) => {
      if(action.payload.email === userData.email && action.payload.password === userData.password) {
        state.user = userData;
      }
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