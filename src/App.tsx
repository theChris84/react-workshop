import React, { Fragment, useState } from 'react';
import Climate from './components/Climate';
import { sensor } from './lib/Sensor';

const Headline = ({ headline, onChangedHeadline }: { headline: string, onChangedHeadline: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> }) => (
    <div>
        <h1>{headline}</h1>
        <input type='text' value={headline} onChange={onChangedHeadline} />
    </div>
)

const App = () => {
    const [greeting, setGreeting] = useState('Blazing Weatherstation');
    const handleChanged: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = event => setGreeting(event.target.value);

    return (
        <Fragment>
            <Headline headline={greeting} onChangedHeadline={handleChanged} />
            <Climate sensor={sensor} />
        </Fragment>
    )
}



export default App