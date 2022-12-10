const Staff = require('../models/staff')

exports.index = async (req, res, next) =>{

    const staff = await Staff.find().sort({_id:-1 })

    res.status(200).json({
        data: staff
    })
}

exports.insert = async (req, res, next) =>{

    const { name, salary } = req.body

    let staff = new Staff({
        name: name,
        salary: salary,
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
        throw new Error('No have this ID')
    }

    res.status(200).json({
        data : staff
    })

    } catch (error){

        res.status(400).json({
            error:{
                message:"Error: "+error.message
            }
        })
    }
}

exports.destroy = async (req, res, next) =>{
    
    try{
        const { id } = req.params
        const staff = await Staff.deleteOne({
            _id : id
        })

        if(staff.deleteCount === 0){
            throw new Error('No have this ID')
        }else{
            res.status(200).json({
                message: "delete sussced"
            })
        }

    }catch(error){

        res.status(400).json({
            error:{
                message:"Error: "+error.message
            }
        })

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

        res.status(200).json({
            message: "Update Sussced"
        })

        

    }catch(error){

        res.status(400).json({
            error:{
                message:"Error: "+error.message
            }
        })

    }

}