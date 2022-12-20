const express = require('express')
const bodyParser = require('body-parser')
const connection = require('./task_connection.js')
const schemaDraft = require('./task_schema.js')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const schema = schemaDraft.schemaDraft
const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
connection.con();
const model = mongoose.model('user', schema);
app.post('/create', async(req, res) => {
    const salt = await bcrypt.genSalt(10)
    secPass = await bcrypt.hash(req.body.password, salt)
            const doc = new model({
            name : req.body.name,
            email : req.body.email,
            password : secPass,
            address : req.body.address
            
        });

        const value = await doc.save();
        res.json(value);    
})


  
  app.post("/register", async (req, res) => {
    const { name, email, password, address } = req.body;
  
    if (!name || !email || !password || !address) {
      return res.json({ error: "Please fill your details" });
      }
      try {
          const userExist = await model.findOne({ email: email }, {name: name });
          if (userExist)
          {
               return res
            .json({ error: "Email or Phone number already exists" });
          }
          
          const user = new model({ name, email, password, address });
          
          const userRegister = await user.save();
          if (userRegister)
          {
               res
               .json({ message: "User registered successfully" });
              }
        
      } catch (err) {
          console.log(err)
      }
    });

    app.delete('/delete', (req,res) => {
        model.deleteOne(({email : req.body.email}), (err, val) => {
            if(err){
                console.log(err)
            }
            else if(val.deletedCount == 0){
                res.send("database empty")
                console.log("database empty")
            }
            else{
                res.send("data is deleted")
                console.log("data is deleted")
            }
        })
    
    })
    app.put('/update', (req, res) => {
        model.updateOne({email : req.body.email}, { $set : {name : req.body.name, address : req.body.address}}).then((value) => {

            try{
                console.log(value);
                res.send(value);
            }
            catch(err)
            {
                console.log(err);
                res.send(err);
            }
        })
        });

app.get('/info/:email/:password', (req,res) => {
    const password = req.params.password;
    model.findOne(({email : req.body.email}),(err, val) => {
        if(err){
            console.log(err)
        }
        else
        {
            if(password == req.body.password){
                console.log(val);
                res.send(val);
            }
            else
            {
                console.log("given password is not correct")
                res.send("given password is not correct")
            }
        }
    })
})
  

app.listen(3000);