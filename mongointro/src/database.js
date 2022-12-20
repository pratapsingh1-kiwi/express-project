const connection = require('./task_connection.js')
const schemaDraft = require('./task_schema.js');
const mongoose = require('mongoose');
const schema = schemaDraft.schemaDraft;
const model = mongoose.model('user',schema);
const doc = new model({
    first_name : "Pratap",
    last_name : "Singh",
    contact : "8107884648"
})
doc.save();
connection.con;
