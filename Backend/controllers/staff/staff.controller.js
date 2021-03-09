const db = require('../../connect_db')
const md5 = require('md5')

module.exports.getAllDepartment = (req, res)=>{
    let sql = 'SELECT * FROM department';
    db.query(sql, (err, response)=>{
        res.json(response)
    })
}

module.exports.createStaff = (req, res)=>{
    let body = req.body
    const {email, fullName, phoneNumber, birthday, sex, img, department, position, joinDay, leftDay, status, note} = body
    sql = 'INSERT INTO staff values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    db.query(sql, [email, fullName, phoneNumber, birthday, sex, img, department, position, joinDay, leftDay, status, note], (err, response)=>{
        if(err){
            res.json({
                status: false,
                errCode: err.code
            })
        }
        else{
            res.json({
                status: true,
                errCode: null
            })
        }
    })
}