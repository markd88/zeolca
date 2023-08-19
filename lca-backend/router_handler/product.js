const e = require('express')
const db = require('../db/index')



function calculate(arr) {
  // console.log(arr, "arr inside")
  let sum = 0
  for (let i = 0; i < arr.length; i++) { 
      console.log(arr[i])
      let quantity = arr[i].input_quantity
      // console.log(quantity)
      let unit = JSON.parse(arr[i].input_unit)[1]

      if (unit != "kg" && unit != 't') {
        if (Number(arr[i].manual) === 0) {
          let db_basic = JSON.parse(arr[i].factor_db_basic)
          let value = quantity * db_basic['sum_factor']
          // console.log(db_basic.sum_factor)
          if (db_basic['first'] === 't') {
            value = value * 1000
          }
          if (db_basic['first'] === 'g') {
            value = value / 1000
          }
          // console.log(value, '1')
          sum += value
        }
        // manual
        else {
          let value = quantity *  arr[i].factor_name 
          // console.log(db_basic.sum_factor, arr[i].factor_name)
          if (arr[i].factor_unit === "gCO2e") {
            value = value / 1000
          }
          // console.log(value, '2')
          sum += value
        }
        
      }
      // unit is kg or t
      else {



        if (Number(arr[i].manual) === 0) {
          
          let db_basic = JSON.parse(arr[i].factor_db_basic)
          let factor_second = db_basic["second"]
          console.log(factor_second, "heresaaaa")
          
          if (factor_second == 't' && unit == 'kg') {
            quantity = quantity / 1000
          } else if (factor_second == 'kg' && unit == 't') {
            quantity = quantity * 1000
          }

          let value = quantity * db_basic['sum_factor']
          if (db_basic['first'] === 't') {
            value = value * 1000
          }
          if (db_basic['first'] === 'g') {
            value = value / 1000
          }
          // console.log(value, '3')
          sum += value
        }
        // manual
        else {

          let value = quantity *  arr[i].factor_name 
          if (arr[i].factor_unit === "gCO2e") {
            value = value / 1000
          }
          // console.log(value, '4')
          sum += value
        }

      }

      let total_trans = 0
      if (Number(arr[i].transportation) == 1) {
        const weight = Number(arr[i].transportation_weight)
        let road = JSON.parse(arr[i].road)
        
        for (let i = 0; i < road.length; i++)  {
          const distance = road[i].distance
          const factor =  road[i].factor_db_transportation.sum_factor

          let value = distance * factor *  weight / 1000
          console.log(value)
          if (road[i].first == 'g') {
            value = value / 1000
          }
          if (road[i].first == 't') {
            value = value * 1000
          }

          total_trans = total_trans + value
        }
      console.log('trans', total_trans)
      sum += total_trans

      }


  }
  console.log('sum', sum)
  
  return sum
}


async function update_footprint(product_id) {

  function calculate(arr) {
    // console.log(arr, "arr inside")
    let sum = 0
    for (let i = 0; i < arr.length; i++) { 
        console.log(arr[i])
        let quantity = arr[i].input_quantity
        // console.log(quantity)
        let unit = JSON.parse(arr[i].input_unit)[1]
  
        if (unit != "kg" && unit != 't') {
          if (Number(arr[i].manual) === 0) {
            let db_basic = JSON.parse(arr[i].factor_db_basic)
            let value = quantity * db_basic['sum_factor']
            // console.log(db_basic.sum_factor)
            if (db_basic['first'] === 't') {
              value = value * 1000
            }
            if (db_basic['first'] === 'g') {
              value = value / 1000
            }
            // console.log(value, '1')
            sum += value
          }
          // manual
          else {
            let value = quantity *  arr[i].factor_name 
            // console.log(db_basic.sum_factor, arr[i].factor_name)
            if (arr[i].factor_unit === "gCO2e") {
              value = value / 1000
            }
            // console.log(value, '2')
            sum += value
          }
          
        }
        // unit is kg or t
        else {


  
          if (Number(arr[i].manual) === 0) {
            
            let db_basic = JSON.parse(arr[i].factor_db_basic)
            let factor_second = db_basic["second"]
            console.log(factor_second, "heresaaaa")
            
            if (factor_second == 't' && unit == 'kg') {
              quantity = quantity / 1000
            } else if (factor_second == 'kg' && unit == 't') {
              quantity = quantity * 1000
            }

            let value = quantity * db_basic['sum_factor']
            if (db_basic['first'] === 't') {
              value = value * 1000
            }
            if (db_basic['first'] === 'g') {
              value = value / 1000
            }
            // console.log(value, '3')
            sum += value
          }
          // manual
          else {

            let value = quantity *  arr[i].factor_name 
            if (arr[i].factor_unit === "gCO2e") {
              value = value / 1000
            }
            // console.log(value, '4')
            sum += value
          }
  
        }

        let total_trans = 0
        if (Number(arr[i].transportation) == 1) {
          const weight = Number(arr[i].transportation_weight)
          let road = JSON.parse(arr[i].road)
          
          for (let i = 0; i < road.length; i++)  {
            const distance = road[i].distance
            const factor =  road[i].factor_db_transportation.sum_factor

            let value = distance * factor *  weight / 1000
            console.log(value)
            if (road[i].first == 'g') {
              value = value / 1000
            }
            if (road[i].first == 't') {
              value = value * 1000
            }

            total_trans = total_trans + value
          }
        console.log('trans', total_trans)
        sum += total_trans

        }


    }
    console.log('sum', sum)
    
    return sum
  }

  const sql = `select * from input_output where product_id=?`
  const db_result = await db.query(sql, [product_id])

  factor_sum = calculate(db_result)
  
  // this is a sum number, need to divided by the quantity when use
  const sql_update = `UPDATE product SET factor = ? WHERE id = ? `

  const db_res = await db.query(sql_update, [factor_sum ,product_id])
  if (db_res.affectedRows !== 1) {
    return res.send({status: 1, message: 'update product footprint fail, this is a backend error'})
  }


}


