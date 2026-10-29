import { FetchPolyfill } from '.';
import { Any, TestFixture, Test, Expect } from 'alsatian';
import mock from 'mock-require';

@TestFixture('fetch polyfill tests')
export class FetchPolyfillTests {
    @Test('test() returns false if no fetch')
    public testFunctionReturnsFalseIfNoFetch() {
        (global as GlobalWithWindow).window = {};
        Expect(FetchPolyfill.test()).toBe(false);
    }

    @Test('test() returns true if fetch exists')
    public testFunctionReturnsTrueIfFetchExists() {
        (global as GlobalWithWindow).window = { fetch: () => {} };
        Expect(FetchPolyfill.test()).toBe(true);
    }

    @Test('apply() creates a fetch')
    public async applyCreatesAFetch() {
        (global as GlobalWithWindow).window = {};
        mock('whatwg-fetch', './fetch.mock');

        Expect(FetchPolyfill.test()).toBe(false);

        await FetchPolyfill.apply();

        Expect(FetchPolyfill.test()).toBe(true);

        Expect((global as GlobalWithWindow).window.fetch).toBeDefined();
        Expect((global as GlobalWithWindow).window.fetch).toEqual(Any(Function));
    }
}

interface GlobalWithWindow extends NodeJS.Global {
    window: {
        fetch?(): void;
    };
}
