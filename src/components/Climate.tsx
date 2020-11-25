import React from 'react'
import { Sensor } from '../lib/Sensor';
import { Humidity, Temperature } from './ClimateNumber';

interface ClimateProps {
  sensor: Sensor
};

const Climate = (props: ClimateProps) => (
  <div>
    <Temperature key="temperature" sensor={props.sensor} />
    <hr />
    <Humidity key="humitity" sensor={props.sensor} />
  </div>
);

export default Climate;