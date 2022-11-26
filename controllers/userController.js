exports.userIndex = (req, res, next) =>{
    res.status(200).json({
      fullname:'Siripong Poolnuch'
    })
}

exports.userBio = (req, res, next) =>{
    res.status(200).json({
      fullname:'Siripong Poolnuch',
      nickname:'Fluk',
      hobby:'Sleep',
      gitusername:'dragon150766'
    })
  }
