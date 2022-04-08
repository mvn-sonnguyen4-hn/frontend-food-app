import { RegisterRequestDef } from "./../types/auth.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { LoginRequestDef, AUTH_FEATURE_KEY } from "@app/features/auth/auth";

import { authLogin, authRegister, autoLogin } from "../api/auth.api";
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
  `${AUTH_FEATURE_KEY}/login`,
  async (values: LoginRequestDef, { rejectWithValue }) => {
    try {
      const response = await authLogin(values);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const register = createAsyncThunk(
  `${AUTH_FEATURE_KEY}/register`,
  async (values: RegisterRequestDef, { rejectWithValue }) => {
    try {
      const response = await authRegister(values);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const autoLoginUser = createAsyncThunk(
  `${AUTH_FEATURE_KEY}/autoLogin`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await autoLogin();
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
      const {
        first_name,
        last_name,
        username,
        email,
        phonenumber,
        address,
        role,
      } = action.payload.user;
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
    /**
     * REGISTER
     */
    builder.addCase(register.pending, (state) => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      const token = action.payload.jwt;
      const {
        first_name,
        last_name,
        username,
        email,
        phonenumber,
        address,
        role,
      } = action.payload.user;
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
    builder.addCase(register.rejected, (state) => {
      authErrorHelper(state);
      clearTokens();
    });
    /**
     * AUTO LOGIN
     */
    builder.addCase(autoLoginUser.pending, (state) => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(autoLoginUser.fulfilled, (state, action) => {
      const token = action.payload.jwt;
      const {
        first_name,
        last_name,
        username,
        email,
        phonenumber,
        address,
        role,
      } = action.payload.user;
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
    builder.addCase(autoLoginUser.rejected, (state) => {
      authErrorHelper(state);
      clearTokens();
    });
  },
});

export const { clearUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
