const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
_id:{
    type:Number
},
categoryType:{
    type:String,
    required:true,
    trim:true,
    minLength: 3,
    maxLength: 20,
    lowercase:true,
},
}, {timestamps:true})

categorySchema.virtual("trips",{
    ref:"Trip",
    localField:"_id",
    foreignField:"categoryId"
})

const Category = mongoose.model('Category',categorySchema);
module.exports = Category;