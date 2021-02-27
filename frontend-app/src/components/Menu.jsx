
import {useDispatch} from 'react-redux'
import * as actions from '../redux/actions/actions'


function Menu(props) {
    const {position} = props
    const dispatch = useDispatch();
    const logout = ()=>{
        dispatch(actions.removeToken())
    }
    return (
        <div className='menu'>
            <div className="infomation">
                <img src="https://lh3.googleusercontent.com/proxy/dsSxOSCgmyxQNvwggd-ZkehFFkF4qC1lvQia7iP-Hv4Qp2wUxh0mS35nrX8ZF7fmlh5bHK1zHaCRiwhUqEy5uhdai3wEJZ8BwW3FkMuDC2SkW_B3jtiDooHhEy5l8YDU9IpCsriKMVD6gmmGrS2SNM-LJ2FdNbg7s1Dld0PTgyzFK-FLscxPEzSGDY1Pqg" />
                <p>Đỗ Đức Chiến</p>
                <u>Quản trị viên</u>
            </div>

            <ul className="list">
                <li style={position === 'admin'? {backgroundColor: 'darkblue'}: {}}><span class="material-icons icon_">manage_accounts</span><span className='title_'>Chức năng Admin</span></li>
                <li style={position === 'staff'? {backgroundColor: 'darkblue'}: {}}><span class="material-icons icon_">groups</span><span className='title_'>Quản lý nhân sự</span></li>
                <li style={position === 'regime'? {backgroundColor: 'darkblue'}: {}}><span class="material-icons icon_">window</span><span className='title_'>Quản lý chế độ</span></li>
                <li style={position === 'salary'? {backgroundColor: 'darkblue'}: {}}><span class="material-icons icon_">attach_money</span><span className='title_'>Quản lý tiền lương</span></li>
                <li style={position === 'product'? {backgroundColor: 'darkblue'}: {}}><span class="material-icons icon_">production_quantity_limits</span><span className='title_'>Quản lý sản phẩm</span></li>
            </ul>

            <div className="footer">
                <span class="material-icons">account_circle</span>
                <span onClick={logout} class="material-icons">logout</span>
            </div>


        </div>
    )
}

export default Menu;


