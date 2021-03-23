import { useState, useEffect } from 'react'
import React from 'react';

//constraints 
import * as constraints from '../../constraints'

//textfeild
import TextField from '@material-ui/core/TextField';

//datepicker
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { TextareaAutosize } from '@material-ui/core';

//btn
import Button from '@material-ui/core/Button';

//axios
import axios from 'axios'

//component
import Popup from './Popup'
import PopupDeleteStaffAwareness from './PopupDeleteStaffAwareness'



function DetailAwareness(props) {
    const { user_role, awareness } = props

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [emailAdd, setEmailAdd] = useState('')
    const [detailAwareness, setDetailAwareness] = useState({
        value: '',
        label: '',
        note: ''
    })

    const [listStaff, setListStaff] = useState([])

    const [result, setResult] = useState({
        open: false,
        title: '',
        content: ''
    })
    

    const [staffSearch, setStaffSearch] = useState('')
    

    const handleDateChange = (time) => {
        time.setHours(0, 0, 0, 0)
        console.log(time.getTime());
        setSelectedDate(time)
    }

    const addStaffToAwareness = (event)=>{
        event.preventDefault()

        const body = {
            email: emailAdd,
            time: selectedDate.getTime(),
            type: detailAwareness.value
        }

        const route = constraints.server + '/regime/createStaffAwareness'

        axios.post(route, body,{
            headers:{
                'user_role': user_role
            }
        })
        .then(res=>{
            const data = res.data
            if(data.status){
                setResult({
                    ...result,
                    open: true,
                    title: 'Đánh giá ý thức',
                    content: 'Đã ghi lại ý thức thành công'
                })
            }
            else if(data.err) setResult({
                ...result,
                open: true,
                title: 'Đánh giá ý thức',
                content: 'Ghi lại ý thức thất bại. Vui lòng thử lại'
            })
            else{
                setResult({
                    ...result,
                    open: true,
                    title: 'Đánh giá ý thức',
                    content: 'Nhân viên với email tương ứng đã được ghi lại từ trước thời điểm này'
                })
            }
        })
    }
    
    const closeresult = ()=>{
        setResult({
            ...result,
            open: false
        })
    }
    const onChangeEmail = (event)=>{
        const {name, value} = event.target
        setEmailAdd(value)
    }


    const handleChangeStaffSearch = (event)=>{
        const {value, email} = event.target
        setStaffSearch(value.trim())
    }


    useEffect(() => {
        const detailAwareness_ = constraints.awareness.find(item => {
            return item.value === awareness
        })
        setDetailAwareness(detailAwareness_)
    }, [awareness])

    useEffect(()=>{
        let selectedDate_ = selectedDate;
        console.log(selectedDate_.getTime());
        selectedDate_.setHours(0, 0, 0, 0)
        const route = constraints.server + '/regime/getListAwareness/' + awareness + '/' + selectedDate_.getTime()
        axios.get(route, {
            headers:{
                'user_role': user_role
            }
        })
        .then(res=>{
            const data = res.data
            console.log(data);
            if(data.status){
                setListStaff(data.result)
            }
        })
    }, [result, selectedDate])

    return (
        <div className="detail-awareness">
            <div className="left">
                <TextField
                    fullWidth
                    label="Loaị"
                    value={detailAwareness.label}
                    InputProps={{
                        readOnly: true,
                    }}
                />

                <TextareaAutosize

                    readOnly
                    style={{
                        width: '100%',
                        height: '100px',
                        resize: 'none',
                        padding: '5px',
                        marginTop: '10px',
                        overflow: 'auto'
                    }}
                    label="Ghi chú"
                    value={detailAwareness.note}

                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        margin="normal"
                        fullWidth
                        label="Chọn thời điểm"
                        format="MM/dd/yyyy"
                        value={selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>

                <Button style={{display: 'block', margin: 'auto'}} variant="outlined" color="secondary">Đóng</Button>


                <TextField
                    fullWidth
                    label="Email"
                    name='email'
                    defaultvalue={staffSearch}
                    onChange={handleChangeStaffSearch}
                    autoComplete='off'
                    
                />

                <div className="list-staff-search">
                    {listStaff.map(item=>{
                        const {email, time} = item
                        if(email.toLowerCase().indexOf(staffSearch.toLowerCase()) !== -1 && staffSearch !== ''){
                            return <PopupDeleteStaffAwareness key={email + time + awareness + '_'} type={awareness} email={email} time={time} user_role={user_role} setResult={setResult} />
                        }
                            
                    })}
                </div>

            </div>
            <div className="right">
                <form onSubmit={addStaffToAwareness} className="header">
                    <input name='email' onChange={onChangeEmail} type="email" placeholder='Email...'/>
                    <Button type='submit' variant="outlined" color="secondary">Thêm</Button>
                </form>

                <div className="body">
                    {listStaff.map(item=>{
                        const {email, time} = item
                        return <PopupDeleteStaffAwareness key={email + time + awareness} type={awareness} email={email} time={time} user_role={user_role} setResult={setResult} />
                    })}
                </div>

            </div>
            <Popup closeResult={closeresult} result={result}/>
      
        </div>
    )
}

export default DetailAwareness