import * as constraints from '../constraints/contraints'

export const setToken = (data)=>{

    return{
        type: constraints.setToken,
        data: data
    }
}
