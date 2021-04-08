import { useState, useEffect } from 'react'


//constraints 
import * as constraints from '../../constraints'

//axios
import axios from 'axios'


function UnitSalary(props) {
    const { user_role } = props
    const [listStaff, setListStaff] = useState([])
    const [listStaffUnit, setListStaffUnit] = useState([])

    const [keyword, setKeyword] = useState('')


    const handleChangeKeyword = (e) => {
        const { name, value } = e.target
        setKeyword(value.trim())
    }

    useEffect(() => {

        if (keyword !== '') {
            const route = constraints.server + '/salary/searchStaff/' + keyword
            axios.get(route, {
                headers: {
                    'user_role': user_role
                }
            })
                .then(res => {
                    const data = res.data
                    if(data.status){
                        setListStaff()
                    }
                })
        }
        else{
            const route = constraints.server + '/salary/getAllStaff'
            axios.get(route, {
                headers: {
                    'user_role': user_role
                }
            })
                .then(res => {
                    const data = res.data
                    setListStaff(data.result)
                })

        }

    }, [keyword])

    useEffect(()=>{
        const route = constraints.server + '/salary/getAllStaffUnitSalary'
        axios.get(route, {
            headers:{
                'user_role': user_role
            }
        })
        .then(res=>{
            const data = res.data
            if(data.status){
                const listEmail = data.result.map(item => {
                    return item.email
                })
                setListStaffUnit(listEmail)
            }
        })
    }, [])

    return (
        <div className="unit-salary">
            <div className="header">
                <input name='keyword' onChange={handleChangeKeyword} type="text" placeholder='Nhập email hoặc họ tên...' />
            </div>
            <div className="body">
                <div className="left">
                {listStaff.map(item=>{
                    let color = '#3f51b5'
                    if(listStaffUnit.indexOf(item.email) === -1) color = '#ad1457'
                    return <li style={{backgroundColor: color}}><span>{item.email}</span><span>{item.fullName}</span></li>
                })}
                </div>
                <div className="right"></div>
                
            </div>
        </div>
    )
}

export default UnitSalary