exports.companyIndex = (req, res, next) =>{
    res.status(200).json({
      data:[
          {
              id:1,
              name:'Square Enix',
              address:{
                  province:'Japan',
                  postcode: 97000
              }
          },
          {
              id:2,
              name:'Microsoft',
              address:{
                  province:'U.S.',
                  postcode: 74600
              }
          },
          {
              id:3,
              name:'Capcom',
              address:{
                  province:'Japan',
                  postcode: 96840
              }
          }
      ]
    })


  }