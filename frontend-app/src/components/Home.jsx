

import {useState} from 'react'

//material-icons
import 'material-icons/iconfont/material-icons.scss';

//component
import Menu from './Menu'
import Admin from './admin/Admin'
import Staff from './staff/Staff'
import Regime from './regime/Regime'
import Product from './product/Product'
import Salary from './salary/Salary'


function Home(props) {
    const {user} = props
    const [position, setPosition] = useState(user.type);

    const changePosition = (pos)=>{
        console.log(position)
        if(user.type === 'admin') setPosition(pos)
        else{
            if(pos !== user.type) alert("Bạn không có quyền truy cập vào chức năng " + pos)
            
        }
        
    }
    return (
        <div className='home'>

            <Menu user={user} changePosition={changePosition} position={position} />
            <div className="right">
                {
                   position === 'admin'? <Admin />: ''
                }

                {
                    position === 'staff'? <Staff />: ''
                }

                {
                    position === 'regime'? <Regime />: ''
                }
                {
                    position === 'product'? <Product/>: ''
                }
                {
                    position === 'salary'? <Salary />: ''
                }
            </div>

        </div>
    )
}

export default Home;