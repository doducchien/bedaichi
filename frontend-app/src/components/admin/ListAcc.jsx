
import { useState, useEffect } from 'react'

//icon
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

//axios
import axios from 'axios'

//server
import * as constraints from '../../constraints'

//component
import DetailAcc from './DetailAcc'
import Popup from './Popup'
import SelectRole from './SelectRole'

function ListAcc(props) {
    const { data, user_role, reload } = props
    const list = []
    const [info, setInfo] = useState({})
    const [resultDelete, setResultDelete] = useState({
        open: false,
        title: 'Thông báo xóa tài khoản',
        content: ''

    })
    const [open, setOpen] = useState(false)

    const closePopup = () => {
        let resultDelete_ = { ...resultDelete, open: false }
        setResultDelete(resultDelete_)
    }

    const handleClose = () => {
        setOpen(false)
    }
    const getAccDetail = (email) => {
        const route = constraints.server + '/onlyAdmin/getAccDetail/' + email;
        axios.get(route,
            {
                headers: {
                    'user_role': user_role
                }
            }
        )
            .then(async res => {
                setInfo(res.data)
                setOpen(true)
            })
    }

    const deleteAcc = (email) => {
        const route = constraints.server + '/onlyAdmin/deleteAcc/' + email;
        axios.delete(route,
            {
                headers: {
                    'user_role': user_role
                }
            }
        )
            .then(async res => {
                const result = await res.data
                let resultDelete_ = { ...resultDelete, open: true }
                if (result.status) {
                    resultDelete_.content = `Tài khoản ${email}  đã được xóa thành công`
                }
                else resultDelete_.content = 'Đã có lỗi xảy ra. Vui lòng thử lại sau'

                setResultDelete(resultDelete_)
            })
    }
    useEffect(() => {
        reload()
    }, [resultDelete])

    const changeRole = (value)=>{
        props.changeRole(value)
    }

    if (data.length > 0) {
        var i = 0
        data.forEach(item => {
            let li =
                <li key={i}>
                    <span className='full-name'>{item.fullName}</span>
                    <span className='email'>{item.email}</span>
                    <span className='role'>{item.type}</span>
                    <span className='icon-action'>
                        <span onClick={() => getAccDetail(item.email)} className='icon_'><ArrowRightAltIcon /></span>
                        {/* <span className='icon_'><SortIcon /></span> */}
                        <SelectRole email={item.email} changeRole={changeRole} />
                        <span onClick={() => deleteAcc(item.email)} className='icon_'><DeleteForeverIcon /></span>
                    </span>
                </li>
            list.push(li)
            i++
        })
    }

    

    return (
        <>
            <ul className="list_">
                {list}
            </ul>
            <DetailAcc info={info} open={open} close={handleClose} />
            <Popup result={resultDelete} closePopup={closePopup} />
        </>

    )
}
export default ListAcc