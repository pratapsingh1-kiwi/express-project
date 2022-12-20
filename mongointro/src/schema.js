const schema = () => {
    const mongoose = require('mongoose');
    const schemaDraft = new mongoose.Schema({
        first_name : String,
        last_name : String,
        contact : String,
        email : String,
        address : String,
        state : String,
        city : String,
        pincode : Number
    });
    return schemaDraft;

}

module.exports.schemaDraft = schema();