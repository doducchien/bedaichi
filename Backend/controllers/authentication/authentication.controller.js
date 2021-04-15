const db = require('../../connect_db')
const md5 = require('md5')



module.exports.signup = (req, res)=>{
    let body = req.body
    delete body.repassword

    body.password = md5(body.email + "-" + body.password)
    
    let sql = 'INSERT INTO user SET ?'
    db.query(sql, [body], (err, response)=>{
        if(err){
            console.log(err)
            if(err.code === 'ER_DUP_ENTRY'){
                res.json({
                    status: false,
                    errCode: err.code
                })
            }
            
        }
        else{   
            res.json({
                status: true,
                errCode: null
            })
        }
    })

}

module.exports.login = (req, res)=>{
    let body = req.body;
    body.password = md5(body.email + "-" + body.password)
    let sql = "SELECT * FROM user WHERE email = ? AND password = ?"
    db.query(sql, [body.email, body.password], (err, response)=>{
  
        if(response.length  === 1){
            res.json({
                status: true,
                errCode: null,
                token: body.email + '*' + body.password,
                user: response[0]
            })
        }
        else{
            res.json({
                status: false,
                errCode: 'email_or_password_invalid'
            })
        }
    })
}

module.exports.loginByToken = (req, res)=>{
    let token = req.body.token;
    let data = token.split('*');
    let sql = 'SELECT * FROM user WHERE email = ? AND password = ?'
    db.query(sql, [data[0], data[1]], (err, response)=>{
        if(err){
            res.json({
                status: false,
                errCode: 'Thông tin đăng nhập không đúng'
            })
        }
        else{
            if(response.length === 1){
                console.log(response[0])
                res.json({
                    status: true,
                    errCode: null,
                    user: response[0]
                })
            }
            else{
                res.json({
                    status: false,
                    errCode: 'Thông tin đăng nhập không đúng'
                })
            }
        }

    })

}