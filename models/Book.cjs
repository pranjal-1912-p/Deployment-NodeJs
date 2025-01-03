const mongoose=require('mongoose');

const BookSchema=new mongoose.Schema({
    name:String,
    number:String,
    genre:String,
    type:String,
    available:{type:Boolean,default:true},
});

module.exports=mongoose.model('Book',BookSchema);