const mongoose = require('mongoose');
const { Schema } = mongoose;


const UserSchema = new Schema({
    name: { type: String,unique: true, required: true },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please enter a valid email address'],
      },
    password: {type: String, required:true},
    date:{type: Date, default: Date.now}
});
const User =  mongoose.model('user',UserSchema); 

module.exports = User;
