import Fab from '@material-ui/core/Fab/Fab';
import { Stop, PlayArrow, Replay, Delete } from '@material-ui/icons';
import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Sensor } from '../../lib/Sensor';
import { Humidity, Temperature } from './ClimateNumber';
import { ReloadStateType, resetClimate, selectHumitity, selectReloadState, selectTemperature, setHumitity as setHumidity, setTemperature } from './ClimateReducer';
import { createReloadClimateThunk } from './ReloadClimateThunk';

interface ClimateProps {
  sensor: Sensor
};

const Climate = (props: ClimateProps) => {
  const dispatch = useDispatch();

  const updateTempCallBack = useCallback(() => (v: number) => dispatch(setTemperature(v)), [dispatch]);
  const updateHumidityCallBack = useCallback(() => (v: number) => dispatch(setHumidity(v)), [dispatch]);

  const subscribeSonsorChanges = useCallback(
    () => {
      props.sensor.on("temperature", updateTempCallBack());
      props.sensor.on("humidity", updateHumidityCallBack());
    }, [props.sensor, updateTempCallBack, updateHumidityCallBack]);

  const unsubscribeSonsorChanges = useCallback(
    () => {
      // props.sensor.off("temperature", updateTemperature);
      // props.sensor.off("temperature", updateHumidity)
      props.sensor.clearListeners()
    }, [props.sensor]);

  const temperatureValue = useSelector(selectTemperature);
  const humitityValue = useSelector(selectHumitity);
  const reloadState = useSelector(selectReloadState);

  useEffect(() => {
    subscribeSonsorChanges();
    return () => unsubscribeSonsorChanges()
  }, [subscribeSonsorChanges, unsubscribeSonsorChanges]);

  return (
    <div>
      {(reloadState === ReloadStateType.error) &&
        <div>Uppps something went wrong</div>}
      <Temperature key="temperature" value={temperatureValue} />
      <hr />
      <Humidity key="humitity" value={humitityValue} />
      <div style={{ marginTop: '2em' }} />
      <div style={{ padding: '1em' }}>
        <Fab color="default" onClick={() => dispatch(createReloadClimateThunk(props.sensor))} disabled={reloadState === ReloadStateType.loading} >
          <Replay />
        </Fab>
        <Fab color="default" onClick={() => dispatch(resetClimate())}>
          <Delete />
        </Fab>
        <Fab color="primary" onClick={() => subscribeSonsorChanges()}>
          <PlayArrow />
        </Fab>
        <Fab color="secondary" onClick={() => unsubscribeSonsorChanges()} >
          <Stop />
        </Fab>
      </div>
    </div>

  );
};

export default Climate;