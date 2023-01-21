const Shop = require('../models/shop')
const Menu = require('../models/menu')
const Domain = require('../config/index')
const { body, validationResult } = require('express-validator');

const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid');
const { promisify } = require('util')
const writeFileAsync = promisify(fs.writeFile)

exports.shop = async (req, res, next) =>{
    
    const shops = await Shop.find().select('name photo location').sort({_id:-1})

    const ShopWithPhotpDomain = shops.map( (shop,index) => {
        return{
            id: shop._id,
            name: shop.name,
            photo: Domain.DOMAIN+"/images/" + shop.photo,
            location: shop.location
         
        }
    });

    res.status(200).json({
        data: ShopWithPhotpDomain
    })
}

exports.menu = async (req, res, next) =>{
    
    // const menus = await Menu.find().sort({_id:-1})
    const menus = await Menu.find().populate('shop')

   

    res.status(200).json({
        data: menus
    })
}

exports.show = async (req, res, next) =>{
    
    try{
        const { id } = req.params

    const shop = await Shop.findOne({
        _id : id
    }).populate('menus')
    
    if(!shop){
        const error = new Error('have no this id')
        error.statusCode = 400
        throw error;
    }

    res.status(200).json({
        data : shop
    })

    } catch (error){
        next(error)
    }
}

exports.insert = async (req, res, next) =>{

   try{
    const { name, location, photo  } = req.body

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Data is not true")
      error.statusCode = 422
      error.validation = errors.array()
      throw error;
    }
    
    let s 
    if(!photo){
    s= "nopic.png"
    }else{
    s=  await saveImageToDisk(photo)
}

    let shop = new Shop({
        name: name,
        location: location,
        photo: s
    });

    await shop.save();

    res.status(200).json({
        message: 'the data has be save!'   
    })

   }catch(error){
    next(error)
   }
}

async function saveImageToDisk(baseImage) {
    //หา path จริงของโปรเจค
    const projectPath = path.resolve('./') ;
    //โฟลเดอร์และ path ของการอัปโหลด
    const uploadPath = `${projectPath}/public/images/`;

    //หานามสกุลไฟล์
    const ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));

    //สุ่มชื่อไฟล์ใหม่ พร้อมนามสกุล
    let filename = '';
    if (ext === 'svg+xml') {
        filename = `${uuidv4.v4()}.svg`;
    } else {
        filename = `${uuidv4.v4()}.${ext}`;
    }

    //Extract base64 data ออกมา
    let image = decodeBase64Image(baseImage);

    //เขียนไฟล์ไปไว้ที่ path
    await writeFileAsync(uploadPath+filename, image.data, 'base64');
    //return ชื่อไฟล์ใหม่ออกไป
    return filename;
}

function decodeBase64Image(base64Str) {
    var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var image = {};
    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 string');
    }

    image.type = matches[1];
    image.data = matches[2];

    return image;
}