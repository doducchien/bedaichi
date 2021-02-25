import { useState, useEffect } from 'react'

import { Button } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Alert from '@material-ui/lab/Alert';


//component
import SignupMode from './SignupMode'
import LoginMode from './LoginMode'


//axios
import axios from 'axios'


//constraints
import * as constraints from '../../constraints'

function LoginSignup(props) {
    const [mode, setMode] = useState(1);
    const [data, setData] = useState({});
    const [click, setClick] = useState(false)
    const [result, setResult] = useState([])

    const changeMode = (mode) => {
        setMode(mode)
    }
    const dataSignupProps = (data) => {
        setData(data)
    }
    const onClickSignup = () => {
        setClick(true)
        const lengthErr = result.length;
        if(lengthErr === 0){
            const date = data.birthday;
            const d = date.split('-')
            
            const d_ = new Date(d[2], d[0] - 1, d[1])
            
            const data_ = {
                ...data,
                birthday: d_.getTime()
            }
            const route = constraints.server + '/authentication/signup'
            axios.post(route, data_)
            .then(response=>{
                console.log(response.data)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }
    useEffect(() => {
        
        let { email, fullName, phoneNumber, birthday, password, repassword } = data;
        let result_ = []
        setResult(result_)
        if (email === null || email === '') result_.push(<Alert key={0} style={{ marginBottom: '20px' }} severity="error">Email bị trống. Vui lòng điền đầy đủ</Alert>)
        if (fullName === null || fullName === '') result_.push(<Alert key={1} style={{ marginBottom: '20px' }} severity="error">Họ và tên bị trống. Vui lòng điền đầy đủ</Alert>)
        if (phoneNumber === null || phoneNumber === '') result_.push(<Alert key={2} style={{ marginBottom: '20px' }} severity="error">Số điện thoại bị trống. Vui lòng điền đầy đủ</Alert>)
        if (birthday === null || birthday === '') result_.push(<Alert key={3} style={{ marginBottom: '20px' }} severity="error">Ngày sinh bị trống. Vui lòng điền đầy đủ</Alert>)
        if (password === null || password === '') result_.push(<Alert key={4} style={{ marginBottom: '20px' }} severity="error">Mật khẩu bị trống. Vui lòng điền đầy đủ</Alert>)
        if (repassword !== password) result_.push(<Alert key={0} style={{ marginBottom: '20px' }} severity="error">Mật khẩu nhập lại không khớp. Vui lòng nhập lại</Alert>)
        setResult(result_)
    }, [data])




    return (
        <div className='login-signup'>
            <header>CÔNG TY TNHH DỊCH VỤ CÔNG NGHỆ THIÊN HẰNG</header>
            <BottomNavigation
                value={mode}
                showLabels
                style={{ height: '40px', width: '300px' }}
            >
                <BottomNavigationAction onClick={() => changeMode(0)} label="Đăng nhập" />
                <BottomNavigationAction onClick={() => changeMode(1)} label="Đăng ký" />
            </BottomNavigation>
            <div className="body">
                {mode === 0 ? <LoginMode /> : <SignupMode dataSignupProps={dataSignupProps} />}

            </div>
            <div className="_btn">
                <Button onClick={onClickSignup} variant="contained" color={mode === 0 ? "Primary" : "secondary"}>{mode === 0 ? "Đăng nhập" : "Đăng ký"}</Button>
            </div>
            <div style={click? {display: 'block'}: {display: 'none'}} className="alert_">
                {result}
            </div>
        </div>
    )
}

export default LoginSignup;