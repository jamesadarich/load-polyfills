import { CssCustomPropertiesPolyfill } from '.';
import { TestFixture, Test, Expect, SpyOn } from 'alsatian';
import mock from 'mock-require';

@TestFixture('css custom properties polyfill tests')
export class CssCustomPropertiesPolyfillTests {
    @Test('test() returns false if css custom properties not supported')
    public testFunctionReturnsFalseIfCssCustomPropertiesNotSupported() {
        (global as GlobalWithCSS).CSS = { supports: () => false };
        Expect(CssCustomPropertiesPolyfill.test()).toBe(false);
    }

    @Test('test() returns true if css custom properties supported')
    public testFunctionReturnsTrueIfCssCustomPropertiesSupported() {
        (global as GlobalWithCSS).CSS = { supports: () => false };
        const cssMock = SpyOn(CSS, 'supports');
        cssMock.andReturn(true);
        Expect(CssCustomPropertiesPolyfill.test()).toBe(true);
        cssMock.restore();
    }

    @Test('apply() enables css custom properties')
    public async applyEnablesCSSCustomProperties() {
        (global as GlobalWithCSS).CSS = { supports: () => false };
        const cssMock = SpyOn(CSS, 'supports');

        mock('css-vars-ponyfill', () => cssMock.andReturn(true));

        Expect(CssCustomPropertiesPolyfill.test()).toBe(false);

        await CssCustomPropertiesPolyfill.apply();

        Expect(CssCustomPropertiesPolyfill.test()).toBe(true);

        Expect(CSS.supports('color', 'var(--primary)')).toBe(true);

        cssMock.restore();
    }
}

interface GlobalWithCSS extends NodeJS.Global {
    CSS: {
        supports(): boolean;
    };
}