exports.duplicateProduct = async (req, res) => {
  try{

    const p_info = req.body
    const userid = req.auth.id
    const p_index = p_info.index
   
    // first check if the user owns the product
    const sql_get = `select * from product where id=?`
    const db_user = await db.query(sql_get,[p_index])
    // console.log(db_user)
    if (db_user.length != 1 ) {
      return res.send({status: 1, message: "there a two primary key, this is a backend error"})
    }
    if (db_user[0].uid !== userid) {
      return res.send({status: 1, message: "has not right to duplicate"})
    }



    const sql = `INSERT INTO product (uid, p_type, p_name, p_model, p_quant, p_unit, p_unit_weight, p_time_range, p_lca_scope, p_createTime, factor)
    SELECT uid, p_type, p_name, p_model, p_quant, p_unit, p_unit_weight, p_time_range, p_lca_scope, p_createTime, factor
    FROM product WHERE id = ?`

    const db_res = await db.query(sql, [p_index])
    console.log("duplicated: ",db_res)
    if (db_res.affectedRows !== 1) {
      return res.send({status: 1, message: 'duplicate product fail, this is a backend error'})
    }
    let new_product_id = db_res.insertId

    const sql_old_name = `select p_name from product where id = ?`
    const db_res_old = await db.query(sql_old_name, [p_index])
    console.log("old name", db_res_old[0].p_name)

    const sql_change_name = `UPDATE product SET p_name = ? WHERE id = ?`
    const db_res_name = await db.query(sql_change_name, [db_res_old[0].p_name + "(copy)", new_product_id])

/////////////////////////// duplicate process

    const sql_process_old = `SELECT id, product_id, process_name, process_type, process_quantity, process_unit, process_product_name, process_product_percentage, process_actual_quantity, main_output, parent_process
    FROM process WHERE product_id = ?`
    const db_res_process_old = await db.query(sql_process_old, [p_index])
    console.log("process",db_res_process_old)
    let sql_process_new
    let db_process_new
    let process_info
    let new_process_id
    let sql_input
    let db_input
    for (var i = 0; i < db_res_process_old.length; i++) {
      process_info = db_res_process_old[i]
      console.log("check process info",process_info)
      sql_process_new = `INSERT INTO process set ?`
      db_process_new = await db.query(sql_process_new, {
        product_id: new_product_id,
        process_name: process_info.process_name,
        process_type: process_info.process_type,
        process_quantity: process_info.process_quantity,
        process_unit: process_info.process_unit,
        process_product_name: process_info. process_product_name,
        process_product_percentage: process_info.process_product_percentage,
        process_actual_quantity: process_info.process_actual_quantity,
        main_output: process_info.main_output,
        parent_process: process_info.parent_process
      })

      new_process_id = db_process_new.insertId

      sql_input = `SELECT process_type, input_name, input_quantity,input_stat_note,input_type, input_unit, input_data_source, factor_name,  factor_note, factor_source , factor_db_basic, factor_unit, manual, transportation, transportation_weight, road, input 
      FROM input_output WHERE product_id = ? AND process_id = ?`

      
      db_input = await db.query(sql_input, [p_index, process_info.id])
      console.log(p_index, process_info.id,"old inputs",db_input)
      for (var j = 0; j < db_input.length; j++) {
        let input_info = db_input[j]
        let sql_input_new = `insert into input_output set ? `
        const data =  {
          process_id: new_process_id,
          process_type: input_info.process_type,
          product_id: new_product_id,
          input_name: input_info.input_name,
          input_quantity: input_info.input_quantity,
          input_stat_note: input_info.input_stat_note,
          input_type: input_info.input_type,
          input_unit: input_info.input_unit,
          input_data_source: input_info.input_data_source,
          factor_name: input_info.factor_name,
          factor_note: input_info.factor_note,
          factor_source: input_info.factor_source,
          factor_db_basic: input_info.factor_db_basic,
          factor_unit: input_info.factor_unit,
          manual: input_info.manual,
          transportation: input_info.transportation,
          transportation_weight: input_info.transportation_weight,
          road: input_info.road,
          input: input_info.input
        }
        let db_input_new = await db.query(sql_input_new, data)
        
      }





    }
    // const sql_input = `INSERT INTO input_output (process_id, process_type, product_id, input_name, input_quantity,input_stat_note,input_type, input_unit, input_data_source, factor_name,  factor_note, factor_source , factor_db_basic, factor_unit, manual, transportation, transportation_weight, road,input  )
    // SELECT process_id, process_type, product_id, input_name, input_quantity,input_stat_note,input_type, input_unit, input_data_source, factor_name,  factor_note, factor_source , factor_db_basic, factor_unit, manual, transportation, transportation_weight, road, input 
    // FROM process WHERE product_id = ?`



    // console.log(db_res)
    return res.send({status: 0, message: 'duplicate product create success'})

  } catch (err) {
    return res.send({status: 1, message: err})
  }

}


