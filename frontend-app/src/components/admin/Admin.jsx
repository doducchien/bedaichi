import {useState} from 'react'


//redux-react
import {useSelector} from 'react-redux'

//component
import AddAcc from './AddAcc'
import UpdateAcc from './UpdateAcc'
import EmailManager from './EmailManager'

function Admin() {
    const [mode, setMode] = useState('add')
    const changeMode =  (mode) =>{
        setMode(mode)
    }
    const user_role = useSelector(state => state.user.type)
    return (
        <div className='admin'>
            <div className="header">
                <div onClick={()=>changeMode('add')} className="add-acc_ menu-admin">Thêm tài khoản</div>
                <div onClick={()=>changeMode('update_interactive')} className="manager-acc_ menu-admin">Quản lý tài khoản</div>
                <div onClick={()=>changeMode('console Log')} className="log menu-admin">Gửi mail cho quản lý</div>
            </div>
            <div className="body_">
                {mode === 'add'? <AddAcc user_role={user_role}/>: ''}
                {mode === 'update'? <UpdateAcc/>: ''}
                {mode === 'email'? <EmailManager/>: ''}
            </div>


        </div>
    )
}

export default Admin