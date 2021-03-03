const db = require('../../connect_db')
const md5 = require('md5');
const e = require('express');
const { resourceLimits } = require('worker_threads');

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

module.exports.getAcc = (req, res)=>{
    const filter = req.params['filter']
    let sql = ''
    if(filter === 'all') sql = 'SELECT * FROM User'
    
    db.query(sql, [], (err, response)=>{
        res.json(response)
    })
}

module.exports.getAccDetail = (req, res)=>{
    const email = req.params['email']
    let sql = 'SELECT * FROM User Where email = ?'
    db.query(sql, [email], (err, response)=>{
        if(err) res.json({
            status: false,
            errCode: err.code
        })
        else res.json(response[0])
    })
}

module.exports.deleteAcc = (req, res)=>{
    const email = req.params['email']
    let sql = 'DELETE FROM User WHERE email=?'
    db.query(sql, [email], (err, response)=>{
        if(err) res.json({
            status: false,
            errCode: err.code
        })
        else res.json({
            status: true,
            errCode: null
        })
    })
}