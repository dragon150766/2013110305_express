const Shop = require('../models/shop')
const Menu = require('../models/menu')
const Domain = require('../config/index')

exports.shop = async (req, res, next) =>{
    
    const shops = await Shop.find().select('name photp location').sort({_id:-1})

    const ShopWithPhotpDomain = shops.map( (shop,index) => {
        return{
            id: shop._id,
            name: shop.name,
            photo: Domain.DOMAIN + shop.photo,
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

    res.status(200).json({
        data : shop
    })

    } catch (error){

        res.status(400).json({
            error:{
                message:"Error: "+error.message
            }
        })
    }
}