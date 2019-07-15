interface GlobalWithWindow extends NodeJS.Global {
    window: {
        fetch?(): void;
    };
}

(global as GlobalWithWindow).window.fetch = () => {};
