const db = require('../../connect_db')
const md5 = require('md5')

module.exports.getAllDepartment = (req, res) => {
    let sql = 'SELECT * FROM department';
    db.query(sql, (err, response) => {
        res.json(response)
    })
}

module.exports.getDepartment = (req, res) => {
    const id = req.params['id']
    const sql = 'SELECT * from department WHERE id = ?'
    db.query(sql, [id], (err, response) => {
        if (err) {
            res.json({
                status: false,
                errCode: err.code
            })
        }
        else {
            res.json({
                status: true,
                errCode: null,
                data: response[0]
            })
        }
    })
}

module.exports.createStaff = (req, res) => {
    let body = req.body
    const { email, fullName, phoneNumber, birthday, sex, img, department, position, joinDay, leftDay, status, note } = body
    sql = 'INSERT INTO staff values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    db.query(sql, [email, fullName, phoneNumber, birthday, sex, img, department, position, joinDay, leftDay, status, note], (err, response) => {
        if (err) {
            res.json({
                status: false,
                errCode: err.code
            })
        }
        else {
            res.json({
                status: true,
                errCode: null
            })
        }
    })
}

module.exports.updateDepartment = (req, res) => {
    const body = req.body
    const { id, name, maxSlot, height, numberHome, width } = body;

    let sql = 'UPDATE  department  SET name=?, maxSlot=?, height=?, numberHome=?, width=? WHERE id = ?'
    db.query(sql, [name, parseInt(maxSlot), parseFloat(height), parseInt(numberHome), parseFloat(width), id], (err, response) => {
        if (err) {
            res.json({
                status: false,
                errCode: err.code
            })
        }
        else {
            res.json({
                status: true,
                errCode: null,

            })
        }
    })

}

module.exports.createDepartment = (req, res)=>{
    const body = req.body;
    const { id, name, maxSlot, height, numberHome, width } = body;
    let sql = 'INSERT INTO department VALUES(?, ?, ?, ?, ?, ?)'
    db.query(sql, [id, name, maxSlot, height, numberHome, width], (err, response)=>{
        if (err) {
            res.json({
                status: false,
                errCode: err.code
            })
        }
        else {
            res.json({
                status: true,
                errCode: null,

            })
        }
    })
}