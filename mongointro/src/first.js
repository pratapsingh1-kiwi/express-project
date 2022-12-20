const express = require('express')
const bodyParser = require('body-parser')
const connection = require('./connection.js')
const schemaDraft = require('./schema.js')
const mongoose = require('mongoose')
const schema = schemaDraft.schemaDraft
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
connection.con();
app.post('/create', async(req, res) => {
        const model = mongoose.model('user', schema);
        const doc = new model({
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            contact : req.body.contact,
            email : req.body.email,
            address : req.body.address,
            state : req.body.state,
            city : req.body.city,
            pincode : req.body.pincode
        });

        const value = await doc.save();
        res.json(value);    
})

app.listen(3000);