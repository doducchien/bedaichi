
import {useState, useEffect} from 'react'


//button material ui
import Button from '@material-ui/core/Button';

//axios
import axios from 'axios'

//constraints
import * as constraints from '../../constraints'

function AddDepartment(props){
    const {user_role, reload} = props
    const [dataForm, setDataForm] = useState({
        name: '',
        numberHome: '',
        height: '',
        width: '',
        maxSlot: ''
    })

    const onChangeInput = (event)=>{
        const {name, value} = event.target
        setDataForm({
            ... dataForm,
            [name]: value
        })
    }

    const onCreate = async ()=>{
        const route = constraints.server + '/staff/createDepartment'
        
        await axios.post(route, {...dataForm, id: constraints.randomID()},{
            headers:{
                'user_role': user_role
            }
        })
        .then(res=>{
            const data = res.data
            if(data.status){
                alert('Tạo phòng ban thành công')
            }
            else alert('Tạo phòng ban thất bại. Vui lòng thử lại')
        })
        .catch(err=>{
            alert('Tạo phòng ban thất bại. Vui lòng thử lại')
        })
        reload()
    }

    return(
        <div className="add-department">
            <h2>Tạo mới phòng ban</h2>
            <form>
                <input onChange={onChangeInput} defaultValue={dataForm.name} name='name' placeholder='Tên phòng...' type="text"/>
                <input onChange={onChangeInput} defaultValue={dataForm.numberHome} name='numberHome' placeholder='Số phòng...' type="text"/>
                <input onChange={onChangeInput} defaultValue={dataForm.height} name='height' placeholder='Chiều dài...' type="text"/>
                <input onChange={onChangeInput} defaultValue={dataForm.width} name='width' placeholder='Chiều rộng...' type="text"/>
                <input onChange={onChangeInput} defaultValue={dataForm.maxSlot} name='maxSlot' placeholder='Số thành viên tối đa...' type="text"/>
                <Button onClick={onCreate} style={{margin: 'auto', display: 'block'}} variant="contained" color="secondary">Tạo</Button>
            </form>
            
        </div>
    )
}

export default AddDepartment