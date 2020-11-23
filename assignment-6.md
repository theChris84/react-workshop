# Assignment 6: Side Effects with Redux Thunk

In the Redux world a reducer is set up in a way that does not allow for side
effects. In this assignment you have the task to create a *reload* button that
will query the sensor's `getTemperature` and `getHumidity` getters in order to
update the current temperature and humidity.

These getters are asynchronous, which means that they return a promise that will
resolve eventually. Make sure to also check for failure cases, as the sensor
getters may fail to resolve sometimes.

Use *Redux Thunk* for this task.

## Acceptance Criteria

* a reload button is shown
* a click on the reload button triggers an update of the current temperature and
  humidity values via the getters
* while the requested values are loaded a "loading…" message is shown on the
  button in the meantime
* when one of the getter fails (the promise rejects), an appropriate message is
  displayed on the button

It may be necessary to upgrade your application state together with some new
actions/reducers.
