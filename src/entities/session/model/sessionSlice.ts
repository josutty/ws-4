import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { sessionExpired, type CurrentUser } from '@shared/api';

interface SessionState {
  user: CurrentUser | null;
  token: string | null;
  status: 'signed-out' | 'authenticated';
}

const initialState: SessionState = { user: null, token: null, status: 'signed-out' };

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    signedIn(state, action: PayloadAction<{ user: CurrentUser; token?: string }>) {
      state.user = action.payload.user;
      state.token = action.payload.token ?? null;
      state.status = 'authenticated';
    },
    signedOut: () => initialState,
  },
  extraReducers: (builder) => builder.addCase(sessionExpired, () => initialState),
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthenticated: (state) => state.status === 'authenticated',
  },
});

export const { signedIn, signedOut } = sessionSlice.actions;
