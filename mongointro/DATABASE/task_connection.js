const connection = () => {
    const mongoose = require('mongoose')
    mongoose.set('strictQuery', true);
    mongoose.connect('mongodb+srv://quest100:quest100@cluster0.uopgqay.mongodb.net/test',{useNewUrlParser: true,useUnifiedTopology: true }).then(() => {
    console.log(`connection successful`)}).catch((err) => console.log('no connection', err));

    
};
module.exports.con = connection;