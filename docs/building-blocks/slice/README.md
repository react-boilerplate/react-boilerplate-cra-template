# What is a Slice?

If you have read the redux-toolkit documentation you are familiar with the `slice` concept now. Here, we are taking it another step further by enriching it with `reselect` and `redux-saga`.

Slice manages, encapsulates, and operates a `portion` of your application's data. For example, if you have a page that displays a user list, then you can have a slice called 'UsersPageSlice' that contains all the users in its state, also the functions to read it from the store and the functions to update the users in the list. So, in short, a slice is a redux-toolkit slice also containing the relative `reselect` and `redux-saga` operations within its folder. After all, they are all related to managing the same portion of the data.

A `slice` is independent of the UI component. It can contain any kind of logic and it can be located in any folder. To follow the `folder-by-feature` pattern it is recommended to keep your `slices` closer to your component using it. But, this doesn't mean that it only belongs to that component. You can import and use that slice in whichever component you want.

The next steps in the documentation describes how to use the slices with some examples.

Example folder view:

```
project
|
├── app
│   └── src
│       ├── app
│       │   ├── Homepage
│       │   │   ├── index.tsx
│       │   │   ├── slice => Contains the relevant stuff for Homepage data
│       │   │   │   ├── index.ts
│       │   │   │   ├── saga.ts
│       │   │   │   ├── selectors.ts
│       │   │   │   └── types.ts
```
