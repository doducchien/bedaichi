
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';


//component
import AddProduct from './AddProduct'
import ListProduct from './ListProduct'



const AntTabs = withStyles({
    root: {
        borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
        backgroundColor: '#1890ff',
    },
})(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&$selected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#40a9ff',
        },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);





const useStyles = makeStyles((theme) => ({
    // root: {
    //     flexGrow: 1,
    // },
    // padding: {
    //     padding: theme.spacing(3),
    // },
    demo1: {
        backgroundColor: theme.palette.background.paper,
        color: 'black'
    },
    demo2: {
        backgroundColor: '#2e1534',
    },
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
       
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (<Box p={3}>{children}</Box>)}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    // children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
function ManagerProduct(props) {
    const {user_role} = props

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return (
        <div className="manager-product">

            <AppBar position="static" className={classes.demo1}>
                <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                    <AntTab label="Thêm sản phẩm" />
                    <AntTab label="Thông tin sản phẩm" />
                    <AntTab label="Thống kê" />
                </AntTabs>
                {/* <Typography className={classes.padding} /> */}
            </AppBar>
            <TabPanel value={value} index={0}><AddProduct user_role={user_role}/></TabPanel>
            <TabPanel value={value} index={1}><ListProduct  user_role={user_role}/></TabPanel>
            <TabPanel value={value} index={2}>Item Three</TabPanel>
            <TabPanel value={value} index={3}>Item Four</TabPanel>
            <TabPanel value={value} index={4}>Item Five</TabPanel>
            <TabPanel value={value} index={5}>Item Six</TabPanel>
            <TabPanel value={value} index={6}>Item Seven</TabPanel>
        </div>
    )
}

export default ManagerProduct