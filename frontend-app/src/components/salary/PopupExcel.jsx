import React, {useState, useEffect} from 'react';
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

//constraints 
import * as constraints from '../../constraints'

//axios
import axios from 'axios'

export default function PopupExcel(props) {
    const { user_role } = props
    const [open, setOpen] = React.useState(false);

    const [listUnitSalary, setListUnitSalary] = useState([])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(()=>{
        const route = constraints.server + '/salary/getAllStaffUnit'
        axios.get(route, {
            headers: {
                'user_role': user_role
            }
        })
            .then(res => {
                const data = res.data

                if (data.status) {
                    console.log(data.result)
                    setListUnitSalary(data.result)
                }
            })
    }, [open])

    return (
        <div>
            <Button fullWidth variant="outlined" color="primary" onClick={handleClickOpen}>Báo cáo</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                fullScreen

            >
                <DialogContent>
                    <DialogContentText>
                        <TableContainer component={Paper}>
                            <Table id='export-unit-salary'>
                                <TableHead>
                                    <TableRow >
                                        <TableCell align="center" colSpan={10} >CÔNG TY TNHH DỊCH VỤ CÔNG NGHỆ THIÊN HẰNG</TableCell>
                                    </TableRow>

                                    <TableRow >
                                        <TableCell align="center" colSpan={10} >Báo cáo danh sách hệ số lương toàn bộ nhân viên</TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell align="center" colSpan={10} >---Phòng quản lý lương---</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">Họ và tên</TableCell>
                                        <TableCell align="center">Email</TableCell>
                                        <TableCell align="center">Cơ bản(VND/tháng)</TableCell>
                                        <TableCell align="center">Thêm giờ(VND/giờ)</TableCell>

                                        <TableCell align="center">Trợ cấp(VND/ngày)</TableCell>

                                        <TableCell align="center">Hiệu suất(VND/tháng)</TableCell>

                                        <TableCell align="center">Chuyên cần(%/tháng)</TableCell>

                                        <TableCell align="center">Hoàn thành đơn(%/tháng)</TableCell>
                                        <TableCell align="center">Không đi muộn(%/tháng)</TableCell>


                                        <TableCell align="center">Đặt hệ số ?</TableCell>
                                        
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listUnitSalary.map((item) => {
                                        
                                        return (
                                            <TableRow key={item.email}>

                                                <TableCell align="center">{item.fullName}</TableCell>
                                                <TableCell align="center">{item.email}</TableCell>
                                                <TableCell align="center">{item.basicSalary}</TableCell>
                                                <TableCell align="center">{item.overtimeSalary}</TableCell>
                                                <TableCell align="center">{item.allowance}</TableCell>
                                                <TableCell align="center">{item.performanceBonus}</TableCell>
                                                <TableCell align="center">{item.attendanceBonus}</TableCell>

                                                <TableCell align="center">{item.completedBonus}</TableCell>

                                                <TableCell align="center">{item.awarenessBonus}</TableCell>

                                                <TableCell align="center">{item.setted === 0? 'Chưa đặt': 'Đã đặt'}</TableCell>

                                                

                                                
                                            </TableRow>
                                        )

                                    })}
                                </TableBody>
                                <TableHead>
                                    <TableRow >
                                        <TableCell colSpan={10} className='asign' align="center" ></TableCell>
                                    </TableRow>                                    
                                    <TableRow >
                                        <TableCell colSpan={10} className='asign' align="center" ></TableCell>
                                    </TableRow>
                                    <TableRow >
                                        <TableCell colSpan={10} className='asign' align="center" ><span> Chữ ký giám đốc</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span> Chữ ký nhân viên quản lý chế độ</span></TableCell>
                                    </TableRow>

                                </TableHead>
                            </Table>
                        </TableContainer>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Đóng</Button>
                    <ReactHTMLTableToExcel
                        table="export-unit-salary"
                        filename={"Báo cáo danh sách hệ số lương"}
                        sheet="tablexls"
                        buttonText='Xuất báo cáo'
                        className='export'

                    />
                </DialogActions>
            </Dialog>
        </div>
    );
}