exports.getfactor_public_private = async (req, res) => {
  
  try{
    const factor_database = req.body.factor_database
    const factor_name = req.body.factor_name
    const if_transportation = req.body.transportation
    

    console.log(factor_database, factor_name, if_transportation )

    let final_result;
    let total;



    if (factor_database.toLowerCase() === "cpcd") {

      const sql = `select * from factor_base_cpcd`
      let db_result = await db.query(sql)

      if (factor_name) {

        db_result = db_result.filter((data) => {
          const benchmark = data['1级分类\n(Level 1)'] + data['2级分类\n(Level 2)'] + data['3级分类\n(Level 3)']
          console.log(benchmark.toLowerCase())
          if (benchmark.toLowerCase().indexOf(factor_name.toLowerCase()) >= 0) {
            return data
          }
        }).map((value) => {
          if (value) {
            return value
          }
        })
      }
      total = db_result.length
      final_result = db_result


    } else if (factor_database.toLowerCase() === "all") {
      const sql = `select * from factor_base_cpcd`
      let db_result = await db.query(sql)
      
      if (factor_name) {
        db_result = db_result.filter((data) => {
          const benchmark = data['1级分类\n(Level 1)'] + data['2级分类\n(Level 2)'] + data['3级分类\n(Level 3)']
          console.log(typeof(benchmark))
          console.log(benchmark.toLowerCase())
          if (benchmark.toLowerCase().includes(factor_name.toLowerCase())) {
            data
          }
        })
      }
      total = db_result.length
      final_result = db_result


    } else {
      // this handles IPCC condition
      total = 0
      final_result = []
    }

    if (if_transportation) {
      final_result = final_result.filter((data)=> {
        if (data['second'] == 't·km') {
          return data
        }
      })
    }

    final_result = final_result.map(value => (
      { ...value, property: "public" }
    ))
    let sql_product = `SELECT * FROM product`
    let product_result = await db.query(sql_product)
    
    console.log(product_result, req.auth.email)
    product_result = product_result.filter((data) => {
      let current_access = data.publish.split("#")
      if (current_access.includes(req.auth.email)) {
        return true
      }
    })

    product_result = product_result.map(value =>  {
      let old = value.id
      return ({ ...value, property: "private", id: old + 10000 })
    
    })

    let combinedArray = [...product_result, ...final_result];
    total = combinedArray.length
    console.log('final result', product_result)

    return res.send({status:0, message: "success", data: combinedArray, total: total})


  } catch(err) {
    console.log(err)
    return res.send({status: 1, message: err})

  }

}


