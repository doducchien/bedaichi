import {useState} from 'react';

//Popup
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';

//axios
import axios from 'axios'

function PopupAddRegime(props) {
    const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addRegime = ()=>{

    }


    return (
        <div>
            <Button onClick={handleClickOpen} variant="outlined" color="secondary">Thêm chế độ</Button>

            <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle style={{textAlign: 'center'}} id="form-dialog-title">Thêm chế độ đãi ngộ</DialogTitle>
                <DialogContent>
                
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nhập tên chế độ đãi ngộ mới......."
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Hủy</Button>
                    <Button onClick={addRegime} color="primary">Thêm</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default PopupAddRegime