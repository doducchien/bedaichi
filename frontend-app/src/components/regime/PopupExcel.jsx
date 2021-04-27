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

//export excel
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

export default function PopupExcel(props) {
    const { listStaff, price, nameRegime } = props
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
                            <Table id='export-regime'>
                                <TableHead>
                                    <TableRow >
                                        <TableCell align="center" colSpan={8} >CÔNG TY TNHH DỊCH VỤ CÔNG NGHỆ THIÊN HẰNG</TableCell>
                                    </TableRow>

                                    <TableRow >
                                        <TableCell align="center" colSpan={8} >Báo cáo danh sách nhân viên hưởng chế độ {nameRegime}</TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell align="center" colSpan={8} >---Phòng quản lý chế độ---</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">Họ và tên</TableCell>
                                        <TableCell align="center">Email</TableCell>
                                        <TableCell align="center">Số điện thoại</TableCell>
                                        <TableCell align="center">Giới tính</TableCell>
                                        <TableCell align="center">Số tiền(VNĐ)</TableCell>
                                        <TableCell align="center">Thanh toán</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listStaff.map((item) => {
                                        let sex = ''
                                        let ispaid = 'chưa thanh toán'
                                        if (item.ispaid === 1) ispaid = 'đã thanh toán'
                                        if (item.sex === 0) sex = 'nam'
                                        else if (item.sex === 1) sex = 'nữ'
                                        else sex = 'khác'
                                        return (
                                            <TableRow key={item.email}>

                                                <TableCell align="center">{item.fullName}</TableCell>
                                                <TableCell align="center">{item.email}</TableCell>
                                                <TableCell align="center">{item.phoneNumber}</TableCell>
                                                <TableCell align="center">{sex}</TableCell>
                                                <TableCell align="center">{price}</TableCell>
                                                <TableCell align="center">{ispaid}</TableCell>
                                            </TableRow>
                                        )

                                    })}
                                </TableBody>
                                <TableHead>
                                    <TableRow >
                                        <TableCell colSpan={8} className='asign' align="center" colSpan={8} ></TableCell>
                                    </TableRow>                                    <TableRow >
                                        <TableCell colSpan={8} className='asign' align="center" colSpan={8} ></TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell colSpan={8} className='asign' align="center" colSpan={8} ><span> Chữ ký giám đốc</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span> Chữ ký nhân viên quản lý chế độ</span></TableCell>
                                    </TableRow>

                                </TableHead>
                            </Table>
                        </TableContainer>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Đóng</Button>
                    {/* <Button onClick={handleClose} color="primary" autoFocus>Xuất báo cáo</Button> */}
                    <ReactHTMLTableToExcel
                        table="export-regime"
                        filename={"Báo cáo danh sách chế độ " + nameRegime}
                        sheet="tablexls"
                        buttonText='Xuất báo cáo'
                        className='export'

                    />
                </DialogActions>
            </Dialog>
        </div>
    );
}