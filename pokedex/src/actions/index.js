export const increment = (increment) => {
    return {
        type: 'INCREMENT',
        payload: increment
    }
}

export const decrement = (decrement) => {
    return {
        type: 'DECREMENT',
        payload: decrement
    }
}