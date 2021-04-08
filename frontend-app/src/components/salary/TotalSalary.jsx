import { useState, useEffect } from 'react'

//datepicker
import 'date-fns';

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';


//textfeild
import TextField from '@material-ui/core/TextField';

//constraints
import * as constraints from '../../constraints'

//axios
import axios from 'axios'

//component
import Popup from './Popup'
import PopupDiscount from './PopupDiscount'


function TotalSalary(props) {

    const { user_role } = props

    const [selectedDate, setSelectedDate] = useState(() => {
        let date = new Date()
        date.setDate(1)
        date.setHours(0, 0, 0, 0)
        return date
    });

    const handleDateChange = (date) => {
        date.setDate(1)
        date.setHours(0, 0, 0, 0)
        setSelectedDate(date);
    };

    const [listUnitStaff, setListUnitStaff] = useState([])
    const [listTotalStaff, setListTotalStaff] = useState([])

    const [readOnly, setReadOnly] = useState(true)

    const [fullNameDetail, setFullNameDetail] = useState('')
    const [countOverTime, setCountOverTime] = useState(0)
    const [countAttendance, setCountAttendance] = useState(0)
    const [countLateTime, setCountLateTime] = useState(0)

    const [detail, setDetail] = useState({
        emailDetail: '',
        allowance: '',
        overtimeSalary: '',
        basicSalary: '',
        attendanceBonus: '',
        completedBonus: '',
        awarenessBonus: ''

    })



    const [formInputSalary, setFormInputSalary] = useState({
        basicSalary: '',
        overtimeSalary: '',
        allowance: '',
        attendanceBonus: '',
        completedBonus: '',
        awarenessBonus: '',
        note: ''


    })

    const [result1, setResult1] = useState({
        open: false,
        title: '',
        content: ''
    })

    const [openPopupDiscount, setOpenPopupDiscount] = useState(false)

    const onChangeInputSalary = () => {

    }

    const openDetail = (email, setted) => {
        console.log(email);
        if (setted === 0) {
            setResult1({
                ...result1,
                open: true,
                title: 'Thông báo',
                content: 'Nhân viên này chưa được set đơn vị lương !'
            })
        }
        else setDetail({
            ...detail,
            emailDetail: email
        })

    }

    const closeResult1 = () => {
        setResult1({
            ...result1,
            open: false,
            title: '',
            content: ''
        })
    }

    const openDiscount = ()=>{
        setOpenPopupDiscount(true)
    }


    //set lai forminput


    //lay ho ten tuong ung
    useEffect(() => {
        
        if (detail.emailDetail.trim() !== '') {
            const route = constraints.server + '/salary/getNameStaff/' + detail.emailDetail
            axios.get(route, {
                headers: {
                    'user_role': user_role
                }
            })
                .then(res => {
                    const data = res.data
                    console.log(data);
                    if (data.status) setFullNameDetail(data.result[0].fullName)
                })
        }
    }, [detail.emailDetail])


    //lay  unitsalary
    useEffect(() => {
        if (detail.emailDetail.trim() !== '') {
            const route = constraints.server + '/salary/getUnitSalary/' + detail.emailDetail
            axios.get(route, {
                headers: {
                    'user_role': user_role
                }
            })
                .then(res => {
                    const data = res.data
                    console.log(data);
                    if (data.status) setDetail({
                        ...detail,
                        overtimeSalary: data.result.overtimeSalary,
                        basicSalary: data.result.basicSalary,
                        allowance: data.result.allowance,
                        attendanceBonus: data.result.attendanceBonus,
                        completedBonus: data.result.completedBonus,
                        awarenessBonus: data.result.awarenessBonus,
                    })
                })
        }
    }, [detail.emailDetail])



    //lay so luot tang ca
    useEffect(() => {
        if (detail.emailDetail.trim() !== '') {
            let selectedDate_ = new Date(selectedDate.getTime())
            selectedDate_.setDate(1)
            selectedDate_.setHours(0, 0, 0, 0)
            const startTime = selectedDate_.getTime()
            const endTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getTime()

            const route = constraints.server + '/salary/getOverOnRequest/' + detail.emailDetail + '/' + startTime + '/' + endTime
            axios.get(route, {
                headers: {
                    'user_role': user_role
                }
            })
                .then(res => {
                    const data = res.data
                    if (data.status) setCountOverTime(data.result)
                })
        }
    }, [detail.emailDetail, selectedDate])

    //lay so ngay di lam
    useEffect(() => {
        if (detail.emailDetail.trim() !== '') {
            let selectedDate_ = new Date(selectedDate.getTime())
            selectedDate_.setDate(1)
            selectedDate_.setHours(0, 0, 0, 0)
            const startTime = selectedDate_.getTime()
            const endTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getTime()

            const route = constraints.server + '/salary/getCountAttendance/' + detail.emailDetail + '/' + startTime + '/' + endTime
            axios.get(route, {
                headers: {
                    'user_role': user_role
                }
            })
                .then(res => {
                    const data = res.data
                    if (data.status) setCountAttendance(data.result)
                })
        }
    }, [detail.emailDetail, selectedDate])


    //lay so luot di lam muon
    useEffect(() => {
        if (detail.emailDetail.trim() !== '') {
            let selectedDate_ = new Date(selectedDate.getTime())
            selectedDate_.setDate(1)
            selectedDate_.setHours(0, 0, 0, 0)
            const startTime = selectedDate_.getTime()
            const endTime = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getTime()

            const route = constraints.server + '/salary/getCountLateHours/' + detail.emailDetail + '/' + startTime + '/' + endTime
            axios.get(route, {
                headers: {
                    'user_role': user_role
                }
            })
                .then(res => {
                    const data = res.data
                    if (data.status) setCountLateTime(data.result)
                })
        }
    }, [detail.emailDetail, selectedDate])



    useEffect(() => {
        const route = constraints.server + '/salary/getAllTotalSalary/' + selectedDate.getTime()
        axios.get(route, {
            headers: {
                'user_role': user_role
            }
        })
            .then(res => {
                const data = res.data
                if (data.status) {

                    setListTotalStaff(data.result)
                }
            })
    }, [selectedDate])

    useEffect(() => {
        const route = constraints.server + '/salary/getAllStaffUnit'
        axios.get(route, {
            headers: {
                'user_role': user_role
            }
        })
            .then(res => {

                const data = res.data

                if (data.status) {
                    setListUnitStaff(data.result)
                }
            })
    }, [])

    return (
        <div className="total-salary">
            <div className="header">
                <input type="text" placeholder='Nhập email hoặc tên...' />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>


                    <KeyboardDatePicker
                        margin="normal"


                        format="MM/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        views={['year', 'month']}
                    />


                </MuiPickersUtilsProvider>
            </div>
            <div className="body">
                <div className="left">
                    {listUnitStaff.map(item => {
                        let color = '#880e4f'//do
                        if (listTotalStaff.indexOf(item.email) !== -1) color = '#00695c'//xanh
                        if (item.setted === 0) color = '#616161'
                        return <li onClick={() => openDetail(item.email, item.setted)} style={{ backgroundColor: color }} key={item.email}><span>{item.email}</span><span></span></li>
                    })}
                    <Popup closeResult={closeResult1} result={result1} user_role={user_role} />
                </div>
                <div className="right">
                    <TextField value={detail.emailDetail} name='email' fullWidth label="Email" InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }} />
                    <TextField value={fullNameDetail} name='fullName' fullWidth label="Họ và tên" InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }} />
                    <TextField onChange={onChangeInputSalary} value={detail.basicSalary} name='basicSalary' fullWidth label="Lương cơ bản(VND)" InputProps={{ readOnly: readOnly }} />
                    <TextField onChange={onChangeInputSalary} value={detail.overtimeSalary * 3 * countOverTime } name='overtimeSalary' fullWidth label="Lương tăng ca (VND)" InputProps={{ readOnly: readOnly }} />
                    <TextField onChange={onChangeInputSalary} value={detail.allowance * countAttendance} name='allowance' fullWidth label="Phụ cấp sinh hoạt(VND)" InputProps={{ readOnly: readOnly }} />
                    <TextField onChange={onChangeInputSalary} value={countAttendance >= 25? detail.attendanceBonus * detail.basicSalary/100: '0'} name='attendanceBonus' fullWidth label="Thưởng chuyên cần(VND)" InputProps={{ readOnly: readOnly }} />
                    <TextField onChange={onChangeInputSalary} value={detail.completedBonus} name='completedBonus' fullWidth label="Thưởng đơn hoàn thành(VNĐ)" InputProps={{ readOnly: readOnly }} />
                    <TextField onChange={onChangeInputSalary} value={countLateTime <  1 ? detail.awarenessBonus * detail.basicSalary/100: 0} name='awarenessBonus' fullWidth label="Thưởng ý thức (VND)" InputProps={{ readOnly: readOnly }} />
                    <TextField onChange={onChangeInputSalary} onClick={openDiscount} value={0} name='' fullWidth label="Chiết khấu" InputProps={{ readOnly: readOnly }} />

                    <TextField onChange={onChangeInputSalary} value={formInputSalary.note} name='note' fullWidth label="Ghi chú" InputProps={{ readOnly: readOnly }} />
                    <PopupDiscount openPopupDiscount={openPopupDiscount} setOpenPopupDiscount={setOpenPopupDiscount} />
                </div>
            </div>
        </div>
    )
}

export default TotalSalary