exports.publishProductApprove = async (req, res) => {
  try{
    const p_info = req.body
    const userid = req.auth.id
    const p_index = p_info.p_index
    const email = p_info.email

    console.log(p_info, userid, p_index, email)
   
    // first check if the user owns the product
    const sql_get = `select * from product where id=?`
    const db_user = await db.query(sql_get,[p_index])
    // console.log(db_user)
    if (db_user.length != 1 ) {
      return res.send({status: 1, message: "there a two primary key, this is a backend error"})
    }
    if (db_user[0].uid !== userid) {
      return res.send({status: 1, message: "has not right to publish"})
    }

    let sql = `select * from users where email=?`
    let sql_res = await db.query(sql, [email])

    if (sql_res.length == 0 ) {
      return res.send({status: 3, message: "email does not exist"})
    }

    await update_footprint(p_index)

    

    let current_access = db_user[0].publish
    console.log("current access", current_access)


    if (current_access === "") {
      let new_value = "#" + email + "#"
      sql = `UPDATE product SET publish = ? WHERE id = ? `
      const db_res = await db.query(sql, [new_value, p_index])

    }
    else {
      let current_array = current_access.split("#")
      console.log('current array', current_array)
      if (current_array.includes(email)) {
        console.log("already published")
        return res.send({status: 0, message: 'pulish product success'})
      }
      else {
        let new_value = current_access + email + "#"
        sql = `UPDATE product SET publish = ? WHERE id = ? `
        const db_res = await db.query(sql, [new_value, p_index])
      }


    }


  

    return res.send({status: 0, message: 'pulish product success'})

  } catch (err) {
    return res.send({status: 1, message: err})
  }
}



exports.publishProductRemove = async (req, res) => {
  try{
    const p_info = req.body
    const userid = req.auth.id
    const p_index = p_info.p_index
    const email = p_info.email

    console.log(p_info, userid, p_index, email)
   
    // first check if the user owns the product
    const sql_get = `select * from product where id=?`
    const db_user = await db.query(sql_get,[p_index])
    // console.log(db_user)
    if (db_user.length != 1 ) {
      return res.send({status: 1, message: "there a two primary key, this is a backend error"})
    }
    if (db_user[0].uid !== userid) {
      return res.send({status: 1, message: "has not right to publish"})
    }

    let sql = `select * from users where email=?`
    let sql_res = await db.query(sql, [email])

    if (sql_res.length == 0 ) {
      return res.send({status: 3, message: "email does not exist"})
    }

    await update_footprint(p_index)

    let current_access = db_user[0].publish
    console.log('current access',current_access)


    if (current_access === "") {
      console.log("already remove published")
      return res.send({status: 0, message: 'remove pulish product success'})
    }
    else {
      let current_array = current_access.split("#")
      console.log('current array', current_array)
      if (current_array.includes(email)) {
        let newArray = current_array.filter(item => item !== email);
        let new_value = newArray.join("#")
        sql = `UPDATE product SET publish = ? WHERE id = ? `
        const db_res = await db.query(sql, [new_value, p_index])

      }
      else {
        console.log("already remove published")
        return res.send({status: 0, message: 'remove pulish product success'})
      }


    }



    return res.send({status: 0, message: 'remove pulish product success'})

  } catch (err) {
    return res.send({status: 1, message: err})
  }
}



exports.createNewProduct = async (req, res) => {
  try{
    const p_info = req.body
    const userid = req.auth.id
    // console.log(p_info, userid)
    const sql = `insert into product set ?`
    const createTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    // console.log(p_info.product_stats_range)
    const db_res = await db.query(sql, {
      uid: userid,
      p_type: p_info.product_type,
      p_name: p_info.product_name,
      p_model: p_info.product_model,
      p_quant: p_info.quantity,
      p_unit: p_info.product_unit,
      p_unit_weight: p_info.product_unit_weight,
      p_time_range: p_info.product_stats_range,
      p_lca_scope: p_info.product_life_cycle,
      p_createTime: createTime,
    })
    if (db_res.affectedRows !== 1) {
      return res.send({status: 1, message: 'create new product fail, this is a backend error'})
    }
    // console.log(db_res)
    return res.send({status: 0, message: 'new product create success', index: db_res.insertId})
  } catch (err) {
    return res.send({status: 1, message: err})
  }
}


// should also delete process and input_output  TODO
exports.deleteProduct = async (req, res) => {
  try{
    const p_info = req.body
    const userid = req.auth.id
    const p_index = p_info.index

    // console.log(p_index, userid)
    // first check if the user owns the product
    const sql_get = `select * from product where id=?`
    const db_user = await db.query(sql_get,[p_index])
    // console.log(db_user)
    if (db_user.length != 1 ) {
      return res.send({status: 1, message: "there a two primary key, this is a backend error"})
    }
    if (db_user[0].uid !== userid) {
      return res.send({status: 1, message: "has not right to delete"})
    }

    const sql = `DELETE FROM product WHERE id=?`

    const db_res = await db.query(sql, [p_index])
    if (db_res.affectedRows !== 1) {
      return res.send({status: 1, message: 'delete product fail, this is a backend error'})
    }

    // console.log(db_res)
    return res.send({status: 0, message: 'delete product create success'})

  } catch (err) {
    return res.send({status: 1, message: err})
  }
}


