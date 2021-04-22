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


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];


function TableSalary(props) {
    const {user_role} = props
    const [timeSelect, setTimeSelect] = useState(()=>{
        let date = new Date()
        date.setDate(1)
        date.setHours(0, 0, 0, 0)
        return date
    })

    const onChangeTime = (time) => {
        time.setDate(1)
        time.setHours(0, 0, 0, 0)
        setTimeSelect(time)
    }



    useEffect(()=>{
        const route = constraints.server + '/salary/getAllTotalSalary/' + timeSelect.getTime()
        axios.get(route, {
            headers:{
                'user_role': user_role
            
            }
        })
        .then(res=>{
            console.log(res.data)
        })
    }, [timeSelect])
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

            <div className="body_">
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell align="right">basicSalary</TableCell>
                                <TableCell align="right">overtimeSalary</TableCell>
                                <TableCell align="right">allowance</TableCell>
                                <TableCell align="right">performanceBonus</TableCell>

                                <TableCell align="right">attendanceBonus</TableCell>

                                <TableCell align="right">completedBonus</TableCell>

                                <TableCell align="right">awarenessBonus</TableCell>

                                <TableCell align="right">totalSalary</TableCell>

                               

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.calories}</TableCell>
                                    <TableCell align="right">{row.fat}</TableCell>
                                    <TableCell align="right">{row.carbs}</TableCell>
                                    <TableCell align="right">{row.protein}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default TableSalary