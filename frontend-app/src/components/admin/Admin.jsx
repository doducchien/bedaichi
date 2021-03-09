import {useState} from 'react'


//redux-react
import {useSelector} from 'react-redux'

//component
import AddAcc from './AddAcc'
import ManageAcc from './ManagerAcc'
import EmailManager from './EmailManager'

function Admin() {
    const [mode, setMode] = useState('manageAcc')
    const changeMode =  (mode) =>{
        setMode(mode)
    }
    const user_role = useSelector(state => state.user.type)
    return (
        <div className='admin'>
            <div className="header">
                <div onClick={()=>changeMode('add')} className="add-acc_ menu-admin">Thêm tài khoản</div>
                <div onClick={()=>changeMode('manageAcc')} className="manager-acc_ menu-admin">Quản lý tài khoản</div>
                <div onClick={()=>changeMode('log')} className="log menu-admin">Nhật ký</div>
            </div>
            <div className="body_">
                {mode === 'add'? <AddAcc user_role={user_role}/>: ''}
                {mode === 'manageAcc'? <ManageAcc user_role={user_role}/>: ''}
                {mode === 'log'? <EmailManager user_role={user_role}/>: ''}
            </div>


        </div>
    )
}

export default Admin