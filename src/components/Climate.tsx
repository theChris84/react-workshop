import React from 'react'
import { Sensor } from '../lib/Sensor';
import ClimateNumber from './ClimateNumber';

interface ClimateProps {
  sensor: Sensor
};

const Climate = (props: ClimateProps) => (
  <div>
    <ClimateNumber key="temperature" title='Temperature' sensorType='temperature' sensor={props.sensor} />
    <hr />
    <ClimateNumber key="humitity" title='Humidity' sensorType='humidity' sensor={props.sensor} />
  </div>
);

export default Climate;