exports.deleteProcess = async (req, res) => {

  try{
    const process_info = req.body
    const userid = req.auth.id
    const process_index = process_info.id

    // console.log(process_index, userid)
    // first check if the user owns the product
    const sql_get = `select * from process where id=?`
    const db_user = await db.query(sql_get,[process_index])
    // console.log(db_user)
    if (db_user.length != 1 ) {
      return res.send({status: 1, message: "there a two process, this is a backend error"})
    }

    // Should check if the owner owns the process or not

    // if (db_user[0].uid !== userid) {
    //   return res.send({status: 1, message: "has not right to delete"})
    // }

    const sql = `DELETE FROM process WHERE id=?`

    const db_res = await db.query(sql, [process_index])
    if (db_res.affectedRows !== 1) {
      return res.send({status: 1, message: 'delete process fail, this is a backend error'})
    }

    // console.log(db_res)
    return res.send({status: 0, message: 'delete process create success'})
    
  } catch (err) {
    return res.send({status: 1, message: err})
  }
}


exports.deleteInput = async (req, res) => {
  try{
    const input_info = req.body
    const userid = req.auth.id
    const input_index = input_info.id

    // console.log(input_index, userid)
    
    const sql_get = `select * from input_output where id=?`
    const db_user = await db.query(sql_get,[input_index])
    // console.log(db_user)
    if (db_user.length != 1 ) {
      return res.send({status: 1, message: "there a two inputs, this is a backend error"})
    }
    // check if user owns the input
    // if (db_user[0].uid !== userid) {
    //   return res.send({status: 1, message: "has not right to delete"})
    // }

    const sql = `DELETE FROM input_output WHERE id=?`

    const db_res = await db.query(sql, [input_index])

    if (db_res.affectedRows !== 1) {
      return res.send({status: 1, message: 'delete input fail, this is a backend error'})
    }

    // console.log(db_res)
    return res.send({status: 0, message: 'delete input create success'})
    
  } catch (err) {
    return res.send({status: 1, message: err})
  }
}




exports.getAllProduct_uid = async (req, res) => {
  try{
    const userid = req.auth.id
    const sql = `select * from product where uid=?`
    let db_result = await db.query(sql, userid)
    db_result.reverse()
    // console.log(db_result, db_result.length,"get product")
    return res.send({status: 0 , message: "get product success", data: db_result, length: db_result.length}) 
    

  } catch(err) {
    console.log(err)
    return res.send({status: 1, message: err})

  }
}


// process table


exports.createNewProcess = async (req, res) => {
  try {
    const process_info = req.body
    const userid = req.auth.id
    console.log(process_info, userid)
    const sql = `insert into process set ?`
    const db_res = await db.query(sql, {
      product_id: process_info.product_id,
      process_name: process_info.process_name,
      process_type: process_info.process_type,
      process_quantity: process_info.process_quantity,
      process_unit: process_info.process_unit,
      process_product_name: process_info. process_product_name,
      process_product_percentage: process_info.process_product_percentage,
      process_actual_quantity: process_info.process_actual_quantity,
      main_output: 1,
      parent_process: -1
    })
    if (db_res.affectedRows !== 1) {
     console.log("affect row") 
     return res.send({status: 1, message: 'create new process fail, this is a backend error'})
    }

    
    if (! process_info.by_product) {
      return res.send({status: 0, message: 'new process create success'})
    }

    const sql_1 = `insert into process set ?`
    // console.log(db_res,'check res')
    let total_by_product = process_info.by_product.length
    let count = 0
    for (let i = 0; i < process_info.by_product.length; i ++) {
      let by_product_info = process_info.by_product[i]
      let db_res_by = await db.query(sql_1, {
        // for by-product, use "parent_process" field to record the main process_id 
        parent_process: db_res.insertId,
        product_id: process_info.product_id,
        process_product_name: by_product_info.process_product_name,
        process_product_percentage: by_product_info.process_product_percentage,
        process_quantity: by_product_info.process_quantity,
        process_unit: by_product_info.process_unit,
        main_output: 0,
        process_name : "0",
      })
      if (db_res_by.affectedRows !== 1) {
        return res.send({status: 1, message: 'create new process fail, this is a backend error'})
      } else {
        count += 1
      }
    }
    if (count !== total_by_product) {
      return res.send({status: 1, message: "wrong by product error, this is a backend error"})
    }

    return res.send({status: 0, message: 'new process create success'})

  } catch(err) {
    return res.send({status: 1, message: err})
  }
}


exports.getAllProcess_pid = async (req, res) => {
  try{
    
    const userid = req.auth.id
    const product_id = Number(req.body.product_id)
    // console.log(product_id)
    const sql = `select * from process where product_id=?`
    const db_result = await db.query(sql, [product_id])
    // console.log(db_result, db_result.length, "get process by pid")


    const returned_data = db_result

    return res.send({status:0, message: "success", data: returned_data, length: returned_data.length})
  } catch(err) {
    console.log(err)
    return res.send({status: 1, message: err})

  }
}


