import React, { useState, useEffect } from 'react';

//dropdown
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


//constraints
import * as constraints from '../../constraints'

//axios
import axios from 'axios'

//btn
import { Button } from '@material-ui/core';

//component
import ListStaff from './ListStaff'
import DetailStaff from './DetailStaff'




function ManagerStaff(props) {

    const { user_role } = props

    const [searchMode, setSearchMode] = useState({
        department: 'ALL',
        status: 'ALL',
        keyword: ''
    })


    const [detailStaff, setDetailStaff] = useState(null);
    const [listStaff, setListStaff] = useState([])

    const [listDepartment, setListDepartment] = useState([])
    useEffect(()=>{
        const route = constraints.server + '/staff/getAllDepartment';
        axios.get(route, {
            headers:{
                'user_role': user_role
            }
        })   
        .then(res=>{
            const data = res.data
            setListDepartment(data)
        })
    },[])

    const onChangeKeyWord = (event)=>{
        const {name, value} = event.target
        setSearchMode({
            ...searchMode,
            [name]: value
        })
    } 

    const changeDetailStaff = (email)=>{
        console.log(email)
        setDetailStaff(email)
    }

    const closeDetailStaff = ()=>{
        setDetailStaff(null)
    }

    useEffect(()=>{
        let {keyword, department, status} = searchMode
        if(keyword === '') keyword = null
        const route = constraints.server + `/staff/searchStaff/${keyword}/${department}/${status}`
        axios.get(route, {
            headers:{
                'user_role': user_role
            }
        })
        .then(res=>{
            const data = res.data
        
            if(data.status) setListStaff(data.result)
        })
    }, [searchMode])



    //-------------------------dropdown-------------------------------------------
    const [anchorEl1, setAnchorEl1] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);

    

    const handleClose1 = () => {
        setAnchorEl1(null);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };

    const handleClick1 = (event) => {

        setAnchorEl1(event.currentTarget);
      
    };

    const handleClick2 = (event) => {

        setAnchorEl2(event.currentTarget);
      
    };

    const onSelect1 = (event) => {
        const { textContent } = event.target;
        setSearchMode({
            ...searchMode,
            department: textContent
        })
        setAnchorEl1(null)
    }

    const onSelect2 = (event) => {
        const { textContent } = event.target;
        setSearchMode({
            ...searchMode,
            status: textContent
        })
        setAnchorEl2(null)
    }

    //----------------end-----------dropdown-------end--------------

    return (
        <div className="manager-staff">
            <div style={detailStaff? {display: 'none'}: null} className="header">
                <input name='keyword' onChange={onChangeKeyWord} type="text" placeholder='Nhập tên hoặc email...' />

                <div className='department_'>
                    Phòng ban:
                    <Button onClick={handleClick1} color='primary'>{searchMode.department}</Button>
                    <Menu
                        contextMenu='menu'
                        id="simple-menu"
                        anchorEl={anchorEl1}
                        keepMounted
                        open={Boolean(anchorEl1)}
                        onClose={handleClose1}
                    >
                        <MenuItem onClick={onSelect1}>ALL</MenuItem>
                        {listDepartment.map(item=>{
                            return <MenuItem key={item.id} onClick={onSelect1}>{item.name}---{item.id}</MenuItem>

                        })}
                        
                    </Menu>
                </div>

                <div className='status_'>
                    Tình trạng:
                    <Button onClick={handleClick2} color='primary'>{searchMode.status}</Button>
                    <Menu
                        contextMenu='menu'
                        id="simple-menu"
                        anchorEl={anchorEl2}
                        keepMounted
                        open={Boolean(anchorEl2)}
                        onClose={handleClose2}
                    >
                        <MenuItem onClick={onSelect2}>ALL</MenuItem>

                        <MenuItem onClick={onSelect2}>Đang làm việc</MenuItem>
                        <MenuItem onClick={onSelect2}>Đã nghỉ việc</MenuItem>
                       
                    </Menu>
                </div>


            </div>
            <div className="body">
               {detailStaff? <DetailStaff closeDetailStaff={closeDetailStaff} user_role={user_role} email={detailStaff}/>: <ListStaff openDetailStaff={changeDetailStaff} user_role={user_role} listStaff={listStaff} />}
            </div>

        </div>
    )

}

export default ManagerStaff
