# Assignments

## 1. React Component Tree

Add a *header component* to the app that shows a nice big title at the top.
The text that is shown shall be passed in as a `prop`. It shall be rendered in a
`<h1>` element.

Try to find a good way to split up the application into components. You will
notice that the starting point of the application, `index.tsx`, directly renders
the `<Climate>` component. With the newly introduced `<Header>` component, we
need to render that as well. `ReactDOM.render` however only accepts a single
React component.

A typical pattern to solve this is to introduce a single `<App>` component that
acts as a container for all the parts of the application. So you should end up
with a component tree like this:

```text
(index)
   └── App
       ├── Header
       └── Climate
```

If you have some time left, feel free to either:

* Add a footer as well
* Add some styling (you can put CSS rules into `index.css`)

## 2. Render Dynamic Data

Take a look at the existing `Climate` component. It receives a `Sensor` as a
prop. This sensor is an `EventEmitter` that emits `temperature` and `humidity`
events. The component is registering event handlers to those, and updates its
state accordingly. This leads to React rendering the component each time a new
value is received.

### 2.1 Extract Child Component

The existing `Climate` component has some duplication in it: event handling and
rendering of the emitted values is the same for *temperature* and *humidity*.
Being good developers, we are aware of the
[*single responsibility principle*](https://en.wikipedia.org/wiki/Single-responsibility_principle)
and [*DRY*](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself), so let's
remove that. We will see later that this makes the addition of new features much
easier!

Introduce a new component that can be used twice by the `Climate` component, to
deal with either *temperature* or *humidity*.

See what that component needs from its parent, and pass those things via props.
The `render` method of `Climate` will use the new component twice: once for the
temperature, and once for the humidity.

#### Hints

This is a refactoring task, so the functionality should not change! You can even
use the existing test (run with `npm test`) to be sure.

### 3.2 Add Minimum and Maximum

In addition to current temperature and humidity, the minimum and maximum of
those values over time shall be shown.

Adapt your new component so that it keeps track of the minimum and maximum in
its state. Make sure that after each new emitted value from the sensor, the
current, minimum, and maximum values are updated.

Notice how each instance of the component has its own independant state.

#### Hints

This will very likely break the existing test. Ignore that for now, we will fix
that in a later assignment.

### 3.3 Add a Reset Button

After the application is running for a while, the user might want to reset those
minimum and maximum values. Add a button that does that. When it is clicked,
both minimum and maximum should be reset to the current value.

### 3.4 Improve Value Display *(optional)*

If you have some time left, improve your component so that the values are
presented in a nicer way.

The values shall be rounded to one decimal, and an appropriate unit shall be
shown for temperature (*° C*) and humidity (*%*).

Think about what the pros and cons of different approaches to this are.
With or without new props, with or without a new child component, …

## 3. Add Tests

### 3.1 Getting Started

Start the test runner with `npm test`.

By default only tests for changed files are run. So in case you have been making
Git commits, and currently have no uncommitted changes in your working
directory, press `a` to trigger a test run.

The initial test in `Climate.test.tsx` probably does not run green anymore,
because it was testing the app in its starting state, but we have changed the
app quite a bit in the last exercises.

We'll take care for that soon, but for now disable that test with Jest's `skip`
feature. Change this:

```typescript
test('Climate app shows the current temperature…', …)
```

to this:

```typescript
test.skip('Climate app shows the current temperature…', …)
```

### 3.2 Header

Let's get started by writing some tests for the `Header` component that we
have implemented in the first assignment. You have probably put that into a
file called `Header.tsx`. Create a new file `Header.test.tsx` for the tests.

Try to `render` the component with different text values that you pass in as a
prop. Use `getByRole` and `toHaveTextContent` to find the rendered header in the
DOM and check its text content.

*Optional:* If you're feeling fancy, you can use
[Jest's `test.each`](https://jestjs.io/docs/en/api#testeachtablename-fn-timeout)
to create a parametrized test.

#### Hints

The [Testing Playground Chrome extension](https://chrome.google.com/webstore/detail/testing-playground/hejbmebodbijjdhflfknehhcgaklhano)
can help you with writing queries.

The existing test in `Climate.test.tsx` will give you an example how a typical
test looks like. Don't copy over too much, though! The `Climate` component has
to deal with some asynchrony, as it is listening to sensor events.

Avoid using any of the following in `Header.test.tsx`:

* `sensor` / `testSensor`
* `async` / `await`
* `findBy…` queries

### 3.3 Current Temperature and Humidity

Back to `Climate.test.tsx`. Remove that `skip` you added in 3.1 and get the test
working again!

When it works, add a similar test for the current humidity value.

#### Hints

You have introduced a child component in assignment 3.2 and are using that in
your `Climate` component. We are still just writing tests on the level of the
`Climate` component and not on the child component though. That is not a unit
test, but an integration test, and it's the approach we want to use here.

If you have trouble writing a good query to find the current temperature and
humidity values, change your component so that it adds `data-testid` attributes.
Make sure to assign unique values to them. You can then use `findByTestId` in
your tests.

### 3.4 Minimum and Maximum Values

Add tests for minimum and maximum values. It is sufficient to do this for either
the temperature or the humidity here.

#### Hints

Let the `testSensor` emit appropriate values so that you can actually be sure
that the minimum and maximum only change when the current value exceeds them.

### 3.5 Reset Button

Test that the reset button is doing what it should. Also make sure that after
the button is pressed the minimum and maximum are being updated again when new
values are emitted by the sensor.

Try to avoid using a `data-testid` this time. Query for the button with
`findByRole` and a `name` option. The *Testing Playground* extension can help
you again. If both of your buttons have the same text, change that! It makes
your app more accessible, e.g. to screen readers.

Again, it is sufficient to do this for either temperature or humidity.

#### Hints

Use the [`user-event`](https://github.com/testing-library/user-event) lib to
click on the button:

```typescript
import userEvent from '@testing-library/user-event'

userEvent.click(theButtonYouFound);
```

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

## 6. Side Effects with Redux Thunk

In the Redux world a reducer is set up in a way that does not allow for side
effects. In this assignment you have the task to create a *reload* button that
will query the sensor's `getTemperature` and `getHumidity` getters in order to
update the current temperature and humidity.

These getters are asynchronous, which means that they return a promise that will
resolve eventually. Make sure to also check for failure cases, as the sensor
getters may fail to resolve sometimes.

Use *Redux Thunk* for this task.

### Acceptance Criteria

* a reload button is shown
* a click on the reload button triggers an update of the current temperature and
  humidity values via the getters
* while the requested values are loaded a "loading…" message is shown on the
  button in the meantime
* when one of the getter fails (the promise rejects), an appropriate message is
  displayed on the button

It may be necessary to upgrade your application state together with some new
actions/reducers.
