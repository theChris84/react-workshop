import React, { useState } from 'react'
import { Sensor } from '../lib/Sensor';
import { Humidity, Temperature } from './ClimateChild';

type ClimateProps = { sensor: Sensor };

function Climate(props: ClimateProps) {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'show'} me plz!
      </button>

      <div id="temperature">
        {visible && <Temperature sensor={props.sensor} />}
      </div>

      <hr />

      <div id="humidity">
        {visible && <Humidity sensor={props.sensor} />}
      </div>
    </div>
  );
}

export default Climate;