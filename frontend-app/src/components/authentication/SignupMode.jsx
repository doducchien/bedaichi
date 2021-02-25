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

function SignupMode(){
    const currencies = [
        {
            value: 0,
            label: 'Nam',
        },
        {
            value: 1,
            label: 'Nữ',
        },
        {
            value: 2,
            label: 'Khác',
        },

    ];
    return (
        <div className="signup-mode">

            <Grid style={{ width: '100%' }} container spacing={1} alignItems="flex-end">
                <Grid item>
                    <EmailIcon style={{ color: 'green' }} />
                </Grid>
                <Grid style={{ width: 'calc(100% - 40px)' }} item>
                    <TextField style={{ width: '100%' }} id="input-with-icon-grid" label="Email..." />
                </Grid>
            </Grid>

            <Grid style={{ width: '100%' }} container spacing={1} alignItems="flex-end">
                <Grid item>
                    <AccountCircle style={{ color: 'red' }} />
                </Grid>
                <Grid style={{ width: 'calc(100% - 40px)' }} item>
                    <TextField style={{ width: '100%' }} id="input-with-icon-grid" label="Họ và tên..." />
                </Grid>
            </Grid>

            <Grid style={{ width: '100%' }} container spacing={1} alignItems="flex-end">
                <Grid item>
                    <PhoneInTalkIcon style={{ color: 'blue' }} />
                </Grid>
                <Grid style={{ width: 'calc(100% - 40px)' }} item>
                    <TextField style={{ width: '100%' }} id="input-with-icon-grid" label="Số điện thoại..." />
                </Grid>
            </Grid>
            <div className="selecter">
                <TextField
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
                    style={{ width: '250px' }}
                    id="standard-select-currency"
                    select
                    label="Giới tính"
                    // value={currency}
                    // onChange={handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <WcIcon style={{ color: 'purple' }} />
                            </InputAdornment>
                        ),
                    }}
                >
                    {currencies.map((option) => (
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
                    <TextField type='password' style={{ width: '100%' }} id="input-with-icon-grid" label="Mật khẩu..." />
                </Grid>
            </Grid>

            <Grid style={{ width: '100%' }} container spacing={1} alignItems="flex-end">
                <Grid item>
                    <RepeatIcon style={{ color: 'green' }} />
                </Grid>
                <Grid style={{ width: 'calc(100% - 40px)' }} item>
                    <TextField type='password' style={{ width: '100%' }} id="input-with-icon-grid" label="Nhập lại mật khẩu..." />
                </Grid>
            </Grid>


        </div>
    )
}

export default SignupMode;