const mongoose=require("mongoose");
const studentSchema=new mongoose.Schema({
    firstName:{
        type: String,
        required:true
    
    },
    age:{
        type: Number,
        required: true
    }
})

//we will create a new collection
const Student = new mongoose.model('Student', studentSchema);

module.exports=Student;
