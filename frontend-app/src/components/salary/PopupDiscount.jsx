import {useState} from 'react'

//popup
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';


function PopupDiscount(props) {
    const {openPopupDiscount, setOpenPopupDiscount} = props
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
    const close = ()=>{
        setOpenPopupDiscount(false)
    }
   
  
  

    return (
        <Dialog
            fullScreen={fullScreen}
            open={openPopupDiscount}
            onClose={close}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">Lựa chọn các đơn hàng để chiết khấu</DialogTitle>
            <DialogContent>
                <DialogContentText>{}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={close} color="primary" autoFocus>OK</Button>
            </DialogActions>
        </Dialog>
    )
}

export default PopupDiscount