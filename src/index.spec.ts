import { Any, Expect, Test, TestFixture, TestCase } from 'alsatian';
import mock from 'mock-require';

// currently mocking due to es modules not supported in node where we run the tests
mock('promise-polyfill/src/polyfill', './promise.mock');

@TestFixture('correct index exports')
export class CorrectIndexExports {
    @TestCase('loadPolyfills', Function)
    @TestCase('FetchPolyfill', Object)
    @Test('loadPolyfills function is exported')
    public async loadPolyfillsExported(key: keyof typeof import('.'), typeConstructor: new () => object) {
        const exports = await import('.');
        Expect(exports[key]).toEqual(Any(typeConstructor));
    }

    @Test('Promise polyfill is applied')
    public async promisePolyfillIsApplied() {
        Expect((global as NodeJS.Global & { PromisePolyfilled: boolean }).PromisePolyfilled).toBe(true);
    }
}