exports.createNewInputOutput = async (req, res) => {
  try {
    const input_info = req.body
    const userid = req.auth.id
    const sql_process_type = `select * from process where id=?`
    const process_type_db_res = await db.query(sql_process_type, [input_info.process_id])
    let process_type = process_type_db_res[0].process_type
    console.log(process_type, "target")
    process_type = Number(input_info.input) === 1 ? process_type: "process_output"
    const sql = `insert into input_output set ?`
    const data =  {
      process_id: input_info.process_id,
      process_type: process_type,
      product_id: input_info.product_id,
      input_name: input_info.input_name,
      input_quantity: input_info.input_quantity,
      input_stat_note: input_info.input_stat_note,
      input_type: input_info.input_type,
      input_unit: JSON.stringify(input_info.input_unit),
      input_data_source: input_info.input_data_source,
      factor_name: input_info.factor_name,
      factor_note: input_info.factor_note,
      factor_source: input_info.factor_source,
      factor_db_basic: JSON.stringify(input_info.factor_db_basic),
      factor_unit: input_info.factor_unit,
      manual: input_info.manual,
      transportation: input_info.transportation,
      transportation_weight: input_info.transportation_weight,
      road: JSON.stringify(input_info.road),
      input: input_info.input
    }
    // console.log(data)
    const db_res = await db.query(sql, data)
    if (db_res.affectedRows !== 1) {
     console.log("affect row") 
     return res.send({status: 1, message: 'create new input/output fail, this is a backend error'})
    }

    return res.send({status: 0, message: 'new process create success'})

  } catch(err) {
    console.log(err)
    return res.send({status: 1, message: err})
  }
}


exports.getAllInputOutput_product_id = async (req, res) => {
  try{
    const userid = req.auth.id
    const product_id = req.body.product_id
    // console.log(product_id)
    const sql = `select * from input_output where product_id=?`
    const db_result = await db.query(sql, [product_id])
    // console.log(db_result)

    

    let returned_data = db_result

    returned_data = returned_data.map((data) => {
      let value = calculate([data]) 
      console.log("calculated value",value)
      return {...data, footprint:value}

    })
    console.log('returned data',returned_data)
    return res.send({status:0, message: "success", data: returned_data, length: returned_data.length})
  } catch(err) {
    return res.send({status: 1, message: err})

  }
}

exports.updateProduct = async (req, res) => {
  try {
    const p_info = req.body
    const userid = req.auth.id
    const product_index = p_info.id
    // check if user owns the product

    const sql = `UPDATE product SET ? WHERE id=?`

    const createTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    // console.log(p_info.product_stats_range)
    const db_res = await db.query(sql, [{
      uid: userid,
      p_type: p_info.product_type,
      p_name: p_info.product_name,
      p_model: p_info.product_model,
      p_quant: p_info.quantity,
      p_unit: p_info.product_unit,
      p_unit_weight: p_info.product_unit_weight,
      p_time_range: p_info.product_stats_range,
      p_lca_scope: p_info.product_life_cycle,
      p_createTime: createTime,
    }, product_index ])
    if (db_res.affectedRows !== 1) {
      return res.send({status: 1, message: 'update  product fail, this is a backend error'})
    }
    // console.log(db_res)
    return res.send({status: 0, message: 'update product  success'})


  }
  catch (err) {
    // console.log(err)
    return res.send({status:1, message: err})
  }
}



exports.updateInputOutput = async (req, res) => {
  try {
    const input_info = req.body
    const input_id = input_info.id
    const userid = req.auth.id

    const sql_process_type = `select * from process where id=?`
    const process_type_db_res = await db.query(sql_process_type, [input_info.process_id])
    const process_type = process_type_db_res[0].process_type
    // console.log(process_type, "target")

    const sql = `UPDATE input_output SET ? WHERE id=?`
    const data =  {
      process_id: input_info.process_id,
      process_type: process_type,
      product_id: input_info.product_id,
      input_name: input_info.input_name,
      input_quantity: input_info.input_quantity,
      input_stat_note: input_info.input_stat_note,
      input_type: input_info.input_type,
      input_unit: JSON.stringify(input_info.input_unit),
      input_data_source: input_info.input_data_source,
      factor_name: input_info.factor_name,
      factor_note: input_info.factor_note,
      factor_source: input_info.factor_source,
      factor_db_basic: JSON.stringify(input_info.factor_db_basic),
      factor_unit: input_info.factor_unit,
      manual: input_info.manual,
      transportation: input_info.transportation,
      transportation_weight: input_info.transportation_weight,
      road: JSON.stringify(input_info.road),
      input: input_info.input
    }
    // console.log(data)
    const db_res = await db.query(sql, [data, input_id])
    // console.log(db_res)
    if (db_res.affectedRows !== 1) {
      return res.send({status: 1, message: 'update new input/output fail, this is a backend error'})
    }

    return res.send({status: 0, message: 'input update success'})

  } catch(err) {
    return res.send({status: 1, message: err})
  }
}



