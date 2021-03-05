
import {useDispatch} from 'react-redux'
import * as actions from '../redux/actions/actions'


function Menu(props) {
    const {position, changePosition} = props
    const dispatch = useDispatch();
    const logout = ()=>{
        dispatch(actions.removeToken())
    }
    const onChangePosition = (pos)=>{
        changePosition(pos)
    }
    return (
        <div className='menu'>
            <div className="infomation">
                <img src="https://i.pinimg.com/736x/91/06/21/9106217e59456dbc2593f74737f119c6.jpg" />
                <p>Đỗ Đức Chiến</p>
                <u>Quản trị viên</u>
            </div>

            <ul className="list">
                <li onClick={()=>onChangePosition('admin')} style={position === 'admin'? {backgroundColor: 'darkblue'}: {}}><span class="material-icons icon_">manage_accounts</span><span className='title_'>Chức năng Admin</span></li>
                <li onClick={()=>onChangePosition('staff')} style={position === 'staff'? {backgroundColor: 'darkblue'}: {}}><span class="material-icons icon_">groups</span><span className='title_'>Quản lý nhân sự</span></li>
                <li onClick={()=>onChangePosition('regime')} style={position === 'regime'? {backgroundColor: 'darkblue'}: {}}><span class="material-icons icon_">window</span><span className='title_'>Quản lý chế độ</span></li>
                <li onClick={()=>onChangePosition('salary')} style={position === 'salary'? {backgroundColor: 'darkblue'}: {}}><span class="material-icons icon_">attach_money</span><span className='title_'>Quản lý tiền lương</span></li>
                <li onClick={()=>onChangePosition('product')} style={position === 'product'? {backgroundColor: 'darkblue'}: {}}><span class="material-icons icon_">production_quantity_limits</span><span className='title_'>Quản lý sản phẩm</span></li>
            </ul>

            <div className="footer">
                <span class="material-icons">account_circle</span>
                <span onClick={logout} class="material-icons">logout</span>
            </div>
        

        </div>
    )
}

export default Menu;


