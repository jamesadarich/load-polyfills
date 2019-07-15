import { Polyfill } from './polyfills';

export function loadPolyfills(...polyfills: Polyfill[]): Promise<void[]> {
    const requiredPolyfills = polyfills.filter(p => p.test() === false);
    return Promise.all(requiredPolyfills.map(p => p.apply()));
}
