import { EventEmitter } from 'events'

export default class Sensor extends EventEmitter {
  private humidity: number = 50;
  private temperature: number = 20;

  constructor() {
    super();

    this._humidityTick();
    this._temperatureTick();
  }

  /**
   * returns the current humidity.
   * the operation is asynchronous, it returns a promise
   * this operation *may* fail!
   * @returns {Promise<number>}
  */
  getHumidity() {
    return this._getAsync(() => this._handleHumidity());
  }

  /**
   * returns the current temperature.
   * the operation is asynchronous, it returns a promise
   * this operation *may* fail!
   * @returns {Promise<number>}
  */
  getTemperature() {
    return this._getAsync(() => this._handleTemperature());
  }

  _temperatureTick() {
    this.emit('temperature', this._handleTemperature());
    this._delay(() => this._temperatureTick());
  }

  _humidityTick() {
    this.emit('humidity', this._handleHumidity());
    this._delay(() => this._humidityTick());
  }

  _handleTemperature() {
    this.temperature = this._warp(this.temperature, -10, 35);

    return this.temperature;
  }

  _handleHumidity() {
    this.humidity = this._warp(this.humidity, 20, 80);

    return this.humidity;
  }

  _warp(value: number, lower: number, upper: number) {
    const randomValue = Math.random() * 2 - 1;
    value = value + randomValue;
    value = Math.max(lower, value);
    value = Math.min(upper, value);

    return value;
  }

  _getAsync(handler: Function) {
    return new Promise((resolve, reject) => {
      if (Math.random() < 0.1) {
        return this._delay(() => reject(new Error('sensor error')));
      }

      const value = handler();
      this._delay(() => resolve(value), 1000, 3000);
    });
  }

  _delay(handler: Function, min = 3000, max = 8000) {
    setTimeout(handler, min + Math.floor(Math.random() * (max - min)));
  }
}