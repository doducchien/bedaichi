import { useEffect, useState } from 'react'

//btn
import Button from '@material-ui/core/Button';

//component
import PopupAddRegime from './PopupAddRegime'
import DetailRegime from './DetailRegime'

//axios
import axios from 'axios'

//constraints
import * as constraints from '../../constraints'

function ManagerRegime(props) {
    const { user_role } = props
    const [load, setLoad] = useState(false)

    const [listRegime, setListRegime] = useState([])
    const [idRegime, setIdRegime] = useState(null)

    const reload = () => {
        setLoad(!load)
    }

    const openDetailRegime = (id) => {
        setIdRegime(id)
    }

    useEffect(() => {
        const route = constraints.server + '/regime/getAllTypeRegime'
        axios.get(route, {
            headers: {
                'user_role': user_role
            }
        })
            .then(res => {
                const data = res.data;
                if (data.status) {
                    setListRegime(data.result)
                }
            })

    }, [load])

    return (
        <div className="manager-regime">
            {idRegime === null? 
            <>

                <div className="header">
                    <PopupAddRegime reload={reload} user_role={user_role} />
                </div>
                <div className="body">
                    {listRegime.map(item => {
                        return <li onClick={()=>openDetailRegime(item.id)} key={item.id}>{item.name}</li>
                    })}
                </div>
            </>
            :
                <DetailRegime setIdRegime={setIdRegime} user_role={user_role} idRegime={idRegime}/>
            }

        </div>
    )
}

export default ManagerRegime