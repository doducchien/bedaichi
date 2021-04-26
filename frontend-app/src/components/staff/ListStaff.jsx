

//table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

//btn
import Button from '@material-ui/core/Button';


//icon
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';


//constraint
import * as constraints from '../../constraints'

//export excel
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { CSVLink } from 'react-csv'


import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;





function createData(image, email, fullName, phoneNumber, sex, joinDay, leftDay, position) {
    if (sex === 0) sex = 'nam'
    else if (sex === 1) sex = 'nữ'
    else sex = 'khác'
    joinDay = constraints.changeIntToTime(parseInt(joinDay))

    if (leftDay !== null) leftDay = constraints.changeIntToTime(parseInt(leftDay))
    else leftDay = 'Chưa có'

    return { image, email, fullName, phoneNumber, sex, joinDay, leftDay, position };
}




const TableStaff = ({ listStaff, openDetailStaff }) => {


    return (
        <TableContainer style={{ width: '100%' }} component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Ảnh</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Họ Tên</TableCell>
                        <TableCell align="center">Số điện thoại</TableCell>
                        <TableCell align="center">Giới tính</TableCell>
                        <TableCell align="center">Ngày tham gia</TableCell>
                        <TableCell align="center">Ngày nghỉ việc</TableCell>
                        <TableCell align="center">Vị trí</TableCell>
                        <TableCell align="center">Hành động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listStaff.map((item) => {
                        let { image, email, fullName, phoneNumber, sex, joinDay, leftDay, position } =
                            createData(item.image, item.email, item.fullName, item.phoneNumber, item.sex, item.joinDay, item.leftDay, item.position)
                        return (

                            <TableRow key={email}>
                                <TableCell component="th" scope="row">
                                    <img style={{ width: '50px', height: '50px', borderRadius: '50%' }} src={image} />
                                </TableCell>

                                <TableCell align="center">{email}</TableCell>
                                <TableCell align="center">{fullName}</TableCell>
                                <TableCell align="center">{phoneNumber}</TableCell>
                                <TableCell align="center">{sex}</TableCell>
                                <TableCell align="center">{joinDay}</TableCell>
                                <TableCell align="center">{leftDay}</TableCell>
                                <TableCell align="center">{position}</TableCell>
                                <TableCell align="center" onClick={() => openDetailStaff(email)} align="right"><ArrowRightAltIcon /></TableCell>


                            </TableRow>
                        )
                    }

                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function ListStaff(props) {



    const { user_role, listStaff, openDetailStaff } = props
    const DataSet = [
        {
            columns: [
                { title: "Ảnh", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } }, // width in pixels
                { title: "Eamil", style: { font: { sz: "18", bold: true } }, width: { wch: 30 } }, // width in characters
                { title: "Họ và tên", style: { font: { sz: "18", bold: true } }, width: { wpx: 100 } }, // width in pixels
                { title: "Số điện thoại", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } }, // width in pixels
                { title: "Giới tính", style: { font: { sz: "18", bold: true } }, width: { wpx: 100 } }, // width in pixels
                { title: "Ngày tham gia ", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } }, // width in pixels
                { title: "Ngày nghỉ việc", style: { font: { sz: "18", bold: true } }, width: { wch: 30 } }, // width in characters
                { title: "Vị trí", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } }, // width in pixels


            ],
            // data: listStaff.map((data) => [
            //     { value: data.image, style: { font: { sz: "14" } } },
            //     { value: data.email, style: { font: { sz: "14" } } },
            //     { value: data.fullName, style: { font: { color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "3461eb" } } } },
            //     { value: data.phoneNumber, style: { font: { color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "eb1207" } } } },
            //     { value: data.sex, style: { font: { color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "4bd909" } } } },
            //     { value: data.joinDay, style: { font: { color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "ebc907" } } } },
            //     { value: data.leftDay, style: { font: { color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "35bdb4" } } } },
            //     { value: data.position, style: { font: { color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "ed14f5" } } } },

            // ])
            data: listStaff.map((data) => [
                { value: 'image', style: { font: { sz: "14" } } },
                { value: 'email', style: { font: { sz: "14" } } },
                { value: 'fullName', style: { font: { color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "3461eb" } } } },
                { value: 'phoneNumber', style: { font: { color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "eb1207" } } } },
                { value: 'sex', style: { font: { color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "4bd909" } } } },
                { value: 'joinDay', style: { font: { color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "ebc907" } } } },
                { value: 'leftDay', style: { font: { color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "35bdb4" } } } },
                { value: 'position', style: { font: { color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "ed14f5" } } } },

            ])
        }
    ]
    console.log(DataSet)

    const dataExcel = listStaff.map(item => {
        const { image, email, fullName, phoneNumber, sex, joinDay, leftDay, position } = item
        return createData(image, email, fullName, phoneNumber, sex, joinDay, leftDay, position)

    })



    const exportToCSV = (csvData, fileName) => {


        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const ws = XLSX.utils.json_to_sheet(csvData, {
            header: ['hihi'],
        });
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <div className="list-staff">


            <TableStaff listStaff={listStaff} openDetailStaff={openDetailStaff} />


            <div className='right'>
                {/* <Button onClick={() => exportToCSV(dataExcel, 'listStaff')} style={{ height: '70px' }} variant="outlined" color="secondary">Xuất danh sách nhân viên</Button> */}
                {
                    listStaff.length > 0 ?
                        <ExcelFile
                            filename="Covid-19 Data"
                            element={<button type="button" >Export Data</button>}>
                            <ExcelSheet dataSet={DataSet} name="Covid-19 Country Report" />
                        </ExcelFile>
                    :
                    ''
                }

            </div>


        </div>
    )
}

export default ListStaff