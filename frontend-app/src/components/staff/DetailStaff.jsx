import { useEffect, useState } from 'react'

//constraints
import * as constraints from '../../constraints'

//axios
import axios from 'axios'

//btn
import Button from '@material-ui/core/Button';

//component
import PopupChangeStaff from './PopupChangeStaff'


function DetailStaff(props) {
    const { user_role, email, closeDetailStaff } = props

    const [infomationStaff, setInfomationStaff] = useState({
        email: '',
        fullName: '',
        phoneNumber: '',
        birthday: '',
        sex: '',
        image: '',
        department: '',
        joinDay: '',
        leftDay: '',
        status: '',
        note: ''
    })

    const [openChangeStaff, setOpenChangeStaff] = useState(false)

    const closeChangeStaff = ()=>{
        setOpenChangeStaff(false)
    }

    const changeStaff = ()=>{
        setOpenChangeStaff(true)
    }

    useEffect(() => {
        const route = constraints.server + `/staff/getDetailStaff/${email}`
        axios.get(route, {
            headers: {
                'user_role': user_role
            }
        })
            .then(res => {
                const data = res.data;

                if (data.status) {
                    setInfomationStaff(data.result)
                }
            })
    }, [email])


    return (
        <div className="detail-staff">
            <div className="above">
                <div className="left">
                    <p>Email:{infomationStaff.email}</p>
                    <p>Họ và tên:{infomationStaff.fullName}</p>
                    <p>Số điện thoại: {infomationStaff.phoneNumber}</p>
                    <p>Ngày sinh: {constraints.changeIntToTime(infomationStaff.birthday)}</p>
                    <p>Giới tính: {infomationStaff.sex}</p>
                    <p>Phòng ban: {infomationStaff.department}</p>
                    <p>Ngày tham gia: {constraints.changeIntToTime(infomationStaff.joinDay)}</p>
                    <p>Ngày nghỉ việc: {infomationStaff.leftDay? constraints.changeIntToTime(infomationStaff.leftDay): ''}</p>
                    <p>Trạng thái: {infomationStaff.status === '0'? 'Đang làm việc': 'Đã nghỉ việc'}</p>

                </div>
                <div className="right">
                    <img src={infomationStaff.image} />
                </div>
            </div>

            <div className="under">
                <p>Ghi chú: {infomationStaff.note}</p>
                <div className="btns_">
                    <Button onClick={()=>closeDetailStaff()} style={{width: '200px', height: '50px'}} variant="contained" >Đóng</Button>
                    <Button onClick={changeStaff} style={{width: '200px', height: '50px'}} variant="contained" color="secondary">Chỉnh sửa</Button>
                    <Button style={{width: '200px', height: '50px'}} variant="contained" color="primary">Xuất file</Button>

                </div>
            </div>

            <PopupChangeStaff infomationStaff={infomationStaff} closeChangeStaff={closeChangeStaff} openChangeStaff={openChangeStaff} />

        </div>
    )
}

export default DetailStaff