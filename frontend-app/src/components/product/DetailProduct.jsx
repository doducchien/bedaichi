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
import Slide from '@material-ui/core/Slide';

//textfeild
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';


//radio
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

//alert
import Alert from '@material-ui/lab/Alert';

//datepicker
import 'date-fns';

import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';


//stepper
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';


//icon
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import BrandingWatermarkIcon from '@material-ui/icons/BrandingWatermark';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import MailOutlineIcon from '@material-ui/icons/MailOutline';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import SendIcon from '@material-ui/icons/Send';


//constraint
import * as constraints from '../../constraints'

//axios
import axios from 'axios'





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
    padding: '5px',
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


//stepper


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));


function getSteps() {
    return ['Khởi tạo sản phẩm', 'Đóng', 'Suôn', 'Keo gáy', 'Xén', 'Ép', 'Đóng thùng', 'Hoàn thành'];
}

function getStepContent(stepIndex) {
    switch (stepIndex) {
        case 0:
            return 'Sản phẩm đã được khởi tạo.';
        case 1:
            return 'Đóng sản phẩm?';
        case 2:
            return 'Suôn sản phẩm';
        case 3:
            return 'Keo gáy cho sản phẩm';
        case 4:
            return 'Xén sản phẩm';
        case 5:
            return 'Ép sản phẩm';
        case 6:
            return 'Đóng thùng sản phẩm';
        case 7:
            return 'Hoàn thành sản phẩm';
        default:
            return 'Unknown stepIndex';
    }
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




    //ordered
    const [formOrdered, setFormOrdered] = useState({
        emailOrdered: '',
        fullNameOrdered: '',
        companyNameOrdered: '',
        timeOrdered: null,
        price: '',
        paid: '',

    })

    const [readOnlyOrdered, setReadonlyOrdered] = useState(true)

    const [resultOrdered, setResultOrdered] = useState({
        open: false,
        status: false
    })

    const toggleReadOnlyOrdered = () => {
        setReadonlyOrdered(!readOnlyOrdered)
    }

    const onChangeOrdered = (event) => {
        const { name, value } = event.target

        setFormOrdered({
            ...formOrdered,
            [name]: value
        })
    }
    const onChangeTimeOrdered = (date) => {
        date.setHours(0, 0, 0, 0)

        setFormOrdered({
            ...formOrdered,
            timeOrdered: date
        })
    }

    const addOrdered = () => {
        const route = constraints.server + '/product/addOrdered'
        const body = {
            ...formOrdered,
            timeOrdered: formOrdered.timeOrdered.getTime(),
            id: openDetail.item.id
        }
        console.log(body);
        axios.post(route, body, {
            headers: {
                'user_role': user_role
            }
        })
            .then(res => {
                let timeout = setTimeout(() => {
                    setResultOrdered({
                        ...resultOrdered,
                        open: false,
                        status: false
                    })
                    toggleReadOnlyOrdered()
                    clearTimeout(timeout)
                }, 2000)
                const data = res.data
                if (data.status) {
                    setResultOrdered({
                        ...resultOrdered,
                        open: true,
                        status: true
                    })
                }
                else {
                    setResultOrdered({
                        ...resultOrdered,
                        open: false,
                        status: false
                    })
                }
            })
    }

    useEffect(() => {
        if (openDetail.item.id) {
            const route = constraints.server + '/product/getOrdered/' + openDetail.item.id
            axios.get(route, {
                headers: {
                    'user_role': user_role
                }
            })
                .then(res => {
                    const data = res.data
                    console.log(formOrdered);
                    if (data.status && data.result.length !== 0) {
                        console.log(data.result);

                        setFormOrdered({
                            ...formOrdered,
                            emailOrdered: data.result[0].email,
                            timeOrdered: new Date(parseInt(data.result[0].time)),
                            price: data.result[0].price,
                            paid: data.result[0].paid
                        })

                    }
                })
        }
    }, [openDetail])

    useEffect(() => {
        // if (!readOnlyOrdered) {
        if (formOrdered.emailOrdered.indexOf('@') !== -1) {
            const route = constraints.server + '/product/getCustomer/' + formOrdered.emailOrdered
            axios.get(route, {
                headers: {
                    'user_role': user_role
                }
            })
                .then(res => {
                    const data = res.data
                    if (data.status && data.result.length > 0) {
                        console.log(data.result[0]);
                        setFormOrdered({
                            ...formOrdered,

                            companyNameOrdered: data.result[0].company,
                            fullNameOrdered: data.result[0].fullName,
                            // timeOrdered: new Date(data.result[0].time)
                        })
                    }
                })
        }
        // }

    }, [formOrdered.emailOrdered])


    //stepper
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const [resultStep, setResultStep] = useState({
        open: false,
        status: false
    })

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const updateStep = () => {
        const route = constraints.server + '/product/updateStep'
        const body = {
            id: openDetail.item.id,
            steps: activeStep
        }
        axios.put(route, body,{
            headers:{
                'user_role': user_role
            }
        })
        .then(res=>{
            const data = res.data
            let timeout = setTimeout(()=>{
                setResultStep({
                    ...resultStep,
                    open: false,
                    status: false
                })
                clearTimeout(timeout)
            }, 2000)
            if(data.status){
                setResultStep({
                    ...resultStep,
                    open: true,
                    status: true
                })
            }
            else{
                setResultStep({
                    ...resultStep,
                    open: true,
                    status: false
                })
            }
        })
    }
    useEffect(()=>{
        if(openDetail.item.id){
            const route = constraints.server + '/product/getStep/' + openDetail.item.id
            axios.get(route, {
                headers:{
                    'user_role': user_role
                }
            })
            .then(res=>{
                const data = res.data
                if(data.status){
                    setActiveStep(data.result)
                }
            })
        }
        
    }, [openDetail])

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
                        <Alert style={resultOrdered.open ? {} : { display: 'none' }} severity={resultOrdered.status ? 'success' : 'error'}>{resultOrdered.status ? 'Cập nhật khách hàng thành công' : "Cập nhật khách hàng thất bại"}</Alert>
                        <Alert style={resultStep.open ? {} : { display: 'none' }} severity={resultStep.status ? 'success' : 'error'}>{resultStep.status ? 'Cập nhật trạng thái thành công' : "Cập nhật trạng thái thất bại"}</Alert>


                    </div>
                    <div style={rightStyle}>
                        <div style={{ width: '100%', height: '55%', display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ width: '50%', height: '100%', border: '1px solid gray', padding: '3px' }}>
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

                            <div style={{ padding: '3px', width: '50%', height: '100%', border: '1px solid gray', padding: '3px' }}>
                                <div style={{ width: '100%' }}>
                                    <FormControl style={{ width: '50%' }}>
                                        <InputLabel>Email khách hàng</InputLabel>
                                        <Input
                                            name='emailOrdered'
                                            onChange={onChangeOrdered}
                                            value={formOrdered.emailOrdered}
                                            id="input-with-icon-adornment"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <MailOutlineIcon />
                                                </InputAdornment>
                                            }
                                            readOnly={readOnlyOrdered}
                                        />
                                    </FormControl>
                                    <FormControl style={{ width: '50%' }}>
                                        <InputLabel>Họ tên khách hàng</InputLabel>
                                        <Input
                                            name='fullNameOrdered'
                                            onChange={onChangeOrdered}
                                            value={formOrdered.fullNameOrdered}
                                            id="input-with-icon-adornment"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <AccountBoxIcon />
                                                </InputAdornment>
                                            }
                                            readOnly={true}
                                        />
                                    </FormControl>
                                </div>

                                <FormControl fullWidth>
                                    <InputLabel>Tên công ty</InputLabel>
                                    <Input
                                        name='companyNameOrdered'
                                        onChange={onChangeOrdered}
                                        value={formOrdered.companyNameOrdered}
                                        fullWidth
                                        id="input-with-icon-adornment"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <LocationCityIcon />
                                            </InputAdornment>
                                        }
                                        readOnly={true}
                                    />
                                </FormControl>

                                <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                    <KeyboardDatePicker
                                        name='timeOrdered'
                                        fullWidth
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Hạn trả muộn nhất"
                                        value={formOrdered.timeOrdered}
                                        onChange={onChangeTimeOrdered}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        readOnly={readOnlyOrdered}
                                    />

                                </MuiPickersUtilsProvider>

                                <FormControl fullWidth>
                                    <InputLabel>Giá đã thương lượng</InputLabel>
                                    <Input
                                        name='price'
                                        onChange={onChangeOrdered}
                                        value={formOrdered.price}
                                        fullWidth
                                        id="input-with-icon-adornment"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <AttachMoneyIcon />
                                            </InputAdornment>
                                        }
                                        readOnly={readOnlyOrdered}
                                    />
                                </FormControl>

                                <FormControl fullWidth>
                                    <InputLabel>Số tiền đã trả</InputLabel>
                                    <Input
                                        name='paid'
                                        onChange={onChangeOrdered}
                                        value={formOrdered.paid}
                                        fullWidth
                                        id="input-with-icon-adornment"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <SendIcon />
                                            </InputAdornment>
                                        }
                                        readOnly={readOnlyOrdered}
                                    />
                                </FormControl>
                                <div style={{ width: '100%', marginTop: '15px', display: readOnlyOrdered ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center' }}>
                                    <Button onClick={toggleReadOnlyOrdered} variant="outlined" color="primary">Sửa thông tin</Button>
                                </div>

                                <div style={{ width: '100%', marginTop: '15px', display: readOnlyOrdered ? 'none' : 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                                    <Button onClick={toggleReadOnlyOrdered} variant="outlined" color="primary">Hủy</Button>
                                    <Button onClick={addOrdered} variant="outlined" color="secondary">Lưu</Button>
                                </div>

                            </div>
                        </div>

                        {/* quy trinh san xuat */}
                        <div style={{ width: '100%', height: '45%', border: '1px solid gray', padding: '3px' }}>
                            <Stepper activeStep={activeStep} alternativeLabel>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                            <div>
                                {activeStep === steps.length ? (
                                    <div style={{ textAlign: 'center' }}>
                                        <Typography className={classes.instructions}>Tất cả các bước đã hoàn thành</Typography>
                                        <Button color="secondary" onClick={handleReset}>Reset</Button>
                                    </div>
                                ) : (
                                    <div style={{ textAlign: 'center' }}>
                                        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                                        <div>
                                            <Button
                                                color="primary"
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                className={classes.backButton}
                                            >
                                                Trở lại
                                            </Button>
                                            <Button variant="outlined" color="secondary" onClick={handleNext}>
                                                {activeStep === steps.length - 1 ? 'Kết thúc' : 'Tiếp theo'}
                                            </Button>

                                        </div>

                                    </div>
                                )}
                                <div style={{ marginTop: '20px' }}>
                                    <Button style={{ width: '100%' }} variant="contained" color="secondary" onClick={updateStep}>Lưu</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Dialog>
        </div>
    );
}