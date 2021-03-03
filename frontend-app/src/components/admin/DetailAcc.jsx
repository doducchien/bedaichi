import React from 'react';

//popup
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';


//icon
import AccountCircle from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import DateRangeIcon from '@material-ui/icons/DateRange';
import WcIcon from '@material-ui/icons/Wc';
import SortIcon from '@material-ui/icons/Sort';


//constraint
import * as constraints from '../../constraints'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function DetailAcc(props) {
  const { open, info } = props


  const handleClose = () => {
    props.close()
  };

  return (
    <div>

      <Dialog style={{ width: '600px', margin: 'auto' }} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" >
          Thông tin tài khoản
        </DialogTitle>
        <DialogContent style={{ width: '400px' }} dividers>
          <div className='line_'><EmailIcon style={{ color: 'green', fontSize: '30px' }} /> <span>{info.email}</span></div>
          <div className='line_'><AccountCircle style={{ color: 'red' , fontSize: '30px'}} /><span>{info.fullName}</span></div>
          <div className='line_'><PhoneInTalkIcon style={{ color: 'blue' , fontSize: '30px'}} /><span>{info.phoneNumber}</span></div>
          <div className='line_'><DateRangeIcon style={{ color: '#128C7E' , fontSize: '30px'}} /><span>{constraints.changeIntToTime(info.birthday)}</span></div>
          <div className='line_'><WcIcon style={{ color: 'purple', fontSize: '30px' }} /><span>{info.sex === 0? 'Nam': (info.sex === 1? 'Nữ': 'Khác')}</span></div>
          <div className='line_'><SortIcon style={{ color: 'purple', fontSize: '30px' }} /><span>{info.type}</span></div>

        </DialogContent>
        <DialogActions style={{ width: '400px' }}>
          <Button autoFocus onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}