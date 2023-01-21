const { findOne } = require("../models/user")
const User = require("../models/user")
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const config = require('../config/index')


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

  // Validation
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Data is not true")
      error.statusCode = 422
      error.validation = errors.array()
      throw error;
    }

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

exports.login = async (req, res, next ) => {
  try{
    const { email, password} = req.body

     // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Data is not true")
    error.statusCode = 422
    error.validation = errors.array()
    throw error;
  }

  const user = await User.findOne({ email:email })
  if(!user){
   const error = new Error("This email have no data.")
   error.statusCode = 404
   throw error;
  }
  
  const isValid = await user.checkPassword(password)
  if(!isValid){
    const error = new Error("Password not match.")
    error.statusCode = 401
    throw error;
   }

   //create Token
   const token = await jwt.sign({
    id:user._id,
    role:user.role,
   },config.SECRET_KEY ,{ expiresIn: "5 days"})

   const expires_In = jwt.decode(token)

    res.status(200).json({
      access_token: token,
      expires_In: expires_In.exp,
      token_type: 'Bearer'
    })

  }catch(error){
    next(error)
  }
}
