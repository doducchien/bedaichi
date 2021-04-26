import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

//icon
import SortIcon from '@material-ui/icons/Sort';


export default function SimpleMenu(props) {
  const {email} = props
  const [anchorEl, setAnchorEl] = React.useState(null);


  const changeRole = (event)=>{
    const role = event.target.textContent 
    const value = {
      role: role,
      email: email
    }
    props.changeRole(value)

  }

  const handleClick = (event) => {
    
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <span onClick={handleClick} className='icon_'><SortIcon /></span>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={changeRole}>none</MenuItem>
        <MenuItem onClick={changeRole}>admin</MenuItem>
        <MenuItem onClick={changeRole}>staff</MenuItem>
        <MenuItem onClick={changeRole}>regime</MenuItem>
        <MenuItem onClick={changeRole}>salary</MenuItem>
        <MenuItem onClick={changeRole}>product</MenuItem>
      </Menu>
    </div>
  );
}