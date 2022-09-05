# Routing

`react-router` is the de-facto standard routing solution for React applications.

## Why not use [connected-react-router](https://github.com/supasate/connected-react-router)?

There is a detailed explanation for this decision [here](https://reacttraining.com/react-router/web/guides/deep-redux-integration). In short, the recommendation is to forego keeping routes in the Redux store, simply because it shouldn't be needed. There are other ways of navigating, as explained there.

## Usage

To add a new route, simply import the `Route` component and use it standalone or inside the `Routes` component (all part of [RR6 API](https://reactrouter.com/docs/en/v6/getting-started/overview)):

```ts
<Route path="/" element={<HomePage />} />
```

Top level routes are located in `src/app/index.tsx`.

If you want your route component (or any component for that matter) to be loaded asynchronously, use the component generator with 'Do you want to load resources asynchronously?' option activated.

## Child Routes

For example, if you have a route called `about` at `/about`, and want to make a child route called `team` at `/about/our-team`, follow the example in `src/app/index.tsx` to create a `Routes` within the parent component.

#### `AboutPage/index.tsx`

```ts
import { Routes, Route } from 'react-router-dom';

export function AboutPage() {
  return (
    <Routes>
      <Route path="/about/our-team" />
    </Routes>
  );
}
```

## Routing programmatically

You can use the `react-router hooks`, such as [useNavigate](https://reactrouter.com/docs/en/v6/hooks/use-navigate) or [useParams](https://reactrouter.com/docs/en/v6/hooks/use-params), to change the route, get params, and more.

```ts
import { useNavigate } from 'react-router-dom';

function HomeButton() {
  let navigate = useNavigate();

  function handleClick() {
    navigate('/home');
  }

  return (
    <button type="button" onClick={handleClick}>
      Go home
    </button>
  );
}
```

{% hint style="info" %}

You can read more in [`react-router`'s documentation](https://reactrouter.com/docs/en/v6).

{% endhint %}
