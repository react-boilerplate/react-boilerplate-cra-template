# CLI & Scaffolding

## Cleaning

```Shell
yarn cleanAndSetup
```

Removes the example app, replacing it with the smallest amount of boilerplate code necessary to start writing your app! Also, it makes some essential changes to your setup to give you a clean and working start.

{% hint style="warning" %}

**Note:** This command is self-destructive; once you've run it, it disables itself. This action is for your safety, so you can't irreversibly delete portions of your project by accident.

{% endhint %}

## Generators

```Shell
yarn generate
```

Allows you to auto-generate boilerplate code for common parts of your application, specifically `component`s, and `redux-toolkit slice`s. You can also run `yarn generate <part>` to skip the first selection (e.g., `yarn generate component`).

```Shell
yarn test:generators
```

Test whether the generators are working fine. It generates components and slices with a variety of settings. This command is helpful if you decide to customize generators for your needs.

## Production

```Shell
yarn start:prod
```

- Builds your app (see `yarn run build`)
- Serves the `build` folder locally

The app is built for optimal performance; assets are minified and served `gzip`-ed.

## Unit testing

```Shell
yarn test
```

Unit tests specified in the `**/__tests__/*.ts` files throughout the application are run.

All the `test` commands allow an optional `-- [string]` argument to filter the tests run by Jest, useful if you need to run a specific test only.

```Shell
# Run only the Button component tests
yarn test -- Button
```

## Linting

```Shell
yarn lint
```

Lints your Typescript and your CSS.

```Shell
yarn lint:fix
```

Lints your code and tries to fix any errors it finds.

## Extracting translation JSON Files

```Shell
yarn extract-messages
```

## Typescript

```Shell
yarn checkTs
```

Checks for TypeScript errors.
