const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    name: String,
    username: { type: String, unique: true },
    password: String,
    email: { type: String, unique: true },
    mobile: { type: Number, unique: true },
    isAdmin: { type: Boolean, default: false },
});

module.exports=mongoose.model('User',UserSchema);