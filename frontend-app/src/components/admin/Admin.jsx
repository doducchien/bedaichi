import {useState} from 'react'



//component
import AddAcc from './AddAcc'
import UpdateAcc from './UpdateAcc'
import EmailManager from './EmailManager'

function Admin() {
    const [mode, setMode] = useState('add')
    const changeMode =  (mode) =>{
        setMode(mode)
    }
    return (
        <div className='admin'>
            <div className="header">
                <div onClick={()=>changeMode('add')} className="add-acc_ menu-admin">Thêm tài khoản</div>
                <div onClick={()=>changeMode('update')} className="update-acc_ menu-admin">Sửa tài khoản</div>
                <div onClick={()=>changeMode('eamil')} className="email-to-manager menu-admin">Gửi mail cho quản lý</div>
            </div>
            <div className="body_">
                {mode === 'add'? <AddAcc/>: ''}
                {mode === 'update'? <UpdateAcc/>: ''}
                {mode === 'email'? <EmailManager/>: ''}
            </div>


        </div>
    )
}

export default Admin