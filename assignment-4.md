# Assignment 4: Application State with Redux

Up to now you have structured your application in a way that holds the state of
the individual components locally. You learned how you can use Redux to create a
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
