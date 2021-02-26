import * as constraints from '../constraints/contraints'

const tokenStorage = localStorage.getItem('token');
const initState = tokenStorage? tokenStorage: null
const token = (state = initState, action)=>{
    const {type, data} = action;
    let state_ = state;
    if(type === constraints.setToken){
        state_ = data
        localStorage.setItem('token', state_);
        
    }
    else if(type === constraints.removeToken){
        localStorage.removeItem('token')
        state_ = null
    }

    return state_

}
export default token;