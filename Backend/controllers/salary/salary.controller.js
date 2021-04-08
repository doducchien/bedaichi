const db = require('../../connect_db')


module.exports.searchStaff = (req, res)=>{
    const keyword = req.params.keyword
    let sql = 'SELECT * FROM staff WHERE email like ? OR fullName like ?'
    db.query(sql, [`%${keyword}%`, `%${keyword}%`], (err, response)=>{
        if(err){
            console.log(err)
            res.json({
                status: false,
                err: err.code
            })
        }
        else{
            res.json({
                status: true,
                err: null,
                result: response
            })
        }
    })
}



module.exports.searchUnitSalary = (req, res)=>{
    const keyword = req.params.keyword
    let sql = 'SELECT * FROM unitSalary WHERE email like ?'
    db.query(sql, [`%${keyword}%`], (err, response)=>{
        if(err){
            console.log(err)
            res.json({
                status: false,
                err: err.code
            })
        }
        else{
            res.json({
                status: true,
                err: null,
                result: response
            })
        }
    })
}

module.exports.getAllStaffUnit = (req, res)=>{

    let sql = 'SELECT * FROM unitSalary'
    db.query(sql, (err, response)=>{
        if(err){
            console.log(err)
            res.json({
                status: false,
                err: err.code
            })
        }
        else{
            res.json({
                status: true,
                err: null,
                result: response
            })
        }
    })
}

module.exports.getNameStaff = (req, res)=>{
    const email = req.params.email
    let sql = 'SELECT fullName from staff WHERE email=?'
    db.query(sql, [email], (err, response)=>{
        if(err){
            console.log(err)
            res.json({
                status: false,
                err: err.code
            })
        }
        else{
            res.json({
                status: true,
                err: null,
                result: response
            })
        }
    })
}

module.exports.updateUnitSalary = (req, res)=>{
    const {basicSalary, overtimeSalary, allowance, attendanceBonus, completedBonus, awarenessBonus, note, email, setted} = req.body
    let sql = 'UPDATE unitSalary SET basicSalary = ?, overtimeSalary = ?, allowance = ?, attendanceBonus = ?, completedBonus = ?, awarenessBonus = ?, note = ?, setted = ? WHERE email = ?'
    db.query(sql, [basicSalary, overtimeSalary, allowance, attendanceBonus, completedBonus, awarenessBonus, note, setted, email], (err, response)=>{
        if(err){
            console.log(err)
            res.json({
                status: false,
                err: err.code
            })
        }
        else{
            res.json({
                status: true,
                err: null,
            })
        }
    })
}

module.exports.getUnitSalary = (req, res)=>{
    const email = req.params.email
    let sql = 'SELECT * FROM unitsalary WHERE email = ?'
    db.query(sql, [email], (err, response)=>{
        if(err){
            console.log(err)
            res.json({
                status: false,
                err: err.code
            })
        }
        else{
            res.json({
                status: true,
                err: null,
                result: response[0]
            })
        }
    })
}


module.exports.getAllTotalSalary = (req, res)=>{
    const time = req.params.time
    console.log(time)
    let sql = 'SELECT * FROM totalsalary WHERE time=?'

}

module.exports.getOverOnRequest = (req, res)=>{
    const {email, startTime, endTime} = req.params
    let sql = 'SELECT overOnRequest FROM awareness WHERE email = ? AND overOnRequest = 1 AND time >= ? AND time <= ?'
    db.query(sql, [email, startTime, endTime], (err, response)=>{
        if(err){
            console.log(err)
            res.json({
                status: false,
                err: err.code
            })
        }
        else{
            console.log(response)
            res.json({
                status: true,
                err: null,
                result: response.length
            })
        }
    })

}


module.exports.getCountAttendance = (req, res)=>{
    const {email, startTime, endTime} = req.params
    let sql = 'SELECT * FROM awareness WHERE (email = ? AND time >= ? AND time <= ?) AND (ontime = 1 OR latehours = 1)'
    db.query(sql, [email, startTime, endTime], (err, response)=>{
        if(err){
            console.log(err)
            res.json({
                status: false,
                err: err.code
            })
        }
        else{
            console.log(response)
            res.json({
                status: true,
                err: null,
                result: response.length
            })
        }
    })
}

module.exports.getCountLateTime = (req, res)=>{
    const {email, startTime, endTime} = req.params
    let sql = 'SELECT * FROM awareness WHERE (email = ? AND time >= ? AND time <= ?) AND  latehours = 1)'
    db.query(sql, [email, startTime, endTime], (err, response)=>{
        if(err){
            console.log(err)
            res.json({
                status: false,
                err: err.code
            })
        }
        else{
            console.log(response)
            res.json({
                status: true,
                err: null,
                result: response.length
            })
        }
    })
}