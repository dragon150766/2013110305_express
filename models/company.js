const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema({
    name:  String, // String is shorthand for {type: String}
    address: {
      provice: String,
    }
  },{ collection:"setting"});

const company = mongoose.model("company",companySchema)

module.exports = company