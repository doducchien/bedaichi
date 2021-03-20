import { useState } from 'react'
import { useSelector } from 'react-redux'


//component
import ManagerRegime from './ManagerRegime'
import ManagerAwareness from './ManagerAwareness'



function Regime() {
    const [mode, setMode] = useState('regime')
    const user_role = useSelector(state => state.user.type)
    const changeMode = (mode) => {
        setMode(mode)
    }
    return (
        <div className="regime">
            <div className="header">
                <div onClick={() => changeMode('regime')} className="regime_ menu_">Chế độ đãi ngộ</div>
                <div onClick={() => changeMode('awareness')} className="awareness_ menu_">Ý thức làm việc</div>
                
            </div>
            <div className="body_">
                {mode === 'regime' ? <ManagerRegime user_role={user_role} /> : ''}
                {mode === 'awareness' ? <ManagerAwareness user_role={user_role} /> : ''}
              
            </div>

        </div>
    )
}

export default Regime