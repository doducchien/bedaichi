const db = require('../../connect_db')
const md5 = require('md5')

module.exports.addAcc = (req, res)=>{
    let body = req.body
    let{email, fullName, phoneNumber, birthday, type, password, sex} = body;
    password = md5(email + '-' + password)
    let sql = 'INSERT INTO User values(?, ?, ?, ?, ?, ?, ?, ?, ?)'
    db.query(sql, [email, fullName, phoneNumber, null, birthday, type, password, null, sex], (err, response)=>{
        if(err){
            console.log(err)
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