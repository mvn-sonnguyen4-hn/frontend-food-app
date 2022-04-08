import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { LoginRequestDef, AUTH_FEATURE_KEY } from "@app/features/auth/auth";

import { authLogin } from "../api/auth.api";
import {
  saveTokens,
  clearTokens,
  authErrorHelper,
} from "../helpers/auth.helpers";
import { InitialStateDef } from "../types/auth.types";
const initialState: InitialStateDef = {
  user: null,
  isAuthenticated: false,
  error: false,
  loading: false,
};

export const login = createAsyncThunk(
  `${AUTH_FEATURE_KEY}/local`,
  async (values: LoginRequestDef, { rejectWithValue }) => {
    try {
      const response = await authLogin(values);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: AUTH_FEATURE_KEY,
  initialState,
  reducers: {
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      clearTokens();
    },
  },
  extraReducers: (builder) => {
    /**
     * LOGIN
     */
    builder.addCase(login.pending, (state) => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const token = action.payload.jwt;
      const {first_name,last_name, username, email,phonenumber,address,role } = action.payload.user;
      state.loading = false;
      state.isAuthenticated = true;
      state.user = {
        first_name,
        last_name,
        username,
        email,
        phonenumber,
        address,
        role,
      };
      if (token) {
        saveTokens({ token });
      }
    });
    builder.addCase(login.rejected, (state) => {
      authErrorHelper(state);
      clearTokens();
    });
  },
});

export const { clearUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
