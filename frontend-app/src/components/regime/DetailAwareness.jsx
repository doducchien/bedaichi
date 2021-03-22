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



function DetailAwareness(props) {
    const { user_role, awareness } = props

    const [selectedDate, setSelectedDate] = useState(new Date())
    const [emailAdd, setEmailAdd] = useState('')
    const [detailAwareness, setDetailAwareness] = useState({
        value: '',
        label: '',
        note: ''
    })

    const handleDateChange = (time) => {
        setSelectedDate(time)
    }

    const addStaffToAwareness = ()=>{
        const body = {
            email: emailAdd,
            time: selectedDate.getTime()
        }
    }
     
    const onChangeEmail = (event)=>{
        const {name, value} = event.target
        setEmailAdd(value)
    }
    useEffect(() => {
        const detailAwareness_ = constraints.awareness.find(item => {
            return item.value === awareness
        })
        setDetailAwareness(detailAwareness_)
    }, [awareness])

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

            </div>
            <div className="right">
                <form className="header">
                    <input onClick={addStaffToAwareness} name='email' onChange={onChangeEmail} type="text" placeholder='Email...'/>
                    <Button type='submit' variant="outlined" color="secondary">Thêm</Button>
                </form>

            </div>
        </div>
    )
}

export default DetailAwareness