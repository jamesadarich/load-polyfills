import { Any, Expect, Test, TestFixture } from 'alsatian';
import { loadPolyfills, FetchPolyfill } from '.';

@TestFixture('correct index exports')
export class CorrectIndexExports {
    @Test('loadPolyfills function is exported')
    public loadPolyfillsExported() {
        Expect(loadPolyfills).toBeDefined();
        Expect(loadPolyfills).not.toBeNull();
        Expect(loadPolyfills).toEqual(Any(Function));
    }

    @Test('FetchPolyfill is exported')
    public fetchPolyfillExported() {
        Expect(FetchPolyfill).toBeDefined();
        Expect(FetchPolyfill).not.toBeNull();
        Expect(FetchPolyfill).toEqual(Any(Object));
    }
}
