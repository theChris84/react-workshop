/* eslint-disable react-hooks/exhaustive-deps */
import { stat } from 'fs';
import React, { useEffect, useState } from 'react';
import { Sensor, SensorEvent } from '../lib/Sensor';

interface ClimateNumberProps {
    title: string,
    sensorType: SensorEvent,
    sensor: Sensor,
    unit: string
};

interface Climate {
    min: number,
    max: number,
    current: number
}

const ClimateNumber = (props: ClimateNumberProps) => {
    const [state, setState] = useState<Climate>();
    useEffect(() => setupAndTearDown(), []);

    const setupAndTearDown = () => {
        const updateState = (newValue: number) => setState(oldstate => setMinMaxCurrent(oldstate, newValue))
        props.sensor.on(props.sensorType, newValue => updateState(newValue));

        return props.sensor.off(props.sensorType, updateState);
    };

    const setMinMaxCurrent = (oldState: Climate | undefined, current: number): Climate => {
        if (oldState) {
            const min = Math.min(current, oldState.min);
            const max = Math.max(current, oldState.max);
            return { min: min, max: max, current: current }
        } else {
            console.log('undefined state');
            return { min: current, max: current, current };
        }
    }

    const reset = () => {
        setState({ min: 0, max: 0, current: 0 });
    }

    const render = () => {
        return (
            <div id={props.title.toLowerCase()}>
                {props.title}:
                {
                    state
                        ? <MinMaxCurrent value={state} />
                        : '-'
                }
                <div>
                    <button onClick={reset}>Reset</button>
                </div>
            </div>);
    }
    return render();
}

const MinMaxCurrent = ({ value }: { value: Climate }) =>
    (
        <ul>
            <li>Min: {value.min}</li>
            <li>Max: {value.max}</li>
            <li>Current: {value.current}</li>
        </ul>
    )


export function Temperature(props: { sensor: Sensor }) {
    return <ClimateNumber title="Temperature" sensor={props.sensor} unit='°C' sensorType="temperature" />
}

export function Humidity(props: { sensor: Sensor }) {
    return <ClimateNumber title="Humitity" sensor={props.sensor} unit='%' sensorType="humidity" />
}

export default ClimateNumber