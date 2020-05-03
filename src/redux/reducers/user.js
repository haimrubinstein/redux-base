import actions from '../actionTypes'
let initialState = {};


export default (state = initialState, action) => {
    switch (action.type) {
        case actions.LOG_IN:
            return {...state, logIn: true};
        case 'LOG_OUT':
            return {...state, logIn: false};
        default:
            return state
    }
}
