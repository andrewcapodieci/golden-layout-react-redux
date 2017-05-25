export function setState(state) {
    return {
        type: 'SET_STATE',
        state
    };
}

export function incrementCount() {
    return {
        type: 'INCREMENT_COUNT'
    };
}

export function decrementCount() {
    return {
        type: 'DECREMENT_COUNT'
    };
}
