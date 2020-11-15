# CLI & Scaffolding

## Cleaning

```Shell
yarn run cleanAndSetup
```

Removes the example app, replacing it with the smallest amount of boilerplate code necessary to start writing your app! Also, it makes some essential changes to your setup to give you a clean and working start.

{% hint style="warning" %}

**Note:** This command is self-destructive; once you've run it, it disables itself. This action is for your safety, so you can't irreversibly delete portions of your project by accident.

{% endhint %}

## Generators

```Shell
yarn run generate
```

Allows you to auto-generate boilerplate code for common parts of your application, specifically `component`s, and `container`s. You can also run `yarn run generate <part>` to skip the first selection (e.g., `yarn run generate container`).

```Shell
yarn run test:generators
```

Test whether the generators are working fine. It generates components and containers with a variety of settings. This command is helpful if you decide to customize generators for your needs.

## Production

```Shell
yarn run start:prod
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
yarn run lint
```

Lints your Typescript and your CSS.

```Shell
yarn run lint:fix
```

Lints your code and tries to fix any errors it finds.

## Extracting translation JSON Files

```Shell
yarn run extract-messages
```

## Typescript

```Shell
yarn run checkTs
```

Checks for TypeScript errors.
