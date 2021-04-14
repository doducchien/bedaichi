import { useState, useEffect } from 'react'

//constraints 
import * as constraints from '../../constraints'

//component
import DetailAwareness from './DetailAwareness'

function ManagerAwareness(props) {
    const {user_role} = props
    const [awareness, setAwareness] = useState(null)

    const openDetailAwareness = (value)=>{
        setAwareness(value)
    }

    return (
        <div className="manager-awareness">
            {!awareness ?

                constraints.awareness.map(item => {
                    return <li onClick={()=>openDetailAwareness(item.value)} key={item.value}>{item.label}</li>
                })

                :
                <DetailAwareness setAwareness={setAwareness} awareness={awareness} user_role={user_role}/>
            }



        </div>
    )
}

export default ManagerAwareness