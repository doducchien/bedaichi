//input
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

import { Button } from '@material-ui/core';

//icons
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import DateRangeIcon from '@material-ui/icons/DateRange';
import WcIcon from '@material-ui/icons/Wc';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import RepeatIcon from '@material-ui/icons/Repeat';
import SortIcon from '@material-ui/icons/Sort';


//alert
import Alert from '@material-ui/lab/Alert';
//constraint
import * as constraints from '../../constraints'
import axios from 'axios';


function AddStaff(){
    const onClickAddStaff = ()=>{
    
    }
    const onChangeInput = ()=>{
    
    }
    return(
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

            <div className="text-input select_">
                <TextField
                    name='sex'
                    onChange={onChangeInput}
                    style={{ width: '250px' }}
                    id="standard-select-currency"
                    select
                    defaultValue={dataAdd.sex}
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
                    name='type'
                    onChange={onChangeInput}
                    style={{ width: '250px' }}
                    id="standard-select-currency"
                    select
                    defaultValue={dataAdd.sex}
                    label="Phân quyền"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SortIcon style={{ color: 'purple' }} />
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



            <div className='text-input'>
                <Grid style={{ width: '100%' }} container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <VpnKeyIcon style={{ color: '#F40083' }} />
                    </Grid>
                    <Grid style={{ width: 'calc(100% - 40px)' }} item>
                        <TextField onChange={onChangeInput} name='password' type='password' style={{ width: '100%' }} id="input-with-icon-grid" label="Mật khẩu" />
                    </Grid>
                </Grid>
            </div>

            <div className="text-input">
                <Grid style={{ width: '100%' }} container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <RepeatIcon style={{ color: 'green' }} />
                    </Grid>
                    <Grid style={{ width: 'calc(100% - 40px)' }} item>
                        <TextField onChange={onChangeInput} name='repassword' type='password' style={{ width: '100%' }} label="Nhập lại mật khẩu..." />
                    </Grid>
                </Grid>
            </div>


            <div className="btn_">
                <Button onClick={onClickAddStaff} style={{ width: '200px' }} variant="contained" color={"secondary"}>Tạo</Button>

            </div>
{/* 
            <div className='alert_' style={click ? { display: 'block' } : { display: 'none' }}>
                {alertErr}
            </div> */}

            {/* <Popup result={result} closePopup={closePopup} /> */}
        </div>
    )
}

export default AddStaff