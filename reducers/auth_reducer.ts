import { AuthStatus } from '../enums/auth_state';
import { User } from '../model/user';
import { createSlice } from '@reduxjs/toolkit';
export const authSlice = createSlice({
  name: 'Auth',
  initialState: { uid: '', authStatus: AuthStatus.Undetermined },
  reducers: {
    loginReducer: (state, action: { payload: User; type: string }) => {
      state.authStatus = action.payload.authStatus;
    },
    logoutReducer: (state: User) => {
      state.authStatus = AuthStatus.LoggedOut;
    },
  },
});

export const { loginReducer, logoutReducer } = authSlice.actions;
