import { useState, useEffect } from 'react'

//constraints
import * as constraints from '../../constraints'

//axios
import axios from 'axios'

//component
import DetailProduct from './DetailProduct'

function ListProduct(props) {
    const { user_role } = props
    const [keyword, setKeyword] = useState('')
    const [listProduct, setListProduct] = useState([])
    const [load, setLoad] = useState(false)

    const [openDetail, setOpenDetail] = useState({
        open: false,
        item: {
            id: '',
            name: '',
            value: '',
            isComplete: ''
        }
    })

    useEffect(() => {
        if (keyword === '') {
            const route = constraints.server + '/product/getAllProduct'

            axios.get(route, {
                headers: {
                    'user_role': user_role
                }
            })
                .then(res => {
                    const data = res.data
                    if (data.status) {
                        setListProduct(data.result)
                    }
                })
        }
        else {
            const route = constraints.server + '/product/searchProduct/' + keyword
            axios.get(route, {
                headers: {
                    'user_role': user_role
                }
            })
                .then(res => {
                    const data = res.data
                    if (data.status) {
                        setListProduct(data.result)
                    }
                })
        }
    }, [keyword, openDetail, load])

    const onChangeKeyword = (e) => {
        const { value, name } = e.target
        setKeyword(value.trim())
    }

    const handleOpenDetail = (item) => {
        setOpenDetail({
            ...openDetail,
            open: true,
            item: item

        })
    }



    return (
        <div className="list-product">
            <div className="header">
                <input onChange={onChangeKeyword} placeholder='Nhập id hoặc tên sản phẩm...' type="text" name='keyword' />
            </div>

            <div className="body">
                {listProduct.map(item => {
                    // return <DetailProduct openDetail={openDetail} setOpenDetail={setOpenDetail} key={item.id} item={item} user_role={user_role} />
                    return (
                        <li key={item.id} onClick={()=>handleOpenDetail(item)} style={item.isComplete === 0 ? { backgroundColor: '#e91e63' } : { backgroundColor: '#26a69a' }}>
                            <span>{item.id}</span>
                            <span>{item.name}</span>
                            <span>{item.value}</span>
                            <span>{item.isComplete === 0 ? 'Chưa hoàn thành' : 'Đã hoàn thành'}</span>
                        </li>
                    )   
                })}
            </div>
            <div style={openDetail.open? {display: 'block'}: {display: 'none'}}><DetailProduct load={load} setLoad={setLoad} openDetail={openDetail} setOpenDetail={setOpenDetail} user_role={user_role} /></div>
        </div>
    )
}

export default ListProduct