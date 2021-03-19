//react dialog

import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//alert
import Alert from '@material-ui/lab/Alert';


//axios
import axios from 'axios'

//constraints 
import * as constraints from '../../constraints'

function PopupCheckInfo(props) {
    const { open, info, clearInfo, user_role } = props
    const [statusAttendance, setStatusAttendance] = useState(false)
    const [result, setResult] = useState(null)

    const createAttendance = () => {
        const route = constraints.server + '/staff/createAttendance'
        const body = {
            time: info.timeInt,
            email: info.email
        }
        axios.post(route, body, {
            headers: {
                'user_role': user_role
            }
        })
            .then(res => {
                const data = res.data
                console.log(data);
                if(data.status){
                    if(data.result.affectedRows == 1){
                        setResult('success')
                    }
                    else setResult('error')
                }
            })
            .catch(err=>{
                setResult('error')
            })
    }

    useEffect(() => {
        if (info) {
            const route = constraints.server + '/staff/checkAttendance/' + info.email + '/' + info.timeInt
            axios.get(route, {
                headers: {
                    'user_role': user_role
                }
            })
                .then(res => {
                    const data = res.data
                    if (data.status) {
                        if (data.result > 0) setStatusAttendance(true)
                        else setStatusAttendance(false)
                    }
                })
        }
    }, [info])

    useEffect(()=>{
        if(!open) setResult(false)
    }, [open])
    return (
        <Dialog open={open} onClose={clearInfo} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Thông tin nhân viên điểm danh</DialogTitle>
            {!result ?
                <>
                    
                    <DialogContent>
                        <DialogContentText style={{ textAlign: 'center' }}>
                            <img style={{ height: '200px', borderRadius: '20px' }} src={info ? info.image : ''} />
                        </DialogContentText>

                        <TextField
                            label="Email"
                            fullWidth
                            defaultValue={info ? info.email : ''}
                            InputProps={{
                                readOnly: true,
                            }}
                        />

                        <TextField
                            label="Họ và tên"
                            fullWidth
                            defaultValue={info ? info.fullName : ''}
                            InputProps={{
                                readOnly: true,
                            }}
                        />

                        <TextField
                            label="Trạng thái điểm danh"
                            fullWidth
                            value={statusAttendance ? 'Đã điểm danh' : 'Chưa điểm danh'}
                            InputProps={{
                                readOnly: true,
                            }}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={clearInfo} color="primary">Hủy</Button>
                        <Button disabled={statusAttendance} onClick={createAttendance} color="primary">Điểm danh</Button>
                    </DialogActions>
                </>
                : ''}

                {result === 'error'? <Alert severity="error">Điểm danh thất bại. Vui lòng thử lại</Alert>: ''}
                {result === 'success'? <Alert severity="success">Điểm danh thành công</Alert>: ''}


                

        </Dialog>
    )
}

export default PopupCheckInfo