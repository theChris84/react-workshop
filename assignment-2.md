# Assignment 2: Render Dynamic Data

Take a look at the existing `Climate` component. It receives a `Sensor` as a
prop. This sensor is an `EventEmitter` that emits `temperature` and `humidity`
events. The component is registering event handlers to those, and updates its
state accordingly. This leads to React rendering the component each time a new
value is received.

## 2.1 Extract Child Component

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

### Hints

This is a refactoring task, so the functionality should not change! You can even
use the existing test (run with `npm test`) to be sure.

## 2.2 Add Minimum and Maximum

In addition to current temperature and humidity, the minimum and maximum of
those values over time shall be shown. Make sure that after each new emitted
value from the sensor, the current, minimum, and maximum values are updated.

### Hints

This will very likely break the existing test. Ignore that for now, we will fix
that in a later assignment.

## 2.3 Add a Reset Button

After the application is running for a while, the user might want to reset those
minimum and maximum values. Add a button that does that. When it is clicked,
both minimum and maximum should be reset to the current value.

## 2.4 Improve Value Display *(optional)*

If you have some time left, improve your component so that the values are
presented in a nicer way.

The values shall be rounded to one decimal, and an appropriate unit shall be
shown for temperature (*° C*) and humidity (*%*).

Think about what the pros and cons of different approaches to this are.
With or without new props, with or without a new child component, …
