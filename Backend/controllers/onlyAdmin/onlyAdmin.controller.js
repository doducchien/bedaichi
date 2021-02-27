const db = require('../../connect_db')
const md5 = require('md5')

module.exports.addAcc = (req, res)=>{
    let body = req.body
    let{email, fullName, phoneNumber, birthday, type, password, sex} = body;
    let sql = 'INSERT INTO User values(?, ?, ?, ?, ?, ?, ?, ?, ?)'
    db.query(sql, [email, fullName, phoneNumber, null, birthday, type, password, null, sex], (err, response)=>{
        if(err) console.log(err)
        else console.log(response)
    })
}