import { useState, useEffect } from 'react'

//constraints
import * as constraints from '../../constraints'

//axios
import axios from 'axios'

//textFeild
import TextField from '@material-ui/core/TextField';
import { TextareaAutosize } from '@material-ui/core';


function DetailRegime(props) {
    const { idRegime, user_role } = props
    const [detailTypeRegime, setDetailTypeRegime] = useState({
        name: '',
        note: ''
    })

    useEffect(() => {
        const route = constraints.server + '/regime/getDetailTypeRegime/' + idRegime
        axios.get(route, {
            headers: {
                'user_role': user_role
            }
        })
            .then(res => {
                const {status, result} = res.data
                if(status && result){
                    setDetailTypeRegime(result)
                }

            })
    }, [idRegime])

    return (
        <div className="detail-regime">
            <div className="type-regime">
                <TextField
                    fullWidth
                    label="Tên chế độ"
                    value={detailTypeRegime.name}
                    InputProps={{
                        readOnly: true,
                    }}
                />

                <TextareaAutosize
               
                    readOnly
                    style={{
                        width: '100%',
                        height: '200px',
                        resize: 'none',
                        marginTop: '10px'
                    }}
                    label="Ghi chú"
                    value={detailTypeRegime.note}
                  
                />
            </div>
            <div className="list-staff-regime"></div>
        </div>
    )
}

export default DetailRegime