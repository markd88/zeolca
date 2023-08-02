
const db = require('../db/index')


exports.removeAccess = async (req, res) => {
  try{
    const user_info = req.body

    const userid = req.auth.id

    
    // check admin rights
    let sql_admin = `select * from users where id=?`
    let db_admin = await db.query(sql_admin, [userid])


    if (db_admin[0].admin !== 1) {
      return res.send({status: 3, message: "not admin"})
    }


    let sql = `UPDATE users SET verify = 0 WHERE id=?`
    let db_verify = await db.query(sql, [user_info.index])

  
    return res.send({status: 0, message: "success"})


  } catch (err) {
    return res.send({status: 1, message: err})
  }

}



exports.approveAccess = async (req, res) => {
  try{
    const user_info = req.body

    const userid = req.auth.id

    
    // check admin rights
    let sql_admin = `select * from users where id=?`
    let db_admin = await db.query(sql_admin, [userid])


    if (db_admin[0].admin !== 1) {
      return res.send({status: 3, message: "not admin"})
    }


    let sql = `UPDATE users SET verify = 1 WHERE id=?`
    let db_verify = await db.query(sql, [user_info.index])

  

    return res.send({status: 0, message: "success"})


  } catch (err) {
    return res.send({status: 1, message: err})
  }

}

exports.get_users = async (req, res) => {
  try{
    
    const userid = Number(req.auth.id)

    // check admin rights
    let sql_admin = `select * from users where id=?`
    let db_admin = await db.query(sql_admin, [userid])

   

    if (db_admin[0].admin !== 1) {
      return res.send({status: 3, message: "not admin"})
    }


    let sql = `select id, username, company, email, createTime, recentTime, verify from users where admin != 1`
    const db_res = await db.query(sql)

  
    return res.send({status: 0, message: db_res})


  } catch (err) {
    return res.send({status: 1, message: err})
  }

}

