const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema({

    name: { type: String, required: true, trim: true},
    salary: { type: Number},
    created: { type: Date, default: Date.now }

  },{ collection:"companys"});

const company = mongoose.model("company",companySchema)

module.exports = company