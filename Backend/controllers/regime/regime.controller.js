const db = require('../../connect_db')

module.exports.createTypeRegime = (req, res)=>{
    const {id, name, note} = req.body
    let sql = 'INSERT INTO typeRegime VALUES(?, ?, ?)'
    db.query(sql, [id, name, note], (err, response)=>{
        if(err){
            console.log(err)
            res.json({
                status: false,
                err: err.code,
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

module.exports.getAllTypeRegime = (req, res)=>{
    let sql = 'SELECT * FROM typeRegime'
    db.query(sql, [], (err, response)=>{
        if(err){
            console.log(err)
            res.json({
                status: false,
                err: err.code,
                result: null
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

module.exports.getDetailTypeRegime = (req, res)=>{
    const id = req.params['id']
    let sql = 'SELECT * FROM typeRegime WHERE id = ? LIMIT 1'
    db.query(sql, [id], (err, response)=>{
        if(err){
            console.log(err)
            res.json({
                status: false,
                err: err.code,
                result: null
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










