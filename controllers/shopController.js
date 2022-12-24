const Shop = require('../models/shop')
const Menu = require('../models/menu')

exports.shop = async (req, res, next) =>{
    
    const shops = await Shop.find().select('name photp location').sort({_id:-1})

    const ShopWithPhotpDomain = shops.map( (shop,index) => {
        return{
            id: shop._id,
            name: shop.name,
            photo: "http://localhost:3000/image/" + shop.photo,
            location: shop.location
         
        }
    });

    res.status(200).json({
        data: ShopWithPhotpDomain
    })
}

exports.menu = async (req, res, next) =>{
    
    const menus = await Menu.find().sort({_id:-1})

   

    res.status(200).json({
        data: menus
    })
}