export interface Polyfill {
    test(): boolean;
    apply(): Promise<void>;
}
