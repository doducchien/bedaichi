const db = require('../../connect_db')
const md5 = require('md5')



module.exports.signup = (req, res)=>{
    let body = req.body
    delete body.repassword
    let sql = 'INSERT INTO User SET ?'
    db.query(sql, [body], (err, response)=>{
        if(err){
            console.log(err);
            res.json(false);
        }
        else{
            console.log("Dang ky thanh cong")
            res.json(true)
        }
    })

}

