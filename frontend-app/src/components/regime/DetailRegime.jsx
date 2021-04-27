import { useState, useEffect } from 'react'

//constraints
import * as constraints from '../../constraints'

//axios
import axios from 'axios'

//textFeild
import TextField from '@material-ui/core/TextField';
import { TextareaAutosize } from '@material-ui/core';

//btn
import Button from '@material-ui/core/Button';

//datepicker
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

//component
import Popup from './Popup'
import PopupDeleteEmail from './PopupDeleteEmail'
import PopupExcel from './PopupExcel'


const changeMMYY = (time) => {
    const month = time.getMonth() + 1
    const year = time.getFullYear()
    const timeString = (month + '-' + year)
    return timeString
}


function DetailRegime(props) {
    const { idRegime, user_role, setIdRegime } = props
    const [detailTypeRegime, setDetailTypeRegime] = useState({
        name: '',
        note: '',
        price: ''
    })

    const [emailStaffAdd, setEmailStaffAdd] = useState('')
    const [listStaff, setListStaff] = useState([])
    const [emailSearch, setEmailSearch] = useState('')
    const [timeSelect, setTimeSelect] = useState(new Date())
    const [result, setResult] = useState({
        open: false,
        title: '',
        content: ''
    })

    const closeResult = () => {
        setResult({
            ...result,
            open: false,
            title: '',
            content: ''
        })
    }
    const addEmailToRegime = (e) => {
        e.preventDefault()
        const route = constraints.server + '/regime/createStaffRegime'
        const body = {
            email: emailStaffAdd,
            time: changeMMYY(timeSelect),
            id: idRegime,
        }
        axios.post(route, body, {
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
                        title: 'Thông báo',
                        content: 'Thêm chế độ thành công cho nhân viên'
                    })
                }
                else {
                    setResult({
                        ...result,
                        open: true,
                        title: 'Thông báo',
                        content: 'Thêm chế độ cho nhân viên thất bại. Vui lòng thử lại!'
                    })
                }

            })
    }

    const handleChangeEmail = (event) => {
        const { name, value } = event.target
        setEmailStaffAdd(value.trim())
    }

    const onChangeTime = (time) => {

        setTimeSelect(time)
    }

    const changeEmailSearch = (event) => {
        const { name, value } = event.target
        setEmailSearch(value.trim())

    }


    useEffect(() => {
        const route = constraints.server + '/regime/getDetailTypeRegime/' + idRegime
        axios.get(route, {
            headers: {
                'user_role': user_role
            }
        })
            .then(res => {
                const { status, result } = res.data
                if (status && result) {
                    setDetailTypeRegime(result)
                }

            })
    }, [idRegime])

    useEffect(() => {
        if (!result.open) {
            const route = constraints.server + '/regime/getListStaffRegime/' + idRegime + '/' + changeMMYY(timeSelect)
            axios.get(route, {
                headers: {
                    'user_role': user_role
                }
            })
                .then(res => {
                    const data = res.data
                    if (data.status) {
                        setListStaff(data.result)
                    }
                })
        }

    }, [timeSelect, result])
    console.log(listStaff)

    return (
        <div className="detail-regime">
            <div className="type-regime">
                <TextField
                    style={{marginTop: '5px'}}
                    focused={true}
                    fullWidth
                    label="Tên chế độ"

                    value={detailTypeRegime.name}
                    InputProps={{
                        readOnly: true,
                    }}
                />

                <TextField
                    style={{marginTop: '5px'}}

                    focused={true}
                    fullWidth
                    label="Giá trị đãi ngộ (VND/tháng)"

                    value={detailTypeRegime.price}
                    InputProps={{
                        readOnly: true,
                    }}
                />

                <TextareaAutosize

                    readOnly
                    style={{
                        width: '100%',
                        height: '200px',
                        resize: 'none',
                        padding: '5px',
                        marginTop: '10px',
                        overflow: 'auto'
                    }}
                    label="Ghi chú"
                    value={detailTypeRegime.note}

                />
                <Button style={{ display: 'block', margin: 'auto', marginTop: '10px' }} onClick={() => setIdRegime(null)} color="secondary">Đóng</Button>
                <TextField onChange={changeEmailSearch} style={{ marginTop: '20px' }} fullWidth id="outlined-basic" label="Tìm kiếm email" variant="outlined" />
                <div className="result-search">
                    {listStaff.map(item => {
                        const { email, id, time } = item
                        if (item.email.toLowerCase().indexOf(emailSearch.toLowerCase()) !== - 1 && emailSearch !== '') {
                            return <PopupDeleteEmail setResult={setResult} setDetailTypeRegime={setDetailTypeRegime} key={email + id + time} email={email} id={id} time={time} user_role={user_role} />
                        }
                    })}
                </div>


            </div>
            <div className="list-staff-regime">
                <div className="header">
                    <Popup closeResult={closeResult} result={result} />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>


                        <KeyboardDatePicker
                            style={{ width: '200px' }}
                            label="Thời điểm"
                            format="MM/yyyy"
                            value={timeSelect}
                            onChange={onChangeTime}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}

                            views={['year', 'month']}

                        />


                    </MuiPickersUtilsProvider>
                    <form onSubmit={addEmailToRegime}>
                        <TextField
                            style={{ height: '40px' }}
                            onChange={handleChangeEmail}
                            label="Email"
                            focused={true}
                            defaultValue={emailStaffAdd}
                            type='email'

                        />
                        <Button type='submit' variant='outlined' color="secondary">Thêm</Button>
                    </form>
                </div>
                <div className="list">
                    {listStaff.map(item => {
                        const { email, id, time } = item
                        // console.log(item);
                        return <PopupDeleteEmail setResult={setResult} setDetailTypeRegime={setDetailTypeRegime} key={email + id + time} email={email} id={id} time={time} user_role={user_role} />
                    })}
                    <PopupExcel nameRegime={detailTypeRegime.name} price = {detailTypeRegime.price} listStaff={listStaff}/>
                </div>

            </div>
        </div>
    )
}

export default DetailRegime