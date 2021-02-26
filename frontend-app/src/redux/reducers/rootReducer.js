import token from './token'


import {combineReducers} from 'redux'


const rootReducer = combineReducers({
    token: token
})

export default rootReducer;