import { useEffect, useState } from 'react'

//constraints
import * as constraints from '../../constraints'

//axios
import axios from 'axios'

//btn
import Button from '@material-ui/core/Button';


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
    // console.log(user_role);
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
                    <p>email:{infomationStaff.email}</p>
                    <p>Họ và tên:{infomationStaff.fullName}</p>
                    <p>Số điện thoại: {infomationStaff.phoneNumber}</p>
                    <p>Ngày sinh: {infomationStaff.birthday}</p>
                    <p>Giới tính: {infomationStaff.sex}</p>
                    <p>Phòng ban: {infomationStaff.department}</p>
                    <p>Ngày tham gia: {infomationStaff.joinDay}</p>
                    <p>Ngày nghỉ việc: {infomationStaff.leftDay}</p>
                    <p>Trạng thái: {infomationStaff.status}</p>

                </div>
                <div className="right">
                    <img src={infomationStaff.image} />
                </div>
            </div>

            <div className="under">
                <p>Ghi chú: {infomationStaff.note}</p>
                <div className="btns_">
                    <Button onClick={()=>closeDetailStaff()} style={{width: '200px', height: '50px'}} variant="contained" >Đóng</Button>
                    <Button style={{width: '200px', height: '50px'}} variant="contained" color="secondary">Chỉnh sửa</Button>
                    <Button style={{width: '200px', height: '50px'}} variant="contained" color="primary">Xuất file</Button>



                </div>
            </div>

        </div>
    )
}

export default DetailStaff