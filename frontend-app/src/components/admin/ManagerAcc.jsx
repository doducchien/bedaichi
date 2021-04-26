import { useState, useEffect } from 'react'

//component
import MenuDropdown from './MenuDropdown'
import ListAcc from './ListAcc'
import Popup from './Popup'



//constraints
import * as constraints from '../../constraints'

//axios
import axios from 'axios'
function ManageAcc(props) {

    const [search, setSearch] = useState("")
    const [filterMode, setFilterMode] = useState('all')
    const [data, setData] = useState([])
    const [isReload, setIsReload] = useState(false)
    const [resultChangeRole, setResultChangeRole] = useState({
        open: false,
        title: 'Thông báo thay đổi quyền quản lý',
        content: ''
    })
    const { user_role } = props

    const reload = ()=>{
        setIsReload(!isReload)
    }

    const changeFilterMode = (mode)=>{
        setFilterMode(mode)
    }

    const onChangeSearch = (event)=>{
        const value = event.target.value.trim()
        
        setSearch(value)
    }

 


    const changeRole = (value)=>{
        console.log(user_role)
        const route = constraints.server + '/onlyAdmin/updateAcc'
        axios.put(route, value,
            {
                headers:{
                    'user_role': user_role
                }
            }
        ).then(async res=>{
            const data = await res.data
            let resultChangeRole_ = {
                ...resultChangeRole,
                open:true
            }
            if(data.status){
                resultChangeRole_.content = 'Thay đổi quyền thành công'
            }
            else resultChangeRole_.content = 'Đã có lỗi xảy ra. Vui lòng thử lại'
            setResultChangeRole(resultChangeRole_)
        })
    }
    
    const closePopup = ()=>{
        const resultChangeRole_ = {
            ...resultChangeRole,
            open: false
        }
        setResultChangeRole(resultChangeRole_)
    }


    useEffect(() => {
        const keyword = search === ''? 'empty': search
        const route = constraints.server + '/onlyAdmin/getAcc/' + filterMode + '/' + keyword
        console.log(route)
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
    },[isReload, filterMode, resultChangeRole, search])
    
    return (
        <div className="manager-acc">
            <div className="header">
                <input onChange={onChangeSearch} name='fullNameSearch' type="text" placeholder='Nhập họ tên để tìm kiếm' />
                <MenuDropdown changeFilterMode={changeFilterMode} />

            </div>
            <div className="body">
                
                <ListAcc changeRole={changeRole} reload={reload} data={data} user_role={user_role}/>
            </div>
            <Popup result={resultChangeRole} closePopup={closePopup}/>

        </div>
    )
}

export default ManageAcc