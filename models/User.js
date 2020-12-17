const mongoose = require ('mongoose');
const {Schema, model} = mongoose;

const userSchema = new Schema (
    {
        username: {
            type:String,
            trim:true,
            required: [true, "Username is required"],
            unique: true
        },
        email: {
            type:String,
            trim: true,
            required: [true, "Email is required"]
        },
        password: {
            type:String,
            required: [true, "Password is required"]
        }, 
        imageUrl: {
            type: String
        }
    }   
);

module.exports = model('User', userSchema);