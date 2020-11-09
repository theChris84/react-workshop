import React from 'react';
import ReactDOM from 'react-dom';

import sensor from './lib/Sensor';
import Climate from './components/Climate';

import './index.css';

ReactDOM.render(
    <Climate sensor={sensor} />,
    document.getElementById('root')
);
