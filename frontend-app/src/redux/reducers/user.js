import * as constraints from '../constraints/contraints'

const initState = {}


const user = (state = initState, action)=>{
    const{type, data} = action
    let state_= {...state}
    if(type === constraints.setUser){
        state_ = data
    }
    else if(type === constraints.removeUser){
        state = null
    }
    return state_
}

export default user