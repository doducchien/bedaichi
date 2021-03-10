//input
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import { Button } from '@material-ui/core';

//icons
import ImageIcon from '@material-ui/icons/Image';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import DateRangeIcon from '@material-ui/icons/DateRange';
import WcIcon from '@material-ui/icons/Wc';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import PanToolIcon from '@material-ui/icons/PanTool';
import RoomIcon from '@material-ui/icons/Room';
import HomeIcon from '@material-ui/icons/Home';
import AcUnitIcon from '@material-ui/icons/AcUnit';


//alert
import Alert from '@material-ui/lab/Alert';
//constraint
import * as constraints from '../../constraints'

//axios
import axios from 'axios';

//react
import { useEffect, useState } from 'react';

//component
import Popup from './Popup'


function AddStaff(props) {
    const { user_role } = props
    const [listDepartment, setListDepartment] = useState([])
    const [dataAdd, setDataAdd] = useState({
        email: null,
        fullName: null,
        img: null,
        phoneNumber: null,
        birthday:  null,
        joinDay: null,
        leftDay: null,
        sex: null,
        department: null,
        position: null,
        status: null,
        note: null
    })
    const [click, setClick] = useState(false)

    const [alertErr, setAlertErr] = useState([])

    const [result, setResult] = useState({
        open: false,
        title: '',
        content: ''
    })

    const closePopup = () => {
        const result_ = {
            ...result,
            open: false
        }
        setResult(result_)
    }

    useEffect(() => {
        const route = constraints.server + '/staff/getAllDepartment';
        axios.get(route, {
            headers:{
                'user_role': user_role
            }
        })
        .then(async res=>{
            const list = await res.data.map(item=>{
                return{
                    value: item.id,
                    label: item.name
                }
            })
            setListDepartment(list)
        })
    }, [])

    useEffect(() => {
        let alertErr_ = [];
        setAlertErr(alertErr_)
        const { email, fullName, phoneNumber, birthday, sex, type, joinDay,department, position, status, img } = dataAdd
        if (email === null || email === '') alertErr_.push(<Alert key={0} style={{ marginBottom: '20px' }} severity="error">Email bị trống</Alert>)
        if (fullName === null || fullName === '') alertErr_.push(<Alert key={1} style={{ marginBottom: '20px' }} severity="error">Họ và tên bị trống</Alert>)
        if (img === null || img === '') alertErr_.push(<Alert key={2} style={{ marginBottom: '20px' }} severity="error">Link ảnh thẻ bị trống</Alert>)

        if (phoneNumber === null || phoneNumber === '') alertErr_.push(<Alert key={3} style={{ marginBottom: '20px' }} severity="error">Số điện thoại bị trống</Alert>)
        if (birthday === null || birthday === '') alertErr_.push(<Alert key={4} style={{ marginBottom: '20px' }} severity="error">Ngày sinh bị trống</Alert>)
        if (sex === null || sex === '') alertErr_.push(<Alert key={5} style={{ marginBottom: '20px' }} severity="error">Giới tính bị trống</Alert>)
        if (type === null || type === '') alertErr_.push(<Alert key={6} style={{ marginBottom: '20px' }} severity="error">Phân quyền bị trống</Alert>)
        if (joinDay === null || joinDay === '') alertErr_.push(<Alert key={7} style={{ marginBottom: '20px' }} severity="error">Ngày tham gia công ty bị trống</Alert>)
        if (department === null|| department === '') alertErr_.push(<Alert key={8} style={{ marginBottom: '20px' }} severity="error">Thông tin phòng ban bị trống</Alert>)
        if (position === null || position === '') alertErr_.push(<Alert key={9} style={{ marginBottom: '20px' }} severity="error">Thông tin vị trí bị trống</Alert>)
        if (status === null || status === '') alertErr_.push(<Alert key={10} style={{ marginBottom: '20px' }} severity="error">Thông tin tình trạng làm việc bị trống</Alert>)

        
        
        setAlertErr(alertErr_)
    }, [dataAdd])



    const onClickAddStaff = () => {
        setClick(true)
        const length = alertErr.length;
        console.log(dataAdd)
        if(length === 0){
            const dataAdd_ = {
                ...dataAdd,
                birthday: constraints.changeTimeToInt(dataAdd.birthday),
                joinDay: constraints.changeTimeToInt(dataAdd.joinDay),
                leftDay: (dataAdd.leftDay !== '' && dataAdd.leftDay !== null)? constraints.changeTimeToInt(dataAdd.leftDay): null
            }
            const route = constraints.server + '/staff/createStaff';
            axios.post(route, dataAdd_,{
                headers:{
                    'user_role': user_role
                }
            })
            .then(async res=>{
                    const data = await res.data
                    const result_ = {...result, open:true }
                    if(data.status === false){
                        result_.title = 'Thêm nhân viên thất bại'
                        if(data.errCode === 'ER_DUP_ENTRY'){
                            result_.content = 'Email đã có nhân viên khác sử dụng. Vui lòng dùng email khác'
                        }
                        else{
                            result_.content = 'Đã có lỗi xảy ra, vui lòng thử lại'
                        }
                    }
                    else{
                        result_.title = 'Tạo nhân viên thành công'
                        result_.content = 'Thông tin nhân viên đã được tạo trên hệ thống'

                    }
                    setResult(result_)

            })
            .catch(err => {

            })
        }
    }
    const onChangeInput = (event) => {
        const {name, value} = event.target
        let dataAdd_ = {
            ...dataAdd,
            [name]: value.trim()
        }
        setDataAdd(dataAdd_)
    }
    return (
        <div className="add-staff">
            <div className='text-input'>
                <Grid style={{ width: '100%' }} container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <EmailIcon style={{ color: 'green' }} />
                    </Grid>
                    <Grid style={{ width: 'calc(100% - 40px)' }} item>
                        <TextField onChange={onChangeInput} name='email' style={{ width: '100%' }} id="input-with-icon-grid" label="Email" />
                    </Grid>
                </Grid>
            </div>

            <div className='text-input'>
                <Grid style={{ width: '100%' }} container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <AccountCircle style={{ color: 'red' }} />
                    </Grid>
                    <Grid style={{ width: 'calc(100% - 40px)' }} item>
                        <TextField onChange={onChangeInput} name='fullName' style={{ width: '100%' }} id="input-with-icon-grid" label="Họ và tên" />
                    </Grid>
                </Grid>
            </div>

            <div className='text-input'>
                <Grid style={{ width: '100%' }} container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <ImageIcon style={{ color: 'gray' }} />
                    </Grid>
                    <Grid style={{ width: 'calc(100% - 40px)' }} item>
                        <TextField onChange={onChangeInput} name='img' style={{ width: '100%' }} id="input-with-icon-grid" label="Link ảnh thẻ" />
                    </Grid>
                </Grid>
            </div>

            <div className='text-input'>
                <Grid style={{ width: '100%' }} container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <PhoneInTalkIcon style={{ color: 'blue' }} />
                    </Grid>
                    <Grid style={{ width: 'calc(100% - 40px)' }} item>
                        <TextField onChange={onChangeInput} name='phoneNumber' style={{ width: '100%' }} id="input-with-icon-grid" label="Số điện thoại" />
                    </Grid>
                </Grid>
            </div>





            <div className='text-input'>
                <TextField
                    name='birthday'
                    onChange={onChangeInput}
                    style={{ width: '100%' }}
                    type='date'
                    id="input-with-icon-textfield"
                    label="Ngày sinh"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <DateRangeIcon style={{ color: '#128C7E' }} />
                            </InputAdornment>
                        ),
                    }}
                />

            </div>

            <div className='text-input'>
                <TextField
                    name='joinDay'
                    onChange={onChangeInput}
                    style={{ width: '100%' }}
                    type='date'
                    id="input-with-icon-textfield"
                    label="Ngày tham gia công ty"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PlayCircleFilledWhiteIcon style={{ color: 'red' }} />
                            </InputAdornment>
                        ),
                    }}
                />

            </div>

            <div className='text-input'>
                <TextField
                    name='leftDay'
                    onChange={onChangeInput}
                    style={{ width: '100%' }}
                    type='date'
                    id="input-with-icon-textfield"
                    label="Ngày thôi việc"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PanToolIcon style={{ color: 'pink' }} />
                            </InputAdornment>
                        ),
                    }}
                />

            </div>

            <div className="text-input select_">
                <TextField
                    name='sex'
                    onChange={onChangeInput}
                    style={{ width: '250px' }}
                    id="standard-select-currency"
                    select
                    // defaultValue={dataAdd.sex}
                    label="Giới tính"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <WcIcon style={{ color: 'purple' }} />
                            </InputAdornment>
                        ),
                    }}
                >
                    {constraints.sexes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    name='status'
                    onChange={onChangeInput}
                    style={{ width: '250px' }}
                    id="standard-select-currency"
                    select
                    // defaultValue={dataAdd.sex}
                    label="Tình trạng làm việc"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AcUnitIcon style={{ color: 'tomato' }} />
                            </InputAdornment>
                        ),
                    }}
                >
                    {constraints.statusWork.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    name='department'
                    onChange={onChangeInput}
                    style={{ width: '250px' }}
                    id="standard-select-currency"
                    select
                    // defaultValue={dataAdd.sex}
                    label="Phòng ban"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <HomeIcon style={{ color: 'blue' }} />
                            </InputAdornment>
                        ),
                    }}
                >
                    {listDepartment.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    name='position'
                    onChange={onChangeInput}
                    style={{ width: '250px' }}
                    id="standard-select-currency"
                    select
                    // defaultValue={dataAdd.sex}
                    label="Vị trí"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <RoomIcon style={{ color: 'gray' }} />
                            </InputAdornment>
                        ),
                    }}
                >
                    {constraints.position.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>

            <div className="text-input ">

                <textarea onChange={onChangeInput} name='note' placeholder='Ghi chú...' />
            </div>
            <div className="btn_">
                <Button onClick={onClickAddStaff} style={{ width: '200px' }} variant="contained" color={"secondary"}>Tạo</Button>

            </div>
            
            <div className='alert_' style={click ? { display: 'block' } : { display: 'none' }}>
                {alertErr}
            </div>

            <Popup result={result} closePopup={closePopup} />
        </div>
    )
}

export default AddStaff