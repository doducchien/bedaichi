import { useState, useEffect } from 'react'
//button
import { Button } from '@material-ui/core';

//component
import MenuDropdown from './MenuDropdown'
import ListAcc from './ListAcc'



//constraints
import * as constraints from '../../constraints'

//axios
import axios from 'axios'
function ManageAcc(props) {
    const [filterMode, setFilterMode] = useState('all')
    const [data, setData] = useState([])
    const [isReload, setIsReload] = useState(false)
    const { user_role } = props

    const reload = ()=>{
        setIsReload(!isReload)
    }
    useEffect(() => {
        const route = constraints.server + '/onlyAdmin/getAcc/' + filterMode;
        axios.get(route,
            {
                headers: {
                    'user_role': user_role
                }
            }


        ).then(response => {
            const data = response.data;
            setData(data)
        })
            .catch(err => {

            })
    },[isReload])
    
    return (
        <div className="manager-acc">
            <div className="header">
                <input type="text" placeholder='Nhập họ tên để tìm kiếm' />
                <MenuDropdown />
                <Button style={{ width: '100px', height: '40px' }} variant="contained" color="secondary">Tìm kiếm</Button>


            </div>
            <div className="body">
                
                <ListAcc reload={reload} data={data} user_role={user_role}/>
            </div>

        </div>
    )
}

export default ManageAcc