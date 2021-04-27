
import { useState, useEffect } from 'react'


//button material ui
import Button from '@material-ui/core/Button';

//axios
import axios from 'axios'

//constraints
import * as constraints from '../../constraints'

//textfeild
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';


//icon
import BusinessIcon from '@material-ui/icons/Business';
import HomeIcon from '@material-ui/icons/Home';
import HeightIcon from '@material-ui/icons/Height';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

function AddDepartment(props) {
    const { user_role, reload } = props
    const [dataForm, setDataForm] = useState({
        name: '',
        numberHome: '',
        height: '',
        width: '',
        maxSlot: ''
    })

    const onChangeInput = (event) => {
        const { name, value } = event.target
        setDataForm({
            ...dataForm,
            [name]: value
        })
    }

    const onCreate = async () => {
        const route = constraints.server + '/staff/createDepartment'

        await axios.post(route, { ...dataForm, id: constraints.randomID() }, {
            headers: {
                'user_role': user_role
            }
        })
            .then(res => {
                const data = res.data
                if (data.status) {
                    alert('Tạo phòng ban thành công')
                }
                else alert('Tạo phòng ban thất bại. Vui lòng thử lại')
            })
            .catch(err => {
                alert('Tạo phòng ban thất bại. Vui lòng thử lại')
            })
        reload()
    }

    return (
        <div className="add-department">
            <h2>Tạo mới phòng ban</h2>
            <form>
            <TextField
                    type='text'
                    name='name'
                    onChange={onChangeInput}
                    fullWidth
                    value={dataForm.name || ''}
                    label="Tên phòng"
                    InputProps={{
                       
                        startAdornment: (
                            <InputAdornment position="start">
                                <BusinessIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    type='number'
                    name='numberHome'
                    onChange={onChangeInput}
                    fullWidth
                    value={dataForm.numberHome || ''}
                    label="Số phòng"
                    InputProps={{
                       
                        startAdornment: (
                            <InputAdornment position="start">
                                <HomeIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    type='number'
                    name='height'
                    onChange={onChangeInput}
                    fullWidth
                    value={dataForm.height || ''}
                    label="Chiều dài(m)"
                    InputProps={{
                     
                        startAdornment: (
                            <InputAdornment position="start">
                                <HeightIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    type='number'
                    name='width'
                    onChange={onChangeInput}
                    fullWidth
                    value={dataForm.width || ''}
                    label="Chiều rộng(m)"
                    InputProps={{
                        
                        startAdornment: (
                            <InputAdornment position="start">
                                <DragHandleIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    type='number'
                    fullWidth
                    value={dataForm.height * dataForm.width || ''}
                    label="Diện tích(m^2)"
                    InputProps={{
                       
                        startAdornment: (
                            <InputAdornment position="start">
                                <DonutLargeIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    type='number'
                    name='maxSlot'
                    onChange={onChangeInput}
                    fullWidth
                    value={dataForm.maxSlot}
                    label="Số lượng nhân viên tối đa(người)"
                    InputProps={{
                        
                        startAdornment: (
                            <InputAdornment position="start">
                                <PeopleAltIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                {/* <input onChange={onChangeInput} defaultValue={dataForm.name} name='name' placeholder='Tên phòng...' type="text" />
                <input onChange={onChangeInput} defaultValue={dataForm.numberHome} name='numberHome' placeholder='Số phòng...' type="text" />
                <input onChange={onChangeInput} defaultValue={dataForm.height} name='height' placeholder='Chiều dài...' type="text" />
                <input onChange={onChangeInput} defaultValue={dataForm.width} name='width' placeholder='Chiều rộng...' type="text" />
                <input onChange={onChangeInput} defaultValue={dataForm.maxSlot} name='maxSlot' placeholder='Số thành viên tối đa...' type="text" /> */}
                <Button onClick={onCreate} style={{ margin: 'auto', marginTop: '10px', display: 'block' }} variant="contained" color="secondary">Tạo</Button>
            </form>

        </div>
    )
}

export default AddDepartment