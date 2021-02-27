

import {useState, useEffect} from 'react'

//material-icons
import 'material-icons/iconfont/material-icons.scss';

//component
import Menu from './Menu'
import Admin from './admin/Admin'


function Home() {
    const [position, setPosition] = useState('admin');

    return (
        <div className='home'>

            <Menu position={position} />
            <div className="right">
                {
                   position === 'admin'? <Admin />: ''
                }
                
            </div>

        </div>
    )
}

export default Home;