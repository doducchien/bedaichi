import * as constraints from '../constraints/contraints'

export const setToken = (data)=>{

    return{
        type: constraints.setToken,
        data: data
    }
}

export const removeToken = ()=>{
    return{
        type: constraints.removeToken
    }
}



export const setUser = (data)=>{
    return{
        type: constraints.setUser,
        data: data
    }
}

export const removeUser = ()=>{
    return{
        type: constraints.removeUser
    }
}
