// import { EventEmitter } from 'events';
// import React from 'react';
// import { shallow } from 'enzyme';
// import Climate from '../../components/Climate';

// it('renders the data of the dummy sensor', () => {
//   const dummySensor = new EventEmitter();
//   const wrapper = shallow(<Climate sensor={dummySensor} />);

//   expect(wrapper.find('#temperature').text()).toEqual('temperature: 20');
//   expect(wrapper.find('#humidity').text()).toEqual('humidity: 50');

//   dummySensor.emit('temperature', 42);
//   wrapper.update();
//   expect(wrapper.find('#temperature').text()).toEqual('temperature: 42');

//   dummySensor.emit('humidity', 1337);
//   wrapper.update();
//   expect(wrapper.find('#humidity').text()).toEqual('humidity: 1337');
// });

// it('checks the complete dom tree using snapshots', () => {
//   const dummySensor = new EventEmitter();
//   const wrapper = shallow(<Climate sensor={dummySensor} />);

//   expect(wrapper.find('#temperature').text()).toEqual('temperature: 20');
//   expect(wrapper.find('#humidity').text()).toEqual('humidity: 50');
//   expect(wrapper).toMatchSnapshot();

//   dummySensor.emit('temperature', 42);
//   wrapper.update();
//   expect(wrapper).toMatchSnapshot();

//   dummySensor.emit('humidity', 1337);
//   wrapper.update();
//   expect(wrapper).toMatchSnapshot();
// });