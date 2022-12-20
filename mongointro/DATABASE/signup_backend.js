const express = require('express')
const bodyParser = require('body-parser')
const connection = require('./task_connection.js')
const schemaDraft = require('./signup_schema.js')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const schema = schemaDraft.schemaDraft
const app = express();
const middl = require('./middleware.js')
const jwt = require('jsonwebtoken')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
connection.con();
const postSchema = require('./post_schema.js');
const authentication = require('./middleware.js')
const model = mongoose.model('user', schema);
const user_post = mongoose.model('post',postSchema);
app.get('/info', async (req, res) => {
    const password = req.body.password;

    model.findOne(({ email : req.body.email}), async (err, val) =>{
        if(err){
            console.log(err);
            res.send(err);
        }
        else {
            //console.log(val)
            if(val == null){
                console.log("can't login");
                res.send("can't login");
            }
            else{
                //console.log(val)
                const updated = req.body.password
                const last = val.password
                const result = await bcrypt.compare(updated,last);
                if(result){
                    const token = jwt.sign({
                        email : req.body.email
                    },"PratapSingh");
                    console.log(token);
                    res.send(token);
                }
                else{
                    console.log("password wrong");
                    res.send("wrong password");
                }
            }
        }
    });
});
app.post("/create", (req, res) => {
    if(req.body.password != req.body.confirm_password){
        console.log("password does not match");
        res.send("password does not match");
    }
    else{
        model.findOne(({ email : req.body.email}), async (err, val) => {
            if(err){
                console.log(err);
                res.send(err);
            }
            else{
                if(val != null){
                    console.log("user from " + req.body.email + " is already exist ");
                    res.send("user from " + req.body.email + " is already exist");
                }
                else{
                    const salt = await bcrypt.genSalt(10);
                    const secPass = await bcrypt.hash(req.body.password, salt);
                    const doc = new model({
                        First_name : req.body.First_name,
                        Last_name : req.body.Last_name,
                        email : req.body.email,
                        contact_no : req.body.contact_no,
                        password : secPass
                    });
                    console.log(req.body.password)
                    console.log(req.body.confirm_password)

                    const obj = await doc.save();
                    console.log("user has been saved" );
                    res.send(obj);

                }
            }
        })
    }
})



















app.post('/signup', async(req, res) => {
    try{
        console.log(req.body.First_name);
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.Password, salt);
    const verify = await bcrypt.compare(req.body.Password, secPass)
    console.log(verify)
    

    const doc = new model({
            First_name : req.body.First_name,
            Last_name : req.body.Last_name,
            Email : req.body.Email,
            Contact_no : req.body.Contact_no,
            Password : secPass
            
        });

        console.log(doc);
        const value = await doc.save();
        res.json(value); 
    }
    catch(err)
    {
        console.log(err);
    }   
})




app.get('/view',middl);

app.post('/createPost',authentication,async (req,res) => {


    console.log(req.body);
    const p =  new user_post({

        user_id : req.body.user_id,
        title : req.body.title,
        description : req.body.description
    });

    const obj = await p.save();
    console.log(obj);
    res.send(obj);
})


app.get('/allPost', async (req,res) => {

    const posts = await user_post.find();
    console.log(posts);
    res.send(posts);
});

app.get('/userPost',authentication, (req,res) => {

     user_post.find().populate("user_id").then((value) => {

        console.log(value);
        res.send(value);
     });
})
app.listen(3000);