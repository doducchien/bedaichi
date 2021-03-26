const db = require('../../connect_db')

module.exports.createProduct = (req, res)=>{
    const {id, name, value, time, isComplete} = req.body
    const sql = 'INSERT INTO product VALUES(?, ?, ? ,? ,?)'
    db.query(sql, [id, name, value, time, isComplete], (err, response)=>{
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

module.exports.getAllProduct = (req, res)=>{
    let sql = 'SELECT * FROM product'
    db.query(sql, (err, response)=>{
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
                result: response
            })
        }
    })
}