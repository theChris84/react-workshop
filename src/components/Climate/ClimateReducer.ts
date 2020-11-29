import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../App/AppState';

export type ClimateValue = {
  min: number;
  max: number;
  current: number;
};

export type ClimateState = {
  temperature: ClimateValue;
  humidity: ClimateValue;
};

export const createInitialClimateAppState = (): ClimateState => ({
  temperature: { min: +Infinity, max: -Infinity, current: Infinity },
  humidity: { min: +Infinity, max: -Infinity, current: Infinity },
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
  },
});

export const selectTemperature = (state: AppState) => state.climate.temperature;
export const selectHumitity = (state: AppState) => state.climate.humidity;
export const {
  setTemperature,
  setHumitity,
  resetClimate,
} = climateSlice.actions;

export default climateSlice.reducer;
