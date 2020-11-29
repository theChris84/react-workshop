import reducer, {
  ClimateState,
  createInitialClimateAppState,
  setTemperature,
} from './ClimateReducer';

let initialState: ClimateState;

beforeEach(() => {
  initialState = createInitialClimateAppState();
});

describe('climate reducer should', () => {
  test('reduce min temperature', () => {
    const state = {
      ...initialState,
      temperature: { min: 15, max: 25, current: 10 },
    };

    const newState: ClimateState = reducer(state, setTemperature(10));

    expect(newState.temperature.min).toEqual(10);
  });

  test('reduce max temperature', () => {
    const state = {
      ...initialState,
      temperature: { min: 5, max: 10, current: 0 },
    };

    const newState: ClimateState = reducer(state, setTemperature(25));

    expect(newState.temperature.max).toEqual(25);
  });

  test('reduce current temperature', () => {
    const newState: ClimateState = reducer(undefined, setTemperature(42));

    expect(newState.temperature.current).toEqual(42);
  });

  //   test.skip('redeuce reset min and max temperature', () => {
  //     const state = {
  //       ...initialState,
  //       temperature: { min: 5, max: 34, current: 10 },
  //     };

  //     const newState: ClimateAppState = reducer(state, resetTemperature());

  //     expect(newState.temperature.min).toEqual(10);
  //     expect(newState.temperature.max).toEqual(10);
  //     expect(newState.temperature.current).toEqual(10);
  //   });
});
