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