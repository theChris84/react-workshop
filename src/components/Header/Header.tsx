import { Typography } from '@material-ui/core';
import React from 'react';
import AppLogo from './../../WeatherApp.png';

const Headline = ({ headline, onChangedHeadline }: { headline: string, onChangedHeadline: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> }) => (
    <div style={{ display: 'inline' }}>
        <Typography variant="h4" component="h1" gutterBottom >{headline}</Typography>
        <img src={AppLogo} className="App-logo" alt="logo" style={{ width: '5em' }} />
        {/* <input type='text' value={headline} onChange={onChangedHeadline} /> */}
    </div>
)

export default Headline;;