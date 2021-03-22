const db = require('../../connect_db')

module.exports.createTypeRegime = (req, res) => {
    const { id, name, note } = req.body
    let sql = 'INSERT INTO typeRegime VALUES(?, ?, ?)'
    db.query(sql, [id, name, note], (err, response) => {
        if (err) {
            console.log(err)
            res.json({
                status: false,
                err: err.code,
            })
        }
        else {
            res.json({
                status: true,
                err: null,
            })
        }
    })
}

module.exports.getAllTypeRegime = (req, res) => {
    let sql = 'SELECT * FROM typeRegime'
    db.query(sql, [], (err, response) => {
        if (err) {
            console.log(err)
            res.json({
                status: false,
                err: err.code,
                result: null
            })
        }
        else {
            res.json({
                status: true,
                err: null,
                result: response
            })
        }
    })
}

module.exports.getDetailTypeRegime = (req, res) => {
    const id = req.params['id']
    let sql = 'SELECT * FROM typeRegime WHERE id = ? LIMIT 1'
    db.query(sql, [id], (err, response) => {
        if (err) {
            console.log(err)
            res.json({
                status: false,
                err: err.code,
                result: null
            })
        }
        else {
            res.json({
                status: true,
                err: null,
                result: response[0]
            })
        }

    })
}

module.exports.getListStaffRegime = (req, res) => {
    const id = req.params['id']
    const time = req.params['time']

    let sql = 'SELECT * FROM regime WHERE id=? AND time=?'
    db.query(sql, [id, time], (err, response) => {
        if (err) {
            console.log(err)
            res.json({
                status: false,
                err: err.code,
                result: null
            })
        }
        else {
            res.json({
                status: true,
                err: null,
                result: response
            })
        }
    })
}

module.exports.createStaffRegime = (req, res) => {
    const { email, time, id } = req.body
    let sql = 'INSERT INTO regime VALUES(?,?, ?,?)'
    db.query(sql, [email, time, null, id], (err, response) => {
        if (err) {
            console.log(err)
            res.json({
                status: false,
                err: err.code,
                result: null
            })
        }
        else {
            res.json({
                status: true,
                err: null,
                // result: response[0]
            })
        }
    })
}

module.exports.deleteStaffRegime = (req, res) => {
    const { email, id, time } = req.params
    const sql = 'DELETE FROM regime WHERE email=? AND id=? AND time=?'
    db.query(sql, [email, id, time], (err, response) => {
        if (err) {
            console.log(err)
            res.json({
                status: false,
                err: err.code,
               
            })
        }
        else {
            res.json({
                status: true,
                err: null,
               
            })
        }
    })
}

module.exports.createStaffAwareness = (req, res)=>{
    const {email, time} = req.body
    console.log(email, time)
    let sql = 'SELECT * FROM awareness WHERE time=? AND email=? LIMIT 1'

}







