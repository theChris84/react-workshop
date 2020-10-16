import React from 'react';
import ReactDOM from 'react-dom';

import Sensor from './lib/Sensor';
import Climate from './components/Climate';

import './index.css';

const sensor = new Sensor();

sensor.getTemperature()
    .then(temp => console.log('current temperature: ', temp))
    .catch(error => console.error(error.message));

ReactDOM.render(
    <Climate sensor={sensor} />,
    document.getElementById('root')
);
