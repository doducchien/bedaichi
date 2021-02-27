import {useState, useEffect} from 'react'

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';



//icon
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import DateRangeIcon from '@material-ui/icons/DateRange';
import WcIcon from '@material-ui/icons/Wc';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import RepeatIcon from '@material-ui/icons/Repeat';


//constraint
import * as constraints from '../../constraints'


function SignupMode({dataSignupProps}){
    

    const [dataSignup, setDataSignup] = useState({
        email: null,
        fullName: null,
        phoneNumber: null,
        birthday: null,
        sex: "0",
        password: null,
        repassword: null
    })


    const onChangeInput = (event)=>{
        let name = event.target.name;
        let value = event.target.value;
        setDataSignup({
            ...dataSignup,
            [name]: value.trim()
        })
    }

    useEffect(()=>{
        dataSignupProps(dataSignup)
    }, [dataSignup])
    return (
        <div className="signup-mode">

            <Grid style={{ width: '100%' }} container spacing={1} alignItems="flex-end">
                <Grid item>
                    <EmailIcon style={{ color: 'green' }} />
                </Grid>
                <Grid style={{ width: 'calc(100% - 40px)' }} item>
                    <TextField name='email' onChange={onChangeInput} style={{ width: '100%' }} label="Email..." />
                </Grid>
            </Grid>

            <Grid style={{ width: '100%' }} container spacing={1} alignItems="flex-end">
                <Grid item>
                    <AccountCircle style={{ color: 'red' }} />
                </Grid>
                <Grid style={{ width: 'calc(100% - 40px)' }} item>
                    <TextField name='fullName' onChange={onChangeInput} style={{ width: '100%' }} label="Họ và tên..." />
                </Grid>
            </Grid>

            <Grid style={{ width: '100%' }} container spacing={1} alignItems="flex-end">
                <Grid item>
                    <PhoneInTalkIcon style={{ color: 'blue' }} />
                </Grid>
                <Grid style={{ width: 'calc(100% - 40px)' }} item>
                    <TextField name='phoneNumber' onChange={onChangeInput} style={{ width: '100%' }} label="Số điện thoại..." />
                </Grid>
            </Grid>
            <div className="selecter">
                <TextField
                    name='birthday' 
                    onChange={onChangeInput}
                    style={{ width: '250px' }}
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
                <TextField
                    name='sex'
                    onChange={onChangeInput}
                    style={{ width: '250px' }}
                    id="standard-select-currency"
                    select
                    defaultValue={dataSignup.sex}
                    label="Giới tính"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <WcIcon style={{ color: 'purple' }} />
                            </InputAdornment>
                        ),
                    }}
                >
                    {constraints.types.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

            </div>

            <Grid style={{ width: '100%' }} container spacing={1} alignItems="flex-end">
                <Grid item>
                    <VpnKeyIcon style={{ color: '#F40083' }} />
                </Grid>
                <Grid style={{ width: 'calc(100% - 40px)' }} item>
                    <TextField name='password' onChange={onChangeInput} type='password' style={{ width: '100%' }}label="Mật khẩu..." />
                </Grid>
            </Grid>

            <Grid style={{ width: '100%' }} container spacing={1} alignItems="flex-end">
                <Grid item>
                    <RepeatIcon style={{ color: 'green' }} />
                </Grid>
                <Grid style={{ width: 'calc(100% - 40px)' }} item>
                    <TextField name='repassword' onChange={onChangeInput} type='password' style={{ width: '100%' }}label="Nhập lại mật khẩu..." />
                </Grid>
            </Grid>


        </div>
    )
}

export default SignupMode;