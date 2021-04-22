import { useState } from 'react'
import { useSelector } from 'react-redux'

//component
import UnitSalary from './UnitSalary'
import TotalSalary from './TotalSalary'
import TableSalary from './TableSalary'


function Salary() { 
    const [mode, setMode] = useState('unitSalary')
    const user_role = useSelector(state => state.user.type)
    const changeMode = (mode) => {
        setMode(mode)
    }
    return (
        <div className="salary">
            <div className="header">
                <div onClick={() => changeMode('unitSalary')} className="unit-salary_ menu_">Đơn vị lương</div>
                <div onClick={() => changeMode('totalSalary')} className="total-salary_ menu_">Lương thực tế</div>
                <div onClick={() => changeMode('tableSalary')} className="table-salary_ menu_">Bảng lương</div>


            </div>
            <div className="body_">
                {mode === 'unitSalary' ? <UnitSalary user_role={user_role} /> : ''}
                {mode === 'totalSalary' ? <TotalSalary user_role={user_role} /> : ''}
                {mode === 'tableSalary' ? <TableSalary user_role={user_role} /> : ''}

            </div>
        </div>
    )

}

export default Salary