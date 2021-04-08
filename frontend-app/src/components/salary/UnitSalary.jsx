import { useState, useEffect } from 'react'


//constraints 
import * as constraints from '../../constraints'

//axios
import axios from 'axios'

//textfeild
import TextField from '@material-ui/core/TextField';

//btn
import Button from '@material-ui/core/Button';

//component
import Popup from './Popup'



function UnitSalary(props) {
    const { user_role } = props
    const [listStaff, setListStaff] = useState([])
    const [listStaffUnit, setListStaffUnit] = useState([])

    const [keyword, setKeyword] = useState('')
    const [emailDetail, setEmailDetail] = useState('')
    const [fullNameDetail, setFullNameDetail] = useState('')

    const [readOnly, setReadOnly] = useState(true)

    const [formInputSalary, setFormInputSalary] = useState({
        basicSalary: '',
        overtimeSalary: '',
        allowance: '',
        attendanceBonus: '',
        completedBonus: '',
        awarenessBonus: '',
        note: ''


    })

    const [disabled, setDisabled] = useState(true)

    const [result, setResult] = useState({
        open: false,
        title: '',
        content: ''
    })


    const handleChangeKeyword = (e) => {
        const { name, value } = e.target
        setKeyword(value.trim())
    }

    const openDetail = (email) => {
        setEmailDetail(email)
    }

    const toggleReadOnly = () => {
        setReadOnly(!readOnly)
    }

    const onChangeInputSalary = (event) => {
        const { name, value } = event.target
        setFormInputSalary({
            ...formInputSalary,
            [name]: value
        })
    }

    const closeResult = () => {

        setResult({
            ...result,
            open: false,
            title: '',
            content: ''
        })
        setReadOnly(true)
    }

    const updateUnitSalary = () => {
        const route = constraints.server + '/salary/updateUnitSalary'
        const body = {
            ...formInputSalary,
            email: emailDetail,
            setted: 1
        }

        axios.put(route, body, {
            headers: {
                'user_role': user_role
            }
        })
            .then(res => {
                const data = res.data
                if (data.status) {
                    setResult({
                        ...result,
                        open: true,
                        title: 'Thông báo cập nhật đơn vị lương',
                        content: 'Cập nhật đơn vị lương thành công'
                    })
                }
                else {
                    setResult({
                        ...result,
                        open: true,
                        title: 'Thông báo cập nhật đơn vị lương',
                        content: 'Cập nhật đơn vị lương thất bại'
                    })
                }
            })
    }

    useEffect(() => {
        const { basicSalary, overtimeSalary, allowance, attendanceBonus, completedBonus, awarenessBonus } = formInputSalary
        if (basicSalary.trim() === '' || overtimeSalary.trim() === '' || allowance.trim() === '' || attendanceBonus.trim() === '' || completedBonus.trim() === '' || awarenessBonus.trim() === '') {
            setDisabled(true)
        }
        else setDisabled(false)
    }, [formInputSalary])

    useEffect(() => {
        let route = ''
        if (keyword !== '') route = constraints.server + '/salary/searchUnitSalary/' + keyword
        else route = constraints.server + '/salary/getAllStaffUnit'

        axios.get(route, {
            headers: {
                'user_role': user_role
            }
        })
            .then(res => {
                const data = res.data

                if (data.status) {
                    const list = data.result.map(item => {
                        return {
                            email: item.email,
                            setted: item.setted
                        }
                    })
                    setListStaffUnit(list)
                }
            })

    }, [keyword, result])

    useEffect(() => {
        if (emailDetail.trim() !== '') {
            const route = constraints.server + '/salary/getNameStaff/' + emailDetail
            axios.get(route, {
                headers: {
                    'user_role': user_role
                }
            })
                .then(res => {
                    const data = res.data
                    if (data.status) setFullNameDetail(data.result[0].fullName)
                })
        }
    }, [emailDetail])

    useEffect(() => {
        if (emailDetail.trim() !== '') {
            const route = constraints.server + '/salary/getUnitSalary/' + emailDetail
            axios.get(route, {
                headers: {
                    'user_role': user_role
                }
            })
                .then(res => {
                    const data = res.data
                    if (data.status) {
                        setFormInputSalary({
                            ...formInputSalary,
                            basicSalary: data.result.basicSalary || '',
                            overtimeSalary: data.result.overtimeSalary || '',
                            allowance: data.result.allowance || '',
                            attendanceBonus: data.result.attendanceBonus || '',
                            completedBonus: data.result.completedBonus || '',
                            awarenessBonus: data.result.awarenessBonus || '',
                            note: data.result.note || ''

                        })
                    }
                })
        }
    }, [emailDetail, readOnly])



    return (
        <div className="unit-salary">
            <div className="header">
                <input name='keyword' onChange={handleChangeKeyword} type="text" placeholder='Nhập email hoặc họ tên...' />
            </div>
            <div className="body">
                <div className="left">
                    {listStaffUnit.map(item => {
                        let color = '#3f51b5'
                        if (item.setted === 0) color = '#ad1457'
                        return <li onClick={() => openDetail(item.email)} key={item.email} style={{ backgroundColor: color }}><span>{item.email}</span><span>{item.setted === 0 ? 'Chưa set' : 'Đã set'}</span></li>
                    })}
                </div>
                <div className="right">
                    <TextField value={emailDetail} name='email' fullWidth label="Email" InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }} />
                    <TextField value={fullNameDetail} name='fullName' fullWidth label="Họ và tên" InputProps={{ readOnly: true }} InputLabelProps={{ shrink: true }} />
                    <TextField onChange={onChangeInputSalary} value={formInputSalary.basicSalary} name='basicSalary' fullWidth label="Lương cơ bản(VND/tháng)" InputProps={{ readOnly: readOnly }} />
                    <TextField onChange={onChangeInputSalary} value={formInputSalary.overtimeSalary} name='overtimeSalary' fullWidth label="Lương tăng ca (VND/h)" InputProps={{ readOnly: readOnly }} />
                    <TextField onChange={onChangeInputSalary} value={formInputSalary.allowance} name='allowance' fullWidth label="Phụ cấp sinh hoạt(VND/ngày)" InputProps={{ readOnly: readOnly }} />
                    <TextField onChange={onChangeInputSalary} value={formInputSalary.attendanceBonus} name='attendanceBonus' fullWidth label="Thưởng chuyên cần(% lương cơ bản/tháng)" InputProps={{ readOnly: readOnly }} />
                    <TextField onChange={onChangeInputSalary} value={formInputSalary.completedBonus} name='completedBonus' fullWidth label="Thưởng đơn hoàn thành(VNĐ/tháng)" InputProps={{ readOnly: readOnly }} />
                    <TextField onChange={onChangeInputSalary} value={formInputSalary.awarenessBonus} name='awarenessBonus' fullWidth label="Thưởng ý thức (% lương cơ bản/tháng)" InputProps={{ readOnly: readOnly }} />
                    <TextField onChange={onChangeInputSalary} value={formInputSalary.note} name='note' fullWidth label="Ghi chú" InputProps={{ readOnly: readOnly }} />

                    <div style={{ marginTop: '15px', display: readOnly ? 'block' : 'none' }}>
                        <Button onClick={toggleReadOnly} fullWidth variant="contained" color="primary">Chỉnh sửa</Button>
                    </div>

                    <div style={{ marginTop: '15px', display: readOnly ? 'none' : 'block' }}>
                        <Button onClick={toggleReadOnly} style={{ width: '50%' }} variant="outlined" color="primary">Hủy</Button>
                        <Button disabled={disabled} onClick={updateUnitSalary} style={{ width: '50%' }} variant="outlined" color="secondary">Lưu</Button>
                    </div>

                </div>

            </div>
            <Popup closeResult={closeResult} result={result} user_role={user_role} />
        </div>
    )
}

export default UnitSalary