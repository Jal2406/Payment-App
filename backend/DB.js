const mongoose = require('mongoose')
const { number } = require('zod')

mongoose.connect('mongodb+srv://admin:1.45mayani@cluster0.bl5nkcu.mongodb.net/paytm')

const UserSchema = new mongoose.Schema({
    email:String,
    fname:String,
    lname:String,
    password:String,
})

const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    balance: {
        type:Number,
        required:true
    }
})

const User = mongoose.model('User',UserSchema)
const Account = mongoose.model('Account', AccountSchema)

module.exports = { User, Account };