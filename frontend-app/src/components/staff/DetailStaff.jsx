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
    const [listDepartment, setListDepartment] = useState([])


    const closeChangeStaff = () => {
        setOpenChangeStaff(false)
    }

    const changeStaff = () => {
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
    }, [email, openChangeStaff])

    
    useEffect(() => {
        const route = constraints.server + '/staff/getAllDepartment';
        axios.get(route, {
            headers: {
                'user_role': user_role
            }
        })
            .then(async res => {
                const list = await res.data.map(item => {
                    return {
                        value: item.id,
                        label: item.name
                    }
                })
                setListDepartment(list)
            })
    }, [])


    return (
        <div className="detail-staff">
            <div className="above">
                <div className="left">
                    <p>Email:{infomationStaff.email}</p>
                    <p>Họ và tên:{infomationStaff.fullName}</p>
                    <p>Số điện thoại: {infomationStaff.phoneNumber}</p>
                    <p>Ngày sinh: {constraints.changeIntToTime(infomationStaff.birthday)}</p>
                    <p>Giới tính: {constraints.sexes.map(item => {
                        if (parseInt(item.value) == parseInt(infomationStaff.sex)) return item.label
                    })}</p>
                    <p>Phòng ban: {listDepartment.map(item => {
                        if (item.value == infomationStaff.department) return item.label
                    })}</p>
                    <p>Ngày tham gia: {constraints.changeIntToTime(infomationStaff.joinDay)}</p>
                    <p>Ngày nghỉ việc: {infomationStaff.leftDay ? constraints.changeIntToTime(infomationStaff.leftDay) : ''}</p>
                    <p>Trạng thái: {constraints.statusWork.map(item => {

                        if (parseInt(item.value) == parseInt(infomationStaff.status)) return item.label

                    })}
                    </p>

                </div>
                <div className="right">
                    <img src={infomationStaff.image} />
                </div>
            </div>

            <div className="under">
                <p>Ghi chú: {infomationStaff.note}</p>
                <div className="btns_">
                    <Button onClick={() => closeDetailStaff()} style={{ width: '150px', height: '30px' }} variant="contained" >Đóng</Button>
                    <Button onClick={changeStaff} style={{ width: '150px', height: '30px' }} variant="contained" color="secondary">Chỉnh sửa</Button>
                    <Button style={{ width: '150px', height: '30px' }} variant="contained" color="primary">Xuất file</Button>

                </div>
            </div>

            <PopupChangeStaff user_role={user_role} infomationStaff={infomationStaff} closeChangeStaff={closeChangeStaff} openChangeStaff={openChangeStaff} />

        </div>
    )
}

export default DetailStaff