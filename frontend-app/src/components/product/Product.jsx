import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

//component
import ManagerProduct from './ManagerProduct'

function Product() {
    const [mode, setMode] = useState('product')
    const user_role = useSelector(state => state.user.type)

    const changeMode = (mode) => {
        setMode(mode)
    }
    return (
        <div className="product">
            <div className="header">
                <div onClick={() => changeMode('product')} className="product_manager menu_">Quản lý sản phẩm</div>
                <div onClick={() => changeMode('customer')} className="customer menu_">Quản lý khách hàng</div>

            </div>
            <div className="body">
                {
                    mode === 'product'? <ManagerProduct user_role={user_role} />: ''
                }
            </div>
        </div>
    )
}


export default Product