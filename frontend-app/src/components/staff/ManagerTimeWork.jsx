import { useState, useEffect } from 'react'


//datepicker
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

//TextFeild
import TextField from '@material-ui/core/TextField';

//btn
import Button from '@material-ui/core/Button';

//constraints
import * as constraints from '../../constraints'

//axios
import axios from 'axios'

//component
import PopupCheckInfo from './PopupCheckInfo'

function ManagerTimeWork(props) {
    const { user_role } = props
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [email, setEmail] = useState('')
    const [open, setOpen] = useState(false)
    const [info, setInfo] = useState(null)
    const [listAttendance, setListAttendance] = useState([])

    const handleDateChange = (date) => {

        setSelectedDate(date);
    };

    const clearInfo = () => {
        setInfo(null)
    }

    const handleChangeEmail = (e) => {
        const { name, value } = e.target
        setEmail(value.trim())
    }

    const checkInfo = (e) => {
        e.preventDefault()
        const month = selectedDate.getMonth() + 1;
        const date = selectedDate.getDate();
        const year = selectedDate.getFullYear()
        const dateString = year + '-' + month + '-' + date
        const timeInt = constraints.changeTimeToInt(dateString);

        const route = constraints.server + '/staff/getDetailStaff/' + email;
        axios.get(route, {
            headers: {
                'user_role': user_role
            }
        })
            .then(res => {
                const data = res.data
                console.log(data.result);
                if (data.status) {
                    if (data.result) {
                        setInfo({
                            ...data.result,
                            timeInt: timeInt
                        })
                    }
                    else setInfo(
                        {
                            image: null,
                            email: null,
                            fullName: null,

                        }
                    )

                }

            })
    }

    useEffect(() => {
        if (info) {
            setOpen(true)
        }
        else setOpen(false)
    }, [info])

    useEffect(() => {
        if (!open) {
            const month = selectedDate.getMonth() + 1;
            const date = selectedDate.getDate();
            const year = selectedDate.getFullYear()
            const dateString = year + '-' + month + '-' + date
            const timeInt = constraints.changeTimeToInt(dateString);
            const route = constraints.server + '/staff/getListAttendance/' + timeInt
            axios.get(route, {
                headers: {
                    'user_role': user_role
                }
            })
                .then(res => {
                    if (res.data.status) {
                        setListAttendance(res.data.result)
                    }
                })
        }
    }, [open, selectedDate])

    return (
        <div className="manager-time-work">
            <div className="header">

                <MuiPickersUtilsProvider utils={DateFnsUtils}>


                    <KeyboardDatePicker
                        className='date-picker_'
                        label="Chọn ngày điểm danh"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />


                </MuiPickersUtilsProvider>
                <form onSubmit={checkInfo} className='text-btn'>
                    <TextField defaultValue={email} onChange={handleChangeEmail} name='email' type='email' className='text-field' label="Nhập email....." variant="outlined" />

                    <Button type='submit' className='btn_' variant="contained" color="secondary">Xác nhận</Button>
                </form>



            </div>

            <div className="body">


                {listAttendance.map(item => {
                    return <li key={item.email}>{item.email}</li>
                })}

            </div>

            <div style={open ? { display: 'block' } : { display: 'none' }}><PopupCheckInfo user_role={user_role} info={info} open={open} clearInfo={clearInfo} /></div>

        </div>
    )
}

export default ManagerTimeWork