import {useState, useEffect} from 'react'

//constraints
import * as constraints from '../../constraints'

//axios
import axios from 'axios'


function ManagerDepartment(props){
    const {user_role} = props

    const [listDepartment, setListDepartment] = useState([])

    var index = 0;

    const showDetailDepartment = (item)=>{
        console.log(item)
    }

    useEffect(()=>{
        const route = constraints.server + '/staff/getAllDepartment';
        axios.get(route, {
            headers:{
                'user_role': user_role
            }
        })
        .then(async res=>{
            const data = await res.data
            setListDepartment(data)
        })

    }, [])


    return(
        <div className="manager-department">
            <div className="list-department">
            {listDepartment.map(item=>{
                return(
                    <div onClick={()=>showDetailDepartment(item)} key={index++} className="department">
                        <h3>{item.name}</h3>
                    </div>
                )
            })}
            </div>
            
        </div>
    )
}


export default ManagerDepartment