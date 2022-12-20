const schema = () => {
    const mongoose = require('mongoose');
    const schemaDraft = new mongoose.Schema({
        user_id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user"
        },
        title : String,
        description : String



    });
    return schemaDraft;

}

module.exports = schema();