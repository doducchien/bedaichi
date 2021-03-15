

//react dialog
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import MenuItem from '@material-ui/core/MenuItem';


//date picker
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

//contraints
import * as constraints from '../../constraints'


function PopupChangeStaff(props) {
    const { openChangeStaff, closeChangeStaff, infomationStaff } = props
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


    const changeToInputTime = (day) => {
        const timeString = constraints.changeIntToTime(day)
        const splitString = timeString.split('-')
        const reverse = splitString.reverse()
        const inputTime = reverse.join('-')
        return inputTime
    }

    const convertSex = (sex) => {
        let sexInput = ''
        constraints.sexes.forEach(item => {
            console.log(item.value == sex)
            if (item.value == sex) {
                sexInput = item.label
            }
        })
        return sexInput
    }

    return (
        <div className="popup-change-staff">

            <Dialog open={openChangeStaff} onClose={() => closeChangeStaff()} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Chỉnh sửa thông tin nhân viên</DialogTitle>
                <DialogContent>
                    <DialogContentText style={{textAlign: 'center'}}>
                        <img style={{height: '200px', borderRadius: '20px'}} src={image}/>
                    </DialogContentText>
                    <TextField
                        disabled
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email"
                        type="email"
                        fullWidth
                        defaultValue={email}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Họ và tên"
                        type="text"
                        fullWidth
                        defaultValue={fullName}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Số điện thoại"
                        type="text"
                        fullWidth
                        defaultValue={phoneNumber}
                    />

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Ngày sinh"
                        hiddenLabel
                        type="date"
                        fullWidth
                        defaultValue={changeToInputTime(birthday)}
                    />
                    <TextField
                        id="standard-select-currency"
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
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Phòng ban"
                        type="text"
                        fullWidth
                        defaultValue={department}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Ngày tham gia"
                        type="date"
                        fullWidth
                        defaultValue={changeToInputTime(joinDay)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Ngày nghỉ việc"
                        InputLabelProps={{ shrink: true }}
                        type="date"
                        fullWidth
                        defaultValue={leftDay ? changeToInputTime(leftDay) : null}
                    />
                    

                    <TextField
                        id="standard-select-currency"
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

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => closeChangeStaff()} color="primary">Hủy</Button>
                    <Button onClick={() => closeChangeStaff()} color="primary">Cập nhật</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default PopupChangeStaff