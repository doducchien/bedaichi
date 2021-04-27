import { useState, useEffect } from 'react'

//constraints
import * as constraints from '../../constraints'

//axios
import axios from 'axios'

//component
import DetailDepartment from './DetailDepartment'
import AddDepartment from './AddDepartment'

//button material ui
import Button from '@material-ui/core/Button';

import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';



function ManagerDepartment(props) {
    const { user_role } = props

    const [listDepartment, setListDepartment] = useState([])
    const [infoDepartment, setInfoDepartment] = useState(null)
    const [load, setLoad] = useState(false)
    var index = 0;
    const deleteInfoDepartment = ()=>{
        setInfoDepartment(null)
    }
    const showDetailDepartment = (item) => {
        setInfoDepartment(item)
    }

    const reload = ()=>{
        setLoad(!load)
    }
    
    useEffect(() => {
        const route = constraints.server + '/staff/getAllDepartment';
        axios.get(route, {
            headers: {
                'user_role': user_role
            }
        })
            .then(async res => {
                const data = await res.data
                setListDepartment(data)
            })

    }, [infoDepartment, load])


    return (
        <div className="manager-department">
            <div className="list-department">
                {listDepartment.map(item => {
                    return (
                        <div onClick={() => showDetailDepartment(item)} key={index++} className="department">
                            <MeetingRoomIcon/>
                            <h3>{item.name}</h3>
                        </div>
                    )
                })}
            </div>
            <div className="right">
                {infoDepartment ? <DetailDepartment deleteInfoDepartment={deleteInfoDepartment} user_role={user_role} infoDepartment={infoDepartment} /> : <AddDepartment reload={reload} user_role={user_role}/>}

              
            </div>


        </div>
    )
}


export default ManagerDepartment