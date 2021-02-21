# FAQ

- [FAQ](#faq)
  - [Using reducers optimistically](#using-reducers-optimistically)
  - [Keeping up-to-date with the template](#keeping-up-to-date-with-the-template)

## Using reducers optimistically

If you have components that should be available throughout the app, like a `NavigationBar` (i.e., they aren't route-specific), you need to add their respective reducers to the root reducer with the help of `combineReducers`.

```ts
// In src/store/reducers.ts

...
import { combineReducers } from '@reduxjs/toolkit';
...

import { reducer as navigationBarReducer } from 'components/NavigationBar/slice';

export function createReducer(injectedReducers: InjectedReducersType = {}) {
  const rootReducer = combineReducers({
    navigationBar: navigationBarReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
```

## Keeping up-to-date with the template

Even though the template is an npm package, it's not possible for you to **just update** the package as you would for a dependency, since you start CRA with this template initially. Instead, it is recommended to keep an eye on the [CHANGELOG](../../CHANGELOG.md) file. All the changes that **concern** the template user will be displayed there, like bug fixes, documentation updates, new features, and so on. You can check each change's commits and file changes to see what has been changed. Then, the decision is yours if you want to apply those to your code.
