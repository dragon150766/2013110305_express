const Company = require('../models/company')

exports.index = async (req, res, next) =>{
    
    const company = await Company.find().sort({_id:-1})

    res.status(200).json({
        data: company
    })
}

exports.show = async (req, res, next) =>{
    try{

        const { id } = req.params
        const company = await Company.findById(id)

        if(!company){
            const error = new Error('No have this ID')
            error.statusCode = 400
            throw error;
        }

        res.status(200).json({
            data: company
        })

    }catch(error){
        next(error)
    }
}

exports.destroy = async (req, res, next) =>{

    try{ 
    
        const { id } = req.params
        const company = await Company.deleteOne({
           _id:id
        })

        if(company.deletedCount === 0){
           const error = new Error('No have this ID')
           error.statusCode = 400
           throw error;
        }else{
            res.status(200).json({
                message: "Delete Successed"
            })
        }

    }catch(error){
        next(error)
    }
}

exports.update = async (req, res, next) =>{
    try{

        const { id } = req.params
        const { name, salary} = req.body
        const company = await Company.findOneAndUpdate({_id: id},{
            name: name,
            salary: salary
        })

        if(!company){
            const error = new Error('have no this id')
            error.statusCode = 400
            throw error;
        }

        res.status(200).json({
            message:"Update Sussced"
        })

    }catch(error){
        next(error)
    }
}

exports.insert = async (req, res, next) =>{
    const{ name, salary } = req.body

    let company = new Company({
        name: name,
        salary: salary
    });
    await company.save();

    res.status(200).json({
        message: "Insert Data Complete"
    });

}



// exports.companyIndex = async (req, res, next) =>{

//     const company = await Company.findOne()

//     res.status(200).json({
//         data: company
//     })
    

//     //   data:[
//     //       {
//     //           id:1,
//     //           name:'Square Enix',
//     //           address:{
//     //               province:'Japan',
//     //               postcode: 97000
//     //           }
//     //       },
//     //       {
//     //           id:2,
//     //           name:'Riot-Game-Thailand',
//     //           address:{
//     //               province:'Thailand',
//     //               postcode: 74600
//     //           }
//     //       },
//     //       {
//     //           id:3,
//     //           name:'Capcom',
//     //           address:{
//     //               province:'Japan',
//     //               postcode: 96840
//     //           }
//     //       }
//     //   ]

//   }