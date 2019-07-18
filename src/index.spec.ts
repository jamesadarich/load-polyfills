import { Any, Expect, Test, TestFixture } from 'alsatian';
import mock from 'mock-require';

// currently mocking due to es modules not supported in node where we run the tests
mock('promise-polyfill/src/polyfill', './promise.mock');

@TestFixture('correct index exports')
export class CorrectIndexExports {
    @Test('loadPolyfills function is exported')
    public async loadPolyfillsExported() {
        const { loadPolyfills } = await import('.');
        Expect(loadPolyfills).toEqual(Any(Function));
    }

    @Test('FetchPolyfill is exported')
    public async fetchPolyfillExported() {
        const { FetchPolyfill } = await import('.');
        Expect(FetchPolyfill).toEqual(Any(Object));
    }

    @Test('Promise polyfill is applied')
    public async promisePolyfillIsApplied() {
        Expect((global as NodeJS.Global & { PromisePolyfilled: boolean }).PromisePolyfilled).toBe(true);
    }
}
