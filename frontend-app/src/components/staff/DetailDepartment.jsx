
import { useState, useEffect, useRef } from 'react'

//btn
import Button from '@material-ui/core/Button';

//axios
import axios from 'axios'

//constraints
import * as constraints from '../../constraints'

//textfeild
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';


function DetailDepartment(props) {
    const { infoDepartment, user_role, deleteInfoDepartment } = props;
    const [updateMode, setUpdateMode] = useState(false)
    const inforUpdate = useRef({ ...infoDepartment })
    const [info, setInfo] = useState({
        ...infoDepartment,
        numberHome: null,
        height: null,
        width: null,
        maxSlot: null

    })


    useEffect(() => {
        const route = constraints.server + `/staff/getDepartment/${infoDepartment.id}`;
        axios.get(route, {
            headers: {
                'user_role': user_role
            }
        })
            .then(res => {
                const data = res.data.data
                setInfo({
                    ...info,
                    name: data.name,
                    numberHome: data.numberHome,
                    height: data.height,
                    width: data.width,
                    maxSlot: data.maxSlot

                })
            })

    }, [infoDepartment])




    const toggleUpdateMode = () => {
        setUpdateMode(!updateMode)
    }

    // const onChangeUpdate = (event) => {
    //     const { name, value } = event.target
    //     inforUpdate.current = { ...inforUpdate.current, [name]: value.trim() }
    // }

    const onChangeUpdate = (event) => {
        const { name, value } = event.target
        setInfo({
            ...info,
            [name]: value.trim()
        })
    }

    const onUpdate = async () => {

        const route = constraints.server + '/staff/updateDepartment';
        console.log(info)
        await axios.put(route, info,
            {
                headers: {
                    'user_role': user_role
                }
            }
        )
            .then(res => {
                const result = res.data;
                if (result.status) {
                    alert('Cập nhật thông tin phòng ban thành công')
                }
                else alert("Cập nhật thất bại. Vui lòng thử lại")
            })
            .catch(err => {
                alert("Cập nhật thất bại. Vui lòng thử lại")
            })

        deleteInfoDepartment()
    }

    return (
        <div className="detail-department">
            <b>{infoDepartment.name}</b>
            <TextField
                name='name'
                fullWidth
                value={infoDepartment.id}
                label="Mã code"
                InputProps={{
                    readOnly: true,
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                type='number'
                name='numberHome'
                onChange={onChangeUpdate}
                fullWidth
                value={info.numberHome || ''}
                label="Số phòng"
                InputProps={{
                    readOnly: !updateMode,
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                type='number'
                name='height'
                onChange={onChangeUpdate}
                fullWidth
                value={info.height || ''}
                label="Chiều dài(m)"
                InputProps={{
                    readOnly: !updateMode,
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                type='number'
                name='width'
                onChange={onChangeUpdate}
                fullWidth
                value={info.width || ''}
                label="Chiều rộng(m)"
                InputProps={{
                    readOnly: !updateMode,
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                type='number'
                fullWidth
                value={info.height * info.width || ''}
                label="Diện tích(m^2)"
                InputProps={{
                    readOnly: true,
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    ),
                }}
            />

            <TextField
                type='number'
                name='maxSlot'
                onChange={onChangeUpdate}
                fullWidth
                value={info.maxSlot}
                label="Số lượng nhân viên tối đa(người)"
                InputProps={{
                    readOnly: !updateMode,
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    ),
                }}
            />

            <Button onClick={toggleUpdateMode} style={{ display: 'block', margin: 'auto', marginTop: '10px' }} variant="contained" color={!updateMode ? "secondary" : 'default'}>{!updateMode ? "Chỉnh sửa" : 'Đóng'}</Button>

            <div style={updateMode ? { display: 'block' } : { display: 'none' }} className="form-update">
                    <Button onClick={onUpdate} style={{ display: 'block', margin: 'auto', marginTop: '10px' }} variant="contained" color="primary">Xác nhận</Button>
            </div>
        </div>
    )
}


export default DetailDepartment