import { Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper/Paper';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { sensor } from '../../lib/Sensor';
import Climate from '../Climate/Climate';
import Headline from '../Header/Header';
import rootReducer from './AppState'

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,    // what the thunk returns (by default void)
    RootState,     // type of the full store, derived above
    unknown,       // extra argument, we don't need that
    Action<string> // type of a Redux action (string is the type)
>;

const store = configureStore({ reducer: rootReducer })

const App = () => {
    const [greeting, setGreeting] = useState('Blazing Weatherstation');
    const handleChanged: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = event => setGreeting(event.target.value);

    return (
        <Container maxWidth="sm" className="App">
            <Paper>
                <Headline headline={greeting} onChangedHeadline={handleChanged} />
                <Provider store={store}>
                    <Climate sensor={sensor} />
                </Provider>
            </Paper>
        </Container>
    )
}

export default App