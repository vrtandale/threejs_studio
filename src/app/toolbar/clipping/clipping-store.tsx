type Listener = (args: { clippingPosition: number }) => void;

const listeners = new Set<Listener>();

let clippingPosition = 0;

export const useClippingStore = (onChange?: Listener) => {
    // Register listener
    if (onChange){
    listeners.add(onChange);
    }
    // Return store API
    const setClippingPosition = (position: number) => {
        clippingPosition = position;

        // Notify all listeners
        listeners.forEach(fn => fn({ clippingPosition }));
    };

    const getClippingPosition = () => clippingPosition;

    // Allow cleanup
    const unsubscribe = () => {
        if (onChange){
        listeners.delete(onChange);
        }
    };

    return {
        getClippingPosition,
        setClippingPosition,
        unsubscribe,
        clippingPosition
    };
};
