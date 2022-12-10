const Company = require('../models/company')

exports.companyIndex = async (req, res, next) =>{

    const company = await Company.findOne()

    res.status(200).json({
        data: company
    })


    //   data:[
    //       {
    //           id:1,
    //           name:'Square Enix',
    //           address:{
    //               province:'Japan',
    //               postcode: 97000
    //           }
    //       },
    //       {
    //           id:2,
    //           name:'Riot-Game-Thailand',
    //           address:{
    //               province:'Thailand',
    //               postcode: 74600
    //           }
    //       },
    //       {
    //           id:3,
    //           name:'Capcom',
    //           address:{
    //               province:'Japan',
    //               postcode: 96840
    //           }
    //       }
    //   ]

  }