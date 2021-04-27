import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


//table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default function PopupExcel(props) {
    const { listStaff } = props
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>Báo cáo</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                fullScreen

            >
                <DialogTitle >{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Họ và tên</TableCell>
                                        <TableCell align="center">Email</TableCell>
                                        <TableCell align="center">Số điện thoại</TableCell>
                                        <TableCell align="center">Giới tính</TableCell>
                                        <TableCell align="center">Thanh toán</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listStaff.map((item) => (
                                        <TableRow key={item.email}>
                                            
                                            <TableCell align="center">{item.fullName}</TableCell>
                                            <TableCell align="center">{item.email}</TableCell>
                                            <TableCell align="center">{item.phoneNumber}</TableCell>
                                            <TableCell align="center">{item.sex}</TableCell>
                                            <TableCell align="center">{item.ispaid}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Đóng</Button>
                    <Button onClick={handleClose} color="primary" autoFocus>Xuất báo cáo</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}