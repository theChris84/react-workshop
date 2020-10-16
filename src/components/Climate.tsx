import React, { Component } from 'react'
import Sensor from '../lib/Sensor';

// earn some bonus points if you can explain the bad practice in this code example!

type ClimateProps = { sensor: Sensor };
type ClimateState = { temperature: number, humidity: number };

class Climate extends Component<ClimateProps, ClimateState> {
  state: ClimateState = {
    temperature: 20,
    humidity: 50
  };

  componentDidMount() {
    this.props.sensor
      .on('temperature', temperature => this.setState({ temperature }))
      .on('humidity', humidity => this.setState({ humidity }));
  }

  render() {
    return (
      <div>
        <div id="temperature">
          temperature: {this.state.temperature}
        </div>

        <div id="humidity">
          humidity: {this.state.humidity}
        </div>
      </div>
    );
  }
}

export default Climate;