//Database Integration
// const {default:mongoose} = require('mongoose');

//1 server and mongodb integration
//mongoose import
const mongoose = require('mongoose');

//2 state connection string via mongodb integration
mongoose.connect('mongodb://localhost:27017/BankServerB4',
{
    useNewUrlParser:true
    //to avoid warning
});

//3 define bank db model
const User=mongoose.model('User',
{
    //schema
    acno:Number,
    username:String,
    password:Number,
    balance:0,
    transaction:[]
})

module.exports={
    User
}