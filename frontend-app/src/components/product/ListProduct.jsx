import {useState, useEffect} from 'react'

//constraints
import * as constraints from '../../constraints'

//axios
import axios from 'axios'

function ListProduct(props){
    const {user_role} = props
    const [keyword, setKeyword] = useState('')
    const [listProduct, setListProduct] = useState([])

    useEffect(()=>{
        if(keyword === ''){
            const route = constraints.server + '/product/getAllProduct'

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
            const route = constraints.server + '/product/searchProduct/' + keyword
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
        <div className="list-product">
            <div className="header">
                <input onChange={onChangeKeyword} placeholder='Nhập id hoặc tên sản phẩm...' type="text" name='keyword'/>
            </div>

            <div className="body">
                {listProduct.map(item=>{
                    return(
                        <li style={item.isComplete === 0? {backgroundColor: '#e91e63'}: {backgroundColor: '#26a69a'}} key={item.id}>
                            <span>{item.id}</span>
                            <span>{item.name}</span>
                            <span>{item.value}</span>
                            <span>{item.isComplete === 0? 'Chưa hoàn thành': 'Đã hoàn thành'}</span>
                        </li>
                    )
                })}
            </div>

        </div>
    )
}

export default ListProduct