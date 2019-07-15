// eslint-disable-next-line @typescript-eslint/no-triple-slash-reference
/// <reference path="./fetch.d.ts" />
import { Polyfill } from '../polyfill';

export const FetchPolyfill: Polyfill = {
    test: () => 'fetch' in window,
    apply: () => import('whatwg-fetch'),
};
