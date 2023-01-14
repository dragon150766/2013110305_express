const Staff = require('../models/staff')
const Domain = require('../config/index')

const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid');
const { promisify } = require('util')
const writeFileAsync = promisify(fs.writeFile)

exports.index = async (req, res, next) =>{

    const staffs = await Staff.find().select('name salary photo').sort({_id:-1 })

    const staffWithPhotpDomain = staffs.map( (staff,index) => {
        return{
            id: staff._id,
            name: staff.name,
            photo: Domain.DOMAIN+"/images/" + staff.photo,
            salary: staff.salary
         
        }
    });
    
    res.status(200).json({
        data: staffWithPhotpDomain
    })
}

exports.insert = async (req, res, next) =>{

    const { name, salary, photo } = req.body

    let s 
        if(!photo){
        s= "nopic.png"
        }else{
        s=  await saveImageToDisk(photo)
    }
    
    

    let staff = new Staff({
        name: name,
        salary: salary,
        photo: s
    });

    await staff.save();

    res.status(200).json({
        message: 'the data has be save!'   
    })
}

exports.show = async (req, res, next) =>{
    
    try{
        const { id } = req.params

    const staff = await Staff.findOne({
        _id : id
    })

    if(!staff){
        const error = new Error("No have this ID")
        error.statusCode = 400
        throw error;
    }

    res.status(200).json({
        data : staff
    })

    } catch (error){

        next(error)
    }
}

exports.destroy = async (req, res, next) =>{
    
    try{
        const { id } = req.params
        const staff = await Staff.deleteOne({
            _id : id
        })

        if(staff.deleteCount === 0){
            const error = new Error('No have this ID')
            error.statusCode = 400
            throw error;
        }else{
            res.status(200).json({
                message: "delete sussced"
            })
        }

    }catch(error){
        next(error)
    }
}

exports.update = async (req, res, next) =>{

    try{

        const { id } = req.params;
        const { name, salary } = req.body;

        // const staff = await Staff.findById(id);
        // staff.name = name;
        // staff.salary = salary;
        // await staff.save();

        // const staff = await Staff.findByIdAndUpdate(id,{
        //     name: name,
        //     salary: salary
        // })
        

        const staff = await Staff.updateOne({ _id : id},{
            name: name,
            salary: salary
        })

        if(staff.n == 0){
            const error = new Error('have no this id')
            error.statusCode = 400
            throw error;
        }

        res.status(200).json({
            message: "Update Sussced"
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