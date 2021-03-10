import {useState} from 'react'
import {useSelector} from 'react-redux'
import AddStaff from './AddStaff'
import ManagerDepartment from './ManagerDepartment'
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
                <div onClick={()=>changeMode('add')} className="add-staff_ menu_">Thêm mới nhân viên</div>
                <div onClick={()=>changeMode('infomation')} className="manager-infomation-staff menu_">Quản lý thông tin nhân viên</div>
                <div onClick={()=>changeMode('timeword')} className="manager-real-work menu_">Quản lý thời gian làm việc</div>
            </div>
            <div className="body_">
                {mode === 'add' ? <AddStaff user_role={user_role}/>: ''}
                {mode === 'department'? <ManagerDepartment user_role={user_role}/>: ''}
            </div>
        </div>
    )
}

export default Staff