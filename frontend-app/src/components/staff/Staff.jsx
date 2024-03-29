import {useState} from 'react'
import {useSelector} from 'react-redux'

//component
import AddStaff from './AddStaff'
import ManagerDepartment from './ManagerDepartment'
import ManagerStaff from './ManagerStaff'
import ManagerTimeWork from './ManagerTimeWork'


function Staff() {
    const [mode, setMode] = useState('add')
    const user_role = useSelector(state => state.user.type)
    const changeMode = (mode)=>{
        setMode(mode)
    }
    return(
        <div className="staff">
            <div className="header">
                <div onClick={()=>changeMode('department')} className="manager-department menu_">Quản lý phòng ban</div>
                <div onClick={()=>changeMode('add')} className="add-staff_ menu_">Thêm nhân viên</div>
                <div onClick={()=>changeMode('information')} className="manager-infomation-staff menu_">Quản lý thông tin</div>
                <div onClick={()=>changeMode('timework')} className="manager-real-work menu_">Quản lý thời gian</div>
            </div>
            <div className="body_">
                {mode === 'add' ? <AddStaff user_role={user_role}/>: ''}
                {mode === 'department'? <ManagerDepartment user_role={user_role}/>: ''}
                {mode === 'information'? <ManagerStaff user_role={user_role}/>: ''}
                {mode === 'timework'? <ManagerTimeWork user_role={user_role}/>: ''}
            </div>
        </div>
    )
}

export default Staff