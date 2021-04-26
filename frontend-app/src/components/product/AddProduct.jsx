import React, {useState, useEffect} from 'react';



//textfeild
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import AccountCircle from '@material-ui/icons/AccountCircle';

//radio
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';



//icon
import BrandingWatermarkIcon from '@material-ui/icons/BrandingWatermark';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

//constraints
import * as constraints from '../../constraints'

//axios
import axios from 'axios';

//component
import Popup from './Popup'

function AddProduct(props) {
    const {user_role} = props
    const [formInput, setFormInput] = useState({
        name: '',
        value: '',
        time: '',
        isComplete: '0'
    })

    const [result, setResult] = useState({
        open: false,
        title: '',
        content: ''
    })

    const closeResult = ()=>{
        setResult({
            ... result,
            open: false,
            title: '',
            content: ''
        })
    }

    useEffect(() => {
        if(result.open === false){
            setFormInput({
                ...formInput,
                name: '',
                value: '',
                time: '',
                isComplete: '0'
            })
        }
        
    }, [result])




   

    const handleChange = event =>{
        let {name, value} = event.target
        setFormInput({
            ...formInput,
            [name]:value
        })
    }

    const onSubmit = (e)=>{
        e.preventDefault()
        const route = constraints.server + '/product/createProduct'

        let date = new Date(formInput.time)
        date.setHours(0, 0, 0 , 0)
      
       
        const body = {
            ...formInput,
            id: constraints.randomID(),
            time: date.getTime()
        }
        axios.post(route, body,{
            headers:{
                'user_role': user_role
            }
        })
        .then(res=>{
            const data = res.data
            if(data.status){
                setResult({
                    ...result,
                    open: true,
                    title: 'Thông báo thêm sản phẩm',
                    content: 'Thêm sản phẩm thành công !'
                })
            }
            else{
                setResult({
                    ...result,
                    open: true,
                    title: 'Thông báo thêm sản phẩm',
                    content: 'Thêm sản phẩm thất bại ! Vui lòng thử lại sau'
                })
            }
        })
    }

    return (
        <div className="add-product">
            <form onSubmit={onSubmit}>

                <FormControl style={{display: 'block', marginBottom: '10px'}}>
                    <InputLabel>Tên sản phẩm</InputLabel>
                    <Input
                        required
                        fullWidth
                        autoComplete='off'
                        name="name"
                        type="text"
                        onChange={handleChange}
                        defaultValue=''
                        startAdornment={
                            <InputAdornment position="start">
                                <BrandingWatermarkIcon />
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <FormControl style={{display: 'block', marginBottom: '10px'}}>
                    <InputLabel>Giá trị sản phẩm</InputLabel>
                    <Input
                        required
                        autoComplete='off'
                        fullWidth
                        name="value"
                        type="text"
                        onChange={handleChange}
                        defaultValue=''
                        
                        startAdornment={
                            <InputAdornment position="start">
                                <AttachMoneyIcon />
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <FormControl style={{display: 'block', marginBottom: '10px'}}>
                    <InputLabel>Thời gian</InputLabel>
                    <Input
                        required
                        fullWidth
                        autoComplete='off'
                        name="time"
                        type="date"
                        onChange={handleChange}
                        defaultValue=''
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <FormControl required fullWidth style={{display: 'block', marginBottom: '10px'}} component="fieldset">
                    <FormLabel component="legend">Trạng thái</FormLabel>
                    <RadioGroup aria-label="quiz" defaultValue={formInput.iscomplete} name="isComplete" onChange={handleChange}>
                        <FormControlLabel value="1" control={<Radio />} label="Đã hoàn thành" />
                        <FormControlLabel value="0" control={<Radio />} label="Chưa hoàn thành" />
                    </RadioGroup>
                    
                </FormControl>


                <Button type='submit' style={{display: 'block', margin: 'auto', width: '100px'}} variant="outlined" color="secondary">Thêm</Button>

                
            </form>
            <Popup result={result} closeResult={closeResult}/>
        </div>
    )
}

export default AddProduct