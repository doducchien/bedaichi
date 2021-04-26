import React, { useState, useEffect } from 'react';



//textfeild
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';



import Button from '@material-ui/core/Button';



//icon

import EmailIcon from '@material-ui/icons/Email';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import BusinessIcon from '@material-ui/icons/Business';

//constraints
import * as constraints from '../../constraints'

//axios
import axios from 'axios';

//component
import Popup from './Popup'

function AddCustomer(props) {
    const { user_role } = props
    const [formInput, setFormInput] = useState({
        email: '',
        fullName: '',
        companyName: '',
    })

    const [result, setResult] = useState({
        open: false,
        title: '',
        content: ''
    })

    const closeResult = () => {
        setResult({
            ...result,
            open: false,
            title: '',
            content: ''
        })
    }

    useEffect(() => {
        if (result.open === false) {
            setFormInput({
                ...formInput,
                email: '',
                fullName: '',
                companyName: '',
            })
        }

    }, [result])






    const handleChange = event => {
        let { name, value } = event.target
        setFormInput({
            ...formInput,
            [name]: value.trim()
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const route = constraints.server + '/product/createCustomer'




        const body = {
            ...formInput,
        }
        axios.post(route, body, {
            headers: {
                'user_role': user_role
            }
        })
            .then(res => {
                const data = res.data
                if (data.status) {
                    setResult({
                        ...result,
                        open: true,
                        title: 'Thông báo thêm khách hàng',
                        content: 'Thêm khách hàng thành công !'
                    })
                }
                else {
                    setResult({
                        ...result,
                        open: true,
                        title: 'Thông báo thêm khách hàng',
                        content: 'Thêm khách hàng thất bại ! Vui lòng thử lại sau'
                    })
                }
            })
    }
    return (
        <div className="add-customner">
            <form onSubmit={onSubmit}>

                <FormControl style={{ display: 'block', marginBottom: '10px' }}>
                    <InputLabel>Email khách hàng</InputLabel>
                    <Input
                        required
                        fullWidth
                        autoComplete='off'
                        name="email"
                        type="email"
                        onChange={handleChange}
                        defaultValue=''
                        startAdornment={
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <FormControl style={{ display: 'block', marginBottom: '10px' }}>
                    <InputLabel>Họ tên khách hàng</InputLabel>
                    <Input
                        required
                        autoComplete='off'
                        fullWidth
                        name="fullName"
                        type="text"
                        onChange={handleChange}
                        defaultValue=''

                        startAdornment={
                            <InputAdornment position="start">
                                <AccountBoxIcon />
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <FormControl style={{ display: 'block', marginBottom: '10px' }}>
                    <InputLabel>Tên công ty</InputLabel>
                    <Input
                        required
                        autoComplete='off'
                        fullWidth
                        name="companyName"
                        type="text"
                        onChange={handleChange}
                        defaultValue=''

                        startAdornment={
                            <InputAdornment position="start">
                                <BusinessIcon />
                            </InputAdornment>
                        }
                    />
                </FormControl>



                <Button type='submit' style={{ display: 'block', margin: 'auto', width: '100px' }} variant="outlined" color="secondary">Thêm</Button>


            </form>
            <Popup result={result} closeResult={closeResult} />
        </div>
    )
}

export default AddCustomer