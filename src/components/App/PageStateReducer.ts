import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './AppState';

export type PageDataState = {
  errorMessage?: string;
  state: PageState;
};

export enum PageState {
  default,
  loading,
  error,
}

const initialState: PageDataState = {
  errorMessage: undefined,
  state: PageState.default,
};

const pageSlice = createSlice({
  name: 'pageData',
  initialState,
  reducers: {
    setNormal: (draft) => {
      draft.state = PageState.default;
    },
    setLoading: (draft) => {
      draft.state = PageState.loading;
    },
    setError: (draft, action: PayloadAction<string>) => {
      draft.state = PageState.error;
      draft.errorMessage = action.payload;
    },
  },
});

export const { setNormal, setLoading, setError } = pageSlice.actions;
export const selectPageState = (state: AppState) => state.page.state;
export const selectPageStateError = (state: AppState) =>
  state.page.errorMessage;

export default pageSlice.reducer;
