import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';


//icon
import EmailIcon from '@material-ui/icons/Email';

import VpnKeyIcon from '@material-ui/icons/VpnKey';

function LoginMode(){
  
    return (
        <div className="signup-mode login-mode">    
            <Grid style={{ width: '100%', marginBottom: '30px' }} container spacing={1} alignItems="flex-end">
                <Grid item>
                    <EmailIcon style={{ color: 'green' }} />
                </Grid>
                <Grid style={{ width: 'calc(100% - 40px)' }} item>
                    <TextField style={{ width: '100%' }} id="input-with-icon-grid" label="Email..." />
                </Grid>
            </Grid>

        
            <Grid style={{ width: '100%', marginBottom: '30px'  }} container spacing={1} alignItems="flex-end">
                <Grid item>
                    <VpnKeyIcon style={{ color: '#F40083' }} />
                </Grid>
                <Grid style={{ width: 'calc(100% - 40px)' }} item>
                    <TextField style={{ width: '100%' }} id="input-with-icon-grid" label="Mật khẩu..." />
                </Grid>
            </Grid>
            <p>Nhân viên chú ý: Nếu không đăng xuất trước khi ra về thì người khác có thể dùng tài khoản của bạn nếu họ sử dụng máy tính này, hậu quả sẽ do chủ tài khoản phải chịu trách nhiệm.Vì vậy hãy đăng xuất trước khi tan làm để bảo vệ dữ liệu công ty cũng như quyển lợi của mình</p>

            


        </div>
    )
}

export default LoginMode;