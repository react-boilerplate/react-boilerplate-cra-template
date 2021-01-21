# Redux-Toolkit

If you haven't worked with Redux, it's highly recommended (possibly indispensable!) to read through the (amazing) [official documentation](http://redux.js.org) and/or watch this [free video tutorial series](https://egghead.io/series/getting-started-with-redux).

As minimal as Redux is, the challenge it addresses - app state management - is a complex topic that is too involved to properly discuss here.

## Usage

### 1) Creating a dedicated slice folder

Let's start creating a slice to manage our Homepage data and call it `HomepageSlice`.

An empty folder `.../Homepage/slice/`

### 2) Declaring your state

Redux manages your **state** so we have to declare our state first. We can create a `types.ts` file in our slice. Types are crucial for efficient and safe development. Your compiler and code completion will understand the shape of your state and help you code the rest of your project faster and safer.

#### `.../Homepage/slice/types.ts`

```ts
/* --- STATE --- */
export interface HomepageState {
  username: string;
  // declare what you want in your Homepage state
}
```

### 3) Updating your Redux State

Now that you are adding another `slice` to your state you also need to declare this in your `types/RootState.ts` file. Since we are adding Redux slices **asynchronously** with [Redux-injectors](redux-injectors.md), the compiler cannot tell what the Redux State is during the build time. So, we explicitly declare them `types/RootState.ts` file:

#### `types/RootState.ts`

```ts
import { HomepageState } from 'app/.../Homepage/slice/types';

// Properties are optional because they are injected when the components are mounted sometime in your application's life. So, not available always
export interface RootState {
  homepage?: HomepageState;
}
```

### 4) Creating your slice

Fortunately, [Redux Toolkit](https://redux-toolkit.js.org) handles most of the work for us. To create our slice, we create a `index.ts` file in our folder as well. This will be responsible for:

- Our slice's **initial state**
- **Actions** we can trigger
- **Reducers** that decide how the state will change, given the action received

#### `.../Homepage/slice/index.ts`

```ts
import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit'; // Importing from `utils` makes them more type-safe ✅
import { HomepageState } from './types';

// The initial state of the Homepage
export const initialState: HomepageState = {
  username: 'Initial username for my state',
};

const slice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {
    changeUsername(state, action: PayloadAction<string>) {
      // Here we say lets change the username in my homepage state when changeUsername actions fires
      // Type-safe: It will expect `string` when firing the action. ✅
      state.username = action.payload;
    },
  },
});

/**
 * `actions` will be used to trigger change in the state from where ever you want
 */
export const { actions: homepageActions } = slice;
```

### 5) Adding the slice to your Redux Store

Let's add our slice to the redux state. We can write a simple 'hook' and use it in our component(whichever you want)

#### `.../Homepage/slice/index.ts`

```ts
// ... code from above

/**
 * Let's turn this into a hook style usage. This will inject the slice to redux store and return actions in case you want to use in the component
 */
export const useHomepageSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
```

### 5) Using the slice in your component

Let's use the hook we created above in our component

#### `.../Homepage/index.tsx`

```ts
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHomepageSlice } from './slice';
import { selectUsername } from './slice/selectors';

export function HomePage() {
  // Use the slice we created
  const { actions } = useHomepageSlice();

  // Used to dispatch slice actions
  const dispatch = useDispatch();

  // `selectors` are used to read the state. Explained in other chapter
  // Will be inferred as `string` type ✅
  const username = useSelector(selectUsername);

  const textInputChanged = evt => {
    // Trigger the action to change the state. It accepts `string` as we declared in `slice.ts`. Fully type-safe ✅
    dispatch(actions.changeUsername(evt.target.value));
  };
  // ...
}
```

{% hint style="info" %}

🎉 **Good News:** You don't need to write this boilerplate code by hand, the `slice` generator will generate it for you. ✓

`yarn generate slice`

{% endhint %}
