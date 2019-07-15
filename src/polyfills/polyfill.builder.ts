import { Polyfill } from './polyfill';

export class PolyfillBuilder {
    private testFunction = (): boolean => true;
    private applyFunction = (): Promise<void> => new Promise<void>((r: () => void) => r());

    public withTestReturn(value: boolean): this {
        this.testFunction = () => value;
        return this;
    }

    public build(): Polyfill {
        return {
            test: this.testFunction,
            apply: this.applyFunction,
        };
    }
}
