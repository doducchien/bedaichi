import {useState, useEffect} from 'react'

//constraints
import * as constraints from '../../constraints'

//axios
import axios from 'axios'


function ListCustomer(props){

    const {user_role} = props
    const [keyword, setKeyword] = useState('')
    const [listProduct, setListProduct] = useState([])

    useEffect(()=>{
        if(keyword === ''){
            const route = constraints.server + '/product/getAllCustomer'

            axios.get(route, {
                headers:{
                    'user_role': user_role
                }
            })
            .then(res=>{
                const data = res.data
                if(data.status){
                    setListProduct(data.result)
                }
            })
        }
        else{
            const route = constraints.server + '/product/searchCustomer/' + keyword
            axios.get(route, {
                headers:{
                    'user_role': user_role
                }
            })
            .then(res=>{
                const data = res.data
                if(data.status){
                    setListProduct(data.result)
                }
            })
        }
    }, [keyword])
    const onChangeKeyword = (e)=>{
        const {value, name} = e.target
        setKeyword(value.trim())
    }
    return(
        <div className="list-customer">
            <div className="header">
                <input onChange={onChangeKeyword} placeholder='Nhập email, tên cá nhân hoặc tên công ty...' type="text" name='keyword'/>
            </div>

            <div className="body">
                {listProduct.map(item=>{
                    return(
                        <li key={item.email}>
                            <span>{item.email}</span>
                            <span>{item.fullName}</span>
                            <span>{item.company}</span>
                            {/* <span>{item.isComplete === 0? 'Chưa hoàn thành': 'Đã hoàn thành'}</span> */}
                        </li>
                    )
                })}
            </div>
        </div>
    )
}

export default ListCustomer