
import { useState, useEffect, useRef } from 'react'

//btn
import Button from '@material-ui/core/Button';

//axios
import axios from 'axios'

//constraints
import * as constraints from '../../constraints'


function DetailDepartment(props) {
    const { infoDepartment, user_role, deleteInfoDepartment } = props;
    const [updateMode, setUpdateMode] = useState(false)
    const inforUpdate = useRef({ ...infoDepartment })
    const [info, setInfo] = useState({
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

    const onChangeUpdate = (event) => {
        const { name, value } = event.target
        inforUpdate.current = { ...inforUpdate.current, [name]: value.trim() }
    }

    const onUpdate = async () => {
      
        const route = constraints.server + '/staff/updateDepartment';
        await axios.put(route, inforUpdate.current,
            {
                headers: {
                    'user_role': user_role
                }
            }
        )
            .then(res => {
                const result = res.data;
                if(result.status){
                    alert('Cập nhật thông tin phòng ban thành công')
                }
                else alert("Cập nhật thất bại. Vui lòng thử lại")
            })
            .catch(err=>{
                alert("Cập nhật thất bại. Vui lòng thử lại")
            })
      
            deleteInfoDepartment()
    }

    return (
        <div className="detail-department">
            <b>{infoDepartment.name}</b>
            <p>Mã code: {infoDepartment.id}</p>
            <p>Số phòng: {info.numberHome || ''}</p>
            <p>Chiều dài: {info.height || ''}m</p>
            <p>Chiều rộng: {info.width || ''}m</p>
            <p>Diện tích: {info.height * info.width || ''}m^2</p>
            <p>Số lượng nhân viên tối đa: {info.maxSlot} người</p>

            <Button onClick={toggleUpdateMode} style={{ display: 'block', margin: 'auto', marginTop: '10px' }} variant="contained" color={!updateMode?"secondary": 'default'}>{!updateMode? "Chỉnh sửa": 'Đóng'}</Button>

            <div style={updateMode ? { display: 'block' } : { display: 'none' }} className="form-update">
                <form>
                    <div><input defaultValue={info.name} onChange={onChangeUpdate} name='name' type="text" placeholder='Tên phòng...' />-Tên phòng</div>
                    <div><input defaultValue={info.numberHome} type='number' onChange={onChangeUpdate} name='numberHome' type="text" placeholder='Số phòng...' />-Số phòng</div>
                    <div><input defaultValue={info.height} type='number' onChange={onChangeUpdate} name='height' type="text" placeholder='Chiều dài...' />-Chiều dài</div>
                    <div><input defaultValue={info.width} type='number' onChange={onChangeUpdate} name='width' type="text" placeholder='Chiều rộng...' />-Chiều rộng</div>
                    <div><input defaultValue={info.maxSlot} type='number' onChange={onChangeUpdate} name='maxSlot' type="text" placeholder='Số lượng nhân viên tối đa...' />-Số lượng nhân viên tối đa</div>

                    <Button onClick={onUpdate} style={{ display: 'block', margin: 'auto', marginTop: '10px' }} variant="contained" color="primary">Xác nhận</Button>

                </form>
            </div>
        </div>
    )
}


export default DetailDepartment