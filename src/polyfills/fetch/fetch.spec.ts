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
        mock('whatwg-fetch', './fetch.mock');

        await FetchPolyfill.apply();

        Expect((global as GlobalWithWindow).window.fetch).toBeDefined();
        Expect((global as GlobalWithWindow).window.fetch).toEqual(Any(Function));
    }
}

interface GlobalWithWindow extends NodeJS.Global {
    window: {
        fetch?(): void;
    };
}
