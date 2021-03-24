import React, {useState} from 'react';



//textfeild
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
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

function AddProduct() {

    const [formInput, setFormInput] = useState({
        name: '',
        value: '',
        time: '',
        iscomplete: ''
    })


   

    const handleChange = event =>{
        let {name, value} = event.target
        if(name === 'time') value = constraints.changeTimeToInt(value)
        setFormInput({
            ...formInput,
            [name]:value.trim()
        })
    }

    const onSubmit = ()=>{

    }

    return (
        <div className="add-product">
            <form onSubmit={onSubmit}>

                <FormControl style={{display: 'block', marginBottom: '10px'}}>
                    <InputLabel>Tên sản phẩm</InputLabel>
                    <Input
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
                        autoComplete='off'
                        fullWidth
                        name="value"
                        type="text"
                        onChange={handleChange}
                        value={formInput.value}
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
                        fullWidth
                        autoComplete='off'
                        name="time"
                        type="date"
                        onChange={handleChange}
                        defaultValue={new Date()}
                        value={formInput.time}
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <FormControl fullWidth style={{display: 'block', marginBottom: '10px'}} component="fieldset">
                    <FormLabel component="legend">Trạng thái</FormLabel>
                    <RadioGroup aria-label="quiz" defaultValue={formInput.iscomplete} name="isComplete" onChange={handleChange}>
                        <FormControlLabel value="1" control={<Radio />} label="Đã hoàn thành" />
                        <FormControlLabel value="0" control={<Radio />} label="Chưa hoàn thành" />
                    </RadioGroup>
                    
                </FormControl>

                
            </form>
        </div>
    )
}

export default AddProduct