exports.updateProcess = async (req, res) => {
  try {
    const process_info = req.body
    const userid = req.auth.id
    const process_id = process_info.id

    const sql = `delete from process  WHERE id=?`
    const db_res = await db.query(sql, [process_id])

    // if (db_res.affectedRows !== 1) {
    //   return res.send({status: 1, message: 'update process fail, this is a backend error'})
    // }

    const data = {
      id: process_id,
      product_id: process_info.product_id,
      process_name: process_info.process_name,
      process_type: process_info.process_type,
      process_quantity: process_info.process_quantity,
      process_unit: process_info.process_unit,
      process_product_name: process_info. process_product_name,
      process_product_percentage: process_info.process_product_percentage,
      process_actual_quantity: process_info.process_actual_quantity,
      main_output: 1,
      parent_process: "-1",
    }
    let s = `insert into process set ?` 
    let resaa = await db.query(s, data)
    // console.log('!', resaa)


    const sql_delete = `DELETE FROM process WHERE parent_process=?`
    const resaaa = await db.query(sql_delete, [process_id])



    const sql_1 = `insert into process set ?`
 
    let total_by_product = process_info.by_product.length
    let count = 0
    for (let i = 0; i < process_info.by_product.length; i ++) {
      let by_product_info = process_info.by_product[i]
      let db_res_by = await db.query(sql_1, {
        // for by-product, use "parent_process" field to record the main process_id 
        process_name: "0",
        product_id: process_info.product_id,
        process_product_name: by_product_info.process_product_name,
        process_product_percentage: by_product_info.process_product_percentage,
        process_quantity: by_product_info.process_quantity,
        process_unit: by_product_info.process_unit,
        main_output: 0,
        parent_process: process_id,
      })
      if (db_res_by.affectedRows !== 1) {
        return res.send({status: 1, message: 'update process fail, this is a backend error'})
      } else {
        count += 1
      }
    }
    if (count !== total_by_product) {
      return res.send({status: 1, message: "update by product error, this is a backend error"})
    }

    return res.send({status: 0, message: 'update process success'})


  } catch(err) {
    // console.log(err)
    return res.send({status: 1, message: err})
  }
}

// const update_inputoutput_record = async (email, db_result, product_id) => {

//   let sql =  `select * from product where id=?`
//   let sql_res = await db.query(sql,[product_id])
//   let current_access = sql_res[0].publish.split("#")

//   let value_to_be_check = db_result.filter((data) => {
//     let a = JSON.parse(data.factor_db_basic)
//     if (a.property === "private") {
//       return true
//     }
//     return false
//   })

//   let promises = value_to_be_check.map((data) => {

//   })


// }




// 1. 在calculate之前，更新inputoutput 中factor-db
// 2. inputoutput中，不写死factor-db，只留id

