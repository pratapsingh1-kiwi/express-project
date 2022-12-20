const schema = () => {
    const mongoose = require('mongoose');
    const schemaDraft = new mongoose.Schema({
        name : {
            type : String,
            unique : true
        },
        email : {
            type : String,
            unique : true
        },
        password : {
            type : String,
            unique : true
        },
        address : {
            type : String,
            unique : true
        }
    });
    return schemaDraft;

}

module.exports.schemaDraft = schema();