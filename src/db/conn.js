const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/iauro-api")
.then(()=>
    console.log("connection succes")
).catch((e)=>
    console.log("no connection"))
    //console.log(e);