exports.getFootprint_pid = async (req, res) => {
  try{

    function calculate(arr) {
      // console.log(arr, "arr inside")
      let sum = 0
      for (let i = 0; i < arr.length; i++) { 
          console.log(arr[i])
          let quantity = arr[i].input_quantity
          // console.log(quantity)
          let unit = JSON.parse(arr[i].input_unit)[1]
    
          if (unit != "kg" && unit != 't') {
            if (Number(arr[i].manual) === 0) {
              let db_basic = JSON.parse(arr[i].factor_db_basic)
              let value = quantity * db_basic['sum_factor']
              // console.log(db_basic.sum_factor)
              if (db_basic['first'] === 't') {
                value = value * 1000
              }
              if (db_basic['first'] === 'g') {
                value = value / 1000
              }
              // console.log(value, '1')
              sum += value
            }
            // manual
            else {
              let value = quantity *  arr[i].factor_name 
              // console.log(db_basic.sum_factor, arr[i].factor_name)
              if (arr[i].factor_unit === "gCO2e") {
                value = value / 1000
              }
              // console.log(value, '2')
              sum += value
            }
            
          }
          // unit is kg or t
          else {
  

    
            if (Number(arr[i].manual) === 0) {
              
              let db_basic = JSON.parse(arr[i].factor_db_basic)
              let factor_second = db_basic["second"]
             // console.log(factor_second, "heresaaaa")
              
              if (factor_second == 't' && unit == 'kg') {
                quantity = quantity / 1000
              } else if (factor_second == 'kg' && unit == 't') {
                quantity = quantity * 1000
              }

              let value = quantity * db_basic['sum_factor']
              if (db_basic['first'] === 't') {
                value = value * 1000
              }
              if (db_basic['first'] === 'g') {
                value = value / 1000
              }
              // console.log(value, '3')
              sum += value
            }
            // manual
            else {

              let value = quantity *  arr[i].factor_name 
              if (arr[i].factor_unit === "gCO2e") {
                value = value / 1000
              }
              // console.log(value, '4')
              sum += value
            }
    
          }

          let total_trans = 0
          if (Number(arr[i].transportation) == 1) {
            const weight = Number(arr[i].transportation_weight)
            let road = JSON.parse(arr[i].road)
            
            for (let i = 0; i < road.length; i++)  {
              const distance = road[i].distance
              const factor =  road[i].factor_db_transportation.sum_factor

              let value = distance * factor *  weight / 1000
              console.log(value)
              if (road[i].first == 'g') {
                value = value / 1000
              }
              if (road[i].first == 't') {
                value = value * 1000
              }

              total_trans = total_trans + value
            }
          console.log('trans', total_trans)
          sum += total_trans

          }


      }
      console.log('sum', sum)
      
      return sum
    }
    // console.log(req)

    const userid = req.user.id
    
    const product_id = req.body.product_id
    // should check if the user owns the product
    // console.log(product_id, userid)

    const sql = `select * from input_output where product_id=?`
    const db_result = await db.query(sql, [product_id])

    // await update_inputoutput_record(email, db_result, product_id)
    

    // console.log(db_result)
    let data = {}
    const raw_material = db_result.filter((data) => {
      if (data.input_type === "raw_material") {
        return data
      }
    })


    const consumables = db_result.filter((data) => {
      if (data.input_type === "consumables") {
        return data
      }
    })

    const energy = db_result.filter((data) => {
      if (data.input_type === "energy") {
        return data
      }
    })
    const resource = db_result.filter((data) => {
      if (data.input_type === "resource") {
        return data
      }
    })
    const transportation = db_result.filter((data) => {
      if (data.input_type === "transportation") {
        return data
      }
    })
    const carbon_fixation = db_result.filter((data) => {
      if (data.input_type === "carbon_fixation") {
        return data
      }
    })
    const recycled_material = db_result.filter((data) => {
      if (data.input_type === "recycled_material") {
        return data
      }
    })

    const packing_material = db_result.filter((data) => {
      if (data.input_type === "packing_material") {
        return data
      }
    })


    const process_material = db_result.filter((data) => {
      if (data.process_type === "process_material") {
        return data
      }
    })
    
    
    const process_manu= db_result.filter((data) => {
      if (data.process_type === "process_manu") {
        return data
      }
    })
    
    const process_pack = db_result.filter((data) => {
      if (data.process_type === "process_pack") {
        return data
      }
    })
    
    const process_sale = db_result.filter((data) => {
      if (data.process_type === "process_sale") {
        return data
      }
    })
    
    const process_use= db_result.filter((data) => {
      if (data.process_type === "process_use") {
        return data
      }
    })
    
    const process_dispose  = db_result.filter((data) => {
      if (data.process_type === "process_dispose") {
        return data
      }
    })
    
    const sql_product_quantity = `select * from product where id=?`
    const db_res_product_quantity = await db.query(sql_product_quantity, [product_id])
    const product_quantity = db_res_product_quantity[0].p_quant
    
    data.raw_material = calculate(raw_material) 
    data.consumables = calculate(consumables) 
    // console.log(calculate(consumables) / product_quantity, 'consumable',  calculate(consumables), product_quantity)
    data.energy = calculate(energy) 
    data.resource = calculate(resource) 
    data.transportation = calculate(transportation)
    data.carbon_fixation = calculate(carbon_fixation) 
    data.recycled_material= calculate(recycled_material) 
    data.packing_material= calculate(packing_material) 

    data.process_material = calculate(process_material)
    data.process_manu = calculate(process_manu)
    // console.log(calculate(process_manu) / product_quantity, "before set", product_quantity)
    
    data.process_pack = calculate(process_pack)
    data.process_sale = calculate(process_sale) 
    data.process_use = calculate(process_use)
    data.process_dispose = calculate(process_dispose) 

    data.product_unit = db_res_product_quantity[0].p_unit
    data.product_quantity = product_quantity

    data.factor_sum = calculate(db_result)


    // console.log(data, 'hhhhh')
    const returned_data = data

    return res.send({status:0, message: "success", data: returned_data})
  } catch(err) {
    console.log(err)
    return res.send({status: 1, message: err})

  }
}



// 最后是kg为单位
