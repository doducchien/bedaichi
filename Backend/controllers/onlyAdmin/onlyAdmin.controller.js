const db = require('../../connect_db')
const md5 = require('md5');
const e = require('express');
const { resourceLimits } = require('worker_threads');
const { response } = require('express');

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
    const keyword = req.params['keyword']
    let sql = ''
    if(keyword === 'empty'){
        if(filter === 'all') sql = 'SELECT * FROM User'
        else sql = 'SELECT * FROM User WHERE type=?'
        db.query(sql, [filter], (err, response)=>{
            res.json(response)
        })
    }
    else{
        if(filter === 'all'){
            sql = 'SELECT * FROM User WHERE fullName like ?'
            db.query(sql, [`%${keyword}%`], (err, response)=>{
                res.json(response)
            })
        } 
        else {
            sql = 'SELECT * FROM User WHERE fullName like ? AND type=?'
            db.query(sql, [`%${keyword}%`, filter], (err, response)=>{
                res.json(response)
            })
        }
    }
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

module.exports.updateAcc = (req, res)=>{
    const {email, role} = req.body
    let sql = 'UPDATE User SET type=? WHERE email=?'
    db.query(sql, [role, email], (err, response)=>{
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

