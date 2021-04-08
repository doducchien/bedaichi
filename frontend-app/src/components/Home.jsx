

import {useState, useEffect} from 'react'

//material-icons
import 'material-icons/iconfont/material-icons.scss';

//component
import Menu from './Menu'
import Admin from './admin/Admin'
import Staff from './staff/Staff'
import Regime from './regime/Regime'
import Product from './product/Product'
import Salary from './salary/Salary'


function Home() {
    const [position, setPosition] = useState('admin');
    const changePosition = (pos)=>{
        setPosition(pos)
    }
    return (
        <div className='home'>

            <Menu changePosition={changePosition} position={position} />
            <div className="right">
                {
                   position === 'admin'? <Admin />: ''
                }

                {
                    position == 'staff'? <Staff />: ''
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