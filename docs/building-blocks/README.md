# Building Blocks

In this section, we will explain the **building blocks** of the boilerplate in detail.

First we have to look at what is happening when react starts its life with `index.tsx` file.

### `src/index.tsx`:

It is one of the most important files of the boilerplate. It contains all the global setup to make sure your app runs smoothly. Let's break its contents down:

- `react-app-polyfill` is imported to enable compatibility with many browsers and cool stuff like generator functions, Promises, etc.
- A Redux `store` is instantiated.
- `createRoot().render()` not only renders the [root React component](https://github.com/react-boilerplate/react-boilerplate-cra-template/blob/master/src/app/index.tsx), called `<App />`, of your application, but it renders it with `<Provider />`.
- Hot module replacement via [Webpack HMR](https://webpack.js.org/guides/hot-module-replacement/) makes the i18n translations hot re-loadable.
- i18next internationalization support setup.
- `<Provider />` connects your app with the Redux `store`.

Again, `src/index.tsx` handles all the bootstrapping and setup of the features we are using in the boilerplate. Now, let's review a summary of the **building blocks**.

{% hint style="info" %}

**🧙Tips:** Following chapters reveal more details and tutorials on how to use the building blocks.

{% endhint %}

### Redux

Redux is likely to play a significant role in your application. If you're new to Redux, we'd strongly suggest that you complete this checklist and then come back:

- Understand the motivation behind Redux.
- Understand the three principles of Redux.
- Implement Redux in a small React app of yours.

The Redux `store` is the heart of your application. Check out `src/store/configureStore.ts` to see how we have configured the store.

The `createStore()` factory creates the Redux store and accepts three parameters.

1.  **Root reducer:** A master reducer combining all your reducers.
2.  **Initial state:** The initial state of your app as determined by your reducers.
3.  **Middleware/enhancers:** Middlewares are third party libraries which intercept each Redux action dispatched to the Redux store and then... do stuff. For example, if you install the [`redux-logger`](https://github.com/evgenyrodionov/redux-logger) middleware, it will listen to all the actions being dispatched to the store and print the previous and next state in the browser console. It's helpful to track what happens in your app.

In our application, we are using a single middleware.

1.  **`redux-saga`:** Used for managing _side-effects_ such as dispatching actions asynchronously or accessing browser data.

### Redux-Toolkit

> The official, opinionated, batteries-included toolset for efficient Redux development.

This is the latest and best way of using Redux. It handles lots of the things you would need to do to get Redux working.

We will leave you alone with their [documentation](https://redux-toolkit.js.org) at this point. This boilerplate uses Redux heavily, so you must understand it.

### Reselect

Reselect is a library used for slicing your Redux state and providing only the relevant sub-tree to a React component. It has three key features:

1.  Computational power.
2.  Memoization.
3.  Composability.

Imagine an application that shows a list of users. Its Redux state tree stores an array of usernames with signatures:

`{ id: number, username: string, gender: string, age: number }`.

Let's see how the three features of reselect help.

- **Computation:** While performing a search operation, reselect will filter the original array and return only matching usernames. Redux state does not have to store a separate array of filtered usernames.
- **Memoization:** A selector will not compute a new result unless one of its arguments change. That means, if you are repeating the same search once again, reselect will not filter the array over and over. It will just return the previously computed and, subsequently, cached result. Reselect compares the old and the new arguments and then decides whether to compute again or return the cached result.
- **Composability:** You can combine multiple selectors. For example, one selector can filter usernames according to a search key, and another selector can filter the already filtered array according to gender. One more selector can further filter according to age. You combine these selectors by using `createSelector()`.

### Redux-Saga

If your application interacts with some back-end API for data, we recommend using `redux-saga` for side-effect management. Too much jargon? Let's simplify.

Imagine that your application is fetching data in JSON format from a back-end. For every API call, ideally, you should define at least three kinds of [action creators](http://redux.js.org/docs/basics/Actions.html):

1.  `API_REQUEST`: Upon dispatching this, your application should show a spinner to let the user know that something's happening.
2.  `API_SUCCESS`: Upon dispatching this, your application should show the data to the user.
3.  `API_FAILURE`: Upon dispatching this, your application should show an error message to the user.

And this is only for **_one_** API call. In a real-world scenario, one page of your application could be making tens of API calls. How do we manage all of them effectively? It essentially boils down to controlling the flow of your application. What if there was a background process that handled multiple actions simultaneously and communicated with the Redux store and React components at the same time? Here is where `redux-saga` enters the picture.

For a mental model, consider a saga like a separate thread in your application that's solely responsible for side-effects. Then `redux-saga` is a Redux middleware, which means this thread can be started, paused, and canceled from the main application with standard Redux actions. It has access to the full Redux application state, and it can dispatch Redux actions as well.

### Linting

This boilerplate includes a complete static code analysis setup. It's composed of [ESLint](http://eslint.org/), [stylelint](https://stylelint.io/), and [Prettier](https://prettier.io/).

We recommend that you install the relevant IDE extensions for each one of these tools. Once you do, every time you press [save], all your code will automatically be formatted and reviewed for quality.

The boilerplate provides a pre-commit git hook to analyze and fix linting errors automatically before committing your code. If you'd like to disable it or modify its behavior, take a look at the `lint-staged` section in `package.json`.
