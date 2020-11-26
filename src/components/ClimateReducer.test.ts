import climateReducer, { resetTemperature } from './ClimateReducer';
import { ClimateAppActions, ClimateAppState, createInitialClimateAppState, setTemperature, SET_TEMPERATURE } from './ClimateReducer';

let initialState: ClimateAppState;

test('climate action', () => {
    const value = 24;
    const action = setTemperature(value);

    expect(action).toEqual({
        type: SET_TEMPERATURE,
        payload: 24
    });
});

beforeEach(() => {
    initialState = createInitialClimateAppState()
});

function sut(state: ClimateAppState | undefined, action: ClimateAppActions) {
    return climateReducer(state, action);
}

describe('climate reducer should', () => {
    test('return initial state', () => {

        const newState: ClimateAppState = sut(undefined, { type: '@@init' });

        expect(newState).toEqual(initialState);
    });

    test('reduce min temperature', () => {
        const state = { ...initialState, temperature: { min: 15, max: 25, current: 10 } };

        const newState: ClimateAppState = sut(state, setTemperature(10));

        expect(newState.temperature.min).toEqual(10);
    });

    test('reduce max temperature', () => {
        const state = { ...initialState, temperature: { min: 5, max: 10, current: 0 } }

        const newState: ClimateAppState = sut(state, setTemperature(25));

        expect(newState.temperature.max).toEqual(25);
    });

    test('reduce current temperature', () => {
        const newState: ClimateAppState = sut(undefined, setTemperature(42));

        expect(newState.temperature.current).toEqual(42);
    });

    test('redeuce reset min and max temperature', () => {
        const state = { ...initialState, temperature: { min: 5, max: 34, current: 10 } }

        const newState: ClimateAppState = sut(state, resetTemperature());

        expect(newState.temperature.min).toEqual(10);
        expect(newState.temperature.max).toEqual(10);
        expect(newState.temperature.current).toEqual(10);
    });
});
