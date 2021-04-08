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

module.exports.getAllStaff = (req, res)=>{
    let sql = 'SELECT * FROM staff'
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

module.exports.getAllStaffUnitSalary = (req, res)=>{
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