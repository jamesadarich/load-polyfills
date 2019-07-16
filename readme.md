# load-polyfills

Dynamically loads browser polyfills only when they are required.

[![Build Status](https://travis-ci.org/jamesadarich/load-polyfills.svg?branch=master)](https://travis-ci.org/jamesadarich/load-polyfills)
[![Maintainability](https://api.codeclimate.com/v1/badges/cb402d23fefd0e2f7973/maintainability)](https://codeclimate.com/github/jamesadarich/load-polyfills/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/cb402d23fefd0e2f7973/test_coverage)](https://codeclimate.com/github/jamesadarich/load-polyfills/test_coverage)


## Motivation

There are so many great new features being added to modern evergreen browsers that we can all take advantage of. Unfortunately, there are some browsers that will never take these features and still represent a significant proportion of users. Enter polyfills to save the day! They back port these new features but at a cost of all users having to download. [polyfill.io](https://polyfill.io/) gives you the ability to load only these polyfills when needed, avoiding the download cost but still present an additional network request.

`load-polyfills` is an answer to the problem without additional network requests for users who don't need the polyfills and minimal additional package size by allowing bundlers such as `webpack` to remove code you don't need and only load those polyfills when the feature has been detected as missing. 

## Usage

Using `load-polyfills` is simple, all you need to do is import the `loadPolyfills` function plus any feature polyfills you need. Pass the polyfills to `loadPolyfills` which returns a `Promise` that allows you to continue loading your application after the polyfills have been successfully loaded.

```typescript
import { loadPolyfills, FetchPolyfill } from "load-polyfills";

loadPolyfills(
    FetchPolyfill
).then(() => {
    // start your application
});
```

### Add your own polyfill

If there is a polyfill that isn't available in `load-polyfills` then you can create your own by passing something similar to the following...

```typescript
loadPolyfills({
    test: () => "awesomeNewFeature" in window,
    apply: () => import("awesome-new-feature-polyfill")
});
```

The `test` function should return a `boolean` to indicate whether or not the feature exists.
The `apply` function should perform an asynchronous import to load the desired script to polyfill the feature. This function will only be called if `test` returns `false`.

Once you've done all that your a mere few unit tests away from a pull request back to this package!

## Contributing

If you've added your own polyfill that you think will be useful to other people or have an awesome improvement to make, simply raise a pull request!

## License

This package has been released under the [MIT license](https://github.com/jamesadarich/load-polyfills/blob/master/license)
