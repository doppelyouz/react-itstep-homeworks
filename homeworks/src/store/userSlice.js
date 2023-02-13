import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null
}

const userData = {
    email: "1",
    password: "1",
    name: "terminal",
    avatar: "https://sun9-63.userapi.com/impg/ukyH6Yp7ge6FhkXCo-z8CV6KlCyJUENO3hGM2A/5hFqoJn97iM.jpg?size=564x564&quality=96&sign=37eeb9c995781c365df57f8023497f0b&c_uniq_tag=VKfhjMJ9V1ZAJ4ZpgQYnOA9tSx1_aBnTCMroRkhchHA&type=album"
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