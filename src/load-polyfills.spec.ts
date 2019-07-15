import { loadPolyfills } from './load-polyfills';
import { TestFixture, Test, Expect, SpyOn, createFunctionSpy } from 'alsatian';
import { PolyfillBuilder } from './polyfills/polyfill.builder';

@TestFixture('loadPolyfills tests')
export class LoadPolyfillsTests {
    @Test('test() returns false calls apply()')
    public async testFunctionReturnsFalseCallsApply() {
        const polyfill = new PolyfillBuilder().withTestReturn(false).build();

        SpyOn(polyfill, 'apply');

        await loadPolyfills(polyfill);

        Expect(polyfill.apply).toHaveBeenCalled();
    }

    @Test('test() returns true does not call apply()')
    public async testFunctionReturnsTrueDoesNotCallApply() {
        const polyfill = new PolyfillBuilder().withTestReturn(true).build();

        SpyOn(polyfill, 'apply');

        await loadPolyfills(polyfill);

        Expect(polyfill.apply).not.toHaveBeenCalled();
    }

    @Test('loadPolyfills() resolves after single apply() called')
    public async resolvesAfterSingleApplyCalled() {
        const polyfill = new PolyfillBuilder().withTestReturn(false).build();

        const loadResolve = createFunctionSpy();
        let applyResolve = () => {};
        SpyOn(polyfill, 'apply').andReturn(new Promise<void>(resolve => (applyResolve = resolve)));

        const loadPromise = loadPolyfills(polyfill).then(loadResolve);

        Expect(loadResolve).not.toHaveBeenCalled();

        applyResolve();
        await loadPromise;

        Expect(loadResolve).toHaveBeenCalled();
    }
}
