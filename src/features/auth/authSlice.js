import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    value: {
      user: null,
      token: null,
      localId: null,
      profilePicture: null,
      profileLocation: null
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.value = {
        user: action.payload.email,
        token: action.payload.idToken,
        localId: action.payload.localId,
      };
    },
    clearUser: (state) => (state.value = { user: null, token: null, localId: null, profilePicture: null, profileLocation: {latitude: "", longitude: ""} }),
    setProfilePicture: (state, action) => {
      state.value = {
        ...state.value,
        profilePicture: action.payload
      };
    },
    setProfileLocation: (state, action) => {
      state.value = {
        ...state.value,
        profileLocation: action.payload
      };
    },
  }
});

export const { setUser, clearUser, setProfilePicture, setProfileLocation } = authSlice.actions;
export default authSlice.reducer;