import Emittery from 'emittery';

const EVENT_NAME_TEMP = 'temperature';
const EVENT_NAME_HUMIDITY = 'humidity';

export class Sensor extends Emittery.Typed<{ [EVENT_NAME_TEMP]: number, [EVENT_NAME_HUMIDITY]: number }> {
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
  */
  getHumidity(): Promise<number> {
    return this._getAsync<number>(() => this.humidity);
  }

  /**
   * returns the current temperature.
   * the operation is asynchronous, it returns a promise
   * this operation *may* fail!
  */
  getTemperature(): Promise<number> {
    return this._getAsync<number>(() => this.temperature);
  }

  _temperatureTick() {
    this.emit(EVENT_NAME_TEMP, this._handleTemperature());
    this._delay(() => this._temperatureTick());
  }

  _humidityTick() {
    this.emit(EVENT_NAME_HUMIDITY, this._handleHumidity());
    this._delay(() => this._humidityTick());
  }

  _handleTemperature(): number {
    this.temperature = this._warp(this.temperature, -10, 35);

    return this.temperature;
  }

  _handleHumidity(): number {
    this.humidity = this._warp(this.humidity, 20, 80);

    return this.humidity;
  }

  _warp(value: number, lower: number, upper: number): number {
    const randomValue = Math.random() * 2 - 1;
    value = value + randomValue;
    value = Math.max(lower, value);
    value = Math.min(upper, value);

    return value;
  }

  _getAsync<T>(handler: Function): Promise<T> {
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

export default new Sensor();