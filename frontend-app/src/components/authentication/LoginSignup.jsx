import { useState, useEffect } from 'react'

import { Button } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Alert from '@material-ui/lab/Alert';


//component
import SignupMode from './SignupMode'
import LoginMode from './LoginMode'
import Popup from './Popup'


//axios
import axios from 'axios'


//constraints
import * as constraints from '../../constraints'

//redux
import {useDispatch} from 'react-redux'
import * as actions from '../../redux/actions/actions'



function LoginSignup(props) {
    const [mode, setMode] = useState(0);
    const [data, setData] = useState({});
    const [dataLogin, setDataLogin] = useState({})
    const [click, setClick] = useState(false)
    const [result, setResult] = useState([])
    const [err, setErr] = useState({
        open: false,
        title: '',
        content: ''
    })

    const dispatch = useDispatch();

    const changeMode = (mode) => {
        setClick(false)
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
            .then(async(response)=>{
                let res = await response.data;
                if(res.status){
                    let timeout = setTimeout(()=>{
                        setMode(0)
                        setClick(false)
                        clearTimeout(timeout)
                    }, 2000)
                    let result_ = [<Alert key={0} style={{ marginBottom: '20px' }} severity="success">Đăng ký thành công. Xin mời đăng nhập</Alert>]
                    setResult(result_)
                }
                else if(res.errCode === 'ER_DUP_ENTRY'){
                    let err_ = {
                        ...err,
                        open: true,
                        title: "Đăng ký thất bại",
                        content: "Email đã qua sử dụng. Vui lòng chọn email khác."
                    }
                    setErr(err_)
                }
            })
            .catch(err=>{
                
            })
        }
    }

    const onClickLogin = ()=>{
        
        const route = constraints.server + '/authentication/login';
        axios.post(route, dataLogin)
        .then(async (response)=>{
            let res = response.data;
            if(res.status === false){
                let err_ = {
                    ...err,
                    open: true
                }
                if(res.errCode === 'email_or_password_invalid'){
                    err_.title = "Đăng nhập thất bại"
                    err_.content = "Email không tồn tại hoặc mật khẩu bị nhập sai. Vui lòng thử lại sau."
                }
                setErr(err_)
            }
            else{
                let token = res.token;
                dispatch(actions.setUser(res.user))
                dispatch(actions.setToken(token))
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const closeErr = ()=>{
        setErr({...err, open: false})
    }

    const dataLoginProps = (data)=>{
        
        setDataLogin(data)
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
                {mode === 0 ? <LoginMode dataLoginProps={dataLoginProps} /> : <SignupMode dataSignupProps={dataSignupProps} />}

            </div>
            <div className="_btn">
                <Button onClick={mode === 1? onClickSignup: onClickLogin} variant="contained" color={mode === 0 ? "Primary" : "secondary"}>{mode === 0 ? "Đăng nhập" : "Đăng ký"}</Button>
            </div>
            <div style={click? {display: 'block'}: {display: 'none'}} className="alert_">
                {result}
            </div>
            <Popup err={err} closeErr={closeErr}/>
        </div>
    )
}

export default LoginSignup;