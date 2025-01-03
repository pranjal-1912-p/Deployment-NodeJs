const mongoose=require('mongoose');

const ReturnSchema=new mongoose.Schema({
    bookId:{type:mongoose.Schema.Types.ObjectId,ref:'Book'},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    borrowDate:Date,
    fine:Number,
    
});
module.exports=mongoose.model('Return',ReturnSchema);