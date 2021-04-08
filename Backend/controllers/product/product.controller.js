const db = require('../../connect_db')

module.exports.createProduct = (req, res) => {
    const { id, name, value, time, isComplete } = req.body
    const sql = 'INSERT INTO product VALUES(?, ?, ? ,? ,?)'
    db.query(sql, [id, name, value, time, isComplete], (err, response) => {
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

module.exports.getAllProduct = (req, res) => {
    let sql = 'SELECT * FROM product'
    db.query(sql, (err, response) => {
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

module.exports.searchProduct = (req, res) => {
    const keyword = req.params['keyword']
    let sql = 'SELECT *  FROM product WHERE id like ? OR name like ?'
    db.query(sql, [`%${keyword}%`, `%${keyword}%`], (err, response) => {
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

module.exports.getProduct = (req, res)=>{
    const id = req.params.id
    let sql = 'SELECT * FROM product WHERE id=?'
    db.query(sql, [id], (err, response)=>{
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
                result: response[0]
            })
        }
    })
}

module.exports.getCustomer = (req, res)=>{
    const email = req.params.email
    let sql = 'SELECT * FROM customer WHERE email=?'
    db.query(sql, [email], (err, response)=>{
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

module.exports.addCustomer = (req, res) => {
    const { email, fullName, companyName } = req.body
    let sql = 'INSERT INTO customer VALUES(?, ?, ?)'
    db.query(sql, [email, fullName, companyName], (err, response) => {
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

module.exports.getAllCustomer = (req, res) => {
    let sql = 'SELECT * FROM customer'
    db.query(sql, (err, response) => {
        if (err) res.json({
            status: false,
            errCode: err.code
        })
        else res.json({
            status: true,
            errCode: null,
            result: response
        })
    })
}

module.exports.searchCustomer = (req, res) => {
    const keyword = req.params.keyword
    let sql = 'SELECT * FROM customer WHERE email like ? OR fullName like ? OR company like ?'
    db.query(sql, [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`], (err, response) => {
        if (err) {
            console.log(err)
            res.json({
                status: false,
                errCode: err.code
            })
        }
        else res.json({
            status: true,
            errCode: null,
            result: response
        })
    })
}

module.exports.updateInfoProduct = (req, res) => {
    const body = req.body
    const { name, value, isComplete, id } = body
    let sql = 'UPDATE product SET name=?, value=?, isComplete=? WHERE id=?'
    db.query(sql, [name, value, isComplete, id], (err, response) => {
        if (err) {
            console.log(err)
            res.json({
                status: false,
                errCode: err.code
            })
        }
        else res.json({
            status: true,
            errCode: null,
        })
    })

}

module.exports.createStaffProduct = (req, res) => {
    const body = req.body
    const { emailStaff, discount, id } = body
    let sql = 'SELECT * FROM staff WHERE email like ?'
    db.query(sql, [emailStaff], (err, response) => {
        console.log(response)
        if (err) {
            console.log(err)
            res.json({
                status: false,
                errCode: err.code
            })
        }
        else {
            if (response.length === 0) {
                res.json({
                    status: false,
                    
                })
            }
            else {
                let sql = 'SELECT * FROM staffproduct WHERE email=? AND id=?'
                db.query(sql, [emailStaff, id], (err, response) => {
                    if (response.length === 0) {
                        sql = 'INSERT INTO staffproduct VALUES(?, ?, ?, ?)'
                        db.query(sql, [id, emailStaff, discount, 0], (err, response) => {
                            if (err) {
                                console.log(err)
                                res.json({
                                    status: false,
                                    errCode: err.code
                                })
                            }
                            else res.json({
                                status: true,
                                errCode: null,
                            })
                        })
                    }
                    else {
                        sql = 'UPDATE staffproduct SET discount=? WHERE email=? AND id=?'
                        db.query(sql, [discount, emailStaff, id], (err, response) => {
                            if (err) {
                                console.log(err)
                                res.json({
                                    status: false,
                                    errCode: err.code
                                })
                            }
                            else res.json({
                                status: true,
                                errCode: null,
                            })
                        })
                    }
                })
            }
        }
    })

}

module.exports.getAllStaffProduct = (req, res)=>{
    const id = req.params['id']
    console.log(id)
    let sql = 'SELECT * FROM staffproduct WHERE id = ?'
    db.query(sql, [id],  (err, response)=>{
        if (err) {
            console.log(err)
            res.json({
                status: false,
                errCode: err.code
            })
        }
        else res.json({
            status: true,
            errCode: null,
            result: response
        })
    })
}

module.exports.deleteStaffProduct = (req, res)=>{
    const {id, email} = req.params
    let sql = 'DELETE FROM staffproduct WHERE id=? AND email=?'
    db.query(sql, [id, email], (err, response)=>{
        if (err) {
            console.log(err)
            res.json({
                status: false,
                errCode: err.code
            })
        }
        else res.json({
            status: true,
            errCode: null,
        })
    })
}

module.exports.getOrdered = (req, res)=>{
    const id = req.params.id
    let sql = 'SELECT * FROM  ordered WHERE id=?'
    db.query(sql, [id], (err, response)=>{
        if (err) {
            console.log(err)
            res.json({
                status: false,
                errCode: err.code,
            })
        }
        else res.json({
            status: true,
            errCode: null,
            result: response
        })
    })
}

module.exports.addOrdered = (req, res)=>{
    const body = req.body
    const {emailOrdered, fullNameOrdered, companyNameOrdered, timeOrdered, price, paid, id} = body
    
    let sql = 'SELECT * FROM customer WHERE email=?'
    db.query(sql, [emailOrdered], (err, response)=>{
        if (err) {
            console.log(err)
            res.json({
                status: false,
                errCode: err.code,
            })
        }
        else {
            if(response.length === 0){
                res.json({
                    status: false,
                    errCode: null,
                })
            }
            else{
                sql = 'SELECT * FROM ordered WHERE id=? AND email=?'
                db.query(sql, [id, emailOrdered], (err, response)=>{
                    if (err) {
                        console.log(err)
                        res.json({
                            status: false,
                            errCode: err.code,
                        })
                    }
                    else{
                        if(response.length === 0){
                            sql = 'INSERT INTO ordered VALUES(?,?,?,?,?,?)'
                            db.query(sql, [emailOrdered, timeOrdered, id, price, paid, ''], (err, response)=>{
                                if (err) {
                                    console.log(err)
                                    res.json({
                                        status: false,
                                        errCode: err.code,
                                    })
                                }
                                else{
                                    console.log('thanh cong')
                                    res.json({
                                        status: true,
                                        errCode: null,
                                  
                                    })
                                }
                            })
                            
                        }
                        else{
                            console.log(body)
                            sql = 'UPDATE ordered SET email=?, time=?, price=?, paid= ?, note=? WHERE email=? AND id=?'
                            db.query(sql, [emailOrdered, timeOrdered, price, paid, '', emailOrdered, id], (err, response)=>{
                                if (err) {
                                    console.log(err)
                                    res.json({
                                        status: false,
                                        errCode: err.code,
                                    })
                                }
                                else{
                                    console.log(response)
                                    res.json({
                                        status: true,
                                        errCode: null,
                                  
                                    })
                                }
                            })
                        }
                    }
                })
            }
        }
    })
}

module.exports.updateStep = (req, res)=>{
    const {steps, id} = req.body
   
    
    let params = []
    console.log(steps)
    switch(steps){
        case 0:{
            params = [1, 0, 0, 0, 0, 0, 0, 0, id]
            break
        }

        case 1:{
            params = [1, 1, 0, 0, 0, 0, 0, 0, id]
            break
        }

        case 2:{
            params = [1, 1, 1, 0, 0, 0, 0, 0, id]
            break
            
        }

        case 3:{
            params = [1, 1, 1, 1, 0, 0, 0, 0, id]
            break
        }

        case 4:{
            params = [1, 1, 1, 1, 1, 0, 0, 0, id]
            break
        }

        case 5:{
            params = [1, 1, 1, 1, 1, 1, 0, 0, id]
            break
        }

        case 6:{
            params = [1, 1, 1, 1, 1, 1, 1, 0, id]
            break
        }

        case 7:{
            params = [1, 1, 1, 1, 1, 1, 1, 1, id]
            break
        }

    }

    let sql = 'UPDATE statusproduct SET init=?, dong=?, suon=?, keogay=?, xen=?, ep=?, dongThung=?, isComplete=? WHERE id like ?'
    db.query(sql, params, (err, response)=>{
        if (err) {
            console.log(err)
            res.json({
                status: false,
                errCode: err.code
            })
        }
        else res.json({
            status: true,
            errCode: null,
        })
    })
}

module.exports.getStep = (req, res)=>{
    const id = req.params.id
    let sql = 'SELECT * FROM statusproduct WHERE id = ?'
    db.query(sql, [id], (err, response)=>{
        if (err) {
            console.log(err)
            res.json({
                status: false,
                errCode: err.code
            })
        }
        else{
            const {init, dong, suon, keogay, xen, ep, dongThung, isComplete} = response[0]
            let step = init + dong + suon + keogay + xen + ep + dongThung + isComplete - 1
            res.json({
                status: true,
                errCode:null,
                result: step
            })
            
        }
    })
}