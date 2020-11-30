import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectTemperature } from '../Climate/ClimateReducer';


const Footer = () => {
    const temperature = useSelector(selectTemperature);

    return (<div>
        Current Temperature: {temperature.current.toFixed(2)}
    </div>)
}

export default Footer
