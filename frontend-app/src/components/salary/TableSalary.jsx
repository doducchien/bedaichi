import { useEffect, useState } from 'react'
//datepicker
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';



//table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//constraints 
import * as constraints from '../../constraints'

//axios
import axios from 'axios'


//export excel
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

//btn
import Button from '@material-ui/core/Button';


function createData(name, basicSalary, overtimeSalary, allowance, performanceBonus, attendanceBonus, completedBonus, awarenessBonus, totalSalary) {
    return { name, basicSalary, overtimeSalary, allowance, performanceBonus, attendanceBonus, completedBonus, awarenessBonus, totalSalary };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


function TableSalary(props) {
    const { user_role } = props
    const [timeSelect, setTimeSelect] = useState(() => {
        let date = new Date()
        date.setDate(1)
        date.setHours(0, 0, 0, 0)
        return date
    })

    const [dataExcel, setDataExcel] = useState([])

    const onChangeTime = (time) => {
        time.setDate(1)
        time.setHours(0, 0, 0, 0)
        setTimeSelect(time)
    }

    



    useEffect(() => {
        const route = constraints.server + '/salary/getAllTotalSalary/' + timeSelect.getTime()
        axios.get(route, {
            headers: {
                'user_role': user_role

            }
        })
            .then(res => {
                setDataExcel(res.data.result)
            })
    }, [timeSelect])


    console.log(dataExcel)
    return (
        <div className="table-salary_">
            <div className="header">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>


                    <KeyboardDatePicker
                        style={{ width: '200px' }}
                        label="Thời điểm"
                        format="MM/yyyy"
                        value={timeSelect}
                        onChange={onChangeTime}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}

                        views={['year', 'month']}

                    />


                </MuiPickersUtilsProvider>
            </div>

            <div className="body_" style={{ marginTop: '10px' }}>
                <TableContainer component={Paper}>
                    <Table id='export-total-salary'>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Họ tên</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Cơ bản</TableCell>
                                <TableCell align="center">Làm thêm giờ</TableCell>
                                <TableCell align="center">Trợ cấp</TableCell>
                                <TableCell align="center">Chiết khấu</TableCell>

                                <TableCell align="center">Chuyên cần</TableCell>

                                <TableCell align="center">Đúng giờ</TableCell>

                                <TableCell align="center">Tổng</TableCell>



                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataExcel.map(item => (
                                <TableRow key={item.email}>
                                    <TableCell align="center">{item.fullName}</TableCell>

                                    <TableCell align="center">{item.email}</TableCell>
                                    <TableCell align="center">{item.basicSalary}</TableCell>
                                    <TableCell align="center">{item.overtimeSalary}</TableCell>
                                    <TableCell align="center">{item.allowance}</TableCell>
                                    <TableCell align="center">{item.performanceBonus}</TableCell>
                                    <TableCell align="center">{item.attendanceBonus}</TableCell>
                                    <TableCell align="center">{item.awarenessBonus}</TableCell>
                                    <TableCell align="center">{item.totalSalary}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div style={{ height: '50px', width: '100%', textAlign: 'center' }}>
                <ReactHTMLTableToExcel
                    table="export-total-salary"
                    filename={"Báo cáo danh sách hệ số lương"}
                    sheet="tablexls"
                    buttonText='Xuất báo cáo'
                    className='export'

                />
            </div>
        </div>
    )
}

export default TableSalary