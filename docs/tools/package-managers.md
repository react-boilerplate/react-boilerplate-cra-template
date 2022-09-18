# Using a Package Manager

## Switching from NPM to Yarn

While you may be familiar with `npm`, or even use it as your package manager of choice, it is not the recommended package manager for this project. This is because `Yarn` is faster, more reliable, and more extensible than `npm`. If you are not familiar with `Yarn`, you can read more about it [here](https://yarnpkg.com/en).

To download `Yarn` using `npm`, run the following command:

```bash
npm install -g yarn
```

This will install `Yarn Classic/v1` globally on your machine.

## Upgrading to Yarn 3

### Why Yarn 3

`Yarn 3` includes a host of benefits over `Yarn Classic/v1`, including:

1. Even **faster** installs
1. More verbose & readable output
1. `Yarn version` is stored directly in the repo to keep everyone on the same version
1. `Yarn plugins` can be added to extend the functionality of `Yarn`
1. `PnP` (Plug and Play) mode can be used to improve performance and stability (if supported by your project)
1. Helpful, new commands like `yarn dedupe`, `yarn info`, & more

> Yarn does not use `PnP` by default. If you would like to use `PnP`, you can read more about it [here](https://yarnpkg.com/features/pnp).

> Read more about the differences between `Yarn Classic/v1` and `Yarn 3` [here](https://yarnpkg.com/getting-started/migration).

### Upgrading

To upgrade to `Yarn 3` from `Yarn Classic/v1`, run the following command:

```bash
yarn set version berry
yarn install
```

## Yarn Plugins

Now, you can start getting plugins to extend the functionality of `Yarn 3`.

### Yarn-Typescript Plugin

```bash
yarn plugin import typescript
```

This will install the `Yarn-TypeScript` plugin, which automatically adds `@types/` packages into your dependencies when you add a package that doesn't include its own types

### Interactive-Tools

```bash
yarn plugin import interactive-tools
```

This will install the `Interactive-Tools` plugin, which includes the `yarn dedupe` & `yarn upgrade-interactive` commands. These commands will help you to remove duplicate packages from your `node_modules` folder, and upgrade your dependencies to the latest versions.
