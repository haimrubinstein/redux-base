let initialState = {};


export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {...state, logIn: true};
        default:
            return state
    }
}
