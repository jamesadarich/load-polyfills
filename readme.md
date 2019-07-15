# load-polyfills

Dynamically loads browser polyfills when they are required.

## motivation

Unfortunately you'll always be packaged the promise one but that only takes up X, from then on should be tiny bloat (~Y B/definition) and browsers that need it will have to download separately.

## usage

### add your own polyfill
