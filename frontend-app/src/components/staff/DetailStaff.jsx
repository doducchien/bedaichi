import {useEffect, useState} from 'react'

//constraints
import * as constraints from '../../constraints'

//axios

function DetailStaff(props){
    const {user_role, email} = props
    
    const [infomationStaff, setInfomationStaff] = useState({
        email: '',
        fullName: '',
        phoneNumber: '',
        birthday: '',
        sex: '',
        image: '',
        department: '',
        joinDay: '',
        leftDay: '',
        status: '',
        note: ''
    })

    useEffect(()=>{
        
    })


    return(
        <div className="detail-staff">
            <div className="left">
                <p>email:{}</p>
            </div>
            <div className="right">

            </div>
        </div>
    )
}

export default DetailStaff