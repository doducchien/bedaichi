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


function Popup(props) {
    const {result, closeResult} = props
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
   
  
  

    return (
        <Dialog
            fullScreen={fullScreen}
            open={result.open}
            onClose={closeResult}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">{result.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{result.content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeResult} color="primary" autoFocus>OK</Button>
            </DialogActions>
        </Dialog>
    )
}

export default Popup