import { useState } from 'react'

import { Button } from '@material-ui/core';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';


//component
import SignupMode from './SignupMode'
import LoginMode from './LoginMode'

function LoginSignup() {
    const [mode, setMode] = useState(1);
    const changeMode = (mode) => {
        setMode(mode)
    }

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
                {mode === 0 ? <LoginMode /> : <SignupMode />}

            </div>
            <div className="_btn">
                <Button variant="contained" color={mode === 0? "Primary":"secondary"}>{mode === 0? "Đăng nhập":"Đăng ký"}</Button>
            </div>
        </div>
    )
}

export default LoginSignup;