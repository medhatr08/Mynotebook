const mongoose=require('mongoose');
const mongoURI= "mongodb://localhost:27017/my_notebook";
const connnectToMongo=()=>{
    mongoose.connect(mongoURI)
    .then(()=> {
        console.log("Connected");
    })
}
module.exports=connnectToMongo