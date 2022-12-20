const schema = () => {
    const mongoose = require('mongoose');
    const schemaDraft = new mongoose.Schema({
        First_name : String,
        Last_name : String,
        email : String,
        contact_no : Number,
        password : String,
        confirm_password : String



    });
    return schemaDraft;

}

module.exports.schemaDraft = schema();