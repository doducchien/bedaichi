import React, { useState, useEffect } from 'react';

// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
// import CloseIcon from '@material-ui/icons/Close';
// import Slide from '@material-ui/core/Slide';

import Button from '@material-ui/core/Button';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

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

//alert
import Alert from '@material-ui/lab/Alert';


//icon
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import BrandingWatermarkIcon from '@material-ui/icons/BrandingWatermark';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';


//constraint
import * as constraints from '../../constraints'

//axios
import axios from 'axios'

//component
import Popup from './Popup'



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const contentStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px'

}

const leftStyle = {
    width: '20%',
    height: '100%'
}

const rightStyle = {
    width: '80%',
    height: '100%',
    padding: '5px'
}
const inputStyle = {
    marginBottom: '15px'
}

const styleli1 = {
    width: '100%',
    height: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#616161',
    color: "white",
    borderRadius: '20px',
    marginBottom: '10px',
    marginTop: '10px',
    paddingLeft: '10px',
    paddingRight: '10px'

}

export default function DetailProduct(props) {

    const { openDetail, setOpenDetail, user_role, load, setLoad } = props

    const [readOnly, setReadOnly] = useState(true)

    const [formInput, setFormInput] = useState({
        id: '',
        name: '',
        value: '',
        isComplete: ''
    })


    const [result, setResult] = useState({
        open: false,
        status: false

    })

    const [resultStaffProduct, setResultStaffProduct] = useState({
        open: false,
        status: false
    })

    const [resultDeleteStaffProduct, setResultDeleteStaffProduct] = useState({
        open: false,
        status: false
    })

    const [inputCreateProduct, setInputCreateProduct] = useState({
        emailStaff: '',
        discount: ''
    })

    const [listStaffProduct, setListStaffProduct] = useState([])

    const changeStaffProduct = (event) => {
        const { name, value } = event.target
        setInputCreateProduct({
            ...inputCreateProduct,
            [name]: value.trim()
        })
    }

    const handleClickOpen = () => {
        setOpenDetail(!openDetail)
    };

    const handleClose = () => {
        setOpenDetail({
            ...openDetail,
            open: !openDetail.open,
            item: {
                id: '',
                name: '',
                value: '',
                isComplete: ''
            }
        })
    };

    const toogleChangeInfomation = () => {
        setReadOnly(!readOnly)
    }

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        console.log(formInput);
        setFormInput({
            ...formInput,
            [name]: value
        })
    }

    const updateInfo = () => {
        const route = constraints.server + '/product/updateInfoProduct'
        axios.put(route, formInput, {
            headers: {
                'user_role': user_role
            }
        })
            .then(res => {
                const data = res.data
                let timeout = setTimeout(() => {
                    setResult({
                        ...result,
                        open: false
                    })
                    setReadOnly(true)
                    clearTimeout(timeout)
                }, 2000)
                if (data.status) {
                    setResult({
                        ...result,
                        open: true,
                        status: true

                    })
                }
                else {
                    setResult({
                        ...result,
                        open: true,
                        status: false
                    })
                }

            })
    }



    useEffect(() => {
        if (openDetail.item.id) {
            const route = constraints.server + '/product/getProduct/' + openDetail.item.id
            axios.get(route, {
                headers: {
                    'user_role': user_role
                }
            })
                .then(res => {
                    const data = res.data
                    if (data.status) {
                        setFormInput(data.result)
                    }
                })
        }

    }, [result, openDetail.item.id])


    const createOrUpdateStaffProduct = () => {
        const route = constraints.server + '/product/createStaffProduct'
        const body = {
            ...inputCreateProduct,
            id: openDetail.item.id
        }
        axios.post(route, body, {
            headers: {
                'user_role': user_role
            }
        })
            .then(res => {
                let timeout = setTimeout(() => {
                    setResultStaffProduct({
                        ...result,
                        open: false,
                        status: false
                    })

                    clearTimeout(timeout)
                }, 2000)
                const data = res.data

                if (data.status) {
                    setResultStaffProduct({
                        ...resultStaffProduct,
                        open: true,
                        status: true
                    })
                }
            })
    }

    const deleteStaffProduct = (email, id) => {
        console.log(id, email);
        const route = constraints.server + '/product/deleteStaffProduct/' + id + '/' + email
        axios.delete(route, {
            headers: {
                'user_role': user_role
            }
        })
            .then(res => {
                const data = res.data

                let timeout = setTimeout(() => {
                    setResultDeleteStaffProduct({
                        ...result,
                        open: false
                    })

                    clearTimeout(timeout)
                }, 2000)

                if (data.status) {
                    setResultDeleteStaffProduct({
                        ...resultDeleteStaffProduct,
                        open: true,
                        status: true
                    })

                }
            })
    }

    useEffect(() => {
        if (readOnly === true) setFormInput(JSON.parse(JSON.stringify(openDetail.item)))
    }, [readOnly])

    useEffect(() => {
        if (openDetail.item.id) {
            const route = constraints.server + '/product/getAllStaffProduct/' + openDetail.item.id
            axios.get(route, {
                headers: {
                    'user_role': user_role
                }
            })
                .then(res => {
                    const data = res.data
                    if (data.status) {
                        setListStaffProduct(data.result)
                    }

                })
        }

    }, [openDetail, resultStaffProduct, resultDeleteStaffProduct])



    return (
        <div>

            <Dialog fullScreen open={openDetail.open} onClose={handleClose} TransitionComponent={Transition}>

                <div style={contentStyle}>
                    <div style={leftStyle}>
                        <FormControl fullWidth style={inputStyle} >
                            <InputLabel>ID sản phẩm</InputLabel>
                            <Input
                                onChange={handleChangeInput}
                                name='id'
                                value={formInput.id}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <FingerprintIcon />
                                    </InputAdornment>
                                }
                                readOnly={true}
                            />
                        </FormControl>

                        <FormControl fullWidth style={inputStyle}>
                            <InputLabel htmlFor="input-with-icon-adornment">Tên sản phẩm</InputLabel>
                            <Input
                                onChange={handleChangeInput}
                                name='name'
                                value={formInput.name}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <BrandingWatermarkIcon />
                                    </InputAdornment>
                                }

                                readOnly={readOnly}
                            />
                        </FormControl>

                        <FormControl fullWidth style={inputStyle}>
                            <InputLabel htmlFor="input-with-icon-adornment">Giá trị sản phẩm</InputLabel>
                            <Input
                                onChange={handleChangeInput}
                                name='value'
                                value={formInput.value}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AttachMoneyIcon />
                                    </InputAdornment>
                                }
                                readOnly={readOnly}

                            />
                        </FormControl>

                        <FormControl fullWidth style={{ display: 'block', marginBottom: '10px' }} component="fieldset">
                            <FormLabel component="legend">Trạng thái</FormLabel>
                            <RadioGroup aria-label="quiz" value={`${formInput.isComplete}`} name="isComplete" onChange={handleChangeInput}>
                                <FormControlLabel disabled={readOnly} value="1" control={<Radio />} label="Đã hoàn thành" />
                                <FormControlLabel disabled={readOnly} value="0" control={<Radio />} label="Chưa hoàn thành" />
                            </RadioGroup>

                        </FormControl>


                        <div style={{ width: '100%', marginBottom: '20px', textAlign: 'center', display: readOnly ? 'flex' : 'none', justifyContent: 'space-around' }}>
                            <Button onClick={toogleChangeInfomation} variant="outlined" color="primary">Sửa thông tin</Button>
                            <Button onClick={handleClose} variant="outlined" color="secondary">Đóng</Button>
                        </div>

                        <div style={{ width: '100%', marginBottom: '20px', textAlign: 'center', display: readOnly ? 'none' : 'flex', justifyContent: 'space-between' }}>
                            <Button size='large' onClick={toogleChangeInfomation} variant="outlined" color="primary">Hủy</Button>
                            <Button size='large' onClick={updateInfo} variant="outlined" color="secondary">Lưu</Button>


                        </div>

                        <Alert style={result.open ? {} : { display: 'none' }} severity={result.status ? 'success' : 'error'}>{result.status ? 'Cập nhật thông tin thành công' : "Cập nhật thông tin thất bại"}</Alert>
                        <Alert style={resultStaffProduct.open ? {} : { display: 'none' }} severity={resultStaffProduct.status ? 'success' : 'error'}>{resultStaffProduct.status ? 'Thêm nhân viên thành công' : "Thêm nhân viên thất bại"}</Alert>
                        <Alert style={resultDeleteStaffProduct.open ? {} : { display: 'none' }} severity={resultDeleteStaffProduct.status ? 'success' : 'error'}>{resultDeleteStaffProduct.status ? 'Xóa nhân viên thành công' : "Xóa nhân viên thất bại"}</Alert>


                    </div>
                    <div style={rightStyle}>
                        <div style={{ width: '50%', height: '50%', border: '1px solid gray', padding: '3px' }}>
                            <div style={{ width: '100%', height: '40px', display: 'flex', justifyContent: 'space-between', borderBottom: '3px solid gray' }}>
                                <input onChange={changeStaffProduct} name='emailStaff' style={{ height: '30px', paddingLeft: '5px' }} type="text" placeholder='Email' />
                                <input onChange={changeStaffProduct} name='discount' style={{ height: '30px', paddingLeft: '5px' }} type="number" placeholder='Chiết khấu' />
                                <Button onClick={createOrUpdateStaffProduct} style={{ height: '30px' }} variant='contained' color="secondary">Cập nhật</Button>

                            </div>
                            <div style={{ listStyle: 'none' }}>
                                {listStaffProduct.map(item => {
                                    return <li key={item.email} style={styleli1}><span>{item.email}</span><span>{item.discount}%</span> <span onClick={() => deleteStaffProduct(item.email, item.id)} style={{ cursor: 'pointer' }}><DeleteOutlineIcon /></span> </li>
                                })}
                            </div>
                        </div>
                    </div>
                </div>

            </Dialog>
        </div>
    );
}