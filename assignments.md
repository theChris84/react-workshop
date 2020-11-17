# Assignments

In the sample code you find the class `Sensor` which is an `EventEmitter` that
emits `temperature` and `humidity` events. It also has the getters
`getTemperature` and `getHumidity`. These getters are asynchronous which means
that they return a promise that will resolve eventually. Make sure to also check
for failure cases as the sensor getters may fail to resolve sometimes.

## 1. React Component Tree

Add a header and a footer to the assignment app. Header and footer should be
created separately in distinct components and integrated into the application.

## 2. Render Dynamic Data

Use pure React to render the following data:

* the current temperature
* the highest/lowest encountered temperature
* the current humidity
* the highest/lowest encountered humidity

Add a *reset* button that will reset the highest/lowest temperature/humidity to
the current value.

Take *clean code* principles like *single responsibility* or *DRY* into
consideration, they can be perfectly applied to the task at hand!

## 3. Add Tests

In the previous assignment you (hopefully) have structured your application in a
way that makes it possible to test the separate concerns of the application
individually. Use the testing code stub you find in this example application
as a baseline to write your own tests.

Run the tests by executing the command `npm test` / `yarn test`.
The test runner will execute the following files:

* every *.js file that sits in a `__tests__` folder
* files with a *.test.js suffix
* files with a *.spec.js suffix

It is up to you how you structure your tests, we recommend to place them as
"near" as possible to the code to be tested.

## 4. Application State with Redux

Up to now you have structured your application in a way that holds the state of
the individual components locally. You learned how you can use React to create a
global state that handles every state aspect of your application. You now have
the task to create these building blocks:

* actions
* action creators
* reducer(s) (if you want you can create more than one reducer, but this is up
  to you)

Since reducers are always pure functions without side effects it is very
efficient and easy to unit test them. Write some unit tests that make sure they
work as intended!

The point of this assignment is to *only* create the state management logic
(*actions*, *action creators*, *reducers*) and its unit tests. This
assignment is not yet about using this actual data in your application.

## 5. Redux Toolkit

In this assignment, we'll add the connection between React and Redux.

On the one hand we have a React component tree, on the other hand there's a
global state. These two things need to be connected to actually make sense.
Introduce *Redux Toolkit* to reorganize your state management code and to
connect the global state to your component tree.

## 6. Side Effects

In the Redux world a reducer is set up in a way that does not allow for side
effects. In this assignment you have the task to create a *reload* button that
will query the sensor's `getTemperature` and `getHumidity` getters in order to
update the current temperature and humidity.

### Acceptance Criteria

* a reload button is added to the frontend
* a click on the reload button triggers an update of the current temperature and
  humidity via the getters
* while the requested values are loaded a "loading..." message is shown on the
  button in the meantime
* when one of the getter requests errors an appropriate message is displayed on
  the button

It may be necessary to upgrade your application state together with some new
actions/reducers.

<!--
### OPTIONAL ASSIGNMENT: ROUTING

Use `react-router` to implement the possibility of switching between climate
views. The following views should be selectable:

* a temperature view (current, min, max)
* a humidity view (current, min, max)
* a view where both aspects are shown

Additionally implement a navigation that makes the switching between views
possible.

### OPTIONAL ASSIGNMENT: TEMPERATURE UNIT

Add an additional button that makes it possible to change the temperature
unit. The default unit should be °C. By clicking the button repeatedly the
unit should cycle through Fahrenheit, Kelvin back to °C.

HINT: By facilitating a higher order component (computation component), you
can reuse your current temperature component without actually touching it.
-->
