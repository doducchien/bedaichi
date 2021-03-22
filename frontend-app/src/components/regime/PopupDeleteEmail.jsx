import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//axios
import axios from 'axios'

//constraints
import * as constraints from '../../constraints'

export default function PopupDeleteEmail(props) {
    const { email, time, id, user_role, setResult } = props
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const deleteStaff = () => {
        const route = constraints.server + `/regime/deleteStaffRegime/${email}/${time}/${id}`
        axios.delete(route, {
            headers: {
                'user_role': user_role
            }
        })
            .then(res => {
                setOpen(false)
                if (res.data.status) {
                    setResult({
                        open: true,
                        title: 'Thông báo xóa nhân viên khỏi chế độ',
                        content: 'Xóa thành công'
                    })
                }
                else {
                    setResult({
                        open: true,
                        title: 'Thông báo xóa nhân viên khỏi chế độ',
                        content: 'Xóa thất bại. Vui lòng thử lại'
                    })
                }
            })
    }

    return (
        <div>
            <li variant="outlined" color="primary" onClick={handleClickOpen}>{email}</li>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Xoá nhân viên khỏi chế độ</DialogTitle>
                <DialogContent>
                    Xóa nhân viên ứng với {email} khỏi chế độ này
        </DialogContent>
                <DialogActions style={{ textAlign: 'center' }}>
                    <Button onClick={handleClose} color="primary">Hủy</Button>
                    <Button onClick={deleteStaff} color="secondary" autoFocus>Xóa</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}