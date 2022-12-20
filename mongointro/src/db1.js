const mangoose=require ("mongoose")
const express=require ("express")
const app=express();

const mongoDB = 
mangoose
.connect("mongodb://localhost:27017/devesh")
.then(() => {
    console.log('saved');
  })
  .catch((err) => {
    console.log(err.message);
  });

const { default: mongoose } = require("mongoose");
const a=express();
a.get('/',(req,res)=>{
     res.send("Hello world")
})
a.listen(8000,()=>{
    console.log("hello from server sides")
})


//schema created 

const sakib=new mangoose.Schema({
    name:{
        type: String,
        required: true
    },
    surname: String,
    Email:String,
    age:Number,
    gender:String,
    address:String,
    Active:Boolean,
})

//COLLECTION CREATE
const Sakib=new mangoose.model("Sakib",sakib);

// INSERT A DOCUMENT
const userSakib= new Sakib({
    name:"sakib",
    surname: "ali",
    Email:"sakib403@gmail.com",
    age:24,
    gender:"male",
    address:"sector 23 ,indira nagar ,balrampur",
    Active:true,

})
userSakib.save();

//with the help of sync await

// const createdocument=async  ()=>{
//     try {
//         const userSakib= new Sakib({
//             name:"ram",
//             surname: "sharma",
//             Email:"ram1403@gmail.com",
//             age:22,
//             gender:"male",
//             address:"sector 33 ,indira nagar ,binore",
//             Active:true,
        
//         })
//         const result=awaituserSakib.save();
//         console.log(result);
//     } catch (error) {
//         console.log(error);
//     }
// }
// createdocument();
