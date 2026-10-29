import { Polyfill } from '../polyfill';

export const CssCustomPropertiesPolyfill: Polyfill = {
    test: () => CSS && CSS.supports('color', 'var(--primary)'),
    apply: async () => (await import('css-vars-ponyfill')).default(),
};
