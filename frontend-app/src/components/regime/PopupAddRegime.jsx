import { useEffect, useState } from 'react';

//Popup
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';

//axios
import axios from 'axios'

//constraints
import * as constraints from '../../constraints'

//alert
import Alert from '@material-ui/lab/Alert';
import { TextareaAutosize } from '@material-ui/core';


function PopupAddRegime(props) {
    const { user_role, reload } = props
    const [open, setOpen] = useState(false);
    const [inputText, setInputText] = useState({
        regime: '',
        note: '',
        price: ''
    });
    const [resultAddRegime, setResultAddRegime] = useState(0)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addRegime = () => {
        if (inputText.regime !== '') {
            const route = constraints.server + '/regime/createTypeRegime'
            const body = {
                id: constraints.randomID(),
                name: inputText.regime.trim(),
                note: inputText.note.trim(),
                price: inputText.price.trim()
            }
            axios.post(route, body, {
                headers: {
                    'user_role': user_role
                }
            })
                .then(res => {
                    const data = res.data
                    if (data.status) {
                        setResultAddRegime(1)
                    }
                    else setResultAddRegime(2)
                })
                .catch(err => {
                    setResultAddRegime(2)
                })
        }

    }

    const handleChangeText = (event) => {
        const { name, value } = event.target
        setInputText({
            ...inputText,
            [name]: value
        })
    }

    useEffect(() => {
        if (!open) setResultAddRegime(0)
    }, [open])
    useEffect(() => {
        reload()
    }, [resultAddRegime])


    return (
        <div>
            <Button onClick={handleClickOpen} variant="outlined" color="secondary">Thêm chế độ</Button>

            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle style={{ textAlign: 'center' }} id="form-dialog-title">Thêm chế độ đãi ngộ</DialogTitle>
                <DialogContent>

                    {
                        resultAddRegime === 0 ?
                            <>
                                <TextField
                                    name='regime'
                                    onChange={handleChangeText}
                                    autoFocus
                                    margin="dense"
                                    label="Nhập tên chế độ đãi ngộ mới......."
                                    type="text"
                                    fullWidth
                                    autoComplete='off'
                                />

                                <TextField
                                    name='price'
                                    onChange={handleChangeText}
                                    autoFocus
                                    margin="dense"
                                    label="Giá trị đãi ngộ (VND/tháng)"
                                    type="text"
                                    fullWidth
                                    autoComplete='off'
                                />

                                <TextareaAutosize
                                    style={{ width: '100%', height: '150px', padding: '5px', resize: 'none' }}
                                    name='note'
                                    placeholder="Ghi chú..."
                                    onChange={handleChangeText}


                                />

                            </>

                            : ''
                    }

                    {
                        resultAddRegime === 1 ?
                            <Alert severity="success">Thêm chế độ thành công</Alert>
                            :
                            ''
                    }

                    {
                        resultAddRegime === 2 ?
                            <Alert severity="error">Thêm chế độ thất bại. Vui lòng thử lại</Alert>
                            :
                            ''
                    }


                </DialogContent>
                <DialogActions>
                    {
                        resultAddRegime === 0 ?
                            <>
                                <Button onClick={handleClose} color="primary">Hủy</Button>
                                <Button onClick={addRegime} color="primary">Thêm</Button>
                            </>
                            : <Button onClick={handleClose} color="primary">OK</Button>
                    }


                </DialogActions>
            </Dialog>
        </div>
    )
}

export default PopupAddRegime