/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Sensor, SensorEvent } from '../lib/Sensor';

interface ClimateNumberProps {
    title: string,
    sensorType: SensorEvent,
    sensor: Sensor,
    unit: string
};

interface ClimateValue {
    min: number,
    max: number,
    current: number
}

const ClimateNumber = ({ title, sensorType, sensor, unit }: ClimateNumberProps) => {
    const [state, setState] = useState<ClimateValue>({ min: Infinity, max: -Infinity, current: Infinity });
    useEffect(() => {
        const update = (newValue: number): void => setState(s => calcuateMinMaxCurrent(s, newValue));
        sensor.on(sensorType, v => update(v));
        return () => sensor.off(sensorType, update);
    }, []);

    const calcuateMinMaxCurrent = (oldState: ClimateValue, current: number): ClimateValue => {
        const min = Math.min(oldState.min || Infinity, current);
        const max = Math.max(oldState.max || -Infinity, current);
        return { min, max, current: current }
    }

    const reset = () =>
        setState(
            {
                min: state.current,
                max: state.current,
                current: state.current
            });

    const render = () => {
        return (
            <div id={title.toLowerCase()}>
                <div><h2>{title}:</h2></div>
                <MinMaxCurrent value={state} unit={unit} />
                <div>
                    <button onClick={reset}>Reset</button>
                </div>
            </div>);
    }
    return render();
}

const MinMaxCurrent = ({ unit, value }: { unit: string, value: ClimateValue }) => {
    const { min, max, current } = value;
    return (
        <ul>
            <li>Min:        {printNumber(unit, min)}</li>
            <li>Max:        {printNumber(unit, max)}</li>
            <li>Current:    {printNumber(unit, current)}</li>
        </ul>
    )
}

const printNumber = (unit: string, value: number): string =>
    Number.isFinite(value)
        ? `${value.toFixed(2)}${unit}`
        : '-'


export function Temperature(props: { sensor: Sensor }) {
    return <ClimateNumber title="Temperature" sensor={props.sensor} unit='°C' sensorType="temperature" />
}

export function Humidity(props: { sensor: Sensor }) {
    return <ClimateNumber title="Humitity" sensor={props.sensor} unit='%' sensorType="humidity" />
}