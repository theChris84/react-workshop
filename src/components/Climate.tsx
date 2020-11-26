import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Sensor } from '../lib/Sensor';
import { Humidity, Temperature } from './ClimateNumber';
import { selectHumitity, selectTemperature, setHumitity, setTemperature } from './ClimateReducer';

interface ClimateProps {
  sensor: Sensor
};

const Climate = (props: ClimateProps) => {
  const dispatch = useDispatch();

  const updateTemperature = (newValue: number) => dispatch(setTemperature(newValue));
  const updateHumitity = (newValue: number) => dispatch(setHumitity(newValue));
  const temperatureValue = useSelector(selectTemperature);
  const humitityValue = useSelector(selectHumitity);

  useEffect(() => {
    props.sensor.on("temperature", updateTemperature);
    return () => props.sensor.off("temperature", updateTemperature);
  }, []);


  useEffect(() => {
    props.sensor.on("humidity", updateHumitity);
    return () => props.sensor.off("humidity", updateHumitity);
  }, []);

  return (
    <div>
      <Temperature key="temperature" value={temperatureValue} />
      <hr />
      <Humidity key="humitity" value={humitityValue} />
    </div>);
};

export default Climate;