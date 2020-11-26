import { configureStore } from '@reduxjs/toolkit';
import React, { Fragment, useState } from 'react';
import { Provider } from 'react-redux';
import Climate from './components/Climate';
import reducer from './components/ClimateReducer';

import { sensor } from './lib/Sensor';

const Headline = ({ headline, onChangedHeadline }: { headline: string, onChangedHeadline: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> }) => (
    <div>
        <h1>{headline}</h1>
        <input type='text' value={headline} onChange={onChangedHeadline} />
    </div>
)

const store = configureStore({ reducer: reducer })

const App = () => {
    const [greeting, setGreeting] = useState('Blazing Weatherstation');
    const handleChanged: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = event => setGreeting(event.target.value);

    return (
        <Fragment>
            <Headline headline={greeting} onChangedHeadline={handleChanged} />
            <Provider store={store}>
                <Climate sensor={sensor} />
            </Provider>
        </Fragment>
    )
}



export default App