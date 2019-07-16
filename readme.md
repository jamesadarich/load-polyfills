# load-polyfills

Dynamically loads browser polyfills only when they are required.

[![Build Status](https://travis-ci.org/jamesadarich/load-polyfills.svg?branch=master)](https://travis-ci.org/jamesadarich/load-polyfills)
[![Maintainability](https://api.codeclimate.com/v1/badges/cb402d23fefd0e2f7973/maintainability)](https://codeclimate.com/github/jamesadarich/load-polyfills/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/cb402d23fefd0e2f7973/test_coverage)](https://codeclimate.com/github/jamesadarich/load-polyfills/test_coverage)


## Motivation

Unfortunately you'll always be packaged the promise one but that only takes up X, from then on should be tiny bloat (~Y B/definition) and browsers that need it will have to download separately.

## Usage

```typescript
import { loadPolyfills, FetchPolyfill } from "load-polyfills";

loadPolyfills(
    FetchPolyfill
).then(() => {
    // start your application
});
```

### Add your own polyfill

```typescript
loadPolyfills({
    test: () => "awesomeNewFeature" in window,
    apply: () => import("awesome-new-feature-polyfill")
});
```

## Contributing

If you've added your own polyfill that you think will be useful to other people or have an 

## License

This package has been released under the [MIT license](https://github.com/jamesadarich/load-polyfills/blob/master/LICENSE)
