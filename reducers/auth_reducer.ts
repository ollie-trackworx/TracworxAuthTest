import { createStore } from 'redux';
import { AuthStatus } from '../enums/auth_state';
import { User } from '../model/user';
import { createSlice , configureStore} from '@reduxjs/toolkit';
const authSlice = createSlice({
    name: "Auth",
    initialState: {uid:"",authStatus:AuthStatus.Undetermined},
    reducers: {
        loginReducer: (state:User)=>{
            state.authStatus = AuthStatus.LoggedIn
        },
        logoutReducer: (state:User)=>{
            state.authStatus = AuthStatus.LoggedOut
        },
    }
})

export const {loginReducer, logoutReducer} = authSlice.actions;


export const store = configureStore({
    reducer: authSlice.reducer
  })

