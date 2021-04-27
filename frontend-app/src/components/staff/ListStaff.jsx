

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




import ReactExport from 'react-data-export';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';







function createData(image, email, fullName, phoneNumber, sex, joinDay, leftDay, position) {
    if (sex === 0) sex = 'nam'
    else if (sex === 1) sex = 'nữ'
    else sex = 'khác'
    joinDay = constraints.changeIntToTime(parseInt(joinDay))

    if (leftDay !== null) leftDay = constraints.changeIntToTime(parseInt(leftDay))
    else leftDay = 'Chưa có'

    return { image, email, fullName, phoneNumber, sex, joinDay, leftDay, position };
}






function ListStaff(props) {



    const { user_role, listStaff, openDetailStaff } = props
    const DataSet = [
        {
            value: 'hihihi',
            xSteps: 1, // Will start putting cell with 1 empty cell on left most
            ySteps: 5, //will put space of 5 rows,

            columns: [
                { title: "ẢNH", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } }, // width in pixels
                { title: "EMAIL", style: { font: { sz: "18", bold: true } }, width: { wch: 30 } }, // width in characters
                { title: "HỌ VÀ TÊN", style: { font: { sz: "18", bold: true } }, width: { wpx: 120 } }, // width in pixels
                { title: "SỐ ĐIỆN THOẠI", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } }, // width in pixels
                { title: "GIỚI TÍNH", style: { font: { sz: "18", bold: true } }, width: { wpx: 100 } }, // width in pixels
                { title: "NGÀY THAM GIA ", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } }, // width in pixels
                { title: "NGÀY NGHỈ VIỆC", style: { font: { sz: "18", bold: true } }, width: { wch: 30 } }, // width in characters
                { title: "VỊ TRÍ", style: { font: { sz: "18", bold: true } }, width: { wpx: 125 } }, // width in pixels


            ],
            data: listStaff.map((data) => {
                let { image, email, fullName, phoneNumber, sex, joinDay, leftDay, position } = data || ''
                if (sex === 0) sex = 'nam'
                else if (sex === 1) sex = 'nữ'
                else sex = 'khác'
                joinDay = constraints.changeIntToTime(parseInt(joinDay))

                if (leftDay !== null) leftDay = constraints.changeIntToTime(parseInt(leftDay))
                else leftDay = 'Chưa có'
                return [
                    { value: image || 'null', style: { font: { sz: "14" } } },
                    { value: email || 'null', style: { font: { sz: "14" } } },
                    { value: fullName || 'null', style: { font: { sz: "14" } }, fill: { patternType: "solid", fgColor: { rgb: "3461eb" } } },
                    { value: phoneNumber || 'null', fill: { patternType: "solid", fgColor: { rgb: "eb1207" } } },
                    { value: sex || 'null', fill: { patternType: "solid", fgColor: { rgb: "4bd909" } } },
                    { value: joinDay || 'null', fill: { patternType: "solid", fgColor: { rgb: "ebc907" } } },
                    { value: leftDay || 'null', fill: { patternType: "solid", fgColor: { rgb: "35bdb4" } } },
                    { value: position || 'null', fill: { patternType: "solid", fgColor: { rgb: "ed14f5" } } },

                ]
            }),


        },

    ]
    const TableStaff = ({ listStaff, openDetailStaff }) => {


        return (
            <div className='list-staff'>
                <TableContainer style={{ width: '100%' }} component={Paper}>
                    <Table id='export'>
                        <TableHead>
                            
                            <TableRow >
                                <TableCell  align="center" colSpan={8} >CÔNG TY TNHH DỊCH VỤ CÔNG NGHỆ THIÊN HẰNG</TableCell>
                            </TableRow>
                 
                            <TableRow >
                                <TableCell  align="center" colSpan={8} >Báo cáo danh sách nhân viên</TableCell>
                            </TableRow>
                            <TableRow >
                                <TableCell  align="center" colSpan={8} >---Phòng quản lý nhân sự---</TableCell>
                            </TableRow>
                            <TableRow>
                                {/* <TableCell>Ảnh</TableCell> */}
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
                                        {/* <TableCell component="th" scope="row">
                                            <img style={{ width: '50px', height: '50px', borderRadius: '50%' }} src={image} />
                                        </TableCell> */}

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
                        <TableHead>
                            <TableRow >
                                <TableCell colSpan={8} className='asign'  align="center" colSpan={8} ><span> Chữ ký giám đốc</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span> Chữ ký nhân viên quản lý nhân sự</span></TableCell>
                            </TableRow>
                            
                        </TableHead>
                    </Table>

                </TableContainer>
                <ReactHTMLTableToExcel
                    table="export"
                    filename="Báo cáo danh sách nhân viên"
                    sheet="tablexls"
                    buttonText='Xuất báo cáo'
                    className='export'

                />
            </div>

        )
    }

    console.log(listStaff)
    return (
        <div className="list-staff">


            <TableStaff listStaff={listStaff} openDetailStaff={openDetailStaff} />


            {/* <div className='right'>
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

            </div> */}


        </div>
    )
}

export default ListStaff