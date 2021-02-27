
//reducer
import token from './token'
import user from './user'

import {combineReducers} from 'redux'


const rootReducer = combineReducers({
    token: token,
    user: user
})

export default rootReducer;