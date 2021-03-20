import {useState} from 'react'

//btn
import Button from '@material-ui/core/Button';

//component
import PopupAddRegime from './PopupAddRegime'


function ManagerRegime() {
    const [openAddRegime, setOpenAddRegime] = useState(false)
    const addRegime = ()=>{
        setOpenAddRegime(true)
    }   

    return (
        <div className="manager-regime">
            <div className="header">
                <PopupAddRegime />
            </div>
        </div>
    )
}

export default ManagerRegime