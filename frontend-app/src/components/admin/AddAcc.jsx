
import { useState, useEffect } from 'react'

//input
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { Button } from '@material-ui/core';



//alert
import Alert from '@material-ui/lab/Alert';


//constraint
import * as constraints from '../../constraints'
import axios from 'axios';


//component
import Popup from './Popup'


function AddAcc(props) {
    const { user_role } = props

    const [dataAdd, setDataAdd] = useState({
        user_role: user_role,
        email: null,
        fullName: null,
        phoneNumber: null,
        birthday: null,
        sex: null,
        type: null,
        password: null,
        repassword: null
    })

    const [click, setClick] = useState(false)
    const [alertErr, setAlertErr] = useState([])

    const [result, setResult] = useState({
        open: false,
        title: '',
        content: ''
    })

    const onChangeInput = (event) => {
        const name = event.target.name
        const value = event.target.value
        let dataAdd_ = {
            ...dataAdd,
            [name]: value.trim()
        }
        setDataAdd(dataAdd_)
    }

    const onClickAddAcc = () => {
        setClick(true)
        const length = alertErr.length;

        if (length === 0) {
            const dataAdd_ = {
                ...dataAdd,
                birthday: constraints.changeTimeToInt(dataAdd.birthday)
            }
            const route = constraints.server + '/onlyAdmin/addAcc';
            axios.post(route, dataAdd_, {
                headers: {
                    'user_role': user_role
                }
            })
                .then(async res => {
                    const data = await res.data
                    const result_ = { ...result, open: true }
                    console.log(data)
                    if (data.status === false) {

                        result_.title = 'Tạo tài khoản thất bại'
                        if (data.errCode === 'ER_DUP_ENTRY') {
                            result_.content = 'Email đã có tài khoản khác sử dụng. Vui lòng dùng email khác'
                        }
                        else {
                            result_.content = 'Đã có lỗi xảy ra, vui lòng thử lại'
                        }
                    }
                    else {
                        result_.title = 'Tạo tài khoản thành công'
                        result_.content = 'Tài khoản đã được tạo và phân quyền trên hệ thống. Hãy cung cấp nó cho nhân viên tương ứng sử dụng'

                    }
                    setResult(result_)
                })
                .catch(err => {

                })

        }
    }
    const closePopup = () => {
        const result_ = {
            ...result,
            open: false
        }
        setResult(result_)
    }

    useEffect(() => {
        let alertErr_ = [];
        setAlertErr(alertErr_)
        const { email, fullName, phoneNumber, birthday, sex, type, password, repassword } = dataAdd
        if (email === null || email === '') alertErr_.push(<Alert key={0} style={{ marginBottom: '20px' }} severity="error">Email bị trống. Vui lòng điền đầy đủ</Alert>)
        if (fullName === null || fullName === '') alertErr_.push(<Alert key={1} style={{ marginBottom: '20px' }} severity="error">Họ và tên bị trống. Vui lòng điền đầy đủ</Alert>)
        if (phoneNumber === null || phoneNumber === '') alertErr_.push(<Alert key={2} style={{ marginBottom: '20px' }} severity="error">Số điện thoại bị trống. Vui lòng điền đầy đủ</Alert>)
        if (birthday === null || birthday === '') alertErr_.push(<Alert key={3} style={{ marginBottom: '20px' }} severity="error">Ngày sinh bị trống. Vui lòng điền đầy đủ</Alert>)
        if (sex === null || sex === '') alertErr_.push(<Alert key={4} style={{ marginBottom: '20px' }} severity="error">Giới tính bị trống. Vui lòng điền đầy đủ</Alert>)
        if (type === null || type === '') alertErr_.push(<Alert key={5} style={{ marginBottom: '20px' }} severity="error">Phân quyền bị trống. Vui lòng điền đầy đủ</Alert>)
        if (password === null || password === '') alertErr_.push(<Alert key={6} style={{ marginBottom: '20px' }} severity="error">Mật khẩu bị trống. Vui lòng điền đầy đủ</Alert>)
        if (repassword !== password) alertErr_.push(<Alert key={7} style={{ marginBottom: '20px' }} severity="error">Mật khẩu nhập lại không khớp. Vui lòng nhập lại</Alert>)
        setAlertErr(alertErr_)
    }, [dataAdd])

    return (
        <div className="add-acc">

            <div className='text-input'>



                <TextField onChange={onChangeInput} name='email' style={{ width: '100%' }} id="input-with-icon-grid" label="Email" />

            </div>

            <div className='text-input'>



                <TextField onChange={onChangeInput} name='fullName' style={{ width: '100%' }} id="input-with-icon-grid" label="Họ và tên" />

            </div>

            <div className='text-input'>



                <TextField onChange={onChangeInput} name='phoneNumber' style={{ width: '100%' }} id="input-with-icon-grid" label="Số điện thoại" />

            </div>





            <div className='text-input'>
                <TextField
                    name='birthday'
                    onChange={onChangeInput}
                    style={{ width: '100%' }}
                    type='date'
                    InputLabelProps={{ shrink: true }}

                    label="Ngày sinh"
                    
                />

            </div>

            <div className="text-input select_">
                <TextField
                    name='sex'
                    onChange={onChangeInput}
                    style={{ width: '250px' }}
                
                    select
                    defaultValue={dataAdd.sex}
                    label="Giới tính"
                    
                >
                    {constraints.sexes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    name='type'
                    onChange={onChangeInput}
                    style={{ width: '250px' }}
                   
                    select
                    defaultValue={dataAdd.sex}
                    label="Phân quyền"
                   
                >
                    {constraints.types.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>



            <div className='text-input'>
                
                        <TextField onChange={onChangeInput} name='password' type='password' style={{ width: '100%' }} id="input-with-icon-grid" label="Mật khẩu" />
             
            </div>

            <div className="text-input">
               
                        <TextField onChange={onChangeInput} name='repassword' type='password' style={{ width: '100%' }} label="Nhập lại mật khẩu..." />
                
            </div>


            <div className="btn_">
                <Button onClick={onClickAddAcc} style={{ width: '200px' }} variant="contained" color={"secondary"}>Tạo</Button>

            </div>

            <div className='alert_' style={click ? { display: 'block' } : { display: 'none' }}>
                {alertErr}
            </div>

            <Popup result={result} closePopup={closePopup} />

        </div>
    )
}

export default AddAcc;