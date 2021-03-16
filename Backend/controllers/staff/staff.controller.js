const db = require('../../connect_db')
const md5 = require('md5');
const { response } = require('express');

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

module.exports.createDepartment = (req, res) => {
    const body = req.body;
    const { id, name, maxSlot, height, numberHome, width } = body;
    let sql = 'INSERT INTO department VALUES(?, ?, ?, ?, ?, ?)'
    db.query(sql, [id, name, maxSlot, height, numberHome, width], (err, response) => {
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

module.exports.searchStaff = (req, res) => {
    let keyword = req.params['keyword']
    let department = req.params['department']
    let status = req.params['status']

    let department_query = null
    let status_query = null

    if(department !=  'ALL'){
        department_query = department.split('---')[1]
    }

    if(status != 'ALL'){
        if(status === 'Đang làm việc') status_query = 0
        else status_query = 1
    }

    let con_keyword = keyword !=='null'? `(email like '%${keyword}%' OR fullName like '%${keyword}%')`: 1
    let con_department = department === 'ALL'? 1: `department='${department_query}'`
    let con_status = status === 'ALL'? 1: `status=${status_query}`

    let sql = `SELECT * FROM staff WHERE ${con_keyword} AND ${con_department} AND ${con_status}`
    console.log(sql)
    db.query(sql, (err, response)=>{
        if(err){
            res.json({
                status: false,  
                err: err.code
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

module.exports.getDetailStaff = (req, res)=>{
    const email = req.params['email']
    const sql = 'SELECT * FROM staff WHERE email=?'
    db.query(sql, [email], (err, response)=>{
        if(err) res.json({
            status: false,
            err: err.code
        })
        else res.json({
            status: true,
            err: null,
            result: response[0]
        })
    })
}

module.exports.updateStaff = (req, res)=>{
    const {
        email,
        fullName,
        phoneNumber,
        birthday,
        sex,
        image,
        department,
        joinDay,
        leftDay,
        status,
        note
    } = req.body
    console.log(req.body)
    let sql = 'UPDATE staff SET fullName=?, phoneNumber=?, birthday=?, sex=?, image=?, department=?, joinDay=?, leftDay=?, status=?  WHERE email=?'
    db.query(sql, [fullName,phoneNumber,birthday,sex,image,department,joinDay,leftDay,status, email], (err, response)=>{
        if(err) res.json({
            status: false,
            err: err.code
        })
        else{
            res.json({
                status: true,
                err: null,
                response: response
            })
        }
    })
}
