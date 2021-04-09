import { useState, useEffect } from 'react'

//popup
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

//constraints
import * as constraints from '../../constraints'


//axios
import axios from 'axios'

function PopupDiscount(props) {
    const {infoChecked, setInfoChecked, openPopupDiscount, setOpenPopupDiscount, emailDetail, user_role } = props
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [listDiscount, setListDiscount] = useState([])
    const [listProduct, setListProduct] = useState([])

   
    const close = () => {
        setOpenPopupDiscount(false)
    }

    const submit = ()=>{
        setOpenPopupDiscount(false)
    }

    const changeMoney = (event) => {
        let { checked, value } = event.target

        const { id, discountMoney } = JSON.parse(value)
     
        let infoChecked_ = JSON.parse(JSON.stringify(infoChecked))

        if (checked) {
            infoChecked_.id.push(id)
            infoChecked_.totalMoney += discountMoney
        }
        else{
            infoChecked_.id.pop(id)
            infoChecked_.totalMoney -= discountMoney
        }

        setInfoChecked(infoChecked_)

    }
    useEffect(() => {
        if (emailDetail !== '') {
            const route = constraints.server + '/salary/getDiscount/' + emailDetail + '/0'
            axios.get(route, {
                headers: {
                    'user_role': user_role
                }
            })
                .then(res => {
                    const data = res.data
                    console.log(data);
                    if (data.status) {
                        setListDiscount(data.result)
                    }
                })
        }

    }, [emailDetail])

    useEffect(() => {
        const route = constraints.server + '/salary/getAllProduct'
        axios.get(route, {
            headers: { 'user_role': user_role }
        })
            .then(res => {
                const data = res.data
                if (data.status) {
                    setListProduct(data.result)
                }
            })
    }, [])



    return (
        <Dialog
            fullScreen={fullScreen}
            open={openPopupDiscount}
            onClose={close}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">Lựa chọn các đơn hàng để chiết khấu</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {listDiscount.map(item => {
                        let discountMoney = 0
                        let value = 0
                        let checked = false

                        for (let i = 0; i < listProduct.length; i++) {
                            if (listProduct[i].id == item.id) {
                                value = listProduct[i].value
                                discountMoney = value * item.discount / 100
                                break
                            }
                        }

                        if(infoChecked.id.indexOf(item.id) !== -1) checked = true
                        let infoCheck = {
                            discountMoney: discountMoney,
                            id: item.id
                        }
                        return (
                            <div key={item.id} style={{ width: '100%', height: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label style={{ flex: '1', display: 'flex', justifyContent: 'space-between' }}><span>{item.id}</span><span>{value} * {item.discount}% = {discountMoney}</span></label>
                                <input style={{ height: '20px', width: '20px', marginLeft: '10px' }} defaultChecked={checked} type="checkbox" name={item.id} onChange={changeMoney} value={JSON.stringify(infoCheck)} />

                            </div>
                        )
                    })}
                </DialogContentText>
                <div>Tổng = {infoChecked.totalMoney} VND</div>
            </DialogContent>
            <DialogActions>
                <Button onClick={submit} color="primary" autoFocus>OK</Button>
            </DialogActions>
        </Dialog>
    )
}

export default PopupDiscount