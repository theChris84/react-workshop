/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { ClimateValue } from './ClimateReducer';

interface ClimateNumberProps {
    title: string,
    value: ClimateValue,
    unit: string,
};

const ClimateNumber = ({ title, value, unit }: ClimateNumberProps) => {

    const render = () => {
        return (
            <div id={title.toLowerCase()}>
                <div><h2>{title}:</h2></div>
                <MinMaxCurrent value={value} unit={unit} />
                {/* <div>
                    <button onClick={reset}>Reset</button>
                </div> */}
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

export function Temperature({ value }: { value: ClimateValue }) {
    return <ClimateNumber title="Temperature" unit='°C' value={value} />
}

export function Humidity({ value }: { value: ClimateValue }) {
    return <ClimateNumber title="Humitity" unit='%' value={value} />
}