import "promise-polyfill/src/polyfill";
import "./declarations";

export async function loadPolyfills() {
    const polyfills = [];

    if ("fetch" in window === false) {
        polyfills.push(import("whatwg-fetch"));
    }

    return Promise.all(polyfills);
};
