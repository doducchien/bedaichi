function ListStaff(props){
    const {user_role, listStaff, openDetailStaff} = props
    return(
        <div className="list-staff">
             
                {listStaff.map(item=>{
                    return(
                        <div onClick={()=>openDetailStaff(item.email)} style={item.status === 0? {backgroundColor: '#02B875'}: {backgroundColor: '#C32361'}} key={item.email} className='item-staff'>
                            <img src={item.image}/>
                            <p>{item.fullName}</p>
                            <p>{item.email}</p>
                        </div>
                    )
                })}

           
        </div>
    )
}

export default ListStaff