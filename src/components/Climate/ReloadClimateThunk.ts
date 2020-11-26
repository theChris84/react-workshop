import { AppThunk } from '../App/App';
import { Sensor } from '../../lib/Sensor';
import {
  setError,
  setHumitity,
  setLoading,
  setNormal,
  setTemperature,
} from './ClimateReducer';

export function createReloadClimateThunk(sensor: Sensor): AppThunk {
  return async (dispatch: any) => {
    try {
      dispatch(setLoading());
      const temperature = await sensor.getTemperature();
      const humidity = await sensor.getHumidity();
      dispatch(setTemperature(temperature));
      dispatch(setHumitity(humidity));
      dispatch(setNormal());
    } catch (error) {
      dispatch(setError());
    }
  };
}
