import { AnyAction } from '@reduxjs/toolkit';

export const SET_TEMPERATURE = 'SetTemperature';
export const RESET_TEMPERATURE = 'ResetTemperature';
const SET_HUMITITY = 'SetHumitity';

export type ClimateAppActions = SetTemperatureAction | ResetTemperatureAction | AnyAction

type ResetTemperatureAction = {
    type: typeof RESET_TEMPERATURE,
    payload: undefined;
}

type SetTemperatureAction = {
    type: typeof SET_TEMPERATURE,
    payload: number
}

type SetHumitityAction = {
    type: typeof SET_TEMPERATURE,
    payload: number
}

type SensorData = {
    min: number,
    max: number,
    current: number
}

export type ClimateAppState = {
    temperature: SensorData,
    humitity: SensorData
}

export const setTemperature = (value: number): SetTemperatureAction => ({ type: SET_TEMPERATURE, payload: value })
export const resetTemperature = (): ResetTemperatureAction => ({ type: RESET_TEMPERATURE, payload: undefined })

export const createInitialClimateAppState = () => ({
    temperature: { min: -Infinity, max: Infinity, current: Infinity },
    humitity: { min: -Infinity, max: Infinity, current: Infinity }
});

export default function reducer(state: ClimateAppState = createInitialClimateAppState(), action: ClimateAppActions): ClimateAppState {
    switch (action.type) {
        case SET_TEMPERATURE:
            return {
                ...state,
                temperature: {
                    min: Math.min(state.temperature.min, action.payload),
                    max: Math.max(state.temperature.max, action.payload),
                    current: action.payload
                }
            }
        case RESET_TEMPERATURE:
            return {
                ...state,
                temperature: {
                    min: state.temperature.current,
                    max: state.temperature.current,
                    current: state.temperature.current
                }
            }
        default:
            return state;
    }
}
