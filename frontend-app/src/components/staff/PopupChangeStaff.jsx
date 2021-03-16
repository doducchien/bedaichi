

//react dialog
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import MenuItem from '@material-ui/core/MenuItem';




//contraints
import * as constraints from '../../constraints'

//axios
import axios from 'axios';


function PopupChangeStaff(props) {
    const { openChangeStaff, closeChangeStaff, infomationStaff, user_role } = props
    const {
        email,
        fullName,
        phoneNumber,
        birthday,
        sex,
        image,
        department,
        joinDay,
        leftDay,
        status,
        note
    } = infomationStaff

    const [infomationInput, setInfomationInput] = useState(null)

    const [listDepartment, setListDepartment] = useState([])


    useEffect(() => {
        setInfomationInput({ ...infomationStaff })
    }, [infomationStaff])
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

    const changeToInputTime = (day) => {
        const timeString = constraints.changeIntToTime(day)
        const splitString = timeString.split('-')
        const reverse = splitString.reverse()
        const inputTime = reverse.join('-')
        return inputTime
    }


    const handleChangeInput = (event) => {
        let { name, value } = event.target
        if(name === 'birthday' || name === 'joinDay' || name === 'leftDay'){
            value = constraints.changeTimeToInt(value)
        }
        console.log(name, value)
        let input_ = {
            ...infomationInput,
            [name]: value
        }
        setInfomationInput(input_)

    }
    const onUpdate = () => {
        let body = { ...infomationInput }
        console.log(body)

        const route = constraints.server + '/staff/updateStaff'
        axios.put(route, body, {
            headers: {
                'user_role': user_role
            }
        })
            .then(res => {
                if (res.data.status) alert("Chỉnh sửa thông tin thành công !")
                else alert("Chỉnh sửa thông tin thất bại !Vui lòng thử lại")

                closeChangeStaff()
            })
    }

    return (
        <div className="popup-change-staff">

            <Dialog open={openChangeStaff} onClose={() => closeChangeStaff()} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Chỉnh sửa thông tin nhân viên</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{ textAlign: 'center' }}>
                        <img style={{ height: '200px', borderRadius: '20px' }} src={image} />
                    </DialogContentText>
                    <TextField


                        disabled
                        autoFocus
                        margin="dense"

                        label="Email"
                        type="email"
                        fullWidth
                        defaultValue={email}
                        InputLabelProps
                    />

                    <TextField
                        onChange={handleChangeInput}
                        name='fullName'
                        autoFocus
                        margin="dense"

                        label="Họ và tên"
                        type="text"
                        fullWidth
                        defaultValue={fullName}
                    />
                    <TextField
                        onChange={handleChangeInput}
                        name='phoneNumber'
                        autoFocus
                        margin="dense"

                        label="Số điện thoại"
                        type="text"
                        fullWidth
                        defaultValue={phoneNumber}
                    />

                    <TextField
                        onChange={handleChangeInput}
                        name='birthday'
                        autoFocus
                        margin="dense"

                        label="Ngày sinh"
                        hiddenLabel
                        type="date"
                        fullWidth
                        defaultValue={changeToInputTime(birthday)}
                    />
                    <TextField
                        onChange={handleChangeInput}
                        name='sex'

                        select
                        label="Giới tính"
                        defaultValue={sex}
                        // onChange={handleChange}
                        fullWidth
                    >
                        {constraints.sexes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        onChange={handleChangeInput}
                        name='department'
                        autoFocus
                        margin="dense"

                        label="Phòng ban"
                        select
                        fullWidth
                        defaultValue={department}
                    >
                        {listDepartment.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}

                    </TextField>



                    <TextField
                        onChange={handleChangeInput}
                        name='joinDay'
                        autoFocus
                        margin="dense"

                        label="Ngày tham gia"
                        type="date"
                        fullWidth
                        defaultValue={changeToInputTime(joinDay)}
                    />
                    <TextField
                        onChange={handleChangeInput}
                        name='leftDay'
                        autoFocus
                        margin="dense"

                        label="Ngày nghỉ việc"
                        InputLabelProps={{ shrink: true }}
                        type="date"
                        fullWidth
                        defaultValue={leftDay ? changeToInputTime(leftDay) : null}
                    />


                    <TextField
                        onChange={handleChangeInput}
                        name='status'
                        select
                        label="Select"
                        defaultValue={status}
                        // onChange={handleChange}
                        fullWidth
                    >
                        {constraints.statusWork.map((option) => (

                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        onChange={handleChangeInput}
                        name='image'
                        autoFocus
                        margin="dense"

                        label="Link ảnh"
                        type="text"
                        fullWidth
                        defaultValue={image}
                    />

                    

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => closeChangeStaff()} color="primary">Hủy</Button>
                    <Button onClick={onUpdate} color="primary">Cập nhật</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default PopupChangeStaff