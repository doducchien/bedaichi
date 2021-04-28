import { useEffect, useState, useRef } from 'react'

//constraints
import * as constraints from '../../constraints'

//axios
import axios from 'axios'

//btn
import Button from '@material-ui/core/Button';

//component
import PopupChangeStaff from './PopupChangeStaff'

//pdf
import Pdf from "react-to-pdf";
import { requirePropFactory } from '@material-ui/core';





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
    const ref = useRef()

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
            <div ref={ref} className="above">


                <h2>CÔNG TY TNHH DỊCH VỤ CÔNG NGHỆ THIÊN HẰNG</h2>
                <p>Báo cáo thông tin chi tiết nhân viên</p>
                <p>Phòng quản lý nhân sự</p>
                <img src={infomationStaff.image} />
                <div className='data'>
                    <div className='item_'>

                        <p><span>Email:</span> <span>{infomationStaff.email}</span> </p>
                        <p><span>Họ và tên:</span> <span>{infomationStaff.fullName}</span> </p>
                        <p><span>Số điện thoại: </span> <span>{infomationStaff.phoneNumber}</span></p>
                        <p><span>Ngày sinh: </span> <span></span>{constraints.changeIntToTime(infomationStaff.birthday)}</p>
                        <p><span>Giới tính: </span> <span>{constraints.sexes.map(item => {
                            if (parseInt(item.value) == parseInt(infomationStaff.sex)) return item.label
                        })}</span></p>
                    </div>
                    <div className='item_'>
                        <p><span>Phòng ban: </span> <span>{listDepartment.map(item => {
                            if (item.value == infomationStaff.department) return item.label
                        })}</span></p>
                        <p><span>Ngày tham gia: </span> <span>{constraints.changeIntToTime(infomationStaff.joinDay)}</span></p>
                        <p><span>Ngày nghỉ việc: </span> <span>{infomationStaff.leftDay ? constraints.changeIntToTime(infomationStaff.leftDay) : ''}</span></p>
                        <p><span>Trạng thái: </span> <span>{constraints.statusWork.map(item => {

                            if (parseInt(item.value) == parseInt(infomationStaff.status)) return item.label

                        })}</span>
                        </p>
                        
                        <p>Ghi chú: {infomationStaff.note}</p>
                    </div>
                </div>
                <br/><br/>

                <div className='asign'><span>Chữ ký giám đốc</span><span>Chữ ký nhân viên quản lý nhân sự</span></div>





            </div>



            <div className="btns_">
                <Button onClick={() => closeDetailStaff()} style={{ width: '150px', height: '30px' }} variant="contained" >Đóng</Button>
                <Button onClick={changeStaff} style={{ width: '150px', height: '30px' }} variant="contained" color="secondary">Chỉnh sửa</Button>

                <Pdf x={-35} targetRef={ref} filename="Báo cáo thông tin nhân viên.pdf">
                    {({ toPdf }) => <Button style={{ width: '150px', height: '30px' }} variant="contained" color="primary" onClick={toPdf}>Xuất báo cáo</Button>}
                </Pdf>
            </div>

            <PopupChangeStaff user_role={user_role} infomationStaff={infomationStaff} closeChangeStaff={closeChangeStaff} openChangeStaff={openChangeStaff} />

        </div>
    )
}

export default DetailStaff