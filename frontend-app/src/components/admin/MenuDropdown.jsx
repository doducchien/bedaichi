import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';


const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',

    },
})((props) => (
    <Menu

        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({

    root: {
        // '&:focus': {
        //     backgroundColor: theme.palette.primary.main,
        //     '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        //         color: theme.palette.common.white,
        //     },
        // },
        // '& span': {
        //     width: '150px'
        // }
    },

}))(MenuItem);

export default function MenuDropdown() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [feature, setFeature] = React.useState('Tất cả')

    const handleClick = (event) => {
        
        console.log(event.currentTarget)
        setAnchorEl(event.currentTarget);

    };
    const onFeature = (event) => {
        console.log(event.target.textContent)
        setFeature(event.target.textContent)
    }

    const handleClose = () => {
        
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                variant="contained"
                color="primary"
                onClick={handleClick}
                style={{ width: '200px', height: '40px' }}
            >
                {feature}
            </Button>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <StyledMenuItem onClick={onFeature}>                 
                    <ListItemText style={{width: '100%'}}  primary="all" />
                </StyledMenuItem>
                <StyledMenuItem onClick={onFeature} >
                   
                    <ListItemText style={{width: '100%'}}   primary="admin" />
                </StyledMenuItem>
                <StyledMenuItem onClick={onFeature} >
                    <ListItemText style={{width: '100%'}}   primary="staff" />
                </StyledMenuItem>

                <StyledMenuItem onClick={onFeature}>
                    <ListItemText style={{width: '100%'}}   primary="regime" />
                </StyledMenuItem>

                <StyledMenuItem onClick={onFeature}>
                    <ListItemText style={{width: '100%'}}   primary="salary" />
                </StyledMenuItem>

                <StyledMenuItem onClick={onFeature}>
                    <ListItemText style={{width: '100%'}}   primary="product" />
                </StyledMenuItem>

                
            </StyledMenu>
        </div>
    );
}