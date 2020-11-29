import { AppThunk } from '../App/App';
import { Sensor } from '../../lib/Sensor';
import { setHumitity, setTemperature } from './ClimateReducer';
import { setError, setLoading, setNormal } from '../App/PageStateReducer';

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
      dispatch(setError('Uuups could not retrieve data!'));
    }
  };
}
