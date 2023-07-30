


exports.training = async (req, res) => {
  try{
      
    return res.send({status: 0, message: "success"})


  } catch (err) {
    return res.send({status: 1, message: err})
  }

}

exports.cdp = async (req, res) => {
  try{
      
    return res.send({status: 0, message: "success"})


  } catch (err) {
    return res.send({status: 1, message: err})
  }

}



exports.organization = async (req, res) => {
  try{
      
    return res.send({status: 0, message: "success"})


  } catch (err) {
    return res.send({status: 1, message: err})
  }

}
