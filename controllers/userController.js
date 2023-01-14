const { findOne } = require("../models/user")
const User = require("../models/user")


exports.userIndex = async (req, res, next) =>{

  const userIndex= await User.find().select('name email password role').sort({_id:-1})

    res.status(200).json({
      data: userIndex
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

exports.register = async (req, res, next) =>{
  try{

  const { name, email, password} = req.body

  const existEmail = await User.findOne({ email:email })
  if(existEmail){
   const error = new Error("This email have already")
   error.statusCode = 400
   throw error;
  }

  if(password.length <5 ){
    const error = new Error("This password less that 5")
   error.statusCode = 400
   throw error;
  }

  let user = new User();
  user.name = name
  user.email = email
  user.password = await user.encryptPassword(password)

  await user.save();

  res.status(200).json({
    message: "register Suscced"
  })

  } catch(error) {
    next(error)
  }

}
