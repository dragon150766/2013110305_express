const mongoose = require('mongoose')
const Schema = mongoose.Schema

const shopSchema = new Schema({
    
    name:  { type: String, required: true, trim: true}, 
    photo: { type: String, default: 'nopic.png' },
    location: {
        lat:Number,
        lgn:Number
    }

  },{ 
    timestamps: true,
    collection:"shop"
});

const shop = mongoose.model("shop",shopSchema)

module.exports = shop