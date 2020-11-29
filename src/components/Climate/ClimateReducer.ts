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
  humidity: ClimateValue;
  reloadState: ReloadStateType;
};

export const createInitialClimateAppState = (): ClimateAppState => ({
  temperature: { min: +Infinity, max: -Infinity, current: Infinity },
  humidity: { min: +Infinity, max: -Infinity, current: Infinity },
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
      draft.humidity.current = action.payload;
      draft.humidity.min = Math.min(draft.humidity.min, action.payload);
      draft.humidity.max = Math.max(draft.humidity.max, action.payload);
    },
    resetClimate: (draft) => {
      const t = draft.temperature.current;
      const h = draft.humidity.current;
      draft.temperature.min = t;
      draft.temperature.max = t;
      draft.humidity.min = h;
      draft.humidity.max = h;
      /* alternative to set a whole new state
      return {
        temperature: { min: t, max: t, current: t },
        humidity: { min: h, max: h, current: h },
        reloadState: ReloadStateType.default,
      }; */
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
export const selectHumitity = (state: ClimateAppState) => state.humidity;
export const selectReloadState = (state: ClimateAppState) => state.reloadState;
export const {
  setTemperature,
  setHumitity,
  resetClimate,
} = climateSlice.actions;
export const { setNormal, setLoading, setError } = climateSlice.actions;

export default climateSlice.reducer;
