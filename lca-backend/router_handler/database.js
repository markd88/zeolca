const db = require('../db/index')



exports.getfactor_db = async (req, res) => {
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
    return res.send({status:0, message: "success", data: final_result, total: total})


  } catch(err) {
    return res.send({status: 1, message: err})

  }

}

exports.getfactor_db_fid = async (req, res) => {
  try{

    const factor_id = Number(req.body.factor_id)
    console.log(factor_id)


    const sql = `select * from factor_base_cpcd where id=?`
    let db_result = await db.query(sql,[factor_id])

    console.log(db_result[0])
    return res.send({status:0, message: "success", data: db_result[0]})

  } 
  catch(err) {
    return res.send({status: 1, message: err})

  }

} 


