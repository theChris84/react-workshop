import React from 'react'

import sensor from '../lib/Sensor';
import Climate from "./Climate";

test('this is a failing test on purpose to get you started', () => {
    const app = <Climate sensor={sensor} />;

    // TODO: replace this with actually useful tests
    expect(app).toBe('awesome'); // oh no, this fails! ¯\_(ツ)_/¯
});
