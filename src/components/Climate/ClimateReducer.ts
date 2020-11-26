import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum ReloadStateType {
  default,
  loading,
  error,
}

export type ClimateValue = {
  min: number;
  max: number;
  current: number;
};

export type ClimateAppState = {
  temperature: ClimateValue;
  humitity: ClimateValue;
  reloadState: ReloadStateType;
};

export const createInitialClimateAppState = (): ClimateAppState => ({
  temperature: { min: +Infinity, max: -Infinity, current: Infinity },
  humitity: { min: +Infinity, max: -Infinity, current: Infinity },
  reloadState: ReloadStateType.default,
});

const climateSlice = createSlice({
  name: 'climate',
  initialState: createInitialClimateAppState(),
  reducers: {
    setTemperature: (draft, action: PayloadAction<number>) => {
      const current = action.payload;
      const min = Math.min(draft.temperature.min, action.payload);
      const max = Math.max(draft.temperature.max, action.payload);
      draft.temperature.current = current;
      draft.temperature.min = min;
      draft.temperature.max = max;
    },
    setHumitity: (draft, action: PayloadAction<number>) => {
      const current = action.payload;
      const min = Math.min(draft.humitity.min, action.payload);
      const max = Math.max(draft.humitity.max, action.payload);
      draft.humitity.current = current;
      draft.humitity.min = min;
      draft.humitity.max = max;
    },
    setNormal: (draft) => {
      draft.reloadState = ReloadStateType.default;
    },
    setLoading: (draft) => {
      draft.reloadState = ReloadStateType.loading;
    },
    setError: (draft) => {
      draft.reloadState = ReloadStateType.error;
    },
  },
});

export const selectTemperature = (state: ClimateAppState) => state.temperature;
export const selectHumitity = (state: ClimateAppState) => state.humitity;
export const selectReloadState = (state: ClimateAppState) => state.reloadState;
export const { setTemperature, setHumitity } = climateSlice.actions;
export const { setNormal, setLoading, setError } = climateSlice.actions;

export default climateSlice.